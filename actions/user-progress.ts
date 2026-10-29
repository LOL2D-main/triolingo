"use server";

import { auth, currentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setSessionCookie } from "@/lib/session";
import { ADMIN_USER_ID } from "@/lib/admin-constants";
import { DAILY_ENERGY, DAILY_QUESTS, MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import { getVietnamDateString } from "@/lib/energy";
import { getVietnamToday, STREAK_MILESTONES } from "@/lib/streak";
import db from "@/db/drizzle";
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { challengeProgress, challenges, courses, userProgress } from "@/db/schema";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  const course = await getCourseById(courseId);

  if (!course) throw new Error("Course not found.");

  if (!course.units.length || !course.units[0].lessons.length)
    throw new Error("Course is empty.");

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    const updateData: {
      activeCourseId: number;
      userName?: string;
      userImageSrc?: string;
      userEmail?: string;
      energy?: number;
      energyDate?: string;
    } = {
      activeCourseId: courseId,
      userEmail: user.email,
    };

    // Giu nguyen ten va avatar rieng cua tai khoan Admin
    if (userId !== ADMIN_USER_ID) {
      updateData.userName = user.firstName || "User";
      updateData.userImageSrc = user.imageUrl || "/mascot.svg";
    }

    if (existingUserProgress.energy > DAILY_ENERGY) {
      updateData.energy = DAILY_ENERGY;
      updateData.energyDate = getVietnamDateString();
    }

    await db
      .update(userProgress)
      .set(updateData)
      .where(eq(userProgress.userId, userId));

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
    userEmail: user.email,
    energy: DAILY_ENERGY,
    gems: 100,
    energyDate: getVietnamDateString(),
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  if (!currentUserProgress) throw new Error("User progress not found.");

  if (userSubscription?.isActive) return { error: "subscription" };

  // Khong tru tim - Trai tim da duoc bo qua theo yeu cau he thong
  revalidatePath(`/lesson/${lessonId}`);
  return { success: true };
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (currentUserProgress.hearts === MAX_HEARTS)
    throw new Error("Hearts are already full.");
  if (currentUserProgress.points < POINTS_TO_REFILL)
    throw new Error("Not enough points.");

  await db
    .update(userProgress)
    .set({
      hearts: MAX_HEARTS,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};

export const refillEnergyWithGems = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User progress not found.");

  if (currentUserProgress.energy >= DAILY_ENERGY) {
    throw new Error("Năng lượng đã đầy.");
  }

  const GEMS_FOR_REFILL = 50;
  const currentGems = currentUserProgress.gems ?? 100;

  if (currentGems < GEMS_FOR_REFILL) {
    throw new Error("Không đủ đá quý (cần 50 gems).");
  }

  await db
    .update(userProgress)
    .set({
      energy: DAILY_ENERGY,
      gems: currentGems - GEMS_FOR_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");

  return { success: true };
};

export const updateUserProfile = async ({
  userName,
  userImageSrc,
}: {
  userName?: string;
  userImageSrc?: string;
}) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    const firstCourse = await db.query.courses.findFirst();
    if (!firstCourse) throw new Error("Course not found.");

    await db.insert(userProgress).values({
      userId,
      activeCourseId: firstCourse.id,
      userName: userName?.trim() || user?.firstName || "Học viên TrioLingo",
      userImageSrc: userImageSrc || user?.imageUrl || "/mascot.svg",
      energy: DAILY_ENERGY,
      gems: 100,
      energyDate: getVietnamDateString(),
    });
  } else {
    const updateData: { userName?: string; userImageSrc?: string } = {};

    if (userName && userName.trim().length > 0) {
      updateData.userName = userName.trim();
    }
    if (userImageSrc && userImageSrc.trim().length > 0) {
      updateData.userImageSrc = userImageSrc.trim();
    }

    if (Object.keys(updateData).length > 0) {
      await db
        .update(userProgress)
        .set(updateData)
        .where(eq(userProgress.userId, userId));
    }
  }

  // Update session cookies so all server/client components update immediately
  const finalName = userName?.trim() || user?.fullName || currentUserProgress?.userName || "Học viên TrioLingo";
  const finalImage = userImageSrc || user?.imageUrl || currentUserProgress?.userImageSrc || "/mascot.svg";

  await setSessionCookie({
    userId,
    name: finalName,
    email: user?.email || "",
    image: finalImage,
  });

  revalidatePath("/settings");
  revalidatePath("/leaderboard");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/shop");

  return { success: true };
};


/** Nhan Ruong Dong khi hoan thanh nhiem vu hang ngay (hoc 1 bai). */
export const claimQuestChest = async (questId: 1) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User progress not found.");

  const quest = DAILY_QUESTS.find((q) => q.id === questId);
  if (!quest) throw new Error("Quest not found.");

  if (currentUserProgress.questChest1Claimed) {
    return { success: false, error: "Bạn đã mở rương hôm nay rồi." };
  }

  const done = currentUserProgress.questLessonsCompleted ?? 0;
  if (done < quest.target) {
    return {
      success: false,
      error: `Chưa hoàn thành nhiệm vụ (${done}/${quest.target}).`,
    };
  }

  const newGems = (currentUserProgress.gems ?? 100) + quest.rewardGems;

  await db
    .update(userProgress)
    .set({ gems: newGems, questChest1Claimed: true })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/quests");
  revalidatePath("/learn");
  revalidatePath("/shop");

  return { success: true, rewardGems: quest.rewardGems, newGems };
};

/** Nhan Qua Moi Ngay (Ruong Go / Ruong Dong mien phi moi ngay). */
export const claimDailyFreeChest = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User progress not found.");

  const today = getVietnamToday();
  if (currentUserProgress.dailyFreeChestDate === today) {
    return { success: false, error: "Bạn đã nhận quà hôm nay rồi. Hẹn gặp lại ngày mai!" };
  }

  const rewardGems = 25;
  const newGems = (currentUserProgress.gems ?? 100) + rewardGems;

  await db
    .update(userProgress)
    .set({
      gems: newGems,
      dailyFreeChestDate: today,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/quests");
  revalidatePath("/learn");
  revalidatePath("/shop");
  revalidatePath("/leaderboard");

  return { success: true, rewardGems, newGems };
};

/** Nhan thuong moc chuoi (Streak Milestone Reward). */
export const claimStreakMilestone = async (milestoneDays: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User progress not found.");

  const milestone = STREAK_MILESTONES.find((m) => m.days === milestoneDays);
  if (!milestone) {
    return { success: false, error: "Mốc thưởng không hợp lệ." };
  }

  const streak = currentUserProgress.streakCount ?? 0;
  if (streak < milestoneDays) {
    return {
      success: false,
      error: `Bạn cần đạt chuỗi ${milestoneDays} ngày để nhận thưởng này (hiện tại: ${streak} ngày).`,
    };
  }

  const claimedList = (currentUserProgress.claimedStreakMilestones || "")
    .split(",")
    .filter(Boolean)
    .map(Number);

  if (claimedList.includes(milestoneDays)) {
    return { success: false, error: "Bạn đã nhận phần thưởng mốc này rồi." };
  }

  claimedList.push(milestoneDays);
  const newClaimedStr = claimedList.join(",");
  const newGems = (currentUserProgress.gems ?? 100) + milestone.rewardGems;

  await db
    .update(userProgress)
    .set({
      gems: newGems,
      claimedStreakMilestones: newClaimedStr,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/shop");

  return {
    success: true,
    rewardGems: milestone.rewardGems,
    newGems,
    claimedMilestones: claimedList,
  };
};

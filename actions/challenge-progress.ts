"use server";

import { and, eq, inArray, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import {
  COMBO_STAGES,
  ENERGY_PER_ANSWER,
  LESSON_COMPLETE_BONUS,
  MAX_ENERGY,
  POINTS_PER_CORRECT,
} from "@/constants";
import db from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import {
  challengeProgress,
  challenges,
  legendaryLessons,
  lessons,
  units,
  userMistakes,
  userProgress,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  getVietnamDaysAgo,
  getVietnamToday,
  getVietnamYesterday,
} from "@/lib/streak";

function computeNextStreak(currentUserProgress: {
  streakCount?: number | null;
  lastStreakDate?: string | null;
  streakFreezes?: number | null;
}) {
  const today = getVietnamToday();
  const yesterday = getVietnamYesterday();
  const twoDaysAgo = getVietnamDaysAgo(2);
  const lastStreakDate = currentUserProgress.lastStreakDate || "";
  let newStreak = currentUserProgress.streakCount ?? 0;
  let newFreezes = currentUserProgress.streakFreezes ?? 0;

  if (lastStreakDate === today) {
    // Da tinh chuoi trong ngay hom nay roi
  } else if (lastStreakDate === yesterday) {
    newStreak += 1;
  } else if (lastStreakDate === twoDaysAgo && newFreezes > 0) {
    // Su dung Streak Freeze de bao toan chuoi khi quen hoc 1 ngay
    newStreak += 1;
    newFreezes = Math.max(0, newFreezes - 1);
  } else {
    newStreak = 1;
  }

  return { newStreak, newFreezes, today };
}

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");

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

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath("/profile");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db
    .insert(challengeProgress)
    .values({
      challengeId,
      userId,
      completed: true,
    })
    .onConflictDoNothing();

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath("/profile");
  revalidatePath(`/lesson/${lessonId}`);
};

/**
 * Xu ly tra loi cau hoi:
 * - Che do 'jump' (Hoc vuot): KHONG kiem tra va KHONG tru energy (dung he thong 5 trai tim).
 * - Che do khac: Tru energy (neu chua Ultra), luu tien trinh, ghi nhan loi sai vao userMistakes.
 */
export const submitChallengeAnswer = async ({
  challengeId,
  isCorrect,
  streak,
  isLegendary,
  mode = "normal",
  practiceMode,
}: {
  challengeId: number;
  isCorrect: boolean;
  streak: number;
  isLegendary?: boolean;
  mode?: "normal" | "legendary" | "jump" | "practice";
  practiceMode?: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const [currentUserProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!currentUserProgress) throw new Error("User progress not found.");

  // Che do Hoc vuot khong tinh Energy (tinh 5 trai tim o client)
  if (mode === "jump") {
    return {
      success: true,
      energy: currentUserProgress.energy,
      comboBonus: 0,
      stageLabel: null,
    };
  }

  const isPro = !!userSubscription?.isActive;

  // Kiem tra nang luong
  if (!isPro && currentUserProgress.energy <= 0) {
    return { error: "energy" as const, energy: 0 };
  }

  // 1. Tru nang luong cho moi cau tra loi (Huyen thoai tieu ton x2)
  const energyPerAnswer = isLegendary
    ? ENERGY_PER_ANSWER * 2
    : ENERGY_PER_ANSWER;
  let newEnergy = isPro
    ? currentUserProgress.energy
    : Math.max(0, currentUserProgress.energy - energyPerAnswer);

  let comboBonus = 0;
  let stageLabel: string | null = null;

  // 2. Tinh thuong combo neu tra loi dung (Muc 1: 1 lan tang trong bai)
  if (isCorrect) {
    const nextStreak = streak + 1;
    const matched = (
      COMBO_STAGES as readonly {
        id: number;
        streak: number;
        reward: number;
        label: string;
      }[]
    ).find((s) => s.streak === nextStreak);

    if (matched) {
      comboBonus = matched.reward;
      stageLabel = matched.label;
    }

    if (!isPro && comboBonus > 0) {
      newEnergy = Math.min(MAX_ENERGY, newEnergy + comboBonus);
    }
  }

  // Cap nhat vao DB (KN chi dung de xep hang, dong thoi tang tien do nhiem vu 2)
  await db
    .update(userProgress)
    .set({
      energy: newEnergy,
      points: isCorrect
        ? currentUserProgress.points + POINTS_PER_CORRECT
        : currentUserProgress.points,
      questListeningCompleted: isCorrect
        ? (currentUserProgress.questListeningCompleted ?? 0) + 1
        : (currentUserProgress.questListeningCompleted ?? 0),
    })
    .where(eq(userProgress.userId, userId));

  // Ghi nhan hoac xoa loi sai & luu tien trinh (chi voi challenge co ID duong trong DB)
  if (challengeId > 0) {
    if (isCorrect) {
      await db
        .insert(challengeProgress)
        .values({
          challengeId,
          userId,
          completed: true,
        })
        .onConflictDoNothing();

      if (practiceMode === "mistakes") {
        await db
          .delete(userMistakes)
          .where(
            and(
              eq(userMistakes.userId, userId),
              eq(userMistakes.challengeId, challengeId)
            )
          );
      }
    } else {
      await db
        .insert(userMistakes)
        .values({
          userId,
          challengeId,
        })
        .onConflictDoNothing();
    }
  }

  return {
    success: true,
    energy: newEnergy,
    comboBonus,
    stageLabel,
  };
};

/**
 * Muc 2: Thuong nang luong va cap nhat tien do nhiem vu hang ngay khi hoan thanh bai hoc
 */
export const completeLessonBonus = async (
  lessonId: number,
  options?: { isLegendary?: boolean; accuracy?: number }
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const [currentUserProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);
  if (!currentUserProgress) return { energy: 0, bonus: 0 };

  const isPro = !!userSubscription?.isActive;
  const isLegendary = !!options?.isLegendary;
  const accuracy = options?.accuracy ?? 100;
  let newEnergy = currentUserProgress.energy;

  if (!isPro) {
    newEnergy = Math.min(
      MAX_ENERGY,
      currentUserProgress.energy + LESSON_COMPLETE_BONUS
    );
  }

  const nextLessonsCompleted =
    (currentUserProgress.questLessonsCompleted ?? 0) + 1;
  const nextHighAccuracyCompleted =
    accuracy >= 90
      ? (currentUserProgress.questHighAccuracyCompleted ?? 0) + 1
      : (currentUserProgress.questHighAccuracyCompleted ?? 0);

  const { newStreak, newFreezes, today } =
    computeNextStreak(currentUserProgress);

  await db
    .update(userProgress)
    .set({
      energy: newEnergy,
      points: isLegendary
        ? currentUserProgress.points + 45
        : currentUserProgress.points,
      questLessonsCompleted: nextLessonsCompleted,
      questHighAccuracyCompleted: nextHighAccuracyCompleted,
      streakCount: newStreak,
      streakFreezes: newFreezes,
      lastStreakDate: today,
    })
    .where(eq(userProgress.userId, userId));

  if (isLegendary) {
    await db
      .insert(legendaryLessons)
      .values({
        userId,
        lessonId,
        completed: true,
      })
      .onConflictDoNothing();
  }

  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/shop");
  revalidatePath("/profile");
  revalidatePath(`/lesson/${lessonId}`);

  return {
    energy: newEnergy,
    bonus: LESSON_COMPLETE_BONUS,
    isLegendary,
    streak: newStreak,
    isStreakLit: true,
  };
};

/**
 * Hoan thanh bai thi HOC VUOT:
 * - Mo khoa toan bo cac chuong truoc do (order < targetUnit.order) bang cach danh dau completed
 * - Cong +50 KN, cap nhat streak & nhiem vu, KHONG tru energy
 */
export const completeJumpUnit = async (targetUnitId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User progress not found.");

  const targetUnit = await db.query.units.findFirst({
    where: eq(units.id, targetUnitId),
  });
  if (!targetUnit) throw new Error("Unit not found.");

  const prevUnits = await db.query.units.findMany({
    where: and(
      eq(units.courseId, targetUnit.courseId),
      lt(units.order, targetUnit.order)
    ),
    columns: { id: true },
  });

  if (prevUnits.length > 0) {
    const prevUnitIds = prevUnits.map((u) => u.id);
    const prevLessons = await db.query.lessons.findMany({
      where: inArray(lessons.unitId, prevUnitIds),
      columns: { id: true },
    });

    if (prevLessons.length > 0) {
      const prevLessonIds = prevLessons.map((l) => l.id);
      const prevChallenges = await db.query.challenges.findMany({
        where: inArray(challenges.lessonId, prevLessonIds),
        columns: { id: true },
      });

      // Bulk insert challenge_progress theo tung nhom 200 ban ghi de an toan
      const values = prevChallenges.map((c) => ({
        userId,
        challengeId: c.id,
        completed: true,
      }));
      for (let i = 0; i < values.length; i += 200) {
        const chunk = values.slice(i, i + 200);
        await db.insert(challengeProgress).values(chunk).onConflictDoNothing();
      }
    }
  }

  const { newStreak, newFreezes, today } =
    computeNextStreak(currentUserProgress);

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 50,
      questLessonsCompleted:
        (currentUserProgress.questLessonsCompleted ?? 0) + 1,
      streakCount: newStreak,
      streakFreezes: newFreezes,
      lastStreakDate: today,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/leaderboard");
  revalidatePath("/quests");
  revalidatePath("/profile");
  revalidatePath("/practice");

  return {
    success: true,
    unlockedUnitOrder: targetUnit.order,
    earnedPoints: 50,
    streak: newStreak,
  };
};

/**
 * Hoan thanh phien Luyen tap (/lesson/practice)
 */
export const completePracticeSession = async (
  practiceMode: string,
  accuracy: number
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) return { success: false };

  const { newStreak, newFreezes, today } =
    computeNextStreak(currentUserProgress);
  const bonusPoints = 15;

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + bonusPoints,
      questLessonsCompleted:
        (currentUserProgress.questLessonsCompleted ?? 0) + 1,
      questHighAccuracyCompleted:
        accuracy >= 90
          ? (currentUserProgress.questHighAccuracyCompleted ?? 0) + 1
          : (currentUserProgress.questHighAccuracyCompleted ?? 0),
      streakCount: newStreak,
      streakFreezes: newFreezes,
      lastStreakDate: today,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/practice");
  revalidatePath("/profile");
  revalidatePath("/leaderboard");
  revalidatePath("/quests");

  return {
    success: true,
    practiceMode,
    bonusPoints,
    streak: newStreak,
  };
};

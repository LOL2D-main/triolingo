"use server";

import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import {
  COMBO_STAGES,
  ENERGY_PER_ANSWER,
  LESSON_COMPLETE_BONUS,
  MAX_ENERGY,
  POINTS_PER_CORRECT,
} from "@/constants";
import { getVietnamToday, getVietnamYesterday } from "@/lib/streak";
import db from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import {
  challengeProgress,
  challenges,
  legendaryLessons,
  userProgress,
} from "@/db/schema";

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
  revalidatePath(`/lesson/${lessonId}`);
};

/**
 * Xu ly tra loi cau hoi:
 * 1. Tru 1 nang luong cho moi cau tra loi.
 * 2. Kiem tra va cong thuong nang luong neu dat combo Muc 1 (dung 5 cau lien tiep).
 * 3. Cap nhat diem kinh nghiem, tien trinh bai hoc va nhiem vu hang ngay (cau hoi bai tap/nghe).
 */
export const submitChallengeAnswer = async ({
  challengeId,
  isCorrect,
  streak,
  isLegendary,
}: {
  challengeId: number;
  isCorrect: boolean;
  streak: number;
  isLegendary?: boolean;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!currentUserProgress) throw new Error("User progress not found.");

  const isPro = !!userSubscription?.isActive;

  // Kiem tra nang luong
  if (!isPro && currentUserProgress.energy <= 0) {
    return { error: "energy" as const, energy: 0 };
  }

  // 1. Tru nang luong cho moi cau tra loi (Huyen thoai tieu ton x2)
  const energyPerAnswer = isLegendary ? ENERGY_PER_ANSWER * 2 : ENERGY_PER_ANSWER;
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

  // Neu dung, luu tien trinh
  if (isCorrect) {
    await db
      .insert(challengeProgress)
      .values({
        challengeId,
        userId,
        completed: true,
      })
      .onConflictDoNothing();
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

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  if (!currentUserProgress) return { energy: 0, bonus: 0 };

  const isPro = !!userSubscription?.isActive;
  const isLegendary = !!options?.isLegendary;
  const accuracy = options?.accuracy ?? 100;
  let newEnergy = currentUserProgress.energy;

  // Thuong nang luong Muc 2
  if (!isPro) {
    newEnergy = Math.min(
      MAX_ENERGY,
      currentUserProgress.energy + LESSON_COMPLETE_BONUS
    );
  }

  const nextLessonsCompleted = (currentUserProgress.questLessonsCompleted ?? 0) + 1;
  const nextHighAccuracyCompleted =
    accuracy >= 90
      ? (currentUserProgress.questHighAccuracyCompleted ?? 0) + 1
      : (currentUserProgress.questHighAccuracyCompleted ?? 0);

  // Tinh toan chuoi ngay hoc (Streak)
  const today = getVietnamToday();
  const yesterday = getVietnamYesterday();
  const lastStreakDate = currentUserProgress.lastStreakDate || "";
  let newStreak = currentUserProgress.streakCount ?? 0;

  if (lastStreakDate === today) {
    // Da tinh chuoi trong ngay hom nay roi
  } else if (lastStreakDate === yesterday) {
    // Noi tiep chuoi hom qua
    newStreak += 1;
  } else {
    // Ngay dau tien hoac bi dut chuoi
    newStreak = 1;
  }

  // Luu cap nhat vao DB (Diem KN: +45 KN neu Huyen thoai; cap nhat nhiem vu hang ngay & chuoi)
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
      lastStreakDate: today,
    })
    .where(eq(userProgress.userId, userId));

  // Neu la cap do Huyen thoai, danh dau bai hoc da hoan thanh Huyen thoai
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
  revalidatePath(`/lesson/${lessonId}`);

  return {
    energy: newEnergy,
    bonus: LESSON_COMPLETE_BONUS,
    isLegendary,
    streak: newStreak,
    isStreakLit: true,
  };
};


import { and, eq, ne } from "drizzle-orm";

import { DAILY_ENERGY } from "@/constants";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { ADMIN_USER_ID } from "@/lib/admin-constants";

const VN_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
// Moc bat dau chu ky 7 ngay: Thu Hai 2024-01-01 00:00:00 (gio Viet Nam)
const EPOCH_MONDAY_VN_MS = Date.UTC(2024, 0, 1, 0, 0, 0);

/**
 * Lay chuoi ngay hien tai theo mui gio Viet Nam (UTC+7)
 * Dinh dang: YYYY-MM-DD
 */
export function getVietnamDateString(): string {
  const vnTime = new Date(Date.now() + VN_OFFSET_MS);
  return vnTime.toISOString().slice(0, 10);
}

/**
 * Tinh ma chu ky tuan 7 ngay hien tai (theo gio Viet Nam)
 */
export function getCurrentWeekKey(): string {
  const vnNowMs = Date.now() + VN_OFFSET_MS;
  const weekIndex = Math.floor((vnNowMs - EPOCH_MONDAY_VN_MS) / WEEK_MS);
  return `W-${weekIndex}`;
}

/**
 * Tinh thoi gian con lai (ms) den khi ket thuc 24h (00:00 gio Viet Nam)
 */
export function getDailyResetRemainingMs(): number {
  const vnNowMs = Date.now() + VN_OFFSET_MS;
  const elapsedToday = ((vnNowMs % DAY_MS) + DAY_MS) % DAY_MS;
  return DAY_MS - elapsedToday;
}

/**
 * Tinh thoi gian con lai (ms) den khi ket thuc chu ky tuan 7D (reset KN ve 0)
 */
export function getWeeklyResetRemainingMs(): number {
  const vnNowMs = Date.now() + VN_OFFSET_MS;
  const elapsedWeek =
    (((vnNowMs - EPOCH_MONDAY_VN_MS) % WEEK_MS) + WEEK_MS) % WEEK_MS;
  return WEEK_MS - elapsedWeek;
}

/**
 * Tu dong reset KN (points) cua bang xep hang ve 0 khi sang chu ky 7 ngay moi
 */
export async function ensureWeeklyLeaderboardReset(): Promise<string> {
  const currentWeekKey = getCurrentWeekKey();
  try {
    await db
      .update(userProgress)
      .set({
        points: 0,
        pointsWeek: currentWeekKey,
      })
      .where(
        and(
          ne(userProgress.pointsWeek, currentWeekKey),
          ne(userProgress.userId, ADMIN_USER_ID)
        )
      );
  } catch (error) {
    console.error("Failed to reset weekly leaderboard points:", error);
  }
  return currentWeekKey;
}

/**
 * Tu dong kiem tra va hoi nang luong + reset nhiem vu hang ngay (24h) + reset KN tuan (7D):
 */
export async function ensureDailyEnergy(currentUserProgress: {
  userId: string;
  energy: number;
  energyDate: string;
  points?: number;
  pointsWeek?: string;
}): Promise<{ energy: number; points: number }> {
  const today = getVietnamDateString();
  const currentWeekKey = getCurrentWeekKey();

  const isLegacyOverMax = currentUserProgress.energy > DAILY_ENERGY;
  const isNewDay = currentUserProgress.energyDate !== today;
  const isNewWeek =
    currentUserProgress.pointsWeek !== undefined &&
    currentUserProgress.pointsWeek !== currentWeekKey;

  if (isNewWeek) {
    await ensureWeeklyLeaderboardReset();
  }

  const nextPoints =
    isNewWeek && currentUserProgress.userId !== ADMIN_USER_ID
      ? 0
      : currentUserProgress.points ?? 0;

  if (!isLegacyOverMax && !isNewDay && !isNewWeek) {
    return {
      energy: currentUserProgress.energy,
      points: nextPoints,
    };
  }

  const newEnergy = isLegacyOverMax || isNewDay ? DAILY_ENERGY : currentUserProgress.energy;

  try {
    await db
      .update(userProgress)
      .set({
        energy: newEnergy,
        energyDate: today,
        pointsWeek: currentWeekKey,
        ...(isNewWeek && currentUserProgress.userId !== ADMIN_USER_ID
          ? { points: 0 }
          : {}),
        ...(isNewDay
          ? {
              questLessonsCompleted: 0,
              questListeningCompleted: 0,
              questHighAccuracyCompleted: 0,
              questChest1Claimed: false,
              questChest2Claimed: false,
              questChest3Claimed: false,
            }
          : {}),
      })
      .where(eq(userProgress.userId, currentUserProgress.userId));
  } catch (error) {
    console.error("Failed to update daily energy in database:", error);
  }

  return {
    energy: newEnergy,
    points: nextPoints,
  };
}

import { eq } from "drizzle-orm";

import { DAILY_ENERGY } from "@/constants";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";

/**
 * Lay chuoi ngay hien tai theo mui gio Viet Nam (UTC+7)
 * Dinh dang: YYYY-MM-DD
 */
export function getVietnamDateString(): string {
  const now = new Date();
  const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return vnTime.toISOString().slice(0, 10);
}

/**
 * Tu dong kiem tra va hoi nang luong + reset nhiem vu hang ngay:
 * - Moi ngay moi (00:00 gio Viet Nam) hoi lai DAILY_ENERGY (20) va reset 3 nhiem vu hang ngay.
 * - Neu tai khoan cu van con nang luong > 20: lap tuc ep ve 20.
 * - Neu trong cung ngay va nang luong hop le (<= 20): giu nguyen.
 */
export async function ensureDailyEnergy(currentUserProgress: {
  userId: string;
  energy: number;
  energyDate: string;
}): Promise<number> {
  const today = getVietnamDateString();

  const isLegacyOverMax = currentUserProgress.energy > DAILY_ENERGY;
  const isNewDay = currentUserProgress.energyDate !== today;

  if (!isLegacyOverMax && !isNewDay) {
    return currentUserProgress.energy;
  }

  const newEnergy = DAILY_ENERGY;

  try {
    await db
      .update(userProgress)
      .set({
        energy: newEnergy,
        energyDate: today,
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

  return newEnergy;
}

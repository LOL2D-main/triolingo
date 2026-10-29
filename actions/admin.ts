"use server";

import { randomInt } from "crypto";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import {
  campaignKeys,
  campaignKeyRedemptions,
  challengeProgress,
  courses,
  legendaryLessons,
  ultraKeys,
  userProgress,
  userSubscription,
} from "@/db/schema";
import {
  ADMIN_AVATAR,
  ADMIN_DISPLAY_NAME,
  ADMIN_EMAIL,
  ADMIN_GEMS,
  ADMIN_POINTS,
  ADMIN_USER_ID,
} from "@/lib/admin-constants";
import {
  getIsAdmin,
  issueAdminCookie,
  verifyAdminCredentials,
} from "@/lib/admin";
import { DAILY_ENERGY } from "@/constants";
import { getVietnamDateString } from "@/lib/energy";
import { setSessionCookie } from "@/lib/session";

const ULTRA_FOREVER = () => new Date(Date.now() + 100 * 365 * 86_400_000);

const assertAdmin = async () => {
  if (!(await getIsAdmin())) throw new Error("Unauthorized.");
};

/** Dang nhap tai khoan Admin (khong qua Firebase). */
export const adminLogin = async (email: string, password: string) => {
  if (!verifyAdminCredentials(email, password)) {
    return { success: false as const };
  }

  await issueAdminCookie();
  await setSessionCookie({
    userId: ADMIN_USER_ID,
    name: ADMIN_DISPLAY_NAME,
    email: ADMIN_EMAIL,
    image: ADMIN_AVATAR,
  });

  const firstCourse = await db.select().from(courses).limit(1);

  const existing = await db
    .select({ userId: userProgress.userId })
    .from(userProgress)
    .where(eq(userProgress.userId, ADMIN_USER_ID))
    .limit(1);

  const adminFields = {
    userName: ADMIN_DISPLAY_NAME,
    userImageSrc: ADMIN_AVATAR,
    userEmail: ADMIN_EMAIL,
    gems: ADMIN_GEMS,
    points: ADMIN_POINTS,
    energy: DAILY_ENERGY,
    isBanned: false,
  };

  if (existing.length === 0) {
    await db.insert(userProgress).values({
      userId: ADMIN_USER_ID,
      activeCourseId: firstCourse[0]?.id ?? null,
      energyDate: getVietnamDateString(),
      ...adminFields,
    });
  } else {
    await db
      .update(userProgress)
      .set(adminFields)
      .where(eq(userProgress.userId, ADMIN_USER_ID));
  }

  const subscription = await db
    .select({ id: userSubscription.id })
    .from(userSubscription)
    .where(eq(userSubscription.userId, ADMIN_USER_ID))
    .limit(1);

  if (subscription.length === 0) {
    await db.insert(userSubscription).values({
      userId: ADMIN_USER_ID,
      stripeCustomerId: "admin_customer",
      stripeSubscriptionId: "admin_subscription",
      stripePriceId: "admin_ultra",
      stripeCurrentPeriodEnd: ULTRA_FOREVER(),
    });
  } else {
    await db
      .update(userSubscription)
      .set({ stripeCurrentPeriodEnd: ULTRA_FOREVER() })
      .where(eq(userSubscription.userId, ADMIN_USER_ID));
  }

  return { success: true as const };
};

export const setUserBanned = async (userId: string, banned: boolean) => {
  await assertAdmin();
  if (userId === ADMIN_USER_ID) return { success: false, error: "Không thể khóa tài khoản Admin." };

  await db
    .update(userProgress)
    .set({ isBanned: banned })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/admin/users");
  revalidatePath("/admin");
  return { success: true };
};

export const deleteUserAccount = async (userId: string) => {
  await assertAdmin();
  if (userId === ADMIN_USER_ID) return { success: false, error: "Không thể xóa tài khoản Admin." };

  await db.delete(challengeProgress).where(eq(challengeProgress.userId, userId));
  await db.delete(legendaryLessons).where(eq(legendaryLessons.userId, userId));
  await db.delete(userSubscription).where(eq(userSubscription.userId, userId));
  await db.delete(userProgress).where(eq(userProgress.userId, userId));

  revalidatePath("/admin/users");
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin");
  return { success: true };
};

export const setUserUltra = async (userId: string, enabled: boolean) => {
  await assertAdmin();

  if (!enabled) {
    await db.delete(userSubscription).where(eq(userSubscription.userId, userId));
  } else {
    const existing = await db
      .select({ id: userSubscription.id })
      .from(userSubscription)
      .where(eq(userSubscription.userId, userId))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(userSubscription).values({
        userId,
        stripeCustomerId: `admin_grant_${userId}`,
        stripeSubscriptionId: `admin_grant_sub_${Date.now()}`,
        stripePriceId: "ultra_admin_granted",
        stripeCurrentPeriodEnd: ULTRA_FOREVER(),
      });
    } else {
      await db
        .update(userSubscription)
        .set({
          stripePriceId: "ultra_admin_granted",
          stripeCurrentPeriodEnd: ULTRA_FOREVER(),
        })
        .where(eq(userSubscription.userId, userId));
    }
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin");
  return { success: true };
};

const KEY_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const randomChunk = (length: number) =>
  Array.from({ length }, () => KEY_CHARS[randomInt(KEY_CHARS.length)]).join("");

/** Tao key dang ABCD-KHU6I-EGN89 (4-5-5 ky tu). */
export const generateUltraKeys = async (count: number) => {
  await assertAdmin();

  const total = Math.min(Math.max(Math.floor(count) || 1, 1), 100);
  const created: string[] = [];

  while (created.length < total) {
    const code = `${randomChunk(4)}-${randomChunk(5)}-${randomChunk(5)}`;
    const inserted = await db
      .insert(ultraKeys)
      .values({ code })
      .onConflictDoNothing()
      .returning({ code: ultraKeys.code });
    if (inserted.length > 0) created.push(code);
  }

  revalidatePath("/admin/keys");
  revalidatePath("/admin");
  return { success: true, codes: created };
};

export const deleteUltraKey = async (id: number) => {
  await assertAdmin();

  const removed = await db
    .delete(ultraKeys)
    .where(and(eq(ultraKeys.id, id), isNull(ultraKeys.usedBy)))
    .returning({ id: ultraKeys.id });

  revalidatePath("/admin/keys");
  revalidatePath("/admin");
  return removed.length > 0
    ? { success: true }
    : { success: false, error: "Chỉ xóa được key chưa sử dụng." };
};

export const updateUserStats = async (
  userId: string,
  stats: { gems: number; points: number }
) => {
  await assertAdmin();

  const gems = Math.max(0, Math.floor(stats.gems));
  const points = Math.max(0, Math.floor(stats.points));

  await db
    .update(userProgress)
    .set({ gems, points })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/admin");
  revalidatePath("/leaderboard");
  return { success: true };
};

export const createCampaignKey = async ({
  code,
  description = "",
  durationDays = 7,
}: {
  code: string;
  description?: string;
  durationDays?: number;
}) => {
  await assertAdmin();

  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) {
    return { success: false, error: "Mã key không được để trống." };
  }

  const days = Math.max(1, Math.min(365, Math.floor(durationDays) || 7));

  try {
    await db.insert(campaignKeys).values({
      code: cleanCode,
      description: description.trim(),
      durationDays: days,
    });

    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Mã key này đã tồn tại." };
  }
};

export const deleteCampaignKey = async (id: number) => {
  await assertAdmin();

  const removed = await db
    .delete(campaignKeys)
    .where(eq(campaignKeys.id, id))
    .returning({ id: campaignKeys.id, code: campaignKeys.code });

  revalidatePath("/admin");
  return removed.length > 0
    ? { success: true }
    : { success: false, error: "Không tìm thấy key để xóa." };
};



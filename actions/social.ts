"use server";

import { and, desc, eq, ilike, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { userFollows, userProgress } from "@/db/schema";
import { ADMIN_USER_ID } from "@/lib/admin-constants";
import { auth } from "@/lib/auth";

export const toggleFollowUser = async (targetUserId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");
  if (!targetUserId || targetUserId === userId) {
    return { success: false, following: false };
  }

  const existing = await db.query.userFollows.findFirst({
    where: and(
      eq(userFollows.followerId, userId),
      eq(userFollows.followingId, targetUserId)
    ),
  });

  if (existing) {
    await db.delete(userFollows).where(eq(userFollows.id, existing.id));
    revalidatePath("/profile");
    return { success: true, following: false };
  }

  await db
    .insert(userFollows)
    .values({
      followerId: userId,
      followingId: targetUserId,
    })
    .onConflictDoNothing();

  revalidatePath("/profile");
  return { success: true, following: true };
};

export const searchLearners = async (query: string) => {
  const { userId } = await auth();
  if (!userId) return [];

  const q = query.trim();

  const users = q
    ? await db.query.userProgress.findMany({
        where: and(
          ne(userProgress.userId, userId),
          ne(userProgress.userId, ADMIN_USER_ID),
          ilike(userProgress.userName, `%${q}%`)
        ),
        orderBy: [desc(userProgress.points)],
        columns: {
          userId: true,
          userName: true,
          userImageSrc: true,
          points: true,
        },
        limit: 20,
      })
    : await db.query.userProgress.findMany({
        where: and(
          ne(userProgress.userId, userId),
          ne(userProgress.userId, ADMIN_USER_ID)
        ),
        orderBy: [desc(userProgress.points)],
        columns: {
          userId: true,
          userName: true,
          userImageSrc: true,
          points: true,
        },
        limit: 20,
      });

  return users;
};

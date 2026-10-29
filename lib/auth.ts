import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";

/** Tai khoan bi admin khoa se khong the dung ung dung. */
const isBannedUser = cache(async (userId: string) => {
  try {
    const rows = await db
      .select({ isBanned: userProgress.isBanned })
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .limit(1);
    return !!rows[0]?.isBanned;
  } catch {
    return false;
  }
});

export type AuthUser = {
  id: string;
  userId: string;
  fullName: string | null;
  firstName: string | null;
  imageUrl: string;
  email: string;
  emailAddresses: { emailAddress: string }[];
};

import { AUTH_COOKIE_NAME } from "./auth-constants";
export { AUTH_COOKIE_NAME };

export async function getSessionUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const parsed = JSON.parse(decodeURIComponent(sessionCookie.value));
    if (!parsed?.userId) return null;

    const displayName = parsed.name || "Học viên TrioLingo";
    const firstName = displayName.split(" ")[0];

    return {
      id: parsed.userId,
      userId: parsed.userId,
      fullName: displayName,
      firstName,
      imageUrl: parsed.image || "/mascot.svg",
      email: parsed.email || "learner@gmail.com",
      emailAddresses: [{ emailAddress: parsed.email || "learner@gmail.com" }],
    };
  } catch {
    return null;
  }
}

export const auth = async () => {
  const user = await getSessionUser();
  const banned = user?.userId ? await isBannedUser(user.userId) : false;

  return {
    userId: banned ? null : user?.userId || null,
    protect: async () => {
      if (!user?.userId) {
        redirect("/");
      }
      if (banned) {
        redirect("/banned");
      }
    },
  };
};

auth.protect = async () => {
  const user = await getSessionUser();
  if (!user?.userId) {
    redirect("/");
  }
  if (await isBannedUser(user.userId)) {
    redirect("/banned");
  }
};

export const currentUser = async (): Promise<AuthUser | null> => {
  return await getSessionUser();
};

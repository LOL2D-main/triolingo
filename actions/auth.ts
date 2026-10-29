"use server";

import { clearSessionCookie, setSessionCookie } from "@/lib/session";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function setServerSession(userData: {
  userId: string;
  name: string;
  email: string;
  image: string;
}) {
  await setSessionCookie(userData);

  try {
    if (userData.userId) {
      const updatePayload: {
        userName?: string;
        userImageSrc?: string;
        userEmail?: string;
      } = {};

      if (userData.email) {
        updatePayload.userEmail = userData.email;
      }
      if (userData.image) {
        updatePayload.userImageSrc = userData.image;
      }
      if (userData.name) {
        updatePayload.userName = userData.name;
      }

      if (Object.keys(updatePayload).length > 0) {
        await db
          .update(userProgress)
          .set(updatePayload)
          .where(eq(userProgress.userId, userData.userId));
      }
    }
  } catch (err) {
    console.error("Failed to sync avatar to userProgress in DB:", err);
  }
}

export async function clearServerSession() {
  await clearSessionCookie();
}

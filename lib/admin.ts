import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { ADMIN_COOKIE_NAME, ADMIN_USER_ID } from "./admin-constants";

const SESSION_SECONDS = 60 * 60 * 24 * 7;

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET ||
  process.env.DATABASE_URL ||
  "triolingo-admin-secret";

const sign = (payload: string) =>
  createHmac("sha256", getSecret()).update(payload).digest("hex");

const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

export const verifyAdminCredentials = (email: string, password: string) => {
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
  return (
    safeEqual(email.trim().toLowerCase(), "admin@gmail.com") &&
    safeEqual(password, expectedPassword)
  );
};

export const issueAdminCookie = async () => {
  const expires = Date.now() + SESSION_SECONDS * 1000;
  const payload = `${ADMIN_USER_ID}.${expires}`;
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, `${payload}.${sign(payload)}`, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_SECONDS,
  });
};

export const clearAdminCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
};

/** Chi tra ve true khi cookie admin hop le (da ky bang HMAC, con han). */
export const getIsAdmin = async () => {
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!value) return false;

    const [userId, expires, signature] = value.split(".");
    if (userId !== ADMIN_USER_ID || !expires || !signature) return false;
    if (Number(expires) < Date.now()) return false;

    return safeEqual(signature, sign(`${userId}.${expires}`));
  } catch {
    return false;
  }
};

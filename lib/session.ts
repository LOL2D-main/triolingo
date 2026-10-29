import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "./auth-constants";
import { ADMIN_COOKIE_NAME } from "./admin-constants";

export async function setSessionCookie(userData: {
  userId: string;
  name: string;
  email: string;
  image: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, encodeURIComponent(JSON.stringify(userData)), {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

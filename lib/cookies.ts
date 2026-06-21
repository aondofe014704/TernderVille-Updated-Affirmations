/**
 * Centralized cookie configuration. One place to change cookie name, expiry,
 * sameSite, secure flag. Used by /api/auth/login and /api/auth/logout.
 *
 * Server-only — uses next/headers cookies() which is unavailable client-side.
 */
import { cookies } from "next/headers";

export const AUTH_COOKIE = "tv_token";

const SEVEN_DAYS_SECONDS = 60 * 60 * 24 * 7;

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SEVEN_DAYS_SECONDS,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value;
}

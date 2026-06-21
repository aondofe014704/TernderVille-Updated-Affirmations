/**
 * Edge middleware. Runs on every request matched by `config.matcher` below.
 * Gates /admin/* routes by verifying the JWT cookie.
 *
 * Uses `jose` because Edge runtime has no Node crypto.
 * Pure JWT verification — no DB call. Fast (<5ms typical).
 *
 * Accepts both "admin" and "super_admin" roles for admin access.
 * The login page itself is excluded from the matcher.
 */
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn("JWT_SECRET not set; admin routes will be inaccessible");
}

const secret = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null;

// Inline isAdminRole — middleware bundle should be minimal,
// can't import from lib/auth.ts because that would pull in Node-only deps.
function isAdminRole(role: unknown): boolean {
  return role === "admin" || role === "super_admin";
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("tv_token")?.value;

  if (!token || !secret) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (!isAdminRole(payload.role)) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", req.nextUrl.pathname);
    const res = NextResponse.redirect(url);
    res.cookies.delete("tv_token");
    return res;
  }
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
};

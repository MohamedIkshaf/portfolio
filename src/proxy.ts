import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

/**
 * Proxy (formerly middleware) for route protection.
 *
 * Uses the edge-safe auth config (no Prisma, no bcryptjs).
 * Protects /dashboard routes and handles login redirects.
 */
export function proxy(request: import("next/server").NextRequest) {
  return auth(request as any, {} as any);
}

export const config = {
  // Only run auth proxy on protected dashboard routes and login page
  matcher: ["/dashboard/:path*", "/login"],
};

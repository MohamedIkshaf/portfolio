import type { NextAuthConfig } from "next-auth";

/**
 * Auth.js edge-compatible configuration.
 *
 * This file is imported by middleware.ts (which runs on the Edge)
 * so it must NOT import any Node.js-only modules (like bcryptjs or Prisma).
 *
 * Heavy logic (Prisma adapter, password verification) lives in auth.ts instead.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      if (isOnDashboard) {
        // Must be logged in to access dashboard
        return isLoggedIn;
      }

      if (isOnLogin && isLoggedIn) {
        // Already logged in, redirect to dashboard
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Allow all other routes
      return true;
    },
  },
  providers: [], // Providers are defined in auth.ts
};

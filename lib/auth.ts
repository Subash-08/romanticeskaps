import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { createHash } from "node:crypto";
import { findUserByEmail } from "@/lib/content-store";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const attemptWindow = 15 * 60 * 1000;
const authSecret = process.env.NEXTAUTH_SECRET || "development-only-secret-change-before-production";
const cookieVersion = createHash("sha256").update(authSecret).digest("hex").slice(0, 10);
const secureCookies = process.env.NODE_ENV === "production";

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  cookies: {
    sessionToken: {
      name: `${secureCookies ? "__Secure-" : ""}romanticeskaps.session-token.${cookieVersion}`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: secureCookies },
    },
  },
  pages: { signIn: "/admin/login" },
  providers: [CredentialsProvider({
    name: "Admin credentials",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      const email = credentials.email.trim().toLowerCase(); const now = Date.now(); const attempt = loginAttempts.get(email);
      if (attempt && attempt.resetAt > now && attempt.count >= 5) return null;
      if (attempt && attempt.resetAt <= now) loginAttempts.delete(email);
      const user = await findUserByEmail(email);
      if (!user || !(await compare(credentials.password, user.passwordHash))) { const current = loginAttempts.get(email); loginAttempts.set(email, { count: (current?.count || 0) + 1, resetAt: current?.resetAt || now + attemptWindow }); return null; }
      loginAttempts.delete(email);
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    },
  })],
  callbacks: {
    async jwt({ token, user }) { if (user) token.role = "admin"; return token; },
    async session({ session, token }) { if (session.user) session.user.role = token.role as "admin"; return session; },
  },
};

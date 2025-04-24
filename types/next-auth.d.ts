// types/next-auth.d.ts

import {JWT as DefaultJWT} from "next-auth/jwt";
import {Role, User as PrismaUser} from "@prisma/client";

declare module "next-auth" {
  /**
   * By default, NextAuth’s `Session.user` is just
   * `{ name?: string; email?: string; image?: string }`.
   * We want it to match your Prisma User (minus sensitive bits),
   * plus `isAdmin` for convenience.
   */
  interface Session extends OttenSession {
    user: {
      id:   PrismaUser["id"];
      role: Role;
      isAdmin: boolean;
    } & OttenSession["user"];
  }

  /**
   * The user object returned by your Credentials `authorize()`
   * and stored in the token. We want it to include everything
   * from PrismaUser that you expect to see (id, email, role).
   */
  interface User extends OttenUser, Pick<PrismaUser, "id" | "role"> {}
}

declare module "next-auth/jwt" {
  /**
   * The shape of your JWT token. We’ll add `id` and `role`
   * here so the `jwt` callback can put them onto it.
   */
  interface JWT extends DefaultJWT, Pick<PrismaUser, "id" | "role"> {}
}

// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT }         from "next-auth/jwt";
import { Role, User as PrismaUser }  from "@prisma/client";

declare module "next-auth" {
  interface Session extends OttenSession {
    user: {
      id:   PrismaUser["id"];
      role: Role;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser, Pick<PrismaUser, "id" | "role"> {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id:      PrismaUser["id"];
    role:    Role;
    isAdmin: boolean;
  }
}

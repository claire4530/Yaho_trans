// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "ADMIN" | "EDITOR" | "USER" | string;
    };
  }

  interface User {
    id: string;
    role?: "ADMIN" | "EDITOR" | "USER" | string;
  }
}

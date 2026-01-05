// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // 引入剛剛建立的設定檔

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


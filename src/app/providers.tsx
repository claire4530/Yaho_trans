"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 若你想預先傳入 session（例如 server fetch），可以加 session={session}
  return <SessionProvider>{children}</SessionProvider>;
}

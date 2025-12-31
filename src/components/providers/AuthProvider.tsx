// src/components/providers/AuthProvider.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  // 可視需要傳入 session prop：<SessionProvider session={session}>
  return <SessionProvider>{children}</SessionProvider>;
}

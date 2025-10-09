// app/official_web/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 永久 301 轉到網站根目錄（包含 protocol + host）
  const url = new URL('/', request.url);
  return NextResponse.redirect(url, 301);
}

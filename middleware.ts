import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. next-intl 配置
const handleI18nRouting = createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 權限驗證邏輯 ---

  // 1. 定義哪些路徑是需要保護的 (例如網址包含 /admin)
  // 如果你的後台是用 /dashboard，請改成 '/dashboard'
  const isProtectedRoute = pathname.includes('/admin');

  // 2. 取得 NextAuth 的 Token
  // 注意：本地端叫 'next-auth.session-token'，上線後(HTTPS)通常會變成 '__Secure-next-auth.session-token'
  const token = request.cookies.get('next-auth.session-token')?.value || 
                request.cookies.get('__Secure-next-auth.session-token')?.value;

  // 3. 如果去受保護路徑 且 身上沒有 Token -> 踢回登入頁
  if (isProtectedRoute && !token) {
    // 取得當前語言 (例如 /zh/admin -> zh)
    const locale = pathname.split('/')[1] || 'en';
    
    // 導回登入頁，並帶上 callbackUrl 參數 (選用，讓 NextAuth 登入後知道要跳回哪)
    const loginUrl = new URL(`/${locale}/login`, request.url);
    // loginUrl.searchParams.set('callbackUrl', request.url); // 如果你想讓使用者登入後跳回原本想去的頁面，可以打開這行

    return NextResponse.redirect(loginUrl);
  }

  // --- 權限驗證結束，交給 next-intl 處理 ---
  return handleI18nRouting(request);
}

export const config = {
  // 這裡設定要經過 middleware 的路徑
  matcher: ['/', '/(zh|en)/:path*']
};
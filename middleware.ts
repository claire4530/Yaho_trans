import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported in this application
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // If you want to use a path prefix for the default locale, set `localePrefix` to 'always'.
  // For example, '/' will be redirected to '/en'
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*']
};

1
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  
  // Redirect to refresh the page with new locale
  redirect('/');
}

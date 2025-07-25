import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import './globals.css';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
 
  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider>
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
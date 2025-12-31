// import {NextIntlClientProvider} from 'next-intl';
// import {getLocale} from 'next-intl/server';
// import Navbar from "@/src/components/layout/Navbar";
// import Footer from "@/src/components/layout/Footer";
// import './globals.css';

// export default async function RootLayout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   const locale = await getLocale();
 
//   return (
//     <html lang={locale}>
//       <body className="flex flex-col min-h-screen">
//         <NextIntlClientProvider>
//           <div className="fixed top-0 left-0 w-full z-50">
//             <Navbar />
//           </div>
//           <main className="flex-grow">
//             {children}
//           </main>
//           <Footer />
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }
// 原版layout
// app/layout.tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";


export const metadata: Metadata = {
    title: '垚鋐系統科技股份有限公司 - 官方網站',
    description: '【價值與競爭力】 垚鋐是一家「專注於高科技廠房建置及維運、系統設備整合的技術型企業」，涵蓋hook up design、Tool design、裝機、維修與耗材服務的科技型產業。',
    alternates: { canonical: 'https://www.zcstcl.com' },
    robots: { index: true, follow: true },
    openGraph: {
        title: '垚鋐系統科技股份有限公司',
        description: '【價值與競爭力】 垚鋐是一家「專注於高科技廠房建置及維運、系統設備整合的技術型企業」，涵蓋hook up design、Tool design、裝機、維修與耗材服務的科技型產業。',
        url: 'https://www.zcstcl.com',
        siteName: '垚鋐系統科技股份有限公司'
    }
};

export default async function RootLayout({
    children
    }: {
    children: React.ReactNode;
    }) {
    const locale = await getLocale();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "垚鋐系統科技股份有限公司",
        "url": "https://www.zcstcl.com",
        "logo": "https://www.zcstcl.com/logo.png"
        // 加其他欄位如 sameAs、contactPoint 等（視情況）
    };

    return (
    <div lang={locale}>
        <div className="flex flex-col min-h-screen">
        {/* JSON-LD 放在 body 也會被 Google 讀到；若要放 head，需用 next/head 或 Metadata API 的其他方法 */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
            <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
            </div>
            <main className="flex-grow">
            {children}
            </main>
            <Footer />
        </NextIntlClientProvider>
        
        </div>
    </div>
    );
}/*  */

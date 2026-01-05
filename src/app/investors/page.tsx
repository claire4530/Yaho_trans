import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import Link from "next/link"
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import LinkWrapper from "@/src/components/LinkWrapper";
import { getTranslations, setRequestLocale } from 'next-intl/server';
// 2. 加入這段：告訴 Next.js 要產生 zh 和 en 的靜態頁面
export function generateStaticParams() {
  return [
    { locale: 'zh' },
    { locale: 'en' }
  ];
}

// 3. 修正 params 的寫法 (Next.js 15 需要 await)
export default async function InvestorsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
    const { locale } = await params;

    // 5. 設定當前語言環境 (這行最關鍵，沒加會報錯)
    setRequestLocale(locale);
    const t = await getTranslations('investors');
    
    const financeList = [
        {
            title: t("month"),
            href: "/investors/month"
        }, 
        {
            title: t("year"),
            href: "/investors/year"
        },
    ];
    const shareholdersList = [
        {
            title: t("Important_information"),
            href: "/investors/message"
        },
        {
            title: t("earnings_call"),
            href: "https://mops.twse.com.tw/mops/#/web/home"
        },
        {
            title: t("shareholders_meeting"),
            href: "/investors/meeting"
        },
        {
            title: t("shareholders_meeting_report"),
            href: "/investors/annual_report"
        },
        {
            title: t("company_structure"),
            href: "/investors/structure"
        },
        {
            title: t("dividend_information"),
            href: "/investors/dividend"
        },
        {
            title: t("service_window"),
            href: "/investors/windows"
        },
    ];
    
  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/investors/1.jpg" 
                    alt="Example Image" 
                    layout="fill"
                    objectFit="cover"/>
        </div>
        <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
                        {t("homepage")}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/investors" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 投資人專區標題 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("title")}
        </div>
        {/* 財務資訊專區內容 */}
        <div className="flex flex-col md:flex-row mt-6 lg:mt-15 justify-center">
            {/* 左側圖片 */}
            <SlideInFromLeft delay={0.5}>
                <div className="h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] w-[75vw] md:w-[35vw] overflow-hidden mx-auto">
                    <img src="/investors/2.jpg" alt="Front Page" className="w-full h-full object-cover rounded-lg"/>
                </div>
            </SlideInFromLeft>
            {/* 文字區 */}
            <ZoomIn delay={0.5}>
                <div className="flex flex-col mx-16">
                    <div className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#375978] mt-6 md:mt-0 lg:mt-4">
                        {t("finance")}
                    </div>
                    <div className="space-y-10 lg:space-y-11 md:w-[300px] lg:w-[350px] xl:w-[500px] mt-10">
                        {financeList.map((item, index) => (
                            <div key={index} className="border-b border-[#375978] pb-1 lg:pb-3 xl:pb-5 hover:scale-105 transition-transform duration-300">
                                <LinkWrapper href={item.href} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">•</span>
                                        <span className="text-sm sm:text-base xl:text-lg text-gray-800">{item.title}</span>
                                    </div>
                                    <span className="text-[#375978] text-lg">{'>'}</span>
                                </LinkWrapper>
                            </div>
                        ))}
                    </div>
                </div>                            
            </ZoomIn>
        </div>
         {/* 股東專欄內容 */}
        <div className="flex flex-col md:flex-row mt-15 justify-center">
            {/* sm以下顯示 */}
            <SlideInFromLeft delay={0.5}>
                <div className="flex md:hidden h-[150px] w-[75vw] overflow-hidden mx-auto">
                    <img src="/investors/3.jpg" alt="Front Page" className="w-full h-full object-cover rounded-lg"/>
                </div>
            </SlideInFromLeft>
            {/* 文字區 */}
            <ZoomIn delay={0.5}>
                <div className="flex flex-col mx-16 md:mx-0 md:mr-10 lg:mr-15 xl:mr-20">
                    <div className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#375978] mt-6 md:mt-0 xl:mt-4">
                        {t("shareholders")}
                    </div>
                    <div className="space-y-10 lg:space-y-11 md:w-[300px] lg:w-[350px] xl:w-[600px] mt-10">
                        {shareholdersList.map((item, index) => (
                            <div key={index} className="border-b border-[#375978] pb-1 lg:pb-3 xl:pb-5 hover:scale-105 transition-transform duration-300">
                                <LinkWrapper href={item.href} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">•</span>
                                        <span className="text-sm sm:text-base xl:text-lg text-gray-800">{item.title}</span>
                                    </div>
                                    <span className="text-[#375978] text-lg">{'>'}</span>
                                </LinkWrapper>
                            </div>
                        ))}
                    </div>
                </div>                            
            </ZoomIn>
            {/* 右側圖片 */}
            <SlideInFromLeft delay={0.5}>
                <div className="hidden md:flex h-[550px] lg:h-[600px] xl:h-[700px] w-[40vw] lg:w-[35vw] xl:w-[30vw] overflow-hidden mx-auto ">
                    <img src="/investors/3.jpg" alt="Front Page" className="w-full h-full object-cover rounded-lg"/>
                </div>
            </SlideInFromLeft>
        </div>
    </div>
  );            
}
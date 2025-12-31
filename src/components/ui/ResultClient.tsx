// app/[locale]/services/result/ResultClient.tsx
"use client";

import React from "react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link"
import Image from "next/image";

// 定義 Props
interface Props {
  partners: any[]; // 資料庫傳來的合作廠商
  // projects?: any[]; // 如果未來要啟用工程實績列表，再加這個
}

export default function ResultClient({ partners = [] }: Props) {
    const t = useTranslations("result");
    const locale = useLocale();

    return (
        <div className="overflow-x-hidden">
            {/* Banner 區塊 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image 
                    src="/services/result/1.jpg" 
                    alt="Services Banner" 
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* 麵包屑 */}
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
                            <Link href="/services" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/services/result" className="text-sm sm:text-base font-semibold">{t("result")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("result")}
            </div>

            {/* (原本的工程實績篩選與列表被你註解掉了，如果要啟用可以放這裡) */}
            
            {/* 合作廠商列表 (文字牆) */}
            <div className="p-6 max-w-7xl mx-auto my-10">
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                    {partners.length === 0 ? (
                        <div className="text-gray-400">Loading partners...</div>
                    ) : (
                        partners.map((partner) => (
                            <span
                                key={partner.id}
                                className="
                                    text-[#375978] font-semibold text-lg sm:text-xl 
                                    transition-all duration-300
                                    cursor-default
                                    hover:text-blue-500 hover:scale-110
                                    motion-safe:animate-float
                                "
                            >
                                {/* 根據語言顯示對應的名稱 */}
                                {partner.name?.[locale] || partner.name?.['zh']}
                            </span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );            
}
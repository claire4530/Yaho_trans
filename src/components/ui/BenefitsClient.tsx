// app/[locale]/career/benefits/BenefitsClient.tsx
"use client";

import React from "react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link"
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";

// 定義接收的資料型別
interface Props {
  benefits: any[];
}

export default function BenefitsClient({ benefits = [] }: Props) {
    const t = useTranslations("career");
    const locale = useLocale();

    return (
        <div className="overflow-x-hidden">
            {/* Banner 區塊 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image 
                    src="/career/1.jpg" 
                    alt="Career Banner" 
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
                            <Link href="/career" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/career/benefits" className="text-sm sm:text-base font-semibold">{t("benefits")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("benefits")}
            </div>
            
            {/* 福利列表區塊 */}
            <div className="flex gap-10 justify-center items-center flex-wrap p-4 md:p-8">
                {benefits.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">目前沒有相關資料</div>
                ) : (
                    <ZoomIn delay={0.2}>
                        <div className="flex gap-14 my-10 flex-wrap justify-center">
                            {benefits.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative w-[300px] h-[300px] md:w-[600px] md:h-[300px] lg:w-[400px] lg:h-[380px] xl:w-[550px] xl:h-[350px] 2xl:w-[650px] 2xl:h-[350px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden group cursor-pointer"
                                >
                                    {/* 圖片容器 - Hover 時上移 */}
                                    <div className="absolute inset-0 group-hover:-translate-y-[150px] transition-transform duration-600">
                                        <Image 
                                            // 如果有上傳圖片就用，沒有就用預設圖
                                            src={item.image_url || "/career/benefits/1.svg"} 
                                            alt={item.content?.[locale] || "Benefit"} 
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* 浮層文字 - Hover 時從下面滑上來 */}
                                    <div className="absolute bottom-0 left-0 w-full h-[150px] bg-white flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-600 px-6">
                                        <span className="leading-7 md:leading-8 text-sm md:text-base font-bold text-[#375978] whitespace-pre-wrap text-center">
                                            {/* 資料庫內容 */}
                                            {item.content?.[locale]}
                                        </span>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </ZoomIn> 
                )}
            </div>
        </div>
    );            
}
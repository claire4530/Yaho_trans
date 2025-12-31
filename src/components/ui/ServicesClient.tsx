// app/[locale]/services/project/ServicesClient.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link"
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";

interface Props {
  services: any[];
}

export default function ServicesClient({ services = [] }: Props) {
    const t = useTranslations("services");
    const router = useRouter();
    const locale = useLocale();

    return (
        <div className="overflow-x-hidden">
             {/* Banner 區塊 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image src="/services/project/1.jpg" alt="Services Banner" fill className="object-cover" priority/>
            </div>
            
            <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
                            {/* 首頁 */}
                            {t("homepage")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            {/* 產品服務 */}
                            <Link href="/services" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            {/* 服務項目 */}
                            <Link href="/services/project" className="text-sm sm:text-base font-semibold">{t("project.title")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("project.title")}
            </div>
            
            {/* 列表區塊 */}
            <div className="flex gap-10 justify-center items-center flex-wrap p-4 md:p-8">
                <ZoomIn delay={0.2}>
                    <div className="flex gap-14 my-10 flex-wrap justify-center">
                        {services.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-[300px] h-[300px] md:w-[600px] md:h-[300px] lg:w-[400px] lg:h-[380px] xl:w-[550px] xl:h-[350px] 2xl:w-[650px] 2xl:h-[350px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden group cursor-pointer"
                            // 點擊後跳轉到動態路由：/services/project/[slug]
                            onClick={() => router.push(`/services/project/${item.slug}`)}
                        >
                            {/* 圖片容器 */}
                            <div className="absolute inset-0 group-hover:-translate-y-[150px] transition-transform duration-600">
                                <Image 
                                    src={item.cover_image || "/placeholder.jpg"} 
                                    alt={item.name?.[locale]} 
                                    fill 
                                    className="object-cover" 
                                />
                                {/* 標題 (未 Hover 時顯示) */}
                                <div className="absolute bottom-10 left-4 z-10">
                                    <span className="bg-black/30 text-white font-bold text-lg md:text-2xl xl:text-3xl rounded px-2">
                                        {item.name?.[locale]}
                                    </span>
                                </div>
                            </div>
                            
                            {/* 浮層 (Hover 時顯示簡短介紹) */}
                            <div className="absolute bottom-0 left-0 w-full h-[150px] bg-white flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-600">
                                <span className="px-4 leading-7 md:px-10 md:leading-8 text-sm md:text-base font-bold text-[#375978] whitespace-pre-line line-clamp-3">
                                    {/* 這裡顯示簡短介紹，或者你可以多開一個 short_desc 欄位 */}
                                    {item.summary?.[locale] || item.name?.[locale]}
                                </span>
                            </div>
                        </div>
                        ))}
                    </div>
                </ZoomIn> 
            </div>
        </div>
    );            
}
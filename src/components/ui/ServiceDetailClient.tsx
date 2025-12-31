// app/[locale]/services/project/[slug]/ServiceDetailClient.tsx
"use client";

import React from "react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link"
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface Props {
  service: any; // 單一服務項目的資料
}

export default function ServiceDetailClient({ service }: Props) {
    const t = useTranslations("services");
    const locale = useLocale();

    // 如果沒有輪播圖，就用封面圖當第一張
    const carouselImages = (service.images && service.images.length > 0) 
        ? service.images 
        : [service.cover_image];

    return (
        <div className="overflow-x-hidden">
            {/* Banner */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image src="/services/project/1.jpg" alt="Banner" fill className="object-cover" priority/>
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
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-sm sm:text-base font-semibold">
                            {/* Gas Chemical */}
                            {service.name?.[locale]}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>
            {/* 標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {service.name?.[locale]}
            </div>

            {/* 內容區塊：左圖右文 */}
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start p-4 md:p-8">
                
                {/* 左邊 Carousel */}
                <div className="w-full lg:w-1/2 px-8 lg:px-2 xl:px-20 mx-10 xl:mx-4">
                    <ZoomIn delay={0.2}>
                        <Carousel className="w-full">
                            <CarouselContent>
                                {carouselImages.map((src: string, index: number) => (
                                <CarouselItem key={index} className="flex justify-center">
                                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px]">
                                        <Image
                                            src={src}
                                            alt={`${service.name?.[locale]} ${index + 1}`}
                                            fill
                                            className="object-contain rounded-lg"
                                        />
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </ZoomIn>
                </div>

                {/* 右邊說明文字 */}
                <ZoomIn delay={0.2}>
                    <div className="w-full flex flex-col justify-center px-8 lg:px-0">
                        <h2 className="hidden sm:flex text-2xl font-bold text-[#375978] mb-4">
                            {service.name?.[locale]}
                        </h2>
                        <div className="text-sm sm:text-base leading-7 text-gray-700 whitespace-pre-line">
                            {/* 詳細介紹內容 */}
                            {service.description?.[locale] || "Content is coming soon..."}
                        </div>
                    </div>
                </ZoomIn>
            </div>
        </div>
    );            
}
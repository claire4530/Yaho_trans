"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import Link from "next/link"
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function IntroductionPage() {
    const t = useTranslations("services");
    const images = [
        "/services/project/design/1.png",
        "/services/project/design/2.png",
        "/services/project/design/3.jpg",
        "/services/project/design/4.png",
        "/services/project/design/5.png",
        "/services/project/design/6.png",
        "/services/project/design/7.png",
        "/services/project/design/8.jpg",
        "/services/project/design/9.png"
    ]

    return (
        <div className="overflow-x-hidden">
            {/* 關於垚鋐 簡介頁首圖片 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image src="/services/project/1.jpg" 
                    alt="Front Page" 
                    layout="fill"
                    objectFit="cover"/>
            </div>
            {/* 網站導覽列 */}
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
                        <BreadcrumbLink asChild>
                            {/* 廠務系統設計 */}
                            <Link href="/services/project/SystemDesign" className="text-sm sm:text-base font-semibold">{t("project.system design")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 廠務系統設計標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("project.system design")}
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start p-4 md:p-8">
                {/* 左邊 Carousel */}
                <div className="w-full lg:w-1/2 px-8 lg:px-2 xl:px-20 mx-10 xl:mx-4">
                    <ZoomIn delay={0.2}>
                        <Carousel className="w-full">
                            <CarouselContent>
                                {images.map((src, index) => (
                                <CarouselItem key={index} className="flex justify-center">
                                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] ">
                                    <Image
                                        src={src}
                                        alt={`Design ${index + 1}`}
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
                        <h2 className="hidden sm:flex text-2xl font-bold text-[#375978] mb-4">{t("project.system design")}</h2>
                        <p className="text-sm sm:text-base leading-7 text-gray-700 whitespace-pre-line">
                            <strong>{t("project background")} :</strong>{"\n"}{t("project.system design description")}
                        </p>
                        <p className="text-sm sm:text-base leading-8 text-gray-700 mt-4 whitespace-pre-line">
                            <strong>{t("project.system design Comments")}{"\n"}</strong>
                            {t("project.system design Comments list")}
                            <strong>{t("project.system design Mainframe")}{"\n"}</strong>
                            {t("project.system design Mainframe list")}
                        </p>
                    </div>
                </ZoomIn>
            </div>
        </div>
    );            
}

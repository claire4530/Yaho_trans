"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

const serviceItems = [
    {
        key: "benefits1",
        image: "/career/benefits/1.svg",
    },
    {
        key: "benefits2",
        image: "/career/benefits/2.svg",
    },
    {
        key: "benefits3",
        image: "/career/benefits/3.svg",
    },
    {
        key: "benefits4",
        image: "/career/benefits/4.svg",
    },
    {
        key: "benefits5",
        image: "/career/benefits/5.svg",
    },
    {
        key: "benefits6",
        image: "/career/benefits/6.svg",
    },
    {
        key: "benefits7",
        image: "/career/benefits/7.svg",
    },
    {
        key: "benefits8",
        image: "/career/benefits/8.svg",
    },
];

export default function IntroductionPage() {
    const t = useTranslations("career");
    const router = useRouter();
    return (
        <div className="overflow-x-hidden">
            {/* 關於垚鋐 簡介頁首圖片 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image src="/career/1.jpg" 
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
                            {/* 人力資源 */}
                            <Link href="/career" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            {/* 員工福利 */}
                            <Link href="/career/benefits" className="text-sm sm:text-base font-semibold">{t("benefits")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 員工福利標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("benefits")}
            </div>
            
            <div className="flex gap-10 justify-center items-center flex-wrap p-4 md:p-8">
                <ZoomIn delay={0.2}>
                    <div className="flex gap-14 my-10 flex-wrap justify-center">
                        {serviceItems.map(({ key, image }) => (
                        <div
                            key={key}
                            className="relative w-[300px] h-[300px] md:w-[600px] md:h-[300px] lg:w-[400px] lg:h-[380px] xl:w-[550px] xl:h-[350px] 2xl:w-[650px] 2xl:h-[350px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden
                                    group cursor-pointer"
                        >
                            {/* 圖片容器 */}
                            <div className="absolute inset-0 group-hover:-translate-y-[150px] transition-transform duration-600">
                                <Image src={image} alt={t(key)} layout="fill" objectFit="cover" />
                                {/* 標題 */}
                                {/* <div className="absolute bottom-10 left-4 z-10">
                                    <span className="text-white font-bold text-lg md:text-2xl xl:text-3xl p-8 rounded">
                                    {t(`project.${key}`)}
                                    </span>
                                </div> */}
                            </div>
                            {/* 浮層 */}
                            <div
                            className="absolute bottom-0 left-0 w-full h-[150px] bg-white flex items-center justify-center
                                        translate-y-full group-hover:translate-y-0 transition-transform duration-600"
                            >
                            <span className="px-4 leading-7 md:px-10 md:leading-8 text-sm md:text-base font-bold text-[#375978] whitespace-pre-line">
                                {t(key)}
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

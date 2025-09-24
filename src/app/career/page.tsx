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
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";

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
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 人力資源標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("title")}
            </div>
            <div className="flex px-6 sm:p-6 md:p-8 justify-center items-center"> 
                {/* 員工福利 */}
                <div className="hidden md:flex gap-10 my-10 flex-wrap justify-center items-center">
                    {/* 卡片 */}
                    <SlideInFromLeft delay={0.3}>
                        <div
                            className="relative md:w-[600px] md:h-[400px] 2xl:w-[700px] 2xl:h-[450px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden
                                    group cursor-pointer"
                            onClick={() => router.push("/career/benefits")} // 點擊導向頁面
                        >
                            {/* 圖片容器 - 會隨 hover 上移 */}
                            <div className="absolute inset-0 group-hover:-translate-y-[150px] transition-transform duration-600">
                                <Image src="/career/benefits.svg" alt="Service Image" layout="fill" objectFit="cover" />

                                {/* 主文字 - 跟著圖片一起移動 */}
                                <div className="absolute bottom-10 left-4 z-10">
                                    <span className="text-white font-bold text-3xl p-8 rounded">
                                        {t("benefits")}
                                    </span>
                                </div>
                            </div>

                            {/* 藍色浮層 */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-[150px] bg-white flex items-center justify-center
                                            translate-y-full group-hover:translate-y-0 transition-transform duration-600"
                            >
                                <span className="px-10 leading-8 text-base font-bold text-[#375978]">{t("benefits-description")}</span>
                            </div>
                        </div>
                    </SlideInFromLeft>
                    {/* 徵才資訊 */}
                    <SlideInFromLeft delay={0.6}>
                        <div
                            className="relative md:w-[600px] md:h-[400px] 2xl:w-[700px] 2xl:h-[450px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden
                                        group cursor-pointer"
                            onClick={() => router.push("/career/jobs")} // 點擊導向頁面
                        >
                            {/* 圖片容器 - 會隨 hover 上移 */}
                            <div className="absolute inset-0 group-hover:-translate-y-[150px] transition-transform duration-600">
                                <Image src="/career/jobs.svg" alt="Service Image" layout="fill" objectFit="cover" />
                                
                                {/* 標題 - 跟著圖片一起移動 */}
                                <div className="absolute bottom-10 left-4 z-10">
                                    <span className="text-white font-bold text-3xl p-8 rounded">
                                        {t("jobs")}
                                    </span>
                                </div>
                            </div>

                            {/* 藍色浮層 */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-[150px] bg-white flex items-center justify-center
                                            translate-y-full group-hover:translate-y-0 transition-transform duration-600"
                            >

                                <span className="px-10 leading-8 text-base font-bold text-[#375978]">{t("jobs-description")}</span>
                            </div>
                        </div>
                    </SlideInFromLeft>
                </div>
                {/* md以下 */}
                <div className="flex md:hidden my-10 flex-wrap w-full justify-center gap-10">
                    {/* 員工福利 */}
                    <div
                        className="relative w-[600px] h-[400px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden
                                group cursor-pointer"
                        onClick={() => router.push("/career/benefits")} // 點擊導向頁面
                    >
                        {/* 圖片 */}
                        <Image src="/career/benefits.svg" alt="Service Image" width={400} height={300} className="w-full h-[200px] object-cover rounded-t-xl" />
                        {/* 主文字 */}
                        <div className="p-8 flex flex-col gap-4">
                            <span className="font-bold text-xl">
                                {t("benefits")}
                            </span>
                            <p className="text-sm text-gray-500">{t("benefits-description")}</p>
                        </div>
                    </div>
                    {/* 徵才資訊 */}
                    <div
                        className="relative w-[600px] h-[400px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden
                                group cursor-pointer"
                        onClick={() => router.push("/career/jobs")} // 點擊導向頁面
                    >
                        {/* 圖片 */}
                        <Image src="/career/jobs.svg" alt="Service Image" width={400} height={300} className="w-full h-[200px] object-cover rounded-t-xl" />
                        {/* 主文字 */}
                        <div className="p-8 flex flex-col gap-4">
                            <span className="font-bold text-xl">
                                {t("jobs")}
                            </span>
                            <p className="text-sm text-gray-500">{t("jobs-description")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );            
}

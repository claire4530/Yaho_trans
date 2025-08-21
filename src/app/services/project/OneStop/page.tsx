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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";

export default function IntroductionPage() {
    const t = useTranslations("services");
    const images = [
        "/services/project/AMHS/1.png",
        "/services/project/AMHS/2.png",
        "/services/project/AMHS/3.jpg",
        "/services/project/AMHS/4.png",
        "/services/project/AMHS/5.jpg",
        "/services/project/AMHS/6.png",
        "/services/project/AMHS/7.png",
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
                            {/* 一條龍裝機服務 */}
                            <Link href="/services/project/OneStop" className="text-sm sm:text-base font-semibold">{t("project.OneStop")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 一條龍裝機服務標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("project.OneStop")}
            </div>
            {/* 一條龍裝機服務副標題 */}
            <ZoomIn delay={0.3}>
                <p className="px-8 sm:px-0 my-20 text-center font-bold text-base md:text-lg lg:text-xl whitespace-pre-line">{t("project.OneStop description")}</p>
            </ZoomIn>
            <ZoomIn delay={0.6}>
                <div className="flex gap-2 justify-center m-6 flex-wrap">
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <Image
                            src="/services/project/OneStop/1.jpg"
                            alt="工程服務"
                            width={400}
                            height={300}
                            className="w-full h-[200px] object-cover rounded-t-xl"
                        />
                        <CardContent className="px-4">
                            <h3 className="text-lg font-semibold py-0 lg:py-2">{t("project.OneStop1")}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{t("project.OneStop1 description")}</p>
                        </CardContent>
                    </Card>
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <Image
                            src="/services/project/OneStop/2.jpg"
                            alt="設計服務"
                            width={400}
                            height={300}
                            className="w-full h-[200px] object-cover rounded-t-xl"
                        />
                        <CardContent className="px-4">
                            <h3 className="text-lg font-semibold py-0 lg:py-2">{t("project.OneStop2")}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{t("project.OneStop2 description")}</p>
                        </CardContent>
                    </Card>
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <Image
                            src="/services/project/OneStop/3.jpg"
                            alt="設備組裝"
                            width={400}
                            height={300}
                            className="w-full h-[200px] object-cover rounded-t-xl"
                        />
                        <CardContent className="px-4">
                            <h3 className="text-lg font-semibold py-0 lg:py-2">{t("project.OneStop3")}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{t("project.OneStop3 description")}</p>
                        </CardContent>
                    </Card>
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <Image
                            src="/services/project/OneStop/4.png"
                            alt="高效整合"
                            width={400}
                            height={300}
                            className="w-full h-[200px] object-cover rounded-t-xl"
                        />
                        <CardContent className="px-4">
                            <h3 className="text-lg font-semibold py-0 lg:py-2">{t("project.OneStop4")}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{t("project.OneStop4 description")}</p>
                        </CardContent>
                    </Card>
                </div>
            </ZoomIn>
            {/* As is / To Be */}
            <div className="flex flex-col justify-center items-center my-20">
                {/* 卡片容器 */}
                <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 justify-center items-center w-full max-w-6xl">
                    {/* As Is 卡片 */}
                    <SlideInFromLeft delay={0.3}>
                        <div className="w-[280px] h-[230px] md:w-[500px] md:h-[260px] rounded-lg border-0 shadow-xl transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-[#375978] to-[#3498db] text-white">
                            <div className="p-8 sm:p-10 h-full flex flex-col">
                                <h3 className="text-xl sm:text-3xl font-semibold">{t("project.Asis")}</h3>
                                <p className="text-sm sm:text-lg mt-6 whitespace-pre-line flex-grow sm:tracking-wide leading-6 sm:leading-7">
                                <strong>{t("project.OneStop1")}:</strong> {t("project.Asis description1")}{"\n"}
                                <strong>{t("project.OneStop2")}:</strong> {t("project.Asis description2")}
                                </p>
                            </div>
                        </div>
                    </SlideInFromLeft>

                    {/* 中間箭頭 (桌面版) */}
                    <SlideInFromLeft delay={0.5}>
                        <div className="hidden xl:flex ml-9">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center shadow-md" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </SlideInFromLeft>
                    <SlideInFromLeft delay={0.6}>
                    {/* 中間箭頭 (行動裝置版) */}
                    <div className="flex xl:hidden flex-col items-center justify-center mb-9">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-b from-blue-500 to-orange-500 flex items-center justify-center shadow-md" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                        </div>
                    </div>
                    </SlideInFromLeft>

                    {/* To Be 卡片 */}
                    <SlideInFromLeft delay={0.8}>
                        <div className="w-[280px] h-[230px] md:w-[500px] md:h-[260px] rounded-lg border-0 shadow-xl transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-[#FDC830] to-[#F37335] text-white">
                            <div className="p-8 sm:p-10 h-full flex flex-col">
                                <h3 className="text-xl sm:text-3xl font-semibold">{t("project.Tobe")}</h3>
                                <ul className="text-sm sm:text-lg mt-6 ml-2 list-disc list-inside space-y-2 flex-grow">
                                <li>{t("project.Tobe description1")}</li>
                                <li>{t("project.Tobe description2")}</li>
                                <li>{t("project.Tobe description3")}</li>
                                </ul>
                            </div>
                        </div>
                    </SlideInFromLeft>
                </div>

                {/* 行動呼籲按鈕區塊 */}
                <ZoomIn delay={0.8}>
                    <div className="mt-16 text-center">
                        <h4 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">{t("project.OneStop ready")}</h4>
                        <Link href="/about/locations">
                            <button className="px-10 py-4 bg-gradient-to-r from-[#375978] to-[#F3981B] text-white text-md sm:text-xl font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300">
                                {t("project.OneStop contact")}
                            </button>
                        </Link>
                    </div>
                </ZoomIn>
            </div>            
        </div>
    );            
}
// app/[locale]/services/project/one-stop/OneStopClient.tsx
"use client";

import React from "react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import Link from "next/link"
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  service: any; // 從資料庫傳來的資料
}

export default function OneStopClient({ service }: Props) {
    const t = useTranslations("services");

    // 從資料庫取出圖片陣列，如果沒有則使用空陣列
    // 我們約定：images[0]=工程, images[1]=設計, images[2]=設備, images[3]=整合
    const dbImages = service?.images || [];

    return (
        <div className="overflow-x-hidden">
            {/* Banner (使用資料庫的封面圖) */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image 
                    src={service?.cover_image || "/services/project/1.jpg"} 
                    alt="One Stop Banner" 
                    fill 
                    className="object-cover"
                />
            </div>

            {/* 麵包屑 */}
            <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
                <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="/">{t("homepage")}</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="/services">{t("title")}</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="/services/project">{t("project.title")}</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        {/* 這裡使用資料庫的名稱 */}
                        <BreadcrumbLink className="font-semibold text-gray-900">{t("project.OneStop")}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("project.OneStop")}
            </div>

            {/* 描述 */}
            <ZoomIn delay={0.3}>
                <p className="px-8 sm:px-0 my-20 text-center font-bold text-base md:text-lg lg:text-xl whitespace-pre-line">
                    {t("project.OneStop description")}
                </p>
            </ZoomIn>

            {/* 四張卡片區塊 */}
            <ZoomIn delay={0.6}>
                <div className="flex gap-2 justify-center m-6 flex-wrap">
                    {/* 卡片 1: 工程服務 */}
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={dbImages[0] || "/services/project/OneStop/1.jpg"}
                                alt="工程服務"
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>
                        <CardContent className="px-6">
                            <h3 className="text-xl font-semibold py-4">{t("project.OneStop1")}</h3>
                            <p className="text-base text-gray-700 line-clamp-2">{t("project.OneStop1 description")}</p>
                        </CardContent>
                    </Card>

                    {/* 卡片 2: 設計服務 */}
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={dbImages[1] || "/services/project/OneStop/2.jpg"}
                                alt="設計服務"
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>
                        <CardContent className="px-6">
                            <h3 className="text-xl font-semibold py-4">{t("project.OneStop2")}</h3>
                            <p className="text-base text-gray-700 line-clamp-2">{t("project.OneStop2 description")}</p>
                        </CardContent>
                    </Card>

                    {/* 卡片 3: 設備組裝 */}
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={dbImages[2] || "/services/project/OneStop/3.jpg"}
                                alt="設備組裝"
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>
                        <CardContent className="px-6">
                            <h3 className="text-xl font-semibold py-4">{t("project.OneStop3")}</h3>
                            <p className="text-base text-gray-700 line-clamp-2">{t("project.OneStop3 description")}</p>
                        </CardContent>
                    </Card>

                    {/* 卡片 4: 高效整合 */}
                    <Card className="w-[300px] pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg hover:scale-103 transition-transform duration-300">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={dbImages[3] || "/services/project/OneStop/4.png"}
                                alt="高效整合"
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>
                        <CardContent className="px-6">
                            <h3 className="text-xl font-semibold py-4">{t("project.OneStop4")}</h3>
                            <p className="text-base text-gray-700 line-clamp-2">{t("project.OneStop4 description")}</p>
                        </CardContent>
                    </Card>
                </div>
            </ZoomIn>

            {/* 行動呼籲 */}
            <ZoomIn delay={0.8}>
                <div className="mt-16 text-center mb-20">
                    <h4 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">{t("project.OneStop ready")}</h4>
                    <Link href="/about/locations">
                        <button className="px-10 py-4 bg-gradient-to-r from-[#375978] to-[#F3981B] text-white text-md sm:text-xl font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
                            {t("project.OneStop contact")}
                        </button>
                    </Link>
                </div>
            </ZoomIn>
        </div>
    );            
}
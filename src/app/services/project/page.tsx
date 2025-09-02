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
    key: "system design",
    image: "/services/project/design/7.png",
    link: "/services/project/SystemDesign",
  },
  {
    key: "Gas Chemical",
    image: "/services/project/gasChemical/1.png",
    link: "/services/project/GasChemical",
  },
  {
    key: "AMHS",
    image: "/services/project/AMHS/1.png",
    link: "/services/project/AMHS",
  },
  {
    key: "AMAT",
    image: "/services/project/AMAT/1.png",
    link: "/services/project/AMAT",
  },
  {
    key: "SMIFPOD",
    image: "/services/project/SMIFPOD/1.png",
    link: "/services/project/SMIFPOD",
  },
  {
    key: "Parts",
    image: "/services/project/Parts/1.png",
    link: "/services/project/Parts",
  },
  {
    key: "OneStop",
    image: "/services/project/OneStop/4.png",
    link: "/services/project/OneStop",
  },
];

export default function IntroductionPage() {
    const t = useTranslations("services");
    const router = useRouter();
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
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 公司簡介標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("project.title")}
            </div>
            
            <div className="flex gap-10 justify-center items-center flex-wrap p-4 md:p-8">
                <ZoomIn delay={0.2}>
                    <div className="flex gap-14 my-10 flex-wrap justify-center">
                        {serviceItems.map(({ key, image, link }) => (
                        <div
                            key={key}
                            className="relative w-[300px] h-[300px] md:w-[600px] md:h-[300px] lg:w-[400px] lg:h-[380px] xl:w-[550px] xl:h-[350px] 2xl:w-[650px] 2xl:h-[350px] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden
                                    group cursor-pointer"
                            onClick={() => router.push(link)}
                        >
                            {/* 圖片容器 */}
                            <div className="absolute inset-0 group-hover:-translate-y-[150px] transition-transform duration-600">
                                <Image src={image} alt={t(`project.${key}`)} layout="fill" objectFit="cover" />
                                {/* 標題 */}
                                <div className="absolute bottom-10 left-4 z-10">
                                    <span className="text-white font-bold text-lg md:text-2xl xl:text-3xl p-8 rounded">
                                    {t(`project.${key}`)}
                                    </span>
                                </div>
                            </div>
                            {/* 浮層 */}
                            <div
                            className="absolute bottom-0 left-0 w-full h-[150px] bg-white flex items-center justify-center
                                        translate-y-full group-hover:translate-y-0 transition-transform duration-600"
                            >
                            <span className="px-4 leading-7 md:px-10 md:leading-8 text-sm md:text-base font-bold text-[#375978] whitespace-pre-line">
                                {t(`project.${key} description`)}
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

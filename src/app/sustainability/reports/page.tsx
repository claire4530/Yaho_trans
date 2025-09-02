"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import Link from "next/link"
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import { CloudUpload } from "lucide-react";

export default function OrganizationPage() {
    const t = useTranslations("investors");
    const revenueReports = [
    { year: 2025, url: "/pdf/2025年永續報告書.pdf" },
    { year: 2024, url: "/pdf/2024年永續報告書.pdf" },
    { year: 2023, url: "/pdf/2023年永續報告書.pdf" },
    { year: 2022, url: "/pdf/2022年永續報告書.pdf" },
    { year: 2021, url: "/pdf/2021年永續報告書.pdf" },
    { year: 2020, url: "/pdf/2020年永續報告書.pdf" },
    ];

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/sustainability/4.png" 
                    alt="Example Image" 
                    layout="fill"
                    objectFit="cover"/>
        </div>
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
                        <Link href="/sustainability" className="text-sm sm:text-base font-semibold">企業永續</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/sustainability/reports" className="text-sm sm:text-base font-semibold">永續報告書下載</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>
        
        <SlideInFromLeft delay={0.3}>
            {/* 標題 */}
            <div className="flex flex-col text-center py-6">
                {/* 英文名稱 */}
                <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">Sustainability Reports</h2>
                {/* 下畫線 */}
                <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
                {/* 永續報告書下載 */}
                <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
                    永續報告書下載
                </h3>
            </div>

            {/* 說明段落 */}
            <div className="text-sm md:text-base px-8 pb-10 leading-8 mx-auto max-w-3xl">
                本公司持續推動企業社會責任，從工作環境、環境保護、公司治理、社會參與、客戶服務與供應鏈管理等面向積極落實。
                透過提供具競爭力的薪酬與健全的人力發展、遵循環保規範、協助打造綠色產能、提升財務透明度，以及提供專業高效的服務，
                支持客戶與合作夥伴的永續發展。同時，公司以「成為幸福企業」為目標，營造良好的工作與學習環境，倡導工作與生活平衡，
                凝聚員工向心力並提升產業競爭力，期望成為企業永續經營的典範。(範例)
            </div>
        </SlideInFromLeft>

        {/* 表格式區塊 */}
        <ZoomIn delay={0.3}>
            <div className="lg:mx-40 px-6 md:px-12 pb-16">
                {/* Header */}
                <div className="grid grid-cols-2 font-semibold text-gray-700 border-b-2 border-gray-400 pb-3 mb-8">
                    <span className="mx-5">年份</span>
                    <span className="mx-5 text-right">歷年報告書下載</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    {revenueReports.map((report, i) => (
                        <div
                        key={i}
                        className={`grid grid-cols-2 items-center px-4 py-4 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition-colors duration-200 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                        >
                            {/* 左邊：年份 + 標題 */}
                            <span className="font-medium">
                                {report.year} 永續報告書
                            </span>

                            {/* 右邊：PDF 按鈕 */}
                            <div className="flex justify-end">
                                <a
                                href={report.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[#375978] text-white px-8 py-2 rounded-lg text-sm hover:bg-[#F3981B] transition-colors duration-300"
                                >
                                    <CloudUpload size={20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ZoomIn>
    </div>
  );            
}
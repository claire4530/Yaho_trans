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
import LinkWrapper from "@/src/components/LinkWrapper";
import { CloudUpload } from "lucide-react";

export default function OrganizationPage() {
    const t = useTranslations("investors");
    const revenueReports = [
    { year: 2025, url: "/pdf/2025.pdf" },
    { year: 2024, url: "/pdf/2024.pdf" },
    { year: 2023, url: "/pdf/2023.pdf" },
    { year: 2022, url: "/pdf/2022.pdf" },
    { year: 2021, url: "/pdf/2021.pdf" },
    { year: 2020, url: "/pdf/2020.pdf" },
    ];

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/investors/2.jpg" 
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
                        <Link href="/investors" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/investors/year" className="text-sm sm:text-base font-semibold">{t("year")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 財務報告標題 */}
        <div className="flex flex-col text-center py-6">
            {/* 英文名稱 */}
            <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">Financial Reports</h2>
            {/* 下畫線 */}
            <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
            {/* 財務報告公告 */}
            <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
                {t("year")}
            </h3>
        </div>
        {/* 表格式區塊 */}
        <div className="lg:mx-40 px-6 md:px-12 pb-16">
            {/* Header */}
            <div className="grid grid-cols-2 font-semibold text-gray-700 border-b-2 border-gray-400 pb-3 mb-8">
                <span className="mx-5">年分</span>
                <span className="mx-5 text-right">財務報告</span>
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
                            {report.year} 年度財務報告
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
    </div>
  );            
}
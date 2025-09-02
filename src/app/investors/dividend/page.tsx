"use client";
import { useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function OrganizationPage() {
    const t = useTranslations("investors");

    // 假資料（可改成 API 資料）
    const dividends = [
        { year: "2024", cash: "3.0", stock: "0.0", total: "3.0" },
        { year: "2023", cash: "2.5", stock: "0.5", total: "3.0" },
        { year: "2022", cash: "2.0", stock: "0.0", total: "2.0" },
        { year: "2021", cash: "1.5", stock: "0.5", total: "2.0" },
    ];

    return (
        <div className="overflow-x-hidden">
            {/* Hero 圖片 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image
                src="/investors/3.jpg"
                alt="Material Information"
                fill
                className="object-cover"
                priority
                />
            </div>

            {/* 麵包屑 */}
            <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="/"
                            className="text-sm sm:text-base font-semibold"
                            >
                            {t("homepage")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                        <Link
                            href="/investors"
                            className="text-sm sm:text-base font-semibold"
                        >
                            {t("title")}
                        </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/investors/dividend" className="text-sm sm:text-base font-semibold">{t("dividend_information")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題區塊 */}
            <div className="flex flex-col text-center py-6">
                <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">
                    Dividend Information
                </h2>
                <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
                <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
                    {t("dividend_information")}
                </h3>
            </div>
            {/* 股利資訊表格 */}
            <div className="lg:mx-40 px-6 md:px-12 pb-16">
                <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-sm md:text-base font-semibold">
                        年度
                        </th>
                        <th className="px-4 py-3 text-sm md:text-base font-semibold">
                        現金股利 (NTD)
                        </th>
                        <th className="px-4 py-3 text-sm md:text-base font-semibold">
                        股票股利 (股)
                        </th>
                        <th className="px-4 py-3 text-sm md:text-base font-semibold">
                        合計 (NTD)
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                    {dividends.map((d, idx) => (
                        <tr
                        key={d.year}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                        <td className="px-4 py-3 font-semibold">{d.year}</td>
                        <td className="px-4 py-3">{d.cash}</td>
                        <td className="px-4 py-3">{d.stock}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                            {d.total}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

                {/* 備註 */}
                <p className="text-xs text-gray-500 mt-4">
                    * 上述資料僅供參考，詳細資訊請依公開資訊觀測站公告為準。
                </p>            
            </div>
        </div>
    );
}

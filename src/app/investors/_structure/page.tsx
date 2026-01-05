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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function OrganizationPage() {
    const t = useTranslations("investors");

    // 假資料（可改 API）
    const shareCapital = {
        authorized: "2,000,000,000",
        issued: "1,200,000,000",
        shares: "120,000,000",
        parValue: "NTD 10",
    };

    const composition = [
        { name: "Directors & Supervisors", value: 35 },
        { name: "Institutions", value: 40 },
        { name: "Foreign Investors", value: 15 },
        { name: "Retail Investors", value: 10 },
    ];

    const topShareholders = [
        { name: "ABC Investment Corp.", shares: "12,000,000", percent: "10%" },
        { name: "XYZ Bank", shares: "10,000,000", percent: "8.3%" },
        { name: "John Chen", shares: "6,000,000", percent: "5%" },
        { name: "DEF Insurance", shares: "5,000,000", percent: "4.2%" },
        { name: "GHI Securities", shares: "4,000,000", percent: "3.3%" },
        { name: "JKL Asset Mgmt", shares: "3,500,000", percent: "2.9%" },
        { name: "MNO Holdings", shares: "3,000,000", percent: "2.5%" },
        { name: "PQR Investment", shares: "2,500,000", percent: "2.1%" },
        { name: "STU Capital", shares: "2,000,000", percent: "1.7%" },
        { name: "VWX Fund", shares: "1,800,000", percent: "1.5%" },
    ];

    const COLORS = ["#2F855A", "#3182CE", "#D69E2E", "#DD6B20"];

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
                            <Link href="/investors/structure" className="text-sm sm:text-base font-semibold">{t("company_structure")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題區塊 */}
            <div className="flex flex-col text-center py-6">
                <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">
                    Company Structure
                </h2>
                <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
                <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
                    {t("company_structure")}
                </h3>
            </div>
            {/* 股本資訊 */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-6 md:px-20 pb-12">
                {Object.entries(shareCapital).map(([key, value]) => (
                <div
                    key={key}
                    className="bg-white border rounded-2xl shadow-sm p-6 text-center"
                >
                    <h4 className="text-gray-500 text-sm capitalize">{key}</h4>
                    <p className="text-lg md:text-xl font-semibold text-gray-800 mt-2">
                    {value}
                    </p>
                </div>
                ))}
            </div> */}

            {/* 股東結構圖 */}
            {/* <div className="px-6 md:px-20 pb-12">
                <h4 className="text-lg font-medium text-gray-800 mb-4">股東結構</h4>
                <div className="w-full h-80">
                <ResponsiveContainer>
                    <PieChart>
                    <Pie
                        data={composition}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                    >
                        {composition.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            </div> */}

            {/* 前十大股東 */}
            {/* <div className="px-6 md:px-20 pb-20">
                <h4 className="text-lg font-medium text-gray-800 mb-4">前十大股東</h4>
                <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-sm font-semibold">股東名稱</th>
                        <th className="px-4 py-3 text-sm font-semibold">持股數</th>
                        <th className="px-4 py-3 text-sm font-semibold">持股比例</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                    {topShareholders.map((s, idx) => (
                        <tr
                        key={s.name}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3">{s.shares}</td>
                        <td className="px-4 py-3">{s.percent}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                * 上述資料僅供參考，詳細資訊請依公開資訊觀測站公告為準。
                </p>
            </div> */}
        </div>
    );
}

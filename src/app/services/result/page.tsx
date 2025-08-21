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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
const projects = [
  { region: "台中", customer: "華邦", category: "設計", name: "中科華邦二次配套圖 (2D)" },
  { region: "新竹", customer: "台積電", category: "設計", name: "TSMC F16 二次配套圖 (2D)" },
  { region: "彰化", customer: "彰濱Google資料中心", category: "設計", name: "彰濱Google柴油系統 (3D)" },
  { region: "大連", customer: "英特爾", category: "設計", name: "大連英特爾二次配套圖 (2D)" },
  { region: "台南", customer: "台積電", category: "化學", name: "南科台積電18廠P1-P3擴充" },
  { region: "台中", customer: "華邦", category: "化學", name: "中科華邦擴充" },
  { region: "新竹", customer: "旺宏", category: "化學", name: "新竹旺宏5廠主系統" },
  { region: "台南", customer: "帆宣", category: "氣體", name: "南科帆宣3廠主系統" },
  { region: "台南", customer: "帆宣", category: "氣體", name: "micron F16 GasHookup" },
  { region: "台南", customer: "帆宣", category: "氣體", name: "南科帆宣3廠主系統1" },
  { region: "台南", customer: "帆宣", category: "氣體", name: "南科帆宣3廠主系統2" }

];

export default function IntroductionPage() {
    const t = useTranslations("services");

    const [activeTab, setActiveTab] = useState("全部");

    const categories = ["全部", "設計", "化學", "氣體"];

    const [search, setSearch] = useState("");

    const filteredProjects = projects.filter((p) => {
        const matchCategory = activeTab === "全部" || p.category === activeTab;
        const matchSearch =
        p.name.includes(search) ||
        p.region.includes(search) ||
        p.customer.includes(search);
        return matchCategory && matchSearch;
    });

    // state
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9; // 三排 * 三個

    // 計算分頁
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);


    // 產生分頁數字（含縮略符號）
    const getPageNumbers = (current: number, total: number) => {
        const delta = 2; // 當前頁前後顯示幾個
        const range = [];
        const rangeWithDots = [];
        let last;

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (last) {
                if (i - last === 2) {
                    rangeWithDots.push(last + 1);
                } else if (i - last > 2) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            last = i;
        }

        return rangeWithDots;
    };

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
                            {/* 工程實績 */}
                            <Link href="/services/result" className="text-sm sm:text-base font-semibold">{t("result.title")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* 下畫線 */}
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 工程實績標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("result.title")}
            </div>

            {/* 工程實績描述 */}
            <div className="w-[full] px-6 py-10 shadow-[0_26px_35px_rgba(0,0,0,0.10)]">
                <div className="md:w-[720px] lg:w-[800px] xl:w-[1100px] mx-auto">
                    
                    {/* Tabs */}
                    <div className="flex justify-center gap-4 sm:gap-8 mb-10">
                    {categories.map((cat) => (
                        <button
                        key={cat}
                        onClick={() => {
                            setActiveTab(cat);
                            setCurrentPage(1);
                        }}
                        className={`relative group px-2 py-1 text-lg transition font-extrabold cursor-pointer
                            ${activeTab === cat ? "text-black" : "text-gray-600 hover:text-black"}`}
                        >
                        {cat}
                        <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-transform duration-300 origin-center 
                            ${activeTab === cat ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}`}
                        />
                        </button>
                    ))}
                    </div>

                    {/* 搜尋框 */}
                    <div className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="搜尋專案名稱、地區或客戶..."
                        value={search}
                        onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                        }}
                        className="text-sm xl:text-base w-3/4 sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#375978] focus:outline-none"
                    />
                    </div>

                    {/* 卡片列表 (md以上顯示) */}
                    <ZoomIn delay={0.2}>
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 sm:mx-20 my-10 md:mx-10">
                        {currentProjects.length > 0 ? (
                        currentProjects.map((p) => (
                            <div
                            key={p.name}
                            className="bg-white rounded-md p-8 md:p-10 lg:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.1),0_-2px_10px_rgba(0,0,0,0.1)] hover:scale-103 transition-transform duration-500"
                            >
                            <h3 className="md:text-lg lg:text-xl font-semibold text-gray-800">{p.name}</h3>
                            <p className="text-sm lg:text-base text-gray-600 mt-2"><strong>類別:</strong> {p.category}</p>
                            <p className="text-sm lg:text-base text-gray-600 mt-2"><strong>地區:</strong> {p.region}</p>
                            <p className="text-sm lg:text-base text-gray-600 mt-2"><strong>客戶:</strong> {p.customer}</p>
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-500 text-center col-span-full">沒有找到符合的專案</p>
                        )}
                    </div>
                    </ZoomIn>

                    {/* Accordion (md以下顯示) */}
                    <div className="md:hidden my-10">
                    {currentProjects.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full px-4">
                        {currentProjects.map((p, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-bold py-3 text-[#375978]">
                                {p.name}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 text-sm space-y-2 px-2 pb-3">
                                <p><strong>類別:</strong> {p.category}</p>
                                <p><strong>地區:</strong> {p.region}</p>
                                <p><strong>客戶:</strong> {p.customer}</p>
                            </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    ) : (
                        <p className="text-gray-500 text-center">沒有找到符合的專案</p>
                    )}
                    </div>

                    {/* 頁碼 */}
                    {totalPages > 1 && (
                    <div className="flex justify-center my-10 gap-3">
                        {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                        page === "..." ? (
                            <span key={idx} className="px-3 py-1 text-gray-500">...</span>
                        ) : (
                            <button
                            key={page}
                            onClick={() => {
                                if (typeof page === "number") setCurrentPage(page);
                            }}
                            className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                                currentPage === page
                                ? "bg-[#375978] text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            >
                            {page}
                            </button>
                        )
                        )}
                    </div>
                    )}
                </div>
            </div>

            {/* 合作夥伴標題 */}
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 mt-10">
                {t("result.partners")}
            </div>      
            {/* 合作夥伴圖片 */}
            <div className="flex justify-center items-center p-4 md:p-8">
                <Image src="/services/result/p.png" alt={t("result.partners")} width={1300} height={600}  objectFit="contain" />
            </div>
        </div>
    );            
}
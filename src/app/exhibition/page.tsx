"use client";
import React from "react";
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
import { useState, useMemo } from "react"

// 假資料集 (可換成 API 回傳資料)
const newsDataset = [
  { year: "2025",month: "MAY",title: "台灣國際半導體展 Semicon Taiwan" },
  { year: "2025", month: "APR", title: "Semicon West" },
  { year: "2025", month: "DEC", title: "台灣國際智慧能源周" },
  { year: "2025", month: "NOV", title: "台北國際自動化工業大展" },
  { year: "2024", month: "OCT", title: "SEMICON Europa (Munich)" },
  { year: "2024", month: "SEP", title: "台灣國際半導體展 SEMICON Taiwan" },
  { year: "2024", month: "JUL", title: "SEMICON West (San Francisco)" },
  { year: "2024", month: "JUN", title: "COMPUTEX Taipei" },
  // ...請自行擴充假資料共 30-40 筆
]



export default function NewsPage() {
    const t = useTranslations("exhibition");
    const YEARS = ["2025", "2024", "2023", "2022", "2021"]
    const PAGE_SIZE = 5
    const [yearFilter, setYearFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)

    // 篩選資料
    const filteredNews = useMemo(() => {
        return yearFilter === "All"
        ? newsDataset
        : newsDataset.filter((item) => item.year === yearFilter)
    }, [yearFilter])

    // 分頁資料
    const paginatedNews = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE
        return filteredNews.slice(start, start + PAGE_SIZE)
    }, [filteredNews, currentPage])

    const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE)

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/exhibition/1.jpg" 
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
                        <Link href="/exhibition" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 展覽活動 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("title")}
        </div>
        <div className="my-6 md:my-10 lg:my-20 mx-8 md:mx-10 lg:mx-30 xl:mx-40 2xl:mx-60">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16">
                {/* 年度篩選器 */}
                <ZoomIn delay={0.3}>
                    <div className="flex bg-[#375978] text-white rounded-xl items-center
                                    xl:w-[200px] xl:h-[500px] xl:text-2xl xl:py-6 
                                    lg:w-[150px] lg:h-[500px] lg:text-xl lg:py-4 
                                    md:flex-col md:w-[150px] md:h-[450px] md:px-2 md:py-3 gap-2
                                    flex-wrap w-full h-full px-2 py-4 text-lg justify-center">
                        <button
                            onClick={() => {
                            setYearFilter("All")
                            setCurrentPage(1)
                            }}
                            className={`rounded-full px-9 md:px-10 py-2 md:py-3 xl:mb-4 font-bold hover:bg-white hover:text-[#375978] ${
                            yearFilter === "All" ? "bg-white text-[#375978]" : ""
                            }`}
                        >
                            All
                        </button>
                        {YEARS.map((year, idx) => (
                            <div key={year} className="flex flex-col gap-2 items-center">
                                {idx !== 0 && (
                                    <span className="w-[30px] h-[2px] bg-white hidden md:block" />
                                )}
                                <button
                                    onClick={() => {
                                    setYearFilter(year)
                                    setCurrentPage(1)
                                    }}
                                    className={`font-bold rounded-full px-6 py-2 md:py-3 hover:bg-white hover:text-[#375978] hover:scale-105 transition-transform duration-300 ${
                                    yearFilter === year ? "bg-white text-[#375978] " : ""
                                    }`}
                                >
                                    {year}
                                </button>
                            </div>
                        ))}
                    </div>
                </ZoomIn>

                {/* 展覽列表 */}
                <div className="flex-1 space-y-4 md:space-y-6 lg:space-y-8 h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px] justify-center">
                    <ZoomIn delay={0.3}>
                        <span className="block w-full h-[1px] bg-[#375978] "></span>
                    </ZoomIn>
                    {paginatedNews.length === 0 ? (
                        <ZoomIn delay={0.3}>
                            <div className="text-center text-[#375978] font-bold text-xl mt-10">
                                {t("noNews")}
                            </div>
                        </ZoomIn>
                    ) : (
                        paginatedNews.map((item, idx) => (
                            <ZoomIn delay={0.3} key={idx}>
                                <div
                                    className="border-b border-[#375978] pb-6 hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="px-4 md:px-6 xl:px-10 font-bold xl:text-lg text-[#375978]">
                                        {item.year} / {item.month}
                                    </div>
                                    <div className="px-4 md:px-6 xl:px-10 font-bold text-base xl:text-xl text-[#375978] mt-2">
                                        {item.title}
                                    </div>
                                </div>
                            </ZoomIn>
                        ))
                    )}
                </div>
            </div>

            {/* 分頁 */}
            <SlideInFromLeft delay={0.3}>
                <div className="flex justify-end my-10 md:my-0 space-x-2 text-[#375978]">
                    {totalPages === 0 && (
                        <button
                            onClick={() => setCurrentPage(1)}
                            className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#375978]/0 hover:border-[#375978]/100 ${
                                currentPage === 1 ? "bg-[#375978] text-white" : ""
                            }`}
                        >
                            1
                        </button>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#375978]/0 hover:border-[#375978]/100 ${
                            currentPage === i + 1
                                ? "bg-[#375978] text-white"
                                : ""
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </SlideInFromLeft>
        </div>
    </div>
  );            
}
// app/[locale]/exhibition/ExhibitionClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link"
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import {
    Carousel, CarouselContent, CarouselItem,
} from "@/components/ui/carousel";

// 定義接收的資料型別
interface Props {
    exhibitions: any[];
}

export default function ExhibitionClient({ exhibitions = [] }: Props) {
    const t = useTranslations("exhibition");
    const locale = useLocale(); // 取得目前語言 'zh' 或 'en'
    
    // 狀態設定
    const [yearFilter, setYearFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 5;

    // 1. 資料處理：將資料庫格式轉換為 UI 需要的格式
    const processedData = useMemo(() => {
        return exhibitions.map(item => {
            const startDate = new Date(item.date_start);
            const endDate = new Date(item.date_end);
            
            // 處理月份 (例如: SEP)
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = monthNames[startDate.getMonth()];

            // 處理日期顯示 (例如: 9/10-9/12)
            const dateStr = `${startDate.getMonth() + 1}/${startDate.getDate()}-${endDate.getMonth() + 1}/${endDate.getDate()}`;

            return {
                ...item,
                year: startDate.getFullYear().toString(),
                month: month,
                // 根據語言選取對應內容，如果沒有就顯示空字串
                title: item.name?.[locale] || item.name?.['zh'] || "",
                location: item.location?.[locale] || "",
                description: item.description?.[locale] || "",
                date: dateStr,
                booth: item.booth_number,
                // 處理圖片：資料庫是字串陣列 ['url1', 'url2']，轉為物件陣列 [{image: 'url1'}]
                slides: (item.images || []).map((img: string) => ({ image: img }))
            };
        });
    }, [exhibitions, locale]);

    // 2. 動態產生年份選單 (只顯示有資料的年份)
    const YEARS = useMemo(() => {
        const years = new Set(processedData.map(item => item.year));
        // 轉為陣列並由大到小排序
        return Array.from(years).sort((a, b) => Number(b) - Number(a));
    }, [processedData]);

    // 3. 篩選邏輯
    const filteredNews = useMemo(() => {
        return yearFilter === "All"
        ? processedData
        : processedData.filter((item) => item.year === yearFilter)
    }, [yearFilter, processedData]);

    // 4. 分頁邏輯
    const paginatedNews = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE
        return filteredNews.slice(start, start + PAGE_SIZE)
    }, [filteredNews, currentPage, PAGE_SIZE]);

    const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE);

  return (
    <div className="overflow-x-hidden">
        {/* Banner 區塊 */}
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image 
                src="/exhibition/1.jpg" 
                alt="Exhibition Banner"
                fill // 取代 layout="fill"
                className="object-cover" // 取代 objectFit="cover"
                priority
            />
        </div>

        {/* 麵包屑 */}
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

        {/* 標題 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("title")}
        </div>

        <div className="my-6 md:my-10 lg:my-20 mx-8 md:mx-10 lg:mx-30 xl:mx-40 2xl:mx-60">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16">
                
                {/* 左側：年度篩選器 */}
                <ZoomIn delay={0.3}>
                    <div className="flex bg-[#375978] text-white rounded-xl items-center
                                    xl:w-[200px] xl:h-[500px] xl:text-2xl xl:py-6 
                                    lg:w-[150px] lg:h-[500px] lg:text-xl lg:py-4 
                                    md:flex-col md:w-[150px] md:h-[450px] md:px-2 md:py-3 gap-2
                                    flex-wrap w-full h-full px-2 py-4 text-lg justify-center">
                        <button
                            onClick={() => { setYearFilter("All"); setCurrentPage(1); }}
                            className={`rounded-full px-9 md:px-10 py-2 md:py-3 xl:mb-4 font-bold hover:bg-white hover:text-[#375978] transition-colors ${
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
                                    onClick={() => { setYearFilter(year); setCurrentPage(1); }}
                                    className={`font-bold rounded-full px-6 py-2 md:py-3 hover:bg-white hover:text-[#375978] hover:scale-105 transition-all duration-300 ${
                                    yearFilter === year ? "bg-white text-[#375978] " : ""
                                    }`}
                                >
                                    {year}
                                </button>
                            </div>
                        ))}
                    </div>
                </ZoomIn>

                {/* 右側：展覽列表 */}
                <div className="flex-1 space-y-4 md:space-y-6 lg:space-y-8 h-full justify-center">
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
                            <ZoomIn delay={0.3} key={item.id || idx}>
                                <div className="flex flex-col md:flex-row gap-2 bg-white border border-[#375978]/30 rounded-xl shadow-sm overflow-hidden hover:scale-105 transition-transform duration-300">
                                    {/* 圖片輪播區 */}
                                    {item.slides.length > 0 ? (
                                        <Carousel className="md:w-1/2 w-full overflow-hidden">
                                            <CarouselContent className="flex w-full space-x-2 ml-0">
                                                {item.slides.map((slide: any, index: number) => (
                                                    <CarouselItem key={index} className="w-full flex-shrink-0 pl-0 ">
                                                        <div className="relative h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden rounded-t-lg md:rounded-l-lg">
                                                            <Image
                                                                src={slide.image}
                                                                alt={`Slide ${index}`}
                                                                fill
                                                                className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                                            />
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                        </Carousel>
                                    ) : (
                                        // 如果沒有圖片，顯示預設圖
                                        <div className="md:w-1/2 w-full h-[300px] md:h-auto bg-gray-200 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    {/* 文字資訊區 */}
                                    <div className="flex-1 py-4 px-8 text-[#375978]">
                                        <div className="font-bold text-xl lg:text-2xl py-3">{item.year} / {item.month}</div>
                                        <div className="font-bold text-xl lg:text-2xl pb-8">{item.title}</div>
                                        
                                        {/* 這裡使用資料庫的實際內容，標題使用 t() 翻譯 */}
                                        <div className="pb-1 xl:py-3 md:text-base lg:text-lg xl:text-xl"><strong>{t("date")}: </strong> {item.date}</div>
                                        <div className="pb-1 xl:py-3 md:text-base lg:text-lg xl:text-xl"><strong>{t("location")}: </strong> {item.location}</div>
                                        <div className="pb-1 xl:py-3 md:text-base lg:text-lg xl:text-xl"><strong>{t("booth")}: </strong> {item.booth}</div>
                                        
                                        {/* 描述文字支援換行 */}
                                        <div className="font-bold mt-4 md:text-base xl:text-xl whitespace-pre-wrap">{item.description}</div>
                                    </div>
                                </div>
                            </ZoomIn>
                        ))
                    )}
                </div>
            </div>

            {/* 分頁按鈕 (如果需要開啟分頁功能，把 false 改成 true 或直接移除條件) */}
            {totalPages > 1 && (
            <ZoomIn delay={0.3}>
                <div className="flex justify-end my-10 md:my-0 space-x-2 text-[#375978]">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#375978]/0 hover:border-[#375978]/100 transition-all ${
                            currentPage === i + 1
                                ? "bg-[#375978] text-white"
                                : ""
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </ZoomIn>
            )}
        </div>
    </div>
  );            
}
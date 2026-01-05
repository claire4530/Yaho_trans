"use client";
import { useState, useMemo } from "react";
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
import { CloudUpload,Search  } from "lucide-react";
import {
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function OrganizationPage() {
    const t = useTranslations("investors");
    const revenueReports = [
    { year: "2025", month: "7", url: "/pdf/202507.pdf" },
    { year: "2025", month: "6", url: "/pdf/202506.pdf" },
    { year: "2025", month: "5", url: "/pdf/202505.pdf" },
    { year: "2025", month: "4", url: "/pdf/202504.pdf" },
    { year: "2025", month: "3", url: "/pdf/202503.pdf" },
    { year: "2025", month: "2", url: "/pdf/202502.pdf" },
    { year: "2025", month: "1", url: "/pdf/202501.pdf" },
    { year: "2024", month: "7", url: "/pdf/202507.pdf" },
    { year: "2024", month: "6", url: "/pdf/202506.pdf" },
    { year: "2024", month: "5", url: "/pdf/202505.pdf" },
    { year: "2024", month: "4", url: "/pdf/202504.pdf" },
    { year: "2024", month: "3", url: "/pdf/202503.pdf" },
    { year: "2024", month: "2", url: "/pdf/202502.pdf" },
    { year: "2024", month: "1", url: "/pdf/202501.pdf" },
    ];

    // 狀態管理
    const [yearFilter, setYearFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // 每頁顯示 5 筆

    // 取得所有年份（去重）
    const years = Array.from(new Set(revenueReports.map(r => r.year))).sort((a,b) => b.localeCompare(a));

    // 篩選 + 搜尋
    const filteredReports = useMemo(() => {
        return revenueReports.filter(r => {
        const matchYear = yearFilter === "all" || r.year === yearFilter;
        const matchSearch =
            search === "" ||
            r.month.includes(search) ||
            `${r.year}${r.month}`.includes(search);
        return matchYear && matchSearch;
        });
    }, [yearFilter, search, revenueReports]);

    // 分頁
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const paginatedReports = filteredReports.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

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
                            <Link href="/investors/month" className="text-sm sm:text-base font-semibold">{t("month")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            <SlideInFromLeft delay={0.3}>
                {/* 每月營收公告標題 */}
                <div className="flex flex-col text-center py-6">
                    {/* 英文名稱 */}
                    <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">Monthly Revenue</h2>
                    {/* 下畫線 */}
                    <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
                    {/* 每月營收公告 */}
                    <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
                        {t("month")}
                    </h3>
                </div>
            </SlideInFromLeft>

            <ZoomIn delay={0.3}> 
            {/* 篩選工具列 */}
                <div className="flex flex-row md:items-center justify-between gap-4 lg:mx-40 px-6 md:px-12 mb-6">
                    {/* 年份篩選 */}
                    <Select
                        value={yearFilter}
                        onValueChange={(val) => {
                            setYearFilter(val);
                            setPage(1);
                        }}
                        >
                        <SelectTrigger className="w-[140px] sm:w-[160px] flex items-center gap-2">
                            <Calendar className="h-4 w-4 hidden sm:flex text-gray-500" />
                            <SelectValue placeholder="選擇年份" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">全部年份</SelectItem>
                            {years.map((y) => (
                            <SelectItem key={y} value={y}>
                                {y}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-4 text-sm">
                        <Search size={20} className="hidden sm:flex text-gray-500" />
                        {/* 搜尋 */}
                        <input
                            type="text"
                            placeholder="搜尋月份或關鍵字..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="border rounded-lg px-4 py-2 w-full md:w-64"
                        />
                    </div>
                </div>

                {/* 表格 */}
                <div className="lg:mx-40 px-6 md:px-12 pb-16">
                    <div className="grid grid-cols-2 font-semibold text-gray-700 border-b-2 border-gray-400 pb-3 mb-8">
                    <span className="mx-5">年分 / 月份</span>
                    <span className="mx-5 text-right">營收報告</span>
                    </div>

                    <div className="divide-y divide-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    {paginatedReports.length > 0 ? (
                        paginatedReports.map((report, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-2 items-center px-4 py-4 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition-colors duration-200 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                        >
                            {/* 左邊：年份 + 標題 */}
                            <span className="font-bold flex gap-2">
                            {report.year}
                            <span className="font-medium">{report.month}月營收報告</span>
                            </span>

                            {/* 右邊：PDF 按鈕 */}
                            <div className="flex justify-end">
                            <a
                                href={report.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[#375978] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#F3981B] transition-colors duration-300"
                            >
                                <CloudUpload size={18} />
                                PDF
                            </a>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">查無資料</div>
                    )}
                    </div>

                    {/* 分頁器 */}
                    {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <Pagination>
                        <PaginationContent>
                            {/* 上一頁 */}
                            <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                            </PaginationItem>

                            {/* 動態頁碼 */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                isActive={p === page}
                                onClick={() => setPage(p)}
                                >
                                {p}
                                </PaginationLink>
                            </PaginationItem>
                            ))}

                            {/* 下一頁 */}
                            <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                            </PaginationItem>
                        </PaginationContent>
                        </Pagination>
                    </div>
                    )}
                </div>
            </ZoomIn>
        </div>
    );            
}
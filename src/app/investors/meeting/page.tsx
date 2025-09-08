"use client";
import { useState, useMemo } from "react";
import {
Breadcrumb,
BreadcrumbItem,
BreadcrumbLink,
BreadcrumbList,
BreadcrumbPage,
BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { CloudUpload, Search } from "lucide-react";
import {
Pagination,
PaginationContent,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious,
} from "@/components/ui/pagination";
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";

export default function OrganizationPage() {
const t = useTranslations("investors");

// 範例資料（只有 title / url）
const revenueReports = [
	{ title: "2025年度股東常會議事錄", url: "/pdf/2025.pdf" },
	{ title: "2024年度股東常會議事錄", url: "/pdf/2024.pdf" },
	{ title: "2023年度股東常會議事錄", url: "/pdf/2023.pdf" },
	{ title: "2022年度股東常會議事錄", url: "/pdf/2022.pdf" },
	{ title: "2021年度股東常會議事錄", url: "/pdf/2021.pdf" },
	{ title: "2020年度股東常會議事錄", url: "/pdf/2020.pdf" },
];

// ---- UI 狀態 ----
const [page, setPage] = useState(1);
const itemsPerPage = 5;

// ---- 排序（假設 title 前面有年份數字）----
const normalized = useMemo(() => {
	return revenueReports.sort((a, b) => b.title.localeCompare(a.title));
}, [revenueReports]);

// ---- 分頁 ----
const totalPages = Math.ceil(normalized.length / itemsPerPage) || 1;
const paginatedReports = useMemo(() => {
	const start = (page - 1) * itemsPerPage;
	const end = page * itemsPerPage;
	return normalized.slice(start, end);
}, [normalized, page]);

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
					<Link href="/investors/year" className="text-sm sm:text-base font-semibold">{t("shareholders_meeting")}</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>

		<span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

		<SlideInFromLeft delay={0.3}>
			{/* 標題區塊 */}
			<div className="flex flex-col text-center py-6">
				<h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">
				Shareholders Meeting
				</h2>
				<span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
				<h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
				{t("shareholders_meeting")}
				</h3>
			</div>
		</SlideInFromLeft>

		<ZoomIn delay={0.3}>
		{/* 表格 + 左上角按鈕 */}
		<div className="lg:mx-40 px-6 md:px-12 pb-16">
			<div className="flex justify-between items-center mb-4">
			<div className="flex gap-3">
				<a
				href="https://mis.twse.com.tw/stock/index?lang=zhHant" // 這裡換成真實股價頁
				target="_blank"
				rel="noopener noreferrer"
				className="bg-[#375978] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#F3981B] transition-colors"
				>
				垚鋐股價
				</a>
				<a
				href="https://mops.twse.com.tw/mops/#/web/home" // 公開資訊觀測站
				target="_blank"
				rel="noopener noreferrer"
				className="bg-[#375978] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#F3981B] transition-colors"
				>
				公開資訊觀測站
				</a>
			</div>
			</div>

			{/* 表頭 */}
			<div className="grid grid-cols-2 font-semibold text-gray-700 border-b-2 border-gray-400 pb-3 mb-8">
			<span className="mx-5">年度</span>
			<span className="mx-5 text-right">公告 / 連結</span>
			</div>

			{/* 表格內容 */}
			<div className="divide-y divide-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200">
			{paginatedReports.length > 0 ? (
				paginatedReports.map((report, i) => (
				<div
					key={`${report.title}-${i}`}
					className={`items-center px-4 py-4 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition-colors duration-200 ${
					i % 2 === 0 ? "bg-white" : "bg-gray-50"
					}`}
				>
					{/* 右邊：標題 + 按鈕 */}
					<div className="flex justify-between items-center gap-3 mx-1 md:mx-5">
						<span
							className="truncate max-w-[70%] text-right"
							title={report.title}
						>
							{report.title}
						</span>
						<a
							href={report.url || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 bg-[#375978] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#F3981B] transition-colors duration-300"
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
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						className={
						page === 1
							? "pointer-events-none opacity-50"
							: "cursor-pointer"
						}
					/>
					</PaginationItem>

					{/* 動態頁碼 */}
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(
					(p) => (
						<PaginationItem key={p}>
						<PaginationLink
							isActive={p === page}
							onClick={() => setPage(p)}
						>
							{p}
						</PaginationLink>
						</PaginationItem>
					)
					)}

					{/* 下一頁 */}
					<PaginationItem>
					<PaginationNext
						onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
						className={
						page === totalPages
							? "pointer-events-none opacity-50"
							: "cursor-pointer"
						}
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

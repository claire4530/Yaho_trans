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
import { CloudUpload, Search as SearchIcon, Calendar } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function OrganizationPage() {
	const t = useTranslations("investors");

	// 範例資料（可改為 API 回傳）。重要：只有 date / title / url，年與月由程式切出
	const revenueReports = [
		{ date: "2025-09-01", title: "公告本公司民國113年度股東常會重要決議事項", url: "#" },
		{ date: "2025-08-01", title: "公告本公司董事會決議現金股利配息基準日", url: "#" },
		{ date: "2025-07-01", title: "說明本公司營運概況", url: "#" },
		{ date: "2025-06-22", title: "公告本公司董事會通過民國113年第二季合併財務報告", url: "#" },
		{ date: "2025-05-17", title: "公告本公司董事會通過民國113年第一季合併財務報告", url: "#" },
		{ date: "2025-04-10", title: "公告本公司取得背書保證情形", url: "#" },
		{ date: "2025-03-25", title: "公告資金貸與達公告標準", url: "#" },
		{ date: "2025-02-15", title: "公司治理相關聲明", url: "#" },
		{ date: "2025-01-10", title: "公告112年12月營收資訊", url: "#" },
		{ date: "2024-12-15", title: "公告112年第三季合併財務報告", url: "#" },
	];

	// ---- UI 狀態 ----
	const [yearFilter, setYearFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const itemsPerPage = 5;

	// ---- 資料正規化：從 date 切出 year / month，並依日期新到舊排序 ----
	const normalized = useMemo(() => {
		const withYM = revenueReports.map((r) => {
		const [year, month] = r.date.split("-");
		return { ...r, year, month };
		});
		return withYM.sort((a, b) => b.date.localeCompare(a.date));
	}, [revenueReports]);

	// ---- 年份選單（去重） ----
	const years = useMemo(() => {
		return Array.from(new Set(normalized.map((r) => r.year))).sort((a, b) => b.localeCompare(a));
	}, [normalized]);

	// ---- 篩選 + 搜尋（搜尋標題與日期；忽略大小寫）----
	const filteredReports = useMemo(() => {
		const q = search.trim().toLowerCase();
		return normalized.filter((r) => {
		const matchYear = yearFilter === "all" || r.year === yearFilter;
		const matchSearch =
			q === "" ||
			r.title.toLowerCase().includes(q) ||
			r.date.includes(q) ||
			r.year.includes(q) ||
			r.month.includes(q);
		return matchYear && matchSearch;
		});
	}, [yearFilter, search, normalized]);

	// ---- 分頁 ----
	const totalPages = Math.ceil(filteredReports.length / itemsPerPage) || 1;
	const paginatedReports = useMemo(() => {
		const start = (page - 1) * itemsPerPage;
		const end = page * itemsPerPage;
		return filteredReports.slice(start, end);
	}, [filteredReports, page]);

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
				<BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
				{t("homepage")}
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink asChild>
				<Link href="/investors" className="text-sm sm:text-base font-semibold">
					{t("title")}
				</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink asChild>
					<Link href="/investors/message" className="text-sm sm:text-base font-semibold">{t("Important_information")}</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>

		<span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

		{/* 標題區塊 */}
		<div className="flex flex-col text-center py-6">
			<h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">Material Information</h2>
			<span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
			<h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
			{t("Important_information")}
			</h3>
		</div>
		{/* 說明段落（置中 + 合理寬度） */}
		<div className="px-8 pb-4 leading-8 mx-auto max-w-3xl">
			本公司為證券交易所掛牌上市公司，關於重大訊息之處理與公開，均依相關法令及主管機關規範辦理。 在資訊揭露上，我們秉持以下原則：
			<br />
			<br />
			<strong>真實與正確</strong>：確保所揭露內容有憑有據，不失真。
			<br />
			<strong>即時與完整</strong>：於適當時點完整公告，以維護資訊透明。
			<br />
			<strong>公平揭露</strong>：提供所有投資人及利害關係人一致且公平的資訊取得管道。
			<br />
			<br />
			公司相關之財務與營運資料、董事會重大決議、資金運用（如資金貸與及背書保證）、公司治理等資訊，均依規定透過主管機關指定資訊平台——「公開資訊觀測站」(http://mops.twse.com.tw) 對外揭露，供股東及社會大眾即時查詢與參考。(範例)
		</div>

		{/* 篩選工具列 */}
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:mx-40 px-6 md:px-12 mb-6">
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

			{/* 搜尋 */}
			<div className="flex items-center gap-3 text-sm w-full md:w-auto">
			<SearchIcon size={20} className="hidden sm:flex text-gray-500" />
			<input
				type="text"
				placeholder="搜尋標題或日期…"
				value={search}
				onChange={(e) => {
				setSearch(e.target.value);
				setPage(1);
				}}
				className="border rounded-lg px-4 py-2 w-full md:w-64"
			/>
			</div>
		</div>

		{/* 表格 */}
		<div className="lg:mx-40 px-6 md:px-12 pb-16">
			<div className="grid grid-cols-2 font-semibold text-gray-700 border-b-2 border-gray-400 pb-3 mb-8">
			<span className="mx-5">日期</span>
			<span className="mx-5 text-right">公告 / 連結</span>
			</div>

			<div className="divide-y divide-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200">
			{paginatedReports.length > 0 ? (
				paginatedReports.map((report, i) => (
				<div
					key={`${report.date}-${report.title}-${i}`}
					className={`grid grid-cols-2 items-center px-4 py-4 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition-colors duration-200 ${
					i % 2 === 0 ? "bg-white" : "bg-gray-50"
					}`}
				>
					{/* 左邊：日期 */}
					<span className="font-semibold mx-1 md:mx-5">{report.date}</span>

					{/* 右邊：標題 + 按鈕 */}
					<div className="flex justify-end items-center gap-3 mx-1 md:mx-5">
					<span className="truncate max-w-[70%] text-right" title={report.title}>
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
						className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
					/>
					</PaginationItem>

					{/* 動態頁碼 */}
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
					<PaginationItem key={p}>
						<PaginationLink isActive={p === page} onClick={() => setPage(p)}>
						{p}
						</PaginationLink>
					</PaginationItem>
					))}

					{/* 下一頁 */}
					<PaginationItem>
					<PaginationNext
						onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
						className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
					/>
					</PaginationItem>
				</PaginationContent>
				</Pagination>
			</div>
			)}
		</div>
		</div>
	);
}

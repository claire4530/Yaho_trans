"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // 用來獲取當前路徑
import Image from "next/image";
import { AlignJustify, Search, Globe } from "lucide-react";
import LanguageSwitcher from "@/src/components/LanguageSwitcher"; 
import { useTranslations } from "next-intl";
// import SearchComponent from "@/src/components/SearchComponent"; 
import { useRouter } from "next/navigation";
import LinkWrapper from "@/src/components/LinkWrapper";
import LanguageSwitcherPhone from "@/src/components/LanguageSwitcherPhone";
import SiteWideSearch from "@/src/components/SearchComponent";

interface NavItem {
  label: string;
  path: string;
  submenu?: NavItem[]; // <-- 可選屬性
}

const logoUrl = [
	{ label: "首頁", path: "/", imageUrl: "/YAHO_logo/logo_v2.svg" },
	{ label: "手機版", path: "/", imageUrl: "/YAHO_logo/logo_s_v1.svg" },
]; // 替換為你的 logo 路徑

export default function Navbar() {
	const t = useTranslations("Navigation");
	const s = useTranslations("Language");
	const router = useRouter();

	const navItems = [
		// { label: "首頁", path: "/" ,imageUrl: "/YAHO_logo/logo.jpg"}, // 首頁
		{
			label: t('about'),
			submenu: [
				{ label: t('about_company'), path: "/about/introduction" },
				{ label: t('about_organization'), path: "/about/organization" },
				{ label: t('about_locations'), path: "/about/locations" },
				// { label: t('about_news'), path: "/about/news" },
				// { label: t('about_career'), path: "/about/career" },
			],
			path: "/about/introduction",
		}, // 關於垚鋐
		{
			label: t('services'),
			submenu: [
				{ label: t('services_project'), path: "/services/project" },
				{ label: t('services_result'), path: "/services/result" },
			],
			path: "/services",
		}, // 產品服務
		{ label: t('exhibition'), submenu: [{ label: t('exhibition_2025'), path: "/exhibition" }], path: "/exhibition", }, // 展覽活動
		{ 
			label: t('about_career'), 
			submenu: [
				{ label: t('about_benefits'), path: "/career/benefits" }, //員工福利
				{ label: t('about_jobs'), path: "/career/jobs" } //徵才資訊
			], path: "/career", }, // 人力資源
		// {
		// 	label: t('sustainability'),
		// 	submenu: [
		// 		{ label: t('sustainability_social'), path: "/sustainability/social-care" },
		// 		{ label: t('sustainability_operations'), path: "/sustainability/operations" },
		// 		{ label: t('sustainability_report'), path: "/sustainability/reports" },
		// 	],
		// 	path: "/sustainability",
		// }, // 企業永續
		// {
		// 	label: t('investors'),
		// 	submenu: [
		// 		{ 
		// 			label: t('investors_finance'),
		// 		  	submenu: [ 
		// 				{ label: t('investors_finance_month'), path: "/investors/month" },
		// 				{ label: t('investors_finance_year'), path: "/investors/year" },
		// 			], 
		// 		  	path: "/investors/month" },
		// 		{ 
		// 			label: t('investors_shareholders'),
		// 			submenu: [
		// 				{ label: t('investors_Important_information'), path: "/investors/message" },
		// 				{ label: t('investors_earnings_call'), path: "https://mops.twse.com.tw/mops/#/web/home" },
		// 				{ label: t('investors_shareholders_meeting'), path: "/investors/meeting" },
		// 				{ label: t('investors_shareholders_meeting_report'), path: "/investors/annual_report" },
		// 				{ label: t('investors_company_structure'), path: "/investors/structure" },
		// 				{ label: t('investors_dividend_information'), path:	"/investors/dividend" },
		// 				{ label: t('investors_service_window'), path: "/investors/windows" },
		// 			],
		// 			path: "/contact" },
		// 	],
		// 	path: "/investors",
		// },
		 // 投資人專區
		// {
		// 	label: t('governance'),
		// 	submenu: [
		// 		{ label: t('governance_board'), path: "/product/a" },
		// 		{ label: t('governance_committees'), path: "/contact" },
		// 		{ label: t('governance_audit'), path: "/product/a" },
		// 		{ label: t('governance_regulations'), path: "/product/a" },
		// 		{ label: t('governance_ethics'), path: "/product/a" },
		// 		{ label: t('governance_communication'), path: "/product/a" },
		// 		{ label: t('governance_risk'), path: "/product/a" },
		// 	],
		// 	path: "/governance",
		// }, // 公司治理
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
		null
	);
	const [locked, setLocked] = useState(false);
	const navRef = useRef<HTMLElement | null>(null);

	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// 點外面收回下拉選單
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setOpenDropdownIndex(null);
				setLocked(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
		useEffect(() => {
		// 每次路徑變化就關閉選單
		setIsMobileMenuOpen(false);
	}, [pathname]);

	return (
		<main>
			<nav
				ref={navRef}
				className="bg-white w-full fixed top-0 left-0 shadow z-40 flex justify-between items-center "
			>
				{/* 左邊 Logo 桌面 */}
				<div className="hidden xl:flex py-4">
					<Link
						href={logoUrl[0].path}
						className={`relative group text-[#375978] font-bold text-base hover:text-[#F3981B] transition-colors duration-300`}
						title={logoUrl[0].label} // 為了在圖片上顯示提示文字
					>
						<Image
							src={logoUrl[0].imageUrl}
							alt={logoUrl[0].label}
							width={400}
							height={40}
							className="inline-block hover:scale-105 transition-transform duration-300"
						/>
					</Link>
				</div>
				{/* 左邊 Logo 手機 */}
				<div className="block xl:hidden p-4">
					<Link
						href={logoUrl[1].path}
						className={`relative group text-[#375978] font-bold text-base hover:text-[#F3981B] transition-colors duration-300`}
						title={logoUrl[1].label} // 為了在圖片上顯示提示文字
					>
						<Image
							src={logoUrl[1].imageUrl}
							alt={logoUrl[1].label}
							width={100}
							height={30}
							className="inline-block hover:scale-105 transition-transform duration-300"
						/>
					</Link>
				</div>
				{/* 右邊選單 */}
				
				<ul className="hidden xl:flex space-x-6 gap-6 items-center p-10">
					{navItems.map(({ label, submenu, path }, index) => (
						<li
							key={index}
							onMouseEnter={() => {
								if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
								showTimeoutRef.current = setTimeout(() => {
								setHoverIndex(index);
								}, 150);
							}}
							onMouseLeave={() => {
								if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
								hideTimeoutRef.current = setTimeout(() => {
								setHoverIndex(null);
								}, 200);
							}}
						>
							<button
								className="relative group font-bold text-base transition-colors duration-300 cursor-pointer text-[#375978] hover:text-[#F3981B]"
								title={label}
								onClick={() => router.push(path || "#")}
							>
								<span>{label}</span>
								<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#F3981B] transition-all duration-300 group-hover:w-full"></span>
							</button>
							{submenu && (
								<ul
									className={`absolute top-full left-0 z-[40] bg-[#F5F5F5] shadow-lg rounded w-full h-auto space-x-6 min-w-[200px]
												flex justify-center gap-6 px-6 py-8 transition-all duration-300 ease-out
												${hoverIndex === index 
												? "opacity-100 translate-y-0 pointer-events-auto"
												: "opacity-0 translate-y-2 pointer-events-none"
												}`}
								>
									{submenu.map((item: NavItem, i: number) => (
									<li key={i}>
										{/* 如果有 C submenu，就顯示文字，否則用 Link */}
										{item.submenu ? (
										<span className="relative block mt-2 text-base text-gray-600 font-bold rounded-xl">
											{item.label}
										</span>
										) : (
										<Link
											href={item.path}
											className="relative group block mt-2 text-base text-gray-600 font-bold rounded-xl hover:text-black transition-colors duration-300"
										>
											<span>{item.label}</span>
											<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
										</Link>
										)}

										{/* 如果有子選單 (C 層)，就展開在 B 下方 */}
										{item.submenu && (
										<ul className="mt-2 border-t border-gray-300 pt-2 space-y-2">
											{item.submenu.map((child: { label: string; path: string }, j: number) => (
											<li key={j}>
												<LinkWrapper
												href={child.path}
												className="block text-sm py-1 text-gray-500 hover:text-black transition-colors duration-300"
												>
												{child.label}
												</LinkWrapper>
											</li>
											))}
										</ul>
										)}
									</li>
									))}
								</ul>
							)}

						</li>
					))}
					<SiteWideSearch locale={s("search")} />
					<LanguageSwitcher />
				</ul>

				{/* Right - Icons & Toggle */}
				<div className="flex items-center gap-4 xl:hidden px-4">
					{/* Icon 占位用 */}
					<SiteWideSearch locale="zh" />

					{/* <Globe className="text-[#375978] hover:text-[#F3981B] hover:scale-120 transition-transform duration-300" /> */}
					<LanguageSwitcherPhone />
					{/* 手機選單按鈕 */}
					<button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
						<AlignJustify className="text-[#375978] hover:text-[#F3981B] hover:scale-120 transition-transform duration-300 cursor-pointer" />
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			{/* Mobile Menu */}
			{/* Mobile menu */}
			{isMobileMenuOpen && (
				<div className="xl:hidden bg-white pt-24 pb-10 px-10 space-y-4 shadow-lg max-h-screen overflow-y-auto">
					{navItems.map(({ label, submenu }, index) => (
						<div key={index}>
							<span className="block font-bold text-[#375978]">{label}</span>
								{submenu && (
								<ul className="pl-4 mt-2 space-y-2">58
									{submenu.map((item, i) => {
										if ("submenu" in item && Array.isArray(item.submenu)) {
											return (
												<li key={i}>
													<span className="block text-sm sm:text-base text-gray-600 font-bold py-1">
														{item.label}
													</span>
													{/* C 層 (第三層子選單) */}
													<ul className="pl-4 mt-1 space-y-1 border-l border-gray-300">
														{item.submenu.map(({ label: cLabel, path: cPath }, j) => (
															<li key={j}>
																<Link
																	href={cPath}
																	className="block text-xs sm:text-sm text-gray-500 rounded-lg p-2 hover:bg-[#375978]/10 hover:text-black transition-colors duration-300"
																>
																	{cLabel}
																</Link>
															</li>
														))}
													</ul>
												</li>
											);
										} else {
											return (
												<li key={i}>
													<Link
														href={item.path}
														className="block text-sm sm:text-base text-gray-600 font-bold rounded-lg p-2 hover:bg-[#375978]/20 hover:text-black transition-colors duration-300"
													>
														{item.label}
													</Link>
												</li>
											);
										}
									})}
								</ul>
								)}
						</div>
					))}
				</div>
			)}

		</main>
	);
}

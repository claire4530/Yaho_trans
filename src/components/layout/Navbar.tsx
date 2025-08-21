"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // 用來獲取當前路徑
import Image from "next/image";
import { AlignJustify, Search, Globe } from "lucide-react";
import LanguageSwitcher from "@/src/components/LanguageSwitcher"; 
import { i, p } from "framer-motion/client";
import { useTranslations } from "next-intl";
import LanguageSwitcherPhone from "@/src/components/LanguageSwitcherPhone";
// import SearchComponent from "@/src/components/SearchComponent"; 
import { useRouter } from "next/navigation";


const logoUrl = [
	{ label: "首頁", path: "/", imageUrl: "/YAHO_logo/logo.jpg" },
	{ label: "手機版", path: "/", imageUrl: "/YAHO_logo/logo_cut.jpg" },
]; // 替換為你的 logo 路徑

export default function Navbar() {
	const t = useTranslations("Navigation");
	const router = useRouter();

	const navItems = [
		// { label: "首頁", path: "/" ,imageUrl: "/YAHO_logo/logo.jpg"}, // 首頁
		{
			label: t('about'),
			submenu: [
				{ label: t('about_company'), path: "/about/introduction" },
				{ label: t('about_organization'), path: "/about/organization" },
				{ label: t('about_locations'), path: "/about/locations" },
				{ label: t('about_news'), path: "/about/news" },
				{ label: t('about_career'), path: "/about/career" },
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
		// { label: t('exhibition'), submenu: [{ label: t('exhibition_2025'), path: "/product/a" }] }, // 展覽活動
		// {
		// 	label: t('sustainability'),
		// 	submenu: [
		// 		{ label: t('sustainability_social'), path: "/product/a" },
		// 		{ label: t('sustainability_operations'), path: "/contact" },
		// 		{ label: t('sustainability_report'), path: "/contact" },
		// 	],
		// 	path: "/sustainability",
		// }, // 企業永續
		// {
		// 	label: t('investors'),
		// 	submenu: [
		// 		{ label: t('investors_finance'), path: "/product/a" },
		// 		{ label: t('investors_shareholders'), path: "/contact" },
		// 	],
		// 	path: "/investors",
		// }, // 投資人專區
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
		// { label: "search組件", path: "/contact" },
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
				<div className="hidden xl:flex px-6 py-4">
					<Link
						href={logoUrl[0].path}
						className={`relative group text-[#375978] font-bold text-base hover:text-[#F3981B] transition-colors duration-300`}
						title={logoUrl[0].label} // 為了在圖片上顯示提示文字
					>
						<Image
							src={logoUrl[0].imageUrl}
							alt={logoUrl[0].label}
							width={300}
							height={40}
							className="inline-block hover:scale-105 transition-transform duration-300"
						/>
					</Link>
				</div>
				{/* 左邊 Logo 手機 */}
				<div className="block xl:hidden py-2">
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
				<ul className="hidden xl:flex space-x-6 gap-6 items-center p-6">
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
								<ul className={`absolute top-full left-0 z-[40] bg-[#F5F5F5] shadow-lg rounded w-full h-26 space-x-6 min-w-[200px]
												flex justify-center gap-6 px-6 py-8 transition-all duration-300 ease-out
												${hoverIndex === index 
												? "opacity-100 translate-y-0 pointer-events-auto"
												: "opacity-0 translate-y-2 pointer-events-none"
												}`}
        							>
									{submenu.map(({ label, path }, i) => (
										<li key={i}>
											<Link
												href={path}
												className="relative group block mt-2 text-base text-gray-600 font-bold rounded-xl hover:text-black transition-colors duration-300"
											>
												<span>{label}</span>
												<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
					<LanguageSwitcher />
				</ul>

				{/* Right - Icons & Toggle */}
				<div className="flex items-center gap-4 xl:hidden px-4">
					{/* Icon 占位用 */}
					<Search className="text-[#375978] hover:text-[#F3981B] hover:scale-120 transition-transform duration-300 cursor-pointer" />
					<Globe className="text-[#375978] hover:text-[#F3981B] hover:scale-120 transition-transform duration-300" />
					{/* <LanguageSwitcherPhone /> */}
					{/* 手機選單按鈕 */}
					<button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
						<AlignJustify className="text-[#375978] hover:text-[#F3981B] hover:scale-120 transition-transform duration-300 cursor-pointer" />
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="xl:hidden bg-white pt-24 pb-10 px-10 space-y-4 shadow-lg max-h-screen overflow-y-auto ">
					{navItems.map(({ label, submenu }, index) => (
						<div key={index}>
							<span className="block font-bold text-[#375978]">{label}</span>
							{submenu && (
								<ul className="pl-4 mt-2">
									{submenu.map(({ label, path }, i) => (
										<li key={i}>
											<Link
												href={path}
												className="relative group block mt-2 text-sm sm:text-base text-gray-600 font-bold rounded-lg p-2 hover:bg-[#375978]/20 hover:text-black transition-colors duration-300"
											>
												<span>{label}</span>
												{/* <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span> */}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			)}
		</main>
	);
}

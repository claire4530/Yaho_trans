"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";

export default function SustainabilityPage() {
	//   const t = useTranslations("sustainability");

	const sections = [
		// {
		//   title: "社會關懷",
		//   desc: "我們致力於社會責任，關注弱勢群體。",
		//   href: "/sustainability/social-care",
		//   img: "/sustainability/2.jpg",
		// },
		{
		title: "永續經營",
		desc: "我們致力於永續經營，實現經濟、社會與環境的平衡發展。",
		href: "/sustainability/operations",
		img: "/sustainability/3.jpg",
		},
		{
		title: "永續報告書下載",
		desc: "我們致力於透明與負責任的永續報告。",
		href: "/sustainability/reports",
		img: "/sustainability/4.png",
		},
	];

	return (
		<div className="overflow-x-hidden">
			{/* 圖片 */}
			<div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
				<Image
				src="/sustainability/1.jpg"
				alt="Sustainability"
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
					首頁
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink
					href="/sustainability"
					className="text-sm sm:text-base font-semibold"
					>
					企業永續
					</BreadcrumbLink>
				</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

			<SlideInFromLeft delay={0.3}>
				{/* 標題區塊 */}
				<div className="flex flex-col text-center py-6">
					<h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">
					Sustainability
					</h2>
					<span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
					<h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
					企業永續
					</h3>
				</div>
			</SlideInFromLeft>

			<ZoomIn delay={0.5}>
				{/* 三張卡片 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-12 max-w-5xl mx-auto">
					{sections.map((section, index) => (
					<Link href={section.href} key={index}>
						<Card className="pt-0  rounded-2xl shadow-lg hover:shadow-xl hover:scale-103 transition-transform duration-300 cursor-pointer overflow-hidden">
						<div className="relative w-full h-48">
							<Image
							src={section.img}
							alt={section.title}
							fill
							className="object-cover"
							/>
						</div>
						<CardContent className="pb-4 ">
							<h4 className="text-lg font-semibold text-gray-800 mb-2">
							{section.title}
							</h4>
							<p className="text-sm text-gray-600 h-10 xl:h-5">{section.desc}</p>
						</CardContent>
						</Card>
					</Link>
					))}
				</div>
			</ZoomIn>
		</div>
	);
}

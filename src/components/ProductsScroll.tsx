import * as React from "react";
import Image from "next/image";
import FadeInUp from "@/src/components/animations/FadeInUp";
import ZoomIn from "@/src/components/animations/ZoomIn";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import AboutLink from "./AboutLink";
import SlideInFromLeft from "./animations/SlideInFromLeft";
import { useTranslations } from "next-intl";

const slides = [
	{ image: "/products/1.png" },
	{ image: "/products/2.png" },
	{ image: "/products/3.png" },
	{ image: "/products/1.png" },
	{ image: "/products/2.png" },
	
];

export default function ProductsScroll() {
	const t = useTranslations("ProductsScroll");
	return (
		<div className="relative w-full px-4">
			<FadeInUp delay={0.2}>
				{/* 卡片滑動功能 */}
				<Carousel className="w-full max-w-6xl mx-auto mb-4">
					<CarouselContent className="gap-4">
						{slides.map((slide, index) => (
							<CarouselItem
								key={index}
								className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3" 
							>
								{/* 初始隱藏 sm與md狀態下顯示 */}
								<div className="hidden sm:flex md:flex relative w-full sm:h-[400px] md:h-[500px] overflow-hidden aspect-[4/3]">
									<Image
										src={slide.image}
										alt={`Slide ${index}`}
										fill
										className="transition-transform duration-500 ease-in-out hover:scale-110 object-cover"
									/>
								</div>
								{/* 初始顯示 sm以上隱藏 */}
								<div className="block sm:hidden md:hidden relative w-full h-[300px] overflow-hidden  ">
									<Image
										src={slide.image}
										alt={`Slide ${index}`}
										fill										
										className="transition-transform duration-500 ease-in-out hover:scale-110 object-cover"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</FadeInUp>
			{/* 卡片下方的文字方塊 自動排序換行*/}
			<div className="flex flex-wrap gap-4 justify-center sm:-mt-[120px] ">
				{/* 卡片大小 */}
				<div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto relative rounded-lg shadow-xl bg-white transition-transform duration-500 ease-in-out hover:scale-103">
					{/* 卡片內容 */}
					<div className="group">
						<FadeInUp delay={0.2}>
							<div className="p-6 md:p-8 grid gap-2">
								{/* 標題 */}
								<h2 className="text-xl md:text-2xl font-bold text-black group-hover:text-[#375978]">
									{t("title1")}
								</h2>
								{/* 下方橫線 初始隱藏 md以上顯示 */}
								<span className="hidden md:flex absolute left-8 top-18 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[100px]"></span>
								{/* 下方橫線 初始顯示 md以下隱藏 */}
								<span className="block md:hidden absolute left-6 top-16 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[80px]"></span>
							</div>
							{/* 描述文字 */}
							<p className="text-sm md:text-lg text-gray-600 md:p-8 p-5 sm:leading-8">
								&nbsp;&nbsp;&nbsp;&nbsp;{t("description1")}
							</p>
						</FadeInUp>
					</div>
					{/* 連結組件 */}
					<div className="px-6 pb-6 flex justify-end">
						<AboutLink text="Read more" href="/services/project" />
					</div>
				</div>
				{/* 第二張卡片 */}
				{/* 卡片大小 */}
				<div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto relative rounded-lg shadow-xl bg-white transition-transform duration-500 ease-in-out hover:scale-103">
					{/* 卡片內容 */}
					<div className="group">
						<FadeInUp delay={0.2}>
							<div className="p-6 md:p-8 grid gap-2">
								{/* 標題 */}
								<h2 className="text-xl md:text-2xl font-bold text-black group-hover:text-[#375978]">
									{t("title2")}
								</h2>
								{/* 下方橫線 初始顯示 md以下隱藏 */}
								<span className="block md:hidden absolute left-6 top-16 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[80px]"></span>
								{/* 下方橫線 初始隱藏 md以上顯示 */}
								<span className="hidden md:flex absolute left-8 top-18 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[100px]"></span>
							</div>
							{/* 描述文字 */}
							<p className="text-sm md:text-lg text-gray-600 md:p-8 p-5 sm:leading-8">
								&nbsp;&nbsp;&nbsp;&nbsp;{t("description2")}
							</p>
						</FadeInUp>
					</div>
					{/* 連結組件 */}
					<div className="px-6 pb-6 flex justify-end">
						<AboutLink text="Read more" href="/services/result" />
					</div>
				</div>
			</div>
		</div>
	);
}

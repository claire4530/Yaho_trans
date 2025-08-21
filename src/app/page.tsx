"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CoreValue from "@/src/components/CoreValue";
import AboutLink from "@/src/components/AboutLink";
import ProductsScroll from "@/src/components/ProductsScroll";
import LetterFadeIn from "@/src/components/animations/LetterFadeIn";
import FadeIn from "@/src/components/animations/FadeIn";
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";
import FadeInUp from "@/src/components/animations/FadeInUp";
import Exhibition from "@/src/components/Exhibition";
import WorldMap from "@/src/components/WorldMap";
import { useTranslations } from "next-intl";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations("HomePage");
  
//   最上方圖片跑馬燈
  const slides = [
	{
	  image: "/frontPage/1.jpg",
	  slogan: t("slidesSlogan.0"),
	},
	{
	  image: "/frontPage/2.jpg",
	  slogan: t("slidesSlogan.1"),
	},
	{
	  image: "/frontPage/3.jpg",
	  slogan: t("slidesSlogan.2"),
	},
	{
	  image: "/frontPage/4.jpg",
	  slogan: t("slidesSlogan.3"),
	},
	{
	  image: "/frontPage/5.jpg",
	  slogan: t("slidesSlogan.4"),
	},
  ];

  const startAutoSlide = () => {
	intervalRef.current = setInterval(() => {
	  setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, 5000);
  };

  const stopAutoSlide = () => {
	if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // 初始啟動輪播
  useEffect(() => {
	startAutoSlide();
	return () => {
	  stopAutoSlide();
	};
  }, []);

  const handleManualChange = (direction: "next" | "prev") => {
	stopAutoSlide();

	setCurrentSlide((prev) => {
	  if (direction === "next") return (prev + 1) % slides.length;
	  return (prev - 1 + slides.length) % slides.length;
	});

	// 延後重啟自動輪播
	if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
	pauseTimeoutRef.current = setTimeout(() => {
	  startAutoSlide();
	}, 3000); // 暫停 3 秒後恢復自動輪播
  };

  return (
	<main className="overflow-x-hidden">
		{/* 首頁圖片跑馬燈 */}
		<div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
			{slides.map((slide, index) => (
			<div
				key={index}
				className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
				index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
				}`}
			>
				<Image
				src={slide.image}
				alt={`Slide ${index}`}
				layout="fill"
				objectFit="cover"
				priority={index === 0}
				/>
				{/* 跑馬燈圖片標題 */}
				<div className="absolute inset-0 flex items-center bg-white/20">
				<SlideInFromLeft delay={0.2}>
					<h2 className="text-[#375978] text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold p-8 md:px-20 md:py-15 lg:px-30 lg:py-20 bg-white/70">
						{slide.slogan}
					</h2>
				</SlideInFromLeft>
				</div>
			</div>
			))}

			{/* 手動切換按鈕 */}
			<div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex gap-4 z-20">
				<button
					onClick={() => handleManualChange("prev")}
					className="bg-white text-[#375978] font-bold p-2 md:px-4 md:py-2 rounded shadow hover:bg-gray-200 transition"
				>
					<ChevronLeft />
				</button>
				<button
					onClick={() => handleManualChange("next")}
					className=" bg-[#F3981B] text-white font-bold p-2 md:px-4 md:py-2 rounded shadow hover:bg-[#DF870E] hover:text-white transition"
				>
					<ChevronRight />
				</button>
			</div>

			{/* 指示點 */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
			{slides.map((_, index) => (
				<span
				key={index}
				className={`md:w-3 md:h-3 w-2 h-2 rounded-full ${
					currentSlide === index ? "bg-white" : "bg-gray-400"
				}`}
				/>
			))}
			</div>
		</div>
		{/* 標題與描述 */}
		<div className="flex items-center w-full">
			{/* 左側空白區 */}
			<div className="hidden 2xl:block w-[80px] h-full" />

			{/* 中間主要內容 */}
			<div className="flex flex-col justify-center flex-1 ">
				<FadeIn delay={0.2}>
					{/* 主標題 橘黑色穿插文字 */}
					<h2 className="text-3xl md:text-5xl lg:text-6xl px-9 pt-9 md:pt-14 md:pr-0 md:pl-14 lg:pt-24 lg:px-30 xl:pr-15 2xl:text-center font-extrabold items-center leading-[1.5]">
						<span>{t("title1")}</span>
						<span className="text-[#F3981B]">{t("titleOrange1")}</span>
						{t("title2")}
						<span className="text-[#F3981B]">{t("titleOrange2")}</span>
						{t("title3")}
					</h2>
					{/* 副標題 */}
					<p className="text-base p-9 md:text-2xl lg:text-3xl font-bold md:pt-10 md:pr-0 md:pl-14 lg:px-30 2xl:text-center text-[#535353]">
						{t("description")}
					</p>
				</FadeIn>

				{/* 線條 */}
				<span className="hidden 2xl:block w-[70%] sm:w-[50%] max-w-[1000px] h-[1px] bg-black mx-auto my-4" />
				<span className="block 2xl:hidden w-[70%] sm:w-[50%] max-w-[1000px] h-[1px] bg-black mx-auto sm:mx-30 my-4" />

				{/* 說明內容-2xl顯示 */}
				<span className="hidden 2xl:block max-w-[900px] mx-auto leading-10">{t("descriptionDetail1")}</span>
				{/* 說明內容-2xl隱藏 2xl以下顯示 */}
				<div className="block 2xl:hidden font-bold text-[#535353] text-sm p-9 md:text-xl md:pr-0 md:pl-14 lg:ml-24 xl:pl-0">
					<p className="sm:w-[480px] lg:w-[680px] xl:w-[900px] leading-6 sm:leading-8 md:leading-10">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("descriptionDetail1")}
					</p>
				</div>

				{/* 核心價值 + About us 按鈕 */}
				<div className="relative w-full px-4 mx-auto overflow-hidden">
					{/* 核心價值組件 */}
					<div>
						<SlideInFromLeft delay={0.2}>
							<CoreValue />
						</SlideInFromLeft>
					</div>
					{/* 連結組件 */}
					<div className="flex justify-end w-full xl:px-16 p-2">
						<AboutLink text="About us" href="/about/introduction" />
					</div>
				</div>
			</div>

			{/* 右側圖片區 - AboutUS側邊圖片*/}
			<div className="hidden md:flex w-[120px] h-full items-center justify-center">
				<img src="/frontPage/About us.png" alt="Side" className="object-contain max-h-[400px]" />
			</div>
		</div>

		{/* 產品服務區域 底部添加陰影 */}
		<div className="w-full h-full shadow-[0_26px_35px_rgba(0,0,0,0.10)] ">
			{/* 產品服務標題 橘黑配色 */}
			<div className="text-3xl md:text-5xl lg:text-6xl font-extrabold justify-center text-center mt-20 md:mt-40 font-[Lato] tracking-wide">
				<ZoomIn delay={0.2}>
					<span className="text-[#F3981B]">Products&nbsp;</span>& Service
				</ZoomIn>
			</div>
			{/* 產品服務中文標題 */}
			<FadeIn delay={0.3}>
				<h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold p-4 md:p-8 justify-center text-center">
					{t("productsAndServices")}
				</h2>
			</FadeIn>
			{/* 產品服務組件 */}
			<div className="flex justify-center pt-8 pb-16  ">
				<ProductsScroll />
			</div>
		</div>
		{/* 展覽區域 */}
		<div className="flex justify-center relative h-[510px] mx-4 my-20 sm:my-20 md:my-24 lg:mt-32">
			{/* 展覽區域背景-灰 */}
			<div className="relative w-full max-w-[1000px] h-auto sm:h-[400px] md:h-[400px] mx-auto px-8 md:px-10 py-8 md:py-14 bg-gray-200 rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105">
				{/* 展覽標題 橘黑色穿插文字 */}
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-[Lato] absolute -top-4 md:-top-8 inset-0 text-center tracking-wide">
					<ZoomIn delay={0.2}>
						Exhibi<span className="text-[#F3981B]">tion</span>
					</ZoomIn>
				</h2>
				{/* 展覽組件 列出展覽日期與內容 */}
				<div className="w-full">
					<ZoomIn delay={0.2}>
						<Exhibition />
					</ZoomIn>
				</div>
			</div>
			{/* 連結組件 */}
			{/* <div className="absolute -bottom-13 right-4 sm:bottom-12 md:right-4 md:bottom-10">
				<AboutLink text="Read more" href="/about" />
			</div> */}
		</div>
		{/* 世界地圖 */}
		<div className="w-full">
			<div className="m-4 xl:m-16 bg-[#b3b3b3] rounded-lg">
				<WorldMap />
			</div>
		</div>
	</main>
  );
}

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
} from "@/src/components/ui/carousel";
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
				<Carousel className="w-full max-w-6xl mx-auto mb-4">
					<CarouselContent className="gap-4">
						{slides.map((slide, index) => (
							<CarouselItem
								key={index}
								className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3" 
							>
								<div className="hidden sm:flex md:flex relative w-full sm:h-[400px] md:h-[500px] overflow-hidden aspect-[4/3]">
									<Image
										src={slide.image}
										alt={`Slide ${index}`}
										fill
										className="transition-transform duration-500 ease-in-out hover:scale-110 object-cover"
									/>
								</div>
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
			<div className="flex flex-wrap gap-4 justify-center sm:-mt-[120px] ">
				<div className="w-[400px] h-[240px] sm:w-[330px] sm:h-[300px] md:w-[350px] md:h-[400px] lg:h-[400px] relative rounded-lg shadow-xl bg-white transition-transform duration-500 ease-in-out hover:scale-103">
					<div className="group">
						<FadeInUp delay={0.2}>
							<div className="p-6 md:p-8 grid gap-2">
								<h2 className="text-xl md:text-3xl font-bold text-black group-hover:text-[#375978]">
									{t("title1")}
								</h2>
								<span className="hidden md:flex absolute left-8 top-20 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[120px]"></span>
								<span className="block md:hidden absolute left-6 top-16 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[80px]"></span>
							</div>
							<p className="text-sm md:text-lg text-gray-600 md:p-8 p-5 sm:leading-8">
								&nbsp;&nbsp;&nbsp;&nbsp;{t("description1")}
							</p>
						</FadeInUp>
					</div>
					<div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
						<AboutLink text="Read more" href="/about" />
					</div>
				</div>
				<div className="w-[400px] h-[240px] sm:w-[330px] sm:h-[300px] md:w-[350px] md:h-[400px] lg:h-[400px] relative rounded-lg shadow-xl bg-white transition-transform duration-500 ease-in-out hover:scale-103">
					<div className="group">
						<FadeInUp delay={0.2}>
							<div className="p-6 md:p-8 grid gap-2">
								<h2 className="text-xl md:text-3xl font-bold text-black group-hover:text-[#375978]">
									{t("title2")}
								</h2>
								<span className="block md:hidden absolute left-6 top-16 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[80px]"></span>
								<span className="hidden md:flex absolute left-8 top-20 w-0 h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-[120px]"></span>
							</div>
							<p className="text-sm md:text-lg text-gray-600 md:p-8 p-5 sm:leading-8">
								&nbsp;&nbsp;&nbsp;&nbsp;{t("description2")}
							</p>
						</FadeInUp>
					</div>
					<div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
						<AboutLink text="Read more" href="/about" />
					</div>
				</div>
			</div>
		</div>
	);
}

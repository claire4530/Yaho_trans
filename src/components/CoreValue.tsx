import * as React from "react";
import Image from "next/image";
import { Dot } from 'lucide-react';
import { Card, CardContent } from "@/src/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/src/components/ui/carousel";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FadeInUp from "@/src/components/animations/FadeInUp";

export default function CoreValue() {
	const t = useTranslations("CoreValue");

	const slides = [
		{
			image: "/coreValue/1.png",
			slogan: t("slide1.slogan"),
			details: t("slide1.details"),
		},
		{
			image: "/coreValue/2.png",
			slogan: t("slide2.slogan"),
			details: t("slide2.details"),
		},
		{
			image: "/coreValue/3.png",
			slogan: t("slide3.slogan"),
			details: t("slide3.details"),
		},
		{
			image: "/coreValue/4.png",
			slogan: t("slide4.slogan"),
			details: t("slide4.details"),
		},
		{
			image: "/coreValue/5.png",
			slogan: t("slide5.slogan"),
			details: t("slide5.details"),
		},
	];
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	return (
		<div className="w-full px-4 pt-8 lg:px-24 max-w-screen-xl mx-auto">
			<Carousel className="w-full">
				<CarouselContent className="w-full">
					{slides.map((slide, index) => (
						<CarouselItem
							key={index}
						>
							<div className="relative h-[320px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden rounded-lg ml-2">
								<Image
									src={slide.image}
									alt={`Slide ${index}`}
									fill
									className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
								/>
								<div className="absolute bottom-0 right-0 p-2 xl:p-8">
									<FadeInUp delay={0.2}>
										<div className="group bg-white/80 hover:bg-white/90 w-fit max-w-full xl:w-[400px] p-4 md:p-8 rounded-lg shadow-md hover:scale-95 xl:hover:scale-105 transition-transform duration-300">
											<p className="text-lg md:text-xl xl:text-2xl font-bold text-[#375978] py-2 flex gap-2">
												{slide.slogan}
											</p>
											<div className="relative inline-block">
												<span className="absolute w-0 h-[2px] md:h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-full xl:group-hover:w-[330px]"></span>
												<p className="mt-6 text-sm sm:text-base md:text-base font-medium text-black leading-6 xl:leading-8">
													{slide.details}
												</p>
											</div>
										</div>
									</FadeInUp>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}

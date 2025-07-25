"use client";

import React, { useEffect, useState, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import ZoomIn from "@/src/components/animations/ZoomIn";
import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import SlideInFromLeft from "./animations/SlideInFromLeft";
import FadeInUp from "./animations/FadeInUp";
import AboutLinkWhite from "./AboutLinkWhite";
import { useTranslations } from "next-intl";

type Branch = {
	name: string;
	href: string;
};

type RegionData = {
	regionTitle: string;
	branches: Branch[];
};

export default function GlobalMap() {
	const [regionData, setRegionData] = useState<RegionData | null>(null);
	const infoBoxRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("GlobalMap");

	const mockRegionData: RegionData = {
		regionTitle: t("Taiwan.title"),
		branches: [
			{ name: t("Taiwan.branches1"), href: "/about" },
			{ name: t("Taiwan.branches2"), href: "/about" },
			{ name: t("Taiwan.branches3"), href: "/about" },
		],
	};

	const mockRegionData2: RegionData = {
		regionTitle: t("USA.title"),
		branches: [
			{ name: t("USA.branches1"), href: "/about" },
		],
	};

	const mockRegionData3: RegionData = {
		regionTitle: t("Germany.title"),
		branches: [
			{ name: t("Germany.branches1"), href: "/about" },
		],
	};
	const mockRegionData4: RegionData = {
		regionTitle: t("Singapore.title"),
		branches: [
			{ name: t("Singapore.branches1"), href: "/about" },
		],
	};
	const mockRegionData5: RegionData = {
		regionTitle: t("Japan.title"),
		branches: [
			{ name: t("Japan.branches1"), href: "/about" },
		],
	};

	const regionDataMap: Record<string, RegionData> = {
		台灣據點: mockRegionData,
		美國據點: mockRegionData2,
		德國據點: mockRegionData3,
		新加坡據點: mockRegionData4,
		日本據點: mockRegionData5,
	};

	useEffect(() => {
		const root = am5.Root.new("global-map");

		root.setThemes([am5themes_Animated.new(root)]);

		const chart = root.container.children.push(
			am5map.MapChart.new(root, {
				projection: am5map.geoMercator(),
				panX: "translateX",
				panY: "translateY",
				wheelX: "none",		
				wheelY: "none",
				pinchZoom: true,
			})
		);

		const polygonSeries = chart.series.push(
			am5map.MapPolygonSeries.new(root, {
				geoJSON: am5geodata_worldLow,
				exclude: ["AQ"],
			})
		);

		polygonSeries.mapPolygons.template.setAll({
			//   tooltipText: "{name}",
			interactive: true,
			fill: am5.color(0x888888),
			stroke: am5.color(0xcccccc),
		});

		polygonSeries.mapPolygons.template.states.create("hover", {
			fill: am5.color(0x375978),
		});

		const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

		pointSeries.bullets.push(function (root, series, dataItem) {
			const container = am5.Container.new(root, {});

			const circle = am5.Circle.new(root, {
				radius: 10,
				fill: am5.color(0xFFCC5D),
				fillOpacity: 0.6,       
				tooltipText: (dataItem.dataContext as { title: string }).title,
				cursorOverStyle: "pointer",
			});

			container.children.push(circle);

			circle.events.on("click", () => {
				const regionTitle = (dataItem.dataContext as { title: string }).title;
				const data = regionDataMap[regionTitle];
				if (data) {
					setTimeout(() => {
						setRegionData(data);
					}, 0); // 延遲到下一輪事件循環
				}
			});

			circle.events.on("pointerover", () => {
				circle.animate({
					key: "scale",
					to: 1.5,
					duration: 300,
					easing: am5.ease.out(am5.ease.cubic)
				});
			});
			// 👈 滑鼠移出還原
			circle.events.on("pointerout", () => {
				circle.animate({
					key: "scale",
					to: 1,
					duration: 300,
					easing: am5.ease.out(am5.ease.cubic)
				});
			});

			return am5.Bullet.new(root, {
				sprite: container,
			});
		});

		pointSeries.data.setAll([
		{
			title: "台灣據點",
			geometry: {
			type: "Point",
			coordinates: [121.5654, 25.033], // 台北
			},
		},
		{
			title: "美國據點",
			geometry: {
			type: "Point",
			coordinates: [-118.2437, 34.0522], // 洛杉磯
			},
		},
		{
			title: "德國據點",
			geometry: {
			type: "Point",
			coordinates: [13.4050, 52.5200], // 柏林
			},
		},
		{
			title: "新加坡據點",
			geometry: {
			type: "Point",
			coordinates: [103.8198, 1.3521], // 新加坡
			},
		},
		{
			title: "日本據點",
			geometry: {
			type: "Point",
			coordinates: [139.6917, 35.6895], // 東京
			},
		},
		]);

		return () => {
			root.dispose();
		};
	}, []);

	// 關閉 infoBox 的點擊事件處理器
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				infoBoxRef.current &&
				!infoBoxRef.current.contains(event.target as Node)
			) {
				setRegionData(null); // 關掉 infoBox
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative p-4 xl:p-20 ">
			<ZoomIn delay={0.2}>
				<div className="text-3xl lg:text-5xl xl:text-6xl flex flex-col gap-3 sm:gap-7  sm:px-24 font-[Lato] tracking-wider mt-2 mb-20">
					<div className="flex gap-2 items-center justify-center">
						<span className="font-extrabold text-[#FFCC5D]">Global&nbsp;</span>
						<span className="font-extrabold text-[#FFFFFF]">Locations</span>
					</div>
					<span className="text-center text-[#FFFFFF]">{t("title")}</span>
				</div>
			</ZoomIn>
			<FadeInUp delay={0.2}>
				<div className="w-full h-[350px] lg:h-[600px] xl:h-[700px] overflow-auto mt-2 mb-20 sm:ml-5">
					<div id="global-map" className="w-[600px] sm:w-[700px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] h-full"/>
				</div>
			</FadeInUp>
			
			{regionData && (
				<div
					ref={infoBoxRef}
					id="infoBox"
					className={`absolute top-40 lg:top-80 lg:left-95 xl:top-100 xl:left-120 bg-[#EFEFEF]/80 py-4 xl:p-6 shadow-lg rounded-md w-[250px] xl:w-[450px] hover:scale-105 transition-transform duration-300 ${
						regionData ? "block" : "hidden"
					}`}
				>
					<SlideInFromLeft delay={0.2}>
						<div
							id="regionTitle"
							className="text-lg xl:text-2xl grid p-2 tracking-wide font-black gap-4"
						>
							<div className="flex gap-2">
								<div className="mt-1 ml-4">
									<MapPin size={24} strokeWidth={3} color="#1C466C" />
								</div>
								<span className="text-[#1C466C]">
									{regionData.regionTitle}
								</span>
							</div>
							<span className="w-[200px] xl:w-[360px] h-[2px] bg-[#1C466C] ml-4"></span>
						</div>
					</SlideInFromLeft>

					<ul className="space-y-6 text-[#1C466C] px-6 py-4 ">
						{regionData.branches.map((branch, idx) => (
							<React.Fragment key={idx}>
								<SlideInFromLeft delay={0.2}>
									<li className="flex flex-col xl:flex-row justify-between items-center bg-[#ffffff] rounded-lg p-2 xl:p-4 hover:scale-95 transition-transform duration-300">
										<div className="text-md xl:text-xl font-bold">{branch.name}</div>
										<div className="">
											<AboutLinkWhite text="Read More" href={branch.href} />
										</div>
									</li>
								</SlideInFromLeft>
								{/* <hr className="border border-[#1C466C]" /> */}
							</React.Fragment>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

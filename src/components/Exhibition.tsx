'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from "next-intl";

type ExhibitionItem = {
		dateRange: string;
		title: string;
		href?: string; // 可選的 href 屬性
};


export default function Exhibition() {
	
	const t = useTranslations("Exhibition");
	{/* 抓後台資料 */}
	const mockExhibitions: ExhibitionItem[] = [
		{
			dateRange: t('exhibition1.dateRange'),
			title: t('exhibition1.title'),
			href: "/about",
		},
		{
			dateRange: t('exhibition2.dateRange'),
			title: t('exhibition2.title'),
			href: "/about",
		},
		{
			dateRange: t('exhibition3.dateRange'),
			title: t('exhibition3.title'),
			href: "/about",
		},
		{
			dateRange: t('exhibition4.dateRange'),
			title: t('exhibition4.title'),
			href: "/about",
		},
		{
			dateRange: t('exhibition5.dateRange'),
			title: t('exhibition5.title'),
			href: "/about",
		},
	];
	return (
		<div className="space-y-6">
			{mockExhibitions.slice(0, 4).map((item, index) => (
				<div key={index}>
					<div className="py-2 sm:mt-4 px-8 hidden sm:grid md:grid">
						<div className="flex justify-between items-start pb-1">
							<p className="text-sm font-[Lato] tracking-widest text-black">{item.dateRange}</p>
							<span  className="text-lg font-semibold text-black inline-block font-[Lato]" >{item.title}</span>
						</div>
						{index < 4 && <hr className="border border-black w-full " />}
					</div>
					<div className="block sm:hidden md:hidden space-y-2 w-full mt-8 max-w-[500px] mx-auto">
						<div className="flex flex-col gap-4 pb-1">
							<span className="text-sm font-[Lato] tracking-widest text-black">{item.dateRange}</span>
							<span  className="text-sm font-semibold text-black inline-block font-[Lato] " >{item.title}</span>
						</div>
						{index < 4 && <hr className="border border-black w-full" />}
					</div>
				</div>
			))}
		</div>
	);
}
																																					
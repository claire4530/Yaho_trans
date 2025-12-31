// app/[locale]/about/locations/LocationsClient.tsx
"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import Link from "next/link"
import Image from "next/image";
import LocationSelector from "@/src/components/LocationSelector";

// 定義 Props
interface Props {
  locations: any[]; // 從資料庫抓來的資料
}

export default function LocationsClient({ locations = [] }: Props) {
    const t = useTranslations("about");

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/about/location/1.jpg" 
                    alt="Locations Banner" 
                    fill // 建議改用 fill 取代 layout="fill"
                    className="object-cover" // 取代 objectFit="cover"
                    priority
            />
        </div>
        <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
                        {t("introduction.homepage")}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/introduction" className="text-sm sm:text-base font-semibold">{t("locations.about")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/locations" className="text-sm sm:text-base font-semibold">{t("locations.title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 地圖據點標題 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("locations.title")}
        </div>
        <div className="w-full">
            {/* ★ 關鍵：把資料庫的資料傳進去給選單元件使用 */}
            <LocationSelector locations={locations} />
        </div>
    </div>
  );            
}
"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import Link from "next/link"
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";
import FadeIn from "@/src/components/animations/FadeIn";
import FadeInUp from "@/src/components/animations/FadeInUp";
import Image from "next/image";
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button";
import WorldMap from "@/src/components/WorldMap";
import LocationSelector from "@/src/components/LocationSelector";

export default function NewsPage() {
    const t = useTranslations("about");

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/about/location/1.jpg" 
                    alt="Example Image" 
                    layout="fill"
                    objectFit="cover"/>
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
            {/* <div className="m-4 xl:m-16 bg-[#b3b3b3] rounded-lg">
            <WorldMap />
            </div> */}
            <LocationSelector />
        </div>
    </div>
  );            
}
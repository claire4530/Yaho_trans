"use client";
import React, { useState } from "react";
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
import Timeline from "@/src/components/TimeLine";
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";
import FadeInUp from "@/src/components/animations/FadeInUp";
import Image from "next/image";

export default function OrganizationPage() {
    const t = useTranslations("about");

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/frontPage/4.jpg" 
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
                        <Link href="/about/introduction" className="text-sm sm:text-base font-semibold">{t("organization.about")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/organization" className="text-sm sm:text-base font-semibold">{t("organization.title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 公司組織標題 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("organization.title")}
        </div>
        {/* 公司組織圖 */}
        <div className="font-normal text-lg pt-8 pb-18 m-4 leading-9">
            <Image src="/about/organization/912.jpg" 
                alt="Example Image"
                width={800} height={600} 
                className="w-full h-auto" />
        </div>
        {/* <div className="p-4" style={{ overflow: "auto" }}>
            <div style={{ transform: "scale(1.5)", transformOrigin: "top left" }}>
                <img
                    src="/about/organization/2.svg"
                    alt="Organization Chart"
                />
            </div>
        </div> */}
    </div>
  );            
}
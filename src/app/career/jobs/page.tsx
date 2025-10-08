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
import Image from "next/image";

export default function IntroductionPage() {
    const t = useTranslations("career");

  return (
    <div className="overflow-x-hidden ">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/about/career/1.jpg" 
                alt="Front Page" 
                layout="fill"
				objectFit="cover"/>
        </div>
        <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
                        {t("homepage")}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/career" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/career/jobs" className="text-sm sm:text-base font-semibold">{t("jobs")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 公司簡介 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("jobs")}
        </div>
        <SlideInFromLeft delay={0.2}>
            <div className="font-normal text-base lg:text-lg  xl:pt-8 m-2 md:m-4 leading-9 xl:my-10 xl:px-30 mb-10">
                <p className="my-4 mx-8 md:mx-20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("jobs-description2")}</p>
                <div className="flex md:gap-8">
                    
                    <p className="my-4 mx-8 md:ml-20">{t("jobs-more")}</p>
                    <Link
                        href="https://www.104.com.tw/company/1a2x6bjp2x?jobsource=google"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#f8af49] text-white px-4 sm:px-8 py-2 rounded-xl inline-flex items-center justify-center
                        hover:bg-[#F3981B] transition-colors duration-300"
                        >
                        {t("jobs-104")}
                    </Link>
                </div>
                

            </div>
        </SlideInFromLeft> 
    </div>
  );            
}
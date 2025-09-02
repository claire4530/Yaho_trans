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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  ChevronDown,
  Banknote,
  BarChart,
  Gift,
  ShieldCheck,
  Wallet
} from "lucide-react"
import LinkWrapper from "@/src/components/LinkWrapper";

export default function IntroductionPage() {
    const t = useTranslations("about");
    const trainingList = [
        {
            title: t("career.training.tr1"),
            href: "/about/career/training/tr1"
        },
        {
            title: t("career.training.tr2"),
            href: "/about/career/training/tr2"
        },
        {
            title: t("career.training.tr3"),
            href: "/about/career/training/tr3"
        },
        {
            title: t("career.training.tr2"),
            href: "/about/career/training/tr2"
        },
        {
            title: t("career.training.tr3"),
            href: "/about/career/training/tr3"
        },
        {
            title: t("career.training.tr1"),
            href: "/about/career/training/tr1"
        },
    ];

    const benefitData = [
        {
            subtitle: t("career.benefits.subtitle1"),
            contents: [
            t("career.benefits.description1.content1"),
            t("career.benefits.description1.content2"),
            t("career.benefits.description1.content3"),
            t("career.benefits.description1.content4"),
            ],
            icon: <Banknote className="h-8 w-8 text-[#375978] " />
        },
        {
            subtitle: t("career.benefits.subtitle2"),
            contents: [
            t("career.benefits.description2.content1"),
            t("career.benefits.description2.content2"),
            ],
            icon: <BarChart className="h-8 w-8 text-[#375978] " />
        },
        {
            subtitle: t("career.benefits.subtitle3"),
            contents: [
            t("career.benefits.description3.content1"),
            t("career.benefits.description3.content2"),
            ],
            icon: <Gift className="h-8 w-8 text-[#375978] " />
        },
        {
            subtitle: t("career.benefits.subtitle4"),
            contents: [
            t("career.benefits.description4.content1"),
            ],
            icon: <ShieldCheck className="h-8 w-8 text-[#375978] " />
        },
        {
            subtitle: t("career.benefits.subtitle5"),
            contents: [
            t("career.benefits.description5.content1"),
            t("career.benefits.description5.content2"),
            t("career.benefits.description5.content3"),
            t("career.benefits.description5.content4"),
            t("career.benefits.description5.content5"),
            t("career.benefits.description5.content6"),
            ],
            icon: <Wallet className="h-8 w-8 text-[#375978] " />
        },
        {
            subtitle: t("career.benefits.subtitle6"),
            contents: [
            ],
            icon: <Banknote className="h-8 w-8 text-[#375978] " />
        }
    ];

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
                        {t("introduction.homepage")}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/introduction" className="text-sm sm:text-base font-semibold">{t("career.about")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/career" className="text-sm sm:text-base font-semibold">{t("career.title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

        {/* 公司簡介 */}
        <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("career.title")}
        </div>
        <SlideInFromLeft delay={0.2}>
            <div className="font-normal text-base lg:text-lg  xl:pt-8 m-2 md:m-4 leading-9 xl:my-10 xl:px-30 mb-10">
                <p className="my-4 mx-8 md:mx-20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("career.description")}</p>
                <div className="flex md:gap-8">
                    <p className="my-4 mx-8 md:ml-20">{t("career.more")}</p>
                    <Link
                        href="https://www.104.com.tw/company/1a2x6bjp2x?jobsource=google"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#f8af49] text-white px-4 sm:px-8 py-2 rounded-xl inline-flex items-center justify-center
                        hover:bg-[#F3981B] transition-colors duration-300"
                        >
                        {t("career.104")}
                    </Link>
                </div>
            </div>
        </SlideInFromLeft>
        {/* 教育訓練 */}
        <div className="">
            {/* 顯示xl */}
            <div className="hidden xl:block">
                <div className="flex mt-20 justify-between items-start ">
                    {/* 左側圖片 */}
                    <SlideInFromLeft delay={0.5}>
                        <div className="xl:w-[50vw] xl:h-[700px] xl:mr-10 overflow-hidden ">
                            <img src="/about/career/t.jpg" alt="Front Page" className="w-full h-full object-cover"/>
                        </div>
                    </SlideInFromLeft>
                    {/* 文字區 */}
                    <FadeInUp delay={0.5}>
                        <div className="mb-16 flex flex-col mr-20">
                            <div className="font-extrabold text-3xl md:text-4xl text-[#375978] p-4 ml-4 ">
                                {t("career.training.title")}
                            </div>
                            <p className="text-xl p-4 ml-4 w-[500px]">{t("career.training.description")}</p>
                            <div className="space-y-11 p-4 ">
                                {trainingList.map((item, index) => (
                                    <div key={index} className="ml-4 border-b border-[#375978] pb-5 hover:scale-105 transition-transform duration-300">
                                        <LinkWrapper href={item.href} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xl">•</span>
                                                <span className="text-lg text-gray-800">{item.title}</span>
                                            </div>
                                            <span className="text-[#375978] text-lg">{'>'}</span>
                                        </LinkWrapper>
                                    </div>
                                ))}
                            </div>
                        </div>                            
                    </FadeInUp>
                    {/* 右側圖片 */}
                    <SlideInFromLeft delay={0.8}>
                        <div className="w-[70px] overflow-hidden xl:mr-4 2xl:mr-15 ">
                            <img src="/about/career/edu.png" alt="Front Page" className="w-full h-full object-cover" />
                        </div>
                    </SlideInFromLeft>
                </div>
            </div>
            {/* 顯示xl以下 */}
            <div className="block xl:hidden">
                <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                    {t("career.training.title")}
                </div>
                <div className="flex">
                    {/* 文字區 */}
                    <FadeInUp delay={0.5}>
                        <div className="hidden md:flex flex-col m-4 ">
                            <p className="text-base md:text-xl mx-6 md:p-4 md:ml-16 leading-9 ">{t("career.training.description")}</p>
                            <div className="flex flex-wrap md:p-12 lg:p-10">
                                {trainingList.map((item, index) => (
                                    <LinkWrapper href={item.href} key={index} className="mx-8 my-4 border-b border-[#375978]  hover:scale-105 transition-transform duration-300">
                                        <div className="flex items-center justify-between w-[300px] md:w-[450px] lg:w-[300px]">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xl">•</span>
                                                <span className="text-lg text-gray-800 my-2">{item.title}</span>
                                            </div>
                                            <span className="text-[#375978] text-lg">{'>'}</span>
                                        </div>
                                    </LinkWrapper>
                                ))}
                            </div>
                        </div>   
                        <div className="flex md:hidden flex-col m-4">
                            <p className="text-base md:text-xl mx-6 md:p-4 md:ml-16 leading-9 ">{t("career.training.description")}</p>
                            <div className="flex flex-wrap md:p-12 lg:p-10">
                                {trainingList.map((item, index) => (
                                    <div key={index} className="mx-8 my-4 border-b border-[#375978] basis-full md:basis-[45%] lg:basis-[30%] max-w-full hover:scale-105 transition-transform duration-300">
                                        <LinkWrapper href={item.href} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xl">•</span>
                                                <span className="text-lg text-gray-800 my-2">{item.title}</span>
                                            </div>
                                            <span className="text-[#375978] text-lg">{'>'}</span>
                                        </LinkWrapper>
                                    </div>
                                ))}
                            </div>
                        </div>                               
                    </FadeInUp>
                    {/* 右側圖片 */}
                    <SlideInFromLeft delay={0.8}>
                        <div className="w-[60px] overflow-hidden hidden md:block xl:hidden
                                        md:mt-36 md:mr-12 
                                        lg:mt-0 lg:mr-20
                                        xl:mr-4 2xl:mr-15">
                            <img src="/about/career/edu.png" alt="Front Page" className="w-full h-full object-cover" />
                        </div>
                    </SlideInFromLeft>
                </div>
            </div>
        </div>
        {/* 福利制度 */}
        <div >
            <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
                {t("career.benefits.title")}
            </div>
            {/* content */}
            {/* <div className="space-y-10 flex flex-wrap justify-center items-center">
                {benefitData.map((item, index) => (
                    <div
                    key={index}
                    className="w-[1200px] xl:m-10 xl:px-18 xl:py-8 rounded-lg shadow-xl bg-white hover:scale-95 transition-transform duration-500 ease-in-out"
                    >
                        <div className="font-bold text-2xl mb-8 leading-9">{item.subtitle}</div>
                        <div className="text-lg space-y-4">
                            {item.contents.map((text, i) => (
                            <p key={i}>{i + 1}. {text}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
            <ZoomIn delay={0.8}>
                <Accordion type="single" collapsible className="w-full px-10 md:px-20 lg:px-30 items-center mx-auto ">
                    {benefitData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="my-2 md:my-3 lg:my-4 xl:my-8 flex items-center justify-between font-bold py-4 group">
                                <div className="flex items-center gap-3">
                                    <div className="hidden md:flex ">
                                        {item.icon} 
                                    </div>
                                    <span className="text-[#375978] text-base sm:text-lg md:text-xl">{item.subtitle}</span>
                                </div>
                                {/* <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" /> */}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800">
                                <ol className="list-decimal pl-5 space-y-4 pb-3 text-sm sm:text-base md:text-lg">
                                    {item.contents.map((content, idx) => (
                                        <li key={idx}>&nbsp;&nbsp;{content}</li>
                                    ))}
                                </ol>
                                
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>   
            </ZoomIn>         
        </div>
    </div>
  );            
}
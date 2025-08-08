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

export default function IntroductionPage() {
    const t = useTranslations("about");
    const coreValues = [
        { key: "Integrity", descKey: "Integrity description" },
        { key: "Responsibility", descKey: "Responsibility description" },
        { key: "Professionalism", descKey: "Professionalism description" },
        { key: "Efficiency", descKey: "Efficiency description" },
        { key: "Customer Satisfaction", descKey: "Customer Satisfaction description" },
    ];

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/frontPage/1.jpg" 
                alt="Front Page" 
                layout="fill"
				objectFit="cover"/>
        </div>
        <Breadcrumb className="px-8 pt-8 w-full">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-base font-semibold">
                        {t("introduction.homepage")}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/introduction" className="text-base font-semibold">{t("introduction.about")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/introduction" className="text-base font-semibold">{t("introduction.title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-black my-4 mx-10"></span>

        {/* 公司簡介 */}
        <div className="font-extrabold text-3xl md:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
            {t("introduction.title")}
        </div>
        <div className="font-normal text-base md:text-lg md:pt-2 xl:pt-8 pb-18 m-2 md:m-4 leading-9 xl:my-10 xl:px-30">
            <p className="my-4 mx-8 md:mx-20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("introduction.descriptionDetail1")}</p>
            <p className="my-4 mx-8 md:mx-20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("introduction.descriptionDetail2")}</p>
        </div>

        {/* 發展歷史 */}
        <div className="bg-[#375978]">
            {/* 顯示xl */}
            <div className="hidden xl:block">
                <div className="font-extrabold text-4xl text-white px-8 py-16 ml-4 ">
                    {t("introduction.history.title")}
                </div>
                <div className="flex justify-stretch">
                    {/* 左側圖片 */}
                    <SlideInFromLeft delay={0.2}>
                        <div className="xl:w-[55vw] xl:h-[700px] xl:mr-10 overflow-hidden ">
                            <img src="/about/history.jpg" alt="Front Page" />
                        </div>
                    </SlideInFromLeft>
                    <FadeInUp delay={0.8}>
                        <div className="mb-16">
                            <Timeline />
                        </div>
                    </FadeInUp>
                </div>
            </div>
            {/* 顯示xl以下 */}
            <div className="block xl:hidden">
                <div className="font-extrabold text-3xl md:text-4xl text-white px-6 py-10 md:px-8 md:py-16 ml-4 ">
                    {t("introduction.history.title")}
                </div>
                <div className="flex flex-col justify-center items-center space-y-8 px-4">
                    {/* 上方圖片 */}
                    {/* <SlideInFromLeft delay={0.2}>
                        <div className="h-[30vh] md:w-[40vw] md:h-[40vh] lg:w-[20vw] lg:h-[70vh] overflow-hidden ">
                            <img src="/about/history.jpg" alt="Front Page" />
                        </div>
                    </SlideInFromLeft> */}
                    <FadeInUp delay={0.8}>
                        <div className="mb-16">
                            <Timeline />
                        </div>
                    </FadeInUp>
                </div>
            </div>
        </div>

        {/* 核心理念 */}
        <div className="h-full shadow-[0_30px_36px_rgba(0,0,0,0.10)] ">
            {/* 顯示xl */}
            <div className="hidden xl:block">
                <div className="flex font-extrabold text-4xl text-[#375978] px-8 py-16 ml-4">
                    {t("introduction.coreValue.title")}
                    <span className="block w-[80%] h-[1px] bg-[#375978] xl:mx-10 mt-5"></span>
                </div>
                <div className="flex justify-stretch space-x-10 xl:space-x-8 2xl:space-x-25 pb-20">
                    <ZoomIn delay={0.2}>
                        <div className="h-[300px] xl:w-[600px] xl:h-[500px] 2xl:w-[650px] 2xl:h-[70vh] xl:ml-20 2xl:ml-30 mt-10 overflow-hidden hover:scale-110 transition-transform duration-500 ease-in-out">
                            <img src="/coreValue/a.png" alt="Front Page" className="w-full h-full object-cover"/>
                        </div>
                    </ZoomIn>
                    <SlideInFromLeft delay={0.4}>
                        {coreValues.map(({ key, descKey }, index) => (
                            <div key={key} className="group p-6 m-2 bg-white rounded-xl shadow-md hover:bg-[#F0F4F8] hover:scale-105 transition-transform duration-300 max-w-[700px]">
                                <h2 className="font-extrabold text-2xl text-[#375978] mr-2 min-w-[200px] mb-2">
                                    {t(`introduction.coreValue.${key}`)}
                                </h2>
                                <span className="block w-0 h-[2px] md:h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-full "></span>
                                <p className="text-lg text-black mt-6">
                                    {t(`introduction.coreValue.${descKey}`)}
                                </p>
                            </div>
                        ))}
                    </SlideInFromLeft>
                </div>
            </div>
            {/* 顯示xl以下 */}
            <div className="block xl:hidden">
                <div className="flex justify-center font-extrabold text-3xl md:text-4xl text-[#375978] px-6 py-10 md:px-8 md:py-16 ml-4">
                    {t("introduction.coreValue.title")}
                    <span className="block w-[0%] md:w-[70%] h-[1px] bg-[#375978] ml-6 md:ml-10 mt-5"></span>
                </div>
                <div className="flex flex-col space-x-10 pb-20 justify-center items-center">
                    <ZoomIn delay={0.2}>
                        <div className="h-[250px] ml-10 md:h-[380px] md:w-[500px] lg:h-[500px] overflow-hidden hover:scale-110 transition-transform duration-500 ease-in-out">
                            <img src="/coreValue/a.png" alt="Front Page" className="w-full h-full object-cover"/>
                        </div>
                    </ZoomIn>
                    <SlideInFromLeft delay={0.4}>
                        {coreValues.map(({ key, descKey }, index) => (
                            <div key={key} className="group p-6 m-2 bg-white rounded-xl shadow-md hover:bg-[#F0F4F8] hover:scale-105 transition-transform duration-300 max-w-[700px]">
                                <h2 className="font-extrabold text-2xl text-[#375978] mr-2 min-w-[200px] mb-2">
                                    {t(`introduction.coreValue.${key}`)}
                                </h2>
                                <span className="block w-0 h-[2px] md:h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-full "></span>
                                <p className="text-lg text-black mt-6">
                                    {t(`introduction.coreValue.${descKey}`)}
                                </p>
                            </div>
                        ))}
                    </SlideInFromLeft>
                </div>
            </div>
        </div>

        {/* 台灣證書 */}
        <div className="my-20">
            <div className="flex justify-center md:justify-start font-extrabold text-3xl md:text-4xl text-[#375978] px-6 py-10 md:px-8 md:py-16 md:ml-4">
                {t("introduction.certificates.title")}
            </div>
            <div className="bg-gradient-to-b from-white to-gray-200 py-12 px-6 text-center">
                <div className="flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
                    <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
                        {t("introduction.certificates.tw company")}
                    </h3>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 lg:gap-40 flex-wrap">
                    {/* ISO證書 */}
                    <SlideInFromLeft delay={0.4}>
                        <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600 md:pb-20">
                            <p className="text-lg font-semibold mb-4">{t("introduction.certificates.tw iso")}</p>
                            <div className="w-[250px] sm:w-[360px] shadow-md ">
                                <img
                                    src="/about/tw/iso.png"
                                    alt="ISO Certification"
                                />
                            </div>
                        </div>
                    </SlideInFromLeft>
                    {/* 專業委員證書 */}
                    <SlideInFromLeft delay={0.8}>
                        <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600 md:pb-20">
                            <p className="text-lg font-semibold mb-4">{t("introduction.certificates.tw professional")}</p>
                            <div className="w-[250px] sm:w-[360px] shadow-md">
                                <img
                                    src="/about/tw/professional.png"
                                    alt="Professional Certificate"
                                />
                            </div>
                        </div>
                    </SlideInFromLeft>
                </div>
            </div>
        </div>

        {/* 美國證書 */}
        <div className="bg-gradient-to-b from-white to-gray-200 py-12 px-6 text-center my-20 ">
            <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
                <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
                    {t("introduction.certificates.A company")}
                </h3>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 md:pb-20 flex-wrap">
                {/* 美國施工證書 */}
                <SlideInFromLeft delay={0.4}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4">{t("introduction.certificates.A construction")}</p>
                        <div className="w-[250px] sm:w-[360px] shadow-md ">
                            <img
                                src="/about/usa/1.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
                {/* 美國施工證書 */}
                <SlideInFromLeft delay={0.8}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4">{t("introduction.certificates.A construction")}</p>
                        <div className="w-[250px] sm:w-[360px] shadow-md">
                            <img
                                src="/about/usa/2.png"
                                alt="Professional Certificate"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
                {/* 美國施工證書 */}
                <SlideInFromLeft delay={1.2}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4">{t("introduction.certificates.A construction")}</p>
                        <div className="w-[250px] sm:w-[360px] shadow-md">
                            <img
                                src="/about/usa/3.png"
                                alt="Professional Certificate"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
            </div>
        </div>

        {/* 日本證書 */}
        <div className="bg-gradient-to-b from-white to-gray-200 py-12 px-6 text-center ">
            <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
                <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
                    {t("introduction.certificates.j company")}
                </h3>
            </div>
            <div className="flex justify-center items-start">
                {/* 日本施工證書 */}
                <SlideInFromLeft delay={0.4}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4">{t("introduction.certificates.j construction")}</p>
                        <div className="w-[250px] sm:w-[360px] shadow-md ">
                            <img
                                src="/about/jp/4.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
            </div>
        </div>

        {/* 獲獎事蹟 */}
        <div className="bg-gradient-to-b from-gray-200 to-white py-12 px-6 xl:px-20">
            <div className="flex justify-center md:justify-start font-extrabold text-3xl md:text-4xl text-[#375978] px-6 py-10 md:px-8 md:py-16 md:ml-4 mb-10">
                {t("introduction.awards.title")}
                <span className="block w-[0%] md:w-[70%] h-[1px] bg-[#375978] xl:mx-10 mt-5"></span>
            </div>
            {/* <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
                <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
                    {t("introduction.certificates.j company")}
                </h3>
            </div> */}
            <div className="flex justify-center items-center gap-10 md:gap-20 xl:gap-30 flex-wrap">
                {/* 台積電 */}
                <SlideInFromLeft delay={0.4}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4 md:ml-16 ">{t("introduction.certificates.j construction")}</p>
                        {/* <span className="block w-[80%] h-[1px] bg-[#375978] xl:mx-10 mt-5"></span> */}
                        <div className="w-[250px] sm:w-[360px] mr-18 md:mr-0">
                            <img
                                src="/about/award/4.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
                {/* 日本施工證書 */}
                <SlideInFromLeft delay={0.8}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4 md:ml-20">{t("introduction.certificates.j construction")}</p>
                        <div className="w-[250px] sm:w-[360px] mr-18 md:mr-0">
                            <img
                                src="/about/award/2.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
                <SlideInFromLeft delay={1.2}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4 md:ml-20">{t("introduction.certificates.j construction")}</p>
                        <div className="w-[250px] sm:w-[360px] mr-18 md:mr-0">
                            <img
                                src="/about/award/3.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
                <SlideInFromLeft delay={0.4}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4 md:mr-2">{t("introduction.certificates.j construction")}</p>
                        <div className="w-[250px] sm:w-[360px]">
                            <img
                                src="/about/award/1.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
                <SlideInFromLeft delay={0.8}>
                    <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
                        <p className="text-lg font-semibold mb-4 md:ml-16">{t("introduction.certificates.j construction")}</p>
                        <div className="w-[250px] sm:w-[360px] mr-10 md:mr-0">
                            <img
                                src="/about/award/5.png"
                                alt="ISO Certification"
                            />
                        </div>
                    </div>
                </SlideInFromLeft>
            </div>
        </div>
    </div>
  );            
}
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
import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
import ZoomIn from "@/src/components/animations/ZoomIn";
import Image from "next/image";
import { CloudUpload, HeartHandshake, ShieldCheck, Leaf, Scale } from "lucide-react";

export default function OrganizationPage() {
    const t = useTranslations("investors");
    const sections = [
        {
        id: "social-care",
        title: "社會關懷",
        desc: "持續推動公益活動、教育資源支持與弱勢關懷，積極履行企業社會責任，與社會共榮。",
        img: "/sustainability/o1.png",
        icon: <HeartHandshake size={28} />,
        pdfs: [
            { name: "社會關懷計畫", url: "/pdf/social-care.pdf" },
            { name: "公益活動成果報告", url: "/pdf/community-service.pdf" },
        ],
        },
        {
        id: "harassment",
        title: "性騷擾防治",
        desc: "重視性別平等與安全職場，依據法規制定防治措施，並建立申訴管道，確保員工安心工作。",
        img: "/sustainability/o2.png",
        icon: <ShieldCheck size={28} />,
        pdfs: [
            { name: "性騷擾防治政策", url: "/pdf/harassment-policy.pdf" },
            { name: "申訴與處理流程", url: "/pdf/complaint-procedure.pdf" },
        ],
        },
        {
        id: "environment",
        title: "環境永續",
        desc: "落實環境保護，推動綠色製程、節能減碳與循環經濟，打造可持續發展的生產環境。",
        img: "/sustainability/o3.png",
        icon: <Leaf size={28} />,
        pdfs: [
            { name: "環境永續政策", url: "/pdf/environment-policy.pdf" },
            { name: "綠色製程報告", url: "/pdf/green-process.pdf" },
        ],
        },
        {
        id: "ethics",
        title: "道德行為",
        desc: "秉持誠信、責任與透明原則，推動公司治理與道德規範，確保企業長遠發展。",
        img: "/sustainability/o4.jpg",
        icon: <Scale size={28} />,
        pdfs: [
            { name: "道德行為準則", url: "/pdf/code-of-ethics.pdf" },
            { name: "公司治理方針", url: "/pdf/corporate-governance.pdf" },
        ],
        },
    ];

  return (
    <div className="overflow-x-hidden">
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/sustainability/3.jpg" 
                    alt="Example Image" 
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
                        <Link href="/sustainability" className="text-sm sm:text-base font-semibold">企業永續</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/sustainability/operations" className="text-sm sm:text-base font-semibold">永續經營</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>
        
        <SlideInFromLeft delay={0.3}>
            {/* 標題 */}
            <div className="flex flex-col text-center py-6">
                {/* 英文名稱 */}
                <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">Sustainability Operations</h2>
                {/* 下畫線 */}
                <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
                {/* 永續經營 */}
                <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-4">
                    永續經營
                </h3>
            </div>
        </SlideInFromLeft>
        {/* 四個導覽卡片 */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
            <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
                {/* 背景圖片 */}
                <div className="relative w-full h-44">
                <Image
                    src={section.img}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* 半透明漸層遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                </div>
                {/* 文字 + icon */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white px-3">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white">{section.icon}</span>
                    <h3 className="text-base font-semibold">{section.title}</h3>
                </div>
                </div>
            </a>
            ))}
        </div>

        {/* 內文區塊 */}
        <div className="w-full">
            {sections.map((section, index) => (
            <div
                id={section.id}
                key={section.title}
                className={`py-16 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
            >
                <div
                className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                >
                {/* 圖片 */}
                <div className="w-full md:w-1/2">
                    <Image
                    src={section.img}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg object-cover"
                    />
                </div>

                {/* 文字內容 */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {section.title}
                    </h2>
                    <span className="block w-20 h-[3px] bg-[#375978] mt-3 mb-6"></span>
                    <p className="text-gray-600 leading-relaxed">
                        {section.desc}
                    </p>
                    </div>

                    {/* PDF 按鈕 */}
                    <div className="flex flex-wrap gap-3">
                    {section.pdfs.map((pdf) => (
                        <a
                        key={pdf.url}
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#375978] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#F3981B] transition-colors duration-300"
                        >
                        <CloudUpload size={18} />
                        {pdf.name}
                        </a>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );            
}
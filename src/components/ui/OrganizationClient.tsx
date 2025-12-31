// @/src/components/ui/OrganizationClient.tsx (原檔名修改)
"use client";

import React from "react"; // useState 沒用到可以拿掉
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

// 定義一下接收的資料格式
interface Props {
    orgChartUrl?: string | null; // 從資料庫傳來的圖片網址
}

export default function OrganizationClient({ orgChartUrl }: Props) {
    const t = useTranslations("about");

    // 決定要顯示哪張圖：如果有資料庫的圖就用，沒有就用預設的 v3.svg
    const displayImage = orgChartUrl || "/about/organization/v3.svg";

  return (
    <div className="overflow-x-hidden">
        {/* Banner 區塊保持不變 */}
        <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
            <Image src="/frontPage/4.jpg" 
                    alt="Banner" 
                    fill // Next.js 13+ 建議改用 fill 取代 layout="fill"
                    className="object-cover" // 取代 objectFit="cover"
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

        {/* ★ 公司組織圖 (這裡修改了) */}
        <div className="font-normal text-lg pt-8 pb-18 m-4 leading-9 flex justify-center">
            {/* 這裡使用傳進來的 displayImage */}
            <Image 
                src={displayImage} 
                alt="Organization Chart"
                width={800} 
                height={600} 
                className="w-full h-auto" // 加上 max-w 避免在大螢幕太寬
                priority // 組織圖是重要內容，建議優先載入
            />
        </div>
    </div>
  );            
}
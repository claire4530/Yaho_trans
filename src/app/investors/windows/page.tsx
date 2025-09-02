"use client";
import { useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function OrganizationPage() {
    const t = useTranslations("investors");

    // 假資料（你可以換成真實資訊）
    const transferAgency = {
        name: "ABC Securities Shareholder Services Dept.",
        address: "12F, No. 123, Sec. 1, Zhongxiao East Rd., Taipei City 100, Taiwan",
        phone: "+886-2-1234-5678",
        fax: "+886-2-8765-4321",
        website: "https://www.abcsecurities.com.tw",
    };

    const contactPerson = {
        name: "Mr. John Chen",
        title: "Shareholder Services Manager",
        email: "john.chen@abcsecurities.com.tw",
        phone: "+886-2-1234-5678 ext. 101",
    };
    
    return (
        <div className="overflow-x-hidden">
            {/* Hero 圖片 */}
            <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
                <Image
                src="/investors/3.jpg"
                alt="Material Information"
                fill
                className="object-cover"
                priority
                />
            </div>

            {/* 麵包屑 */}
            <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="/"
                            className="text-sm sm:text-base font-semibold"
                            >
                            {t("homepage")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                        <Link
                            href="/investors"
                            className="text-sm sm:text-base font-semibold"
                        >
                            {t("title")}
                        </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/investors/dividend" className="text-sm sm:text-base font-semibold">{t("service_window")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

            {/* 標題區塊 */}
            <div className="flex flex-col text-center py-6">
                <h2 className="text-2xl md:text-3xl text-gray-800 font-serif font-light">
                    Shareholder Services
                </h2>
                <span className="block w-[100px] h-[1px] bg-gray-800 my-6 mx-auto"></span>
                <h3 className="text-xl md:text-2xl font-medium text-[#333] mb-10">
                    {t("service_window")}
                </h3>
            </div>
        </div>
    );
}
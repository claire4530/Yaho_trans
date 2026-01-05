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

    return (
        <div className="overflow-x-hidden">
            <div className="relative w-full h-[65px] xl:h-[100px] overflow-hidden">
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
                            <Link href="/investors/legal_notices_and_trademarks" className="text-sm sm:text-base font-semibold">法律與商標</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>
        </div>
    );
}
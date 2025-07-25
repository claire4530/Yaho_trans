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

export default function IntroductionPage() {
    const t = useTranslations("about");
  return (
    <div>
        <div className="h-[50vh] md:h-[80vh] overflow-hidden">
            <img src="/frontPage/1.jpg" alt="Front Page" />
        </div>
        <Breadcrumb className="p-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/" className="text-xl font-semibold">{t("introduction.homepage")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/introduction" className="text-xl font-semibold">{t("introduction.about")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/about/introduction" className="text-xl font-semibold">{t("introduction.title")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <span className="block w-full h-[1px] bg-black mx-auto sm:mx-10 my-4"></span>
    </div>
  );
}
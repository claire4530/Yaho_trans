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

// ---------------------------------------------
// Mock Data — replace with your real data/API
// ---------------------------------------------
const shareCapital = {
    authorizedCapital: 30000000000, // NTD
    paidInCapital: 12500000000, // NTD
    parValue: 10, // NTD per share
    commonShares: 1250000000, // shares
    lastUpdated: "2025-08-31",
};


const composition = [
    { name: "Foreign Institutions", value: 35.2 },
    { name: "Domestic Institutions", value: 28.4 },
    { name: "Individuals", value: 30.1 },
    { name: "Insiders (Directors & Executives)", value: 6.3 },
];


const topShareholders = [
    { name: "Alpha Holdings Co., Ltd.", shares: 160_000_000, percent: 12.80 },
    { name: "Bravo Investment Ltd.", shares: 120_000_000, percent: 9.60 },
    { name: "Charlie Asset Management", shares: 88_000_000, percent: 7.04 },
    { name: "Delta Securities (Nominee)", shares: 70_000_000, percent: 5.60 },
    { name: "Echo Insurance Co.", shares: 55_000_000, percent: 4.40 },
    { name: "Foxtrot Bank (Trust)", shares: 46_000_000, percent: 3.68 },
    { name: "Gamma Capital", shares: 38_000_000, percent: 3.04 },
    { name: "Hotel Ltd.", shares: 30_000_000, percent: 2.40 },
    { name: "India Partners", shares: 26_000_000, percent: 2.08 },
    { name: "Juliet Fund", shares: 22_000_000, percent: 1.76 },
];


const LINKS = {
    stockPrice: "https://tw.stock.yahoo.com/quote/6196", // TODO: replace with your ticker page
    mops: "https://mops.twse.com.tw/mops/web/index",
    shareholderServices: "#", // optional internal link
};


// Recharts default colors fallback
const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
];


function formatNTD(n: { toLocaleString: () => any; }) {
    return `NT$ ${n.toLocaleString()}`;
}

function formatPct(n: number) {
    return `${n.toFixed(2)}%`;
}

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
                            <Link href="/investors/legal_notices_and_trademarks" className="text-sm sm:text-base font-semibold">隱私權政策與使用條款</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>
        </div>
    );
}
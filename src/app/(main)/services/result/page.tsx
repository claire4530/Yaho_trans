// "use client";
// import React, { useState } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { useTranslations } from "next-intl";
// import Link from "next/link"
// import ZoomIn from "@/src/components/animations/ZoomIn";
// import Image from "next/image";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger
// } from "@/components/ui/accordion"

// const partners1 = [
//   "友達光電 AUO", "世界先進 Vanguard", "家碩科技 Gudeng Equipment",
//   "美時化學製藥 Lotus", "家登精密 Gudeng Precision", "勝高 SUMCO",
//   "雷泰光電 Lasertec", "台灣默克 Merck", "英特爾 Intel",
//   "應用材料 Applied Materials", "矽品精密 SPIL", "環球晶圓 GlobalWafers",
//   "僑力化工 SUNLIT", "辛耘 SCIENTECH", "帆宣 MIC", "鵬鼎控股 Avary",
//   "台灣矽科宏晟 Cica-Huntek", "華邦電子 Winbond", "華為 HUAWEI",
//   "台積電 TSMC", "華廣生技 Bionime", "美光 Micron", "英特格 Entegris",
//   "長春集團 CCP", "旺宏 Macronix"
// ];


// export default function IntroductionPage() {
//     const t = useTranslations("result");
//     const partners = [
//         t("TSMC"),t("Cica-Huntek"),t("Micron"),t("MIC"),t("GudengPrecision"),
//         t("GudengEquipment"),t("Winbond"),t("AppliedMaterials"),t("VIS"),t("SPIL"),
//         t("SCIENTECH"),t("AUO"),t("Lotus"),t("SUMCO"),t("Lasertec"),t("Merck"),
//         t("Intel"),t("GlobalWafers"),t("SUNLIT"),t("Avary"),t("HUAWEI"),t("Bionime"),
//         t("ENTEGRIS"),t("CCP"),t("Macronix")
//     ];
//     const [activeTab, setActiveTab] = useState("全部");

//     const categories = ["全部", "設計", "化學", "氣體"];

//     const [search, setSearch] = useState("");

//     const filteredProjects = projects.filter((p) => {
//         const matchCategory = activeTab === "全部" || p.category === activeTab;
//         const matchSearch =
//         p.name.includes(search) ||
//         p.region.includes(search) ||
//         p.customer.includes(search);
//         return matchCategory && matchSearch;
//     });

//     // state
//     const [currentPage, setCurrentPage] = useState(1);
//     const projectsPerPage = 9; // 三排 * 三個

//     // 計算分頁
//     const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
//     const startIndex = (currentPage - 1) * projectsPerPage;
//     const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);


//     // 產生分頁數字（含縮略符號）
//     const getPageNumbers = (current: number, total: number) => {
//         const delta = 2; // 當前頁前後顯示幾個
//         const range = [];
//         const rangeWithDots = [];
//         let last;

//         for (let i = 1; i <= total; i++) {
//             if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
//                 range.push(i);
//             }
//         }

//         for (let i of range) {
//             if (last) {
//                 if (i - last === 2) {
//                     rangeWithDots.push(last + 1);
//                 } else if (i - last > 2) {
//                     rangeWithDots.push("...");
//                 }
//             }
//             rangeWithDots.push(i);
//             last = i;
//         }

//         return rangeWithDots;
//     };

//     return (
//         <div className="overflow-x-hidden">
//             {/* 關於垚鋐 簡介頁首圖片 */}
//             <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
//                 <Image src="/services/result/1.jpg" 
//                     alt="Front Page" 
//                     layout="fill"
//                     objectFit="cover"/>
//             </div>
//             {/* 網站導覽列 */}
//             <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
//                 <BreadcrumbList>
//                     <BreadcrumbItem>
//                         <BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
//                             {/* 首頁 */}
//                             {t("homepage")}
//                         </BreadcrumbLink>
//                     </BreadcrumbItem>
//                     <BreadcrumbSeparator />
//                     <BreadcrumbItem>
//                         <BreadcrumbLink asChild>
//                             {/* 產品服務 */}
//                             <Link href="/services" className="text-sm sm:text-base font-semibold">{t("title")}</Link>
//                         </BreadcrumbLink>
//                     </BreadcrumbItem>
//                     <BreadcrumbSeparator />
//                     <BreadcrumbItem>
//                         <BreadcrumbLink asChild>
//                             {/* 工程實績 */}
//                             <Link href="/services/result" className="text-sm sm:text-base font-semibold">{t("result")}</Link>
//                         </BreadcrumbLink>
//                     </BreadcrumbItem>
//                 </BreadcrumbList>
//             </Breadcrumb>
//             {/* 下畫線 */}
//             <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

//             {/* 工程實績標題 */}
//             <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
//                 {t("result")}
//             </div>

//             {/* 公司合作廠商列表 */}
//             <div className="p-6 max-w-7xl mx-auto">
//                 {/* 文字牆 */}
//                 <div className="flex flex-wrap justify-center gap-10">
//                     {partners.map((partner, i) => (
//                     <span
//                         key={i}
//                         className="
//                         text-[#375978] font-semibold text-lg sm:text-xl 
//                         transition- duration-300
//                         cursor-pointer
//                         hover:text-blue-400 hover:scale-110
//                         motion-safe:animate-float
//                         "
//                     >
//                         {partner}
//                     </span>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );            
// }
// app/[locale]/services/result/page.tsx
import { createClient } from '@/src/utils/supabase/server';
import ResultClient from '@/src/components/ui/ResultClient';

export default async function ResultPage() {
  const supabase = await createClient();

  // 抓取合作廠商資料，依照建立時間排序 (或你想依照字母排序也可以)
  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    // 如果想要隨機排序，前端再 shuffle 也可以，或是這裡用 id 排序
    .order('created_at', { ascending: true });

  return (
    <ResultClient 
      partners={partners || []} 
    />
  );
}
"use client";
import React, { useState, useMemo } from "react";
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
import USRecruitPanel from "@/src/components/Recruitment";
import USRecruitPanelM from "@/src/components/Recruitment-m";

export default function IntroductionPage() {
    const t = useTranslations("career");
    const initialJobs = [
        {
            id: "job-001",
            title: "工程業務/助理",
            description: [
                "彙整工程範疇，建立估算報價",
                "具備成本計算與成本控制能力",
                "跨部門協調詢價、議價與下單時程，並與現場監工同步物料需求與交期",
                "製作提案與週報估算成本風險與進度，並能清楚對內對外報告",
            ],
            requirements: [
                "工程相關背景（營建、機電、製造、電子等）或具備強烈學習動機的新人",
                "熟悉Microsoft Office基本操作。",
                "跨部門溝通協作能力、簡報技巧並具良好的客戶服務態度",
            ],
        },
        {
            id: "job-002",
            title: "工程採購/助理",
            description: [
                "熟悉工程物料與採購流程，負責詢價、議價與下訂單",
                "使用ERP系統記錄並追蹤訂單狀態與供應商進度",
                "與供應商、採購單位與現場監工協調，確保物料如期送達，避免供應中斷",
                "協助處理品質／數量異常問題，並維持正確文件與紀錄管理",
            ],
            requirements: [
                "工程或製造業物料採購背景佳，或願意學習者",
                "熟悉ERP等採購系統，能追蹤訂單與供應商進度",
                "良好的議價能力與供應商／跨部門溝通技巧",
                "注重細節、能處理異常狀況（如延誤或品質問題）",
            ],
        },
        {
            id: "job-003",
            title: "倉儲管理主管/人員",
            description: [
                "熟悉ERP或倉庫管理系統（如SAP、Oracle等），監控並維護倉庫作業流程",
                "管理庫存控管與盤點制度，處理庫存與系統記錄間的差異",
                "與第三方物流公司及運輸商協作，確保運輸與配送流程順暢",
            ],
            requirements: [
                "具資工或供應鏈相關背景，有倉庫操作與庫存管理經驗者佳",
                "熟練使用ERP或倉庫管理系統，能追蹤庫存、訂單狀態與物流時間表",
                "注重細節、有能力處理庫存差異與異常狀況",
                "基本資料分析能力（如 Excel）、數據報表",
            ],
        },
        {
            id: "job-004",
            title: "工程設計PM、繪圖人員與文管專員",
            description: [
                "使用 2D 或 3D 軟體（如 AutoCAD、Revit），繪製工程設計圖",
                "負責專案設計進度追蹤與協調，確保繪圖與現場／設計團隊同步",
                "管理圖面與文件版本，維持圖檔與規格的一致性",
                "協助設計圖說的審查與修改，確保符合材料與工程要求",
            ],
            requirements: [
                "熟練操作 AutoCAD、Revit 或其他 2D／3D 繪圖軟體",
                "熟悉設計圖說與工程規格，具備圖面與設計細節敏感度",
                "良好溝通與協作能力，能與設計師、工程師與現場監工協同作業",
            ],
        },
        {
            id: "job-005",
            title: "人資專員/助理",
            description: [
                "協助招聘與入職流程",
                "處理薪酬與福利相關事務，維護員工檔案（出勤、假期、保險等）",
                "協助員工關係維護、培訓安排與法規遵循",
                "支援外派人員的在地事務（身分辦理、銀行開戶、宿舍安排、租車等），作為公司與外派人員的溝通橋樑，確保流程順暢並提升整體體驗",
            ],
            requirements: [
                "有人力資源或行政相關經驗者佳，亦歡迎具備學習意願的新人",
                "熟悉 Microsoft Office，具 HR 系統操作經驗者更佳",
                "良好的溝通協調能力，能同時處理多項事務並注重細節",
                "熟悉勞動法規與員工福利相關規範者優先",
            ],
        },
        {
            id: "job-006",
            title: "風險管理工安專員",
            description: [
                "負責施工與營運現場的安全稽核，確保符合美國職安法規（OSHA）、亞利桑那州法規及台積電內部安全標準",
                "規劃與執行安全教育訓練，協助改善現場安全流程",
                "追蹤並調查事故或異常事件，提出改善方案",
            ],
            requirements: [
                "具備 OSHA 10／30／510／500 證照者佳",
                "了解職安相關法規與施工安全規範",
                "熟悉工程品質檢驗流程與材料驗收標準",
                "細心負責，能發現並解決現場問題",
                "良好的溝通與協調能力，能與現場施工團隊與承包商合作",
            ],
        },
        {
            id: "job-007",
            title: "風險管理品管人員",
            description: [
                "進行工程品質檢驗，確保施工成果符合設計與規範",
                "負責材料驗收與製程品質控管",
                "檢查承包商交付成果，並建立檢驗報告與改善建議",
            ],
            requirements: [
                "具備 OSHA 10／30／510／500 證照者佳",
                "了解職安相關法規與施工安全規範",
                "熟悉工程品質檢驗流程與材料驗收標準",
                "細心負責，能發現並解決現場問題",
                "良好的溝通與協調能力，能與現場施工團隊與承包商合作",
            ],
        },
        {
            id: "job-008",
            title: "總務專員",
            description: [
                "負責員工宿舍日常管理與維護（入住/退宿流程、房間安排）",
                "處理宿舍相關簡易修繕與維護事項（如水電、設備故障報修）",
                "協助繳納水電瓦斯及其他相關帳單費用，確保服務不中斷",
                "支援公司一般行政與總務相關事項",
            ],
            requirements: [
                "基本修繕與維護能力",
                "能熟悉與管理水電瓦斯帳單或其他基礎後勤事務",
                "良好的溝通與協調能力，能及時處理員工宿舍問題",
                "具備中英文溝通能力者佳（能協助與中文員工溝通尤佳）",
            ],
        },        
    ];

    const [jobs] = useState(initialJobs);
    const [query, setQuery] = useState("");


    // 以 query 比對 title / description / requirements（不區分大小寫）
    const filtered = useMemo(() => {
    if (!query.trim()) return jobs;
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
    if (job.title.toLowerCase().includes(q)) return true;
    if (job.description.some((d) => d.toLowerCase().includes(q))) return true;
    if (job.requirements.some((r) => r.toLowerCase().includes(q))) return true;
    return false;
    });
    }, [jobs, query]);
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
                            href= {t("jobs-url")}
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
            {/* <SlideInFromLeft delay={0.2}> */}
            <USRecruitPanelM />
            {/* </SlideInFromLeft> */}
            

        </div>
    );            
}
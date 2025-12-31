// app/admin/AdminUI.tsx
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import UniversalCrud, { FieldConfig } from "./components/UniversalCrud"; // 引入剛剛寫的萬用元件
import SingleFormEditor from "./components/SingleFormEditor";

// 定義 Props
interface AdminUIProps {
    partners: any[];
    exhibitions: any[];
    locations: any[];
    history: any[];
    services: any[];
    benefits: any[];
    certifications: any[];
    generalInfo: any;
    serviceProjects: any[];
}
const GENERAL_FIELDS: FieldConfig[] = [
  { key: "intro_content.zh", label: "公司簡介內文 (中文)", type: "textarea" },
  { key: "intro_content.en", label: "Introduction (English)", type: "textarea" },
  { key: "org_chart_url", label: "公司組織圖", type: "image" },
];

// 1. 設定：工程實績要顯示哪些欄位？
const PARTNER_FIELDS: FieldConfig[] = [
    { key: "name.zh", label: "廠商名稱 (中文)", type: "text" },
    { key: "name.en", label: "廠商名稱 (英文)", type: "text" },
];

// ★ 新增：展覽活動的欄位設定
const EXHIBITION_FIELDS: FieldConfig[] = [
    { key: "is_active", label: "前台顯示狀態", type: "boolean" }, // 開關
    { key: "name.zh", label: "展覽名稱 (中文)", type: "text" },
    { key: "name.en", label: "展覽名稱 (英文)", type: "text" },
    { key: "date_start", label: "開始日期", type: "date" },       // 日期
    { key: "date_end", label: "結束日期", type: "date" },         // 日期
    { key: "location.zh", label: "地點 (中文)", type: "text" },
    { key: "location.en", label: "地點 (英文)", type: "text" },
    { key: "booth_number", label: "攤位編號", type: "text" },
    { key: "description.zh", label: "介紹 (中文)", type: "textarea" }, // 多行文字
    { key: "description.en", label: "介紹 (英文)", type: "textarea" }, // 多行文字
    { key: "images", label: "活動照片 (多張)", type: "images" }, // ★ 加入這行
];

// C. 全球據點 (Locations)
const LOCATION_FIELDS: FieldConfig[] = [
    { key: "country_name.zh", label: "國家名稱 (中)", type: "text" },
    { key: "country_name.en", label: "Country Name", type: "text" },
    { key: "branch_name.zh", label: "據點名稱 (中)", type: "text" },
    { key: "branch_name.en", label: "Branch Name", type: "text" },
    { key: "phone", label: "聯絡電話", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "address.zh", label: "地址 (中)", type: "text" },
    { key: "address.en", label: "Address (En)", type: "text" },
    { key: "google_map_link", label: "Google Map 網址", type: "text" },
    { key: "image_url", label: "據點照片 (單張)", type: "image" }, // 單圖
    { key: "business_hours.zh", label: "營業時間 (中)", type: "text" },
];

// D. 公司歷史 (History)
const HISTORY_FIELDS: FieldConfig[] = [
    { key: "year", label: "年份", type: "text" },
    { key: "event.zh", label: "事件 (中)", type: "textarea" },
    { key: "event.en", label: "Event (En)", type: "textarea" },
];

// E. 產品服務 (Services)
const SERVICE_FIELDS: FieldConfig[] = [
    { key: "name.zh", label: "服務名稱 (中)", type: "text" },
    { key: "name.en", label: "Service Name", type: "text" },
    { key: "description.zh", label: "服務介紹 (中)", type: "textarea" },
    { key: "description.en", label: "Description (En)", type: "textarea" },
    { key: "images", label: "服務圖示/照片 (多張)", type: "images" }, // 多圖
];

// F. 員工福利 (Benefits)
const BENEFIT_FIELDS: FieldConfig[] = [
    { key: "content.zh", label: "福利內容 (中)", type: "textarea" },
    { key: "content.en", label: "Content (En)", type: "textarea" },
    { key: "image_url", label: "福利示意圖", type: "image" },
];

// G. 資質與認證 (Certifications)
const CERT_FIELDS: FieldConfig[] = [
    { key: "name.zh", label: "獎項/認證名稱 (中)", type: "text" },
    { key: "name.en", label: "Name (En)", type: "text" },
    { key: "image_url", label: "證書照片 (單張)", type: "image" }, // 單圖
];

// H. 服務項目管理 (Service Projects)
const SERVICE_PROJECT_FIELDS: FieldConfig[] = [
  { key: "slug", label: "網址代號 (英文, ex: parts)", type: "text" }, // ★ 新增：這是點擊後網址會變成的樣子
  { key: "display_order", label: "排序 (數字)", type: "text" },      // ★ 新增：控制誰排前面
  { key: "name.zh", label: "服務名稱 (中)", type: "text" },
  { key: "name.en", label: "Name (En)", type: "text" },
  
  // ★ 新增：列表頁用的欄位
  { key: "cover_image", label: "列表封面圖", type: "image" },
  { key: "summary.zh", label: "封面簡介 (中)", type: "textarea" },
  { key: "summary.en", label: "Summary (En)", type: "textarea" },

  // ★ 既有：詳情頁用的欄位
  { key: "description.zh", label: "詳細內容 (中)", type: "textarea" }, 
  { key: "description.en", label: "Description (En)", type: "textarea" },
  { key: "images", label: "詳情頁輪播圖 (多張)", type: "images" },
];

export default function AdminUI({ generalInfo, partners, exhibitions, locations, history, services, serviceProjects, benefits, certifications }: AdminUIProps) {
    const [activeTab, setActiveTab] = useState("general");
    // 左側選單按鈕小元件
    const MenuBtn = ({ id, label }: { id: string, label: string }) => (
        <button 
        onClick={() => setActiveTab(id)}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition mb-1
            ${activeTab === id ? "bg-blue-50 text-[#1c486f]" : "text-gray-500 hover:bg-gray-50"}`}
        >
        {label}
        </button>
    );
    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
            {/* 側邊欄 */}
            <header className="bg-[#1c486f] text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        {/* 確保圖片路徑正確，加入 CSS 確保不跑版 */}
                        <img width={300} height={40} src="/YAHO_logo/logo_dark.jpg" alt="ZCSTCL Logo" className="h-10 w-auto object-contain rounded px-2" />
                        <div className="h-6 w-px bg-white/20"></div>
                        <h1 className="text-lg font-bold tracking-wide">官網內容管理</h1>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition">登出</button>
                    </div>
            </header>
            <div className="flex flex-1 overflow-hidden"> 
                {/* 左側選單 */}
                <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto z-40 shadow-sm flex-shrink-0">
                    <div className="p-4 space-y-6">
                        {/* 分類：公司簡介 */}
                        <div>
                            <h4 className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">公司簡介</h4>
                            <MenuBtn id="general" label="簡介與組織圖 (Intro)" />
                            <MenuBtn id="profile" label="公司歷史 (History)" />
                            <MenuBtn id="certs" label="資質認證 (Awards)" />
                        </div>

                        {/* 分類：全球據點 */}
                        <div>
                            <h4 className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">全球據點</h4>
                            <MenuBtn id="locations" label="據點管理 (Locations)" />
                        </div>

                        {/* 分類：產品服務 */}
                        <div>
                            <h4 className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">產品與實績</h4>
                            <MenuBtn id="projects" label="服務項目 (Services)" />
                            <MenuBtn id="partners" label="工程實績 (Partners)" />
                        </div>

                        {/* 分類：其他 */}
                        <div>
                            <h4 className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">活動與人資</h4>
                            <MenuBtn id="exhibitions" label="展覽活動 (Events)" />
                            <MenuBtn id="benefits" label="員工福利 (HR)" />
                        </div>

                    </div>
                </aside>
                {/* 右側主畫面 */}
                <section className="flex-1 overflow-y-auto bg-gray-100 p-6 sm:p-10 scroll-smooth relative">
                    <div className="max-w-5xl mx-auto pb-20">
                        {/* === 公司簡介區 === */}
                        {activeTab === "general" && (
                        <SingleFormEditor title="公司基本資料設定" table="general_info" data={generalInfo} 
                            fields={GENERAL_FIELDS}  /> 
                        )}  
                        {activeTab === "profile" && (
                        <UniversalCrud title="公司歷史沿革" table="company_history" data={history} fields={HISTORY_FIELDS} 
                            defaultNewData={{ year: "3030", event: { zh: "新事件", en: "New Event" } }} />
                        )}
                        {activeTab === "certs" && (
                        <UniversalCrud title="資質與認證" table="certifications" data={certifications} fields={CERT_FIELDS} 
                            defaultNewData={{ name: { zh: "新證書", en: "New Cert" } }} />
                        )}

                        {/* === 據點區 === */}
                        {activeTab === "locations" && (
                        <UniversalCrud title="全球據點管理" table="locations" data={locations} fields={LOCATION_FIELDS} 
                            defaultNewData={{ country: "Taiwan", country_name: {zh:"台灣"}, branch_name: {zh:"新據點"} }} />
                        )}

                        {/* === 產品服務區 === */}
                        {activeTab === "projects" && (
                        <UniversalCrud 
                            title="服務項目管理" 
                            table="services" 
                            data={serviceProjects} // 記得在 page.tsx 抓這個資料
                            fields={SERVICE_PROJECT_FIELDS} 
                            defaultNewData={{ slug: "new-service", name: { zh: "新服務" }, images: [] }} 
                        />
                        )}
                        {activeTab === "partners" && (
                        <UniversalCrud title="工程實績列表" table="partners" data={partners} fields={PARTNER_FIELDS} 
                            defaultNewData={{ name: { zh: "新廠商", en: "New Partner" } }} />
                        )}

                        {/* === 活動與人資區 === */}
                        {activeTab === "exhibitions" && (
                        <UniversalCrud title="展覽活動列表" table="exhibitions" data={exhibitions} fields={EXHIBITION_FIELDS} 
                            defaultNewData={{ is_active: true, name: { zh: "新展覽" }, images: [] }} />
                        )}
                        {activeTab === "benefits" && (
                        <UniversalCrud title="員工福利項目" table="benefits" data={benefits} fields={BENEFIT_FIELDS} 
                            defaultNewData={{ content: { zh: "福利說明", en: "Benefit Desc" } }} />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
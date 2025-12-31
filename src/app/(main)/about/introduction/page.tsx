// "use client";
// import React, { useState } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { useTranslations } from "next-intl";
// import Link from "next/link"
// import Timeline from "@/src/components/TimeLine";
// import SlideInFromLeft from "@/src/components/animations/SlideInFromLeft";
// import ZoomIn from "@/src/components/animations/ZoomIn";
// import FadeInUp from "@/src/components/animations/FadeInUp";
// import Image from "next/image";

// export default function IntroductionPage() {
//     const t = useTranslations("about");
//     const coreValues = [
//         { key: "Integrity", descKey: "Integrity description" },
//         { key: "Responsibility", descKey: "Responsibility description" },
//         { key: "Professionalism", descKey: "Professionalism description" },
//         { key: "Efficiency", descKey: "Efficiency description" },
//         { key: "Customer Satisfaction", descKey: "Customer Satisfaction description" },
//     ];

//   return (
//     <div className="overflow-x-hidden">
//         {/* 關於垚鋐 簡介頁首圖片 */}
//         <div className="relative w-full h-[40vh] md:h-[60vh] xl:h-[80vh] overflow-hidden">
//             <Image src="/frontPage/1.jpg" 
//                 alt="Front Page" 
//                 layout="fill"
// 				objectFit="cover"/>
//         </div>
//         {/* 網站導覽列 */}
//         <Breadcrumb className="px-8 pt-5 sm:pt-8 w-full">
//             <BreadcrumbList>
//                 <BreadcrumbItem>
//                     <BreadcrumbLink href="/" className="text-sm sm:text-base font-semibold">
//                         {/* 首頁 */}
//                         {t("introduction.homepage")}
//                     </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                         {/* 關於垚鋐簡介 */}
//                         <Link href="/about/introduction" className="text-sm sm:text-base font-semibold">{t("introduction.about")}</Link>
//                     </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                         {/* 關於垚鋐簡介 */}
//                         <Link href="/about/introduction" className="text-sm sm:text-base font-semibold">{t("introduction.title")}</Link>
//                     </BreadcrumbLink>
//                 </BreadcrumbItem>
//             </BreadcrumbList>
//         </Breadcrumb>
//         {/* 下畫線 */}
//         <span className="block w-[80%] md:w-[90%] xl:w-[95%] h-[1px] bg-gray-700 my-3 sm:my-4 mx-10"></span>

//         {/* 公司簡介標題 */}
//         <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">
//             {t("introduction.title")}
//         </div>
//         {/* 公司簡介內容 */}
//         <div className="font-normal text-base lg:text-lg pt-0 md:pt-2 xl:pt-8 m-2 md:m-4 leading-9 mb-10 xl:px-30">
//             <ZoomIn delay={0.3}>
//                 <p className="my-4 mx-8 md:mx-20 whitespace-pre-wrap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("introduction.descriptionDetail1")}</p>
//                 <p className="my-4 mx-8 md:mx-20 whitespace-pre-wrap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("introduction.descriptionDetail2")}</p>
//             </ZoomIn>
//         </div>
//         {/* 公司標語 */}
//         <ZoomIn delay={0.3}>
//             <div className="mx-10 md:mx-24 lg:mx-0 pb-18 md:pt-10 flex flex-col justify-center items-start lg:items-center gap-6 hover:scale-105 transition-transform duration-300">
//                 <p className="text-[#375978] text-base sm:text-lg lg:text-xl font-black">{t("introduction.descriptionDetail3")}</p>
//                 <p className="text-[#375978] text-base sm:text-lg lg:text-xl font-black">{t("introduction.descriptionDetail4")}</p>
//                 <p className="text-[#375978] text-base sm:text-lg lg:text-xl font-black">{t("introduction.descriptionDetail5")}</p>
//                 <p className="text-[#375978] text-base sm:text-lg lg:text-xl font-black">{t("introduction.descriptionDetail6")}</p>
//                 <p className="text-[#375978] text-base sm:text-lg lg:text-xl font-black">{t("introduction.descriptionDetail7")}</p>
//             </div>
//         </ZoomIn>

//         {/* 發展歷史 */}
//         <div className="bg-[#375978]">
//             {/*  初始隱藏 xl以上顯示 */}
//             <div className="hidden xl:block">
//                 {/* 標題 */}
//                 <div className="font-extrabold text-4xl text-white px-8 py-16 ml-4 ">
//                     {t("introduction.history.title")}
//                 </div>
//                 <div className="flex justify-stretch">
//                     {/* 左側圖片 */}
//                     <SlideInFromLeft delay={0.2}>
//                         <div className="xl:w-[55vw] xl:h-[700px] xl:mr-10 overflow-hidden ">
//                             <img src="/about/history.jpg" alt="Front Page" />
//                         </div>
//                     </SlideInFromLeft>
//                     {/* 右側時間線 */}
//                     <FadeInUp delay={0.8}>
//                         <div className="mb-16">
//                             <Timeline />
//                         </div>
//                     </FadeInUp>
//                 </div>
//             </div>
//             {/* 初始顯示 xl以上隱藏 */}
//             <div className="block xl:hidden">
//                 {/* 標題 */}
//                 <div className="font-extrabold  text-2xl md:text-3xl xl:text-4xl text-white px-6 py-10 md:px-8 md:py-16 ml-4 ">
//                     {t("introduction.history.title")}
//                 </div>
//                 {/* 時間線 */}
//                 <div className="flex flex-col justify-center items-center space-y-8 px-4">
//                     <FadeInUp delay={0.8}>
//                         <div className="mb-16">
//                             <Timeline />
//                         </div>
//                     </FadeInUp>
//                 </div>
//             </div>
//         </div>

//         {/* 核心理念 */}
//         <div className="h-full shadow-[0_30px_36px_rgba(0,0,0,0.10)] ">
//             {/* 初始隱藏 xl以上顯示 */}
//             <div className="hidden xl:block">
//                 <div className="flex font-extrabold text-4xl text-[#375978] px-8 py-16 ml-4">
//                     {/* 標題 */}
//                     {t("introduction.coreValue.title")}
//                     {/* 分隔線 */}
//                     <span className="block w-[80%] h-[1px] bg-[#375978] xl:mx-10 mt-5"></span>
//                 </div>
//                 <div className="flex justify-center space-x-10 xl:space-x-8 2xl:space-x-25 pb-20">
//                     {/* 核心圖片 */}
//                     <ZoomIn delay={0.2}>
//                         <div className="h-[300px] xl:w-[600px] xl:h-[500px] 2xl:w-[650px] 2xl:h-[70vh]  mt-10 overflow-hidden hover:scale-110 transition-transform duration-500 ease-in-out">
//                             <img src="/coreValue/a.png" alt="Front Page" className="w-full h-full object-cover"/>
//                         </div>
//                     </ZoomIn>
//                     {/* 核心五價值 */}
//                     <SlideInFromLeft delay={0.4}>
//                         {coreValues.map(({ key, descKey }, index) => (
//                             <div key={key} className="group p-6 m-2 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1),0_-2px_10px_rgba(0,0,0,0.1)] hover:bg-[#F0F4F8] hover:scale-105 transition-transform duration-300 max-w-[600px]">
//                                 {/* 標題 */}
//                                 <h2 className="font-extrabold text-2xl text-[#375978] mr-2 min-w-[200px] mb-2">
//                                     {t(`introduction.coreValue.${key}`)}
//                                 </h2>
//                                 {/* hover下滑線 */}
//                                 <span className="block w-0 h-[2px] md:h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-full "></span>
//                                 {/* 描述文字 */}
//                                 <p className="text-lg text-black mt-6">
//                                     {t(`introduction.coreValue.${descKey}`)}
//                                 </p>
//                             </div>
//                         ))}
//                     </SlideInFromLeft>
//                 </div>
//             </div>
//             {/* 初始顯示 xl以上隱藏 */}
//             <div className="block xl:hidden">
//                 <div className="flex justify-center font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] px-6 py-10 md:px-8 md:py-16 ml-4">
//                     {/* 標題 */}
//                     {t("introduction.coreValue.title")}
//                     {/* 分隔線 */}
//                     <span className="block w-[0%] md:w-[70%] h-[1px] bg-[#375978] ml-6 md:ml-10 mt-5"></span>
//                 </div>
//                 <div className="flex flex-col space-x-10 pb-20 justify-center items-center">
//                     {/* 核心圖片 */}
//                     <ZoomIn delay={0.2}>
//                         <div className="h-[250px] ml-10 md:h-[380px] md:w-[500px] lg:h-[500px] overflow-hidden hover:scale-110 transition-transform duration-500 ease-in-out">
//                             <img src="/coreValue/a.png" alt="Front Page" className="w-full h-full object-cover"/>
//                         </div>
//                     </ZoomIn>
//                     {/* 核心五價值 */}
//                     <SlideInFromLeft delay={0.4}>
//                         {coreValues.map(({ key, descKey }, index) => (
//                             <div key={key} className="group p-6 mx-18 md:mx-10 my-4 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1),0_-2px_10px_rgba(0,0,0,0.1)] hover:bg-[#F0F4F8] hover:scale-105 transition-transform duration-300 max-w-[700px]">
//                                 {/* 標題 */}
//                                 <h2 className="font-extrabold text-lg md:text-2xl text-[#375978] mr-2 min-w-[200px] mb-2">
//                                     {t(`introduction.coreValue.${key}`)}
//                                 </h2>
//                                 {/* hover下滑線 */}
//                                 <span className="block w-0 h-[2px] md:h-0.5 bg-[#375978] transition-all duration-300 group-hover:w-full "></span>
//                                 {/* 描述文字 */}
//                                 <p className="text-sm sm:text-base md:text-lg text-black mt-6">
//                                     {t(`introduction.coreValue.${descKey}`)}
//                                 </p>
//                             </div>
//                         ))}
//                     </SlideInFromLeft>
//                 </div>
//             </div>
//         </div>

//         {/* 台灣證書 */}
//         <div className="my-20">
//             {/* 標題 */}
//             <div className="flex justify-center md:justify-start font-extrabold text-3xl md:text-4xl text-[#375978] px-6 py-10 md:px-8 md:py-16 md:ml-4">
//                 {t("introduction.certificates.title")}
//             </div>
//             <div className="bg-gradient-to-b from-white to-gray-200 py-12 px-6 text-center">
//                 <div className="flex flex-col">
//                     {/* 證書英文名稱 */}
//                     <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
//                     {/* 下畫線 */}
//                     <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
//                     {/* 台灣公司名稱 */}
//                     <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
//                         {t("introduction.certificates.tw company")}
//                     </h3>
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 lg:gap-40 flex-wrap">
//                     {/* ISO證書 */}
//                     <SlideInFromLeft delay={0.4}>
//                         <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600 md:pb-20">
//                             {/* 證書名稱 */}
//                             <p className="text-lg font-semibold mb-4">{t("introduction.certificates.tw iso")}</p>
//                             {/* 證書圖片 */}
//                             <div className="w-[250px] sm:w-[360px] shadow-md ">
//                                 <img
//                                     src="/about/tw/iso.png"
//                                     alt="ISO Certification"
//                                 />
//                             </div>
//                         </div>
//                     </SlideInFromLeft>
//                     {/* 專業委員證書 */}
//                     <SlideInFromLeft delay={0.8}>
//                         <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600 md:pb-20">
//                             {/* 證書名稱 */}
//                             <p className="text-lg font-semibold mb-4">{t("introduction.certificates.tw professional")}</p>
//                             {/* 證書圖片 */}
//                             <div className="w-[250px] sm:w-[360px] shadow-md">
//                                 <img
//                                     src="/about/tw/professional.png"
//                                     alt="Professional Certificate"
//                                 />
//                             </div>
//                         </div>
//                     </SlideInFromLeft>
//                 </div>
//             </div>
//         </div>

//         {/* 美國證書 */}
//         <div className="bg-gradient-to-b from-white to-gray-200 py-12 px-6 text-center my-20 ">
//             <div className="flex flex-col">
//                 {/* 證書英文名稱 */}
//                 <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
//                 {/* 下畫線 */}
//                 <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
//                 {/* 美國公司名稱 */}
//                 <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
//                     {t("introduction.certificates.A company")}
//                 </h3>
//             </div>
//             <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 md:pb-20 flex-wrap">
//                 {/* 美國施工證書 */}
//                 <SlideInFromLeft delay={0.8}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         {/* 證書名稱 */}
//                         <p className="text-lg font-semibold mb-4">{t("introduction.certificates.A construction")}</p>
//                         {/* 證書圖片 */}
//                         <div className="w-[250px] sm:w-[360px] shadow-md">
//                             <img
//                                 src="/about/usa/2.png"
//                                 alt="Professional Certificate"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//                 {/* 美國施工證書 */}
//                 <SlideInFromLeft delay={1.2}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         {/* 證書名稱 */}
//                         <p className="text-lg font-semibold mb-4">{t("introduction.certificates.A construction")}</p>
//                         {/* 證書圖片 */}
//                         <div className="w-[250px] sm:w-[360px] shadow-md">
//                             <img
//                                 src="/about/usa/3.png"
//                                 alt="Professional Certificate"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//             </div>
//         </div>

//         {/* 日本證書 */}
//         <div className="bg-gradient-to-b from-white to-gray-200 py-12 px-6 text-center ">
//             <div className="flex flex-col">
//                 {/* 證書英文名稱 */}
//                 <h2 className="text-2xl md:text-3xl font-serif ">{t("introduction.certificates.Certification")}</h2>
//                 {/* 下畫線 */}
//                 <span className="block w-[100px] h-[2px] bg-black my-6 mx-auto"></span>
//                 {/* 日本公司名稱 */}
//                 <h3 className="text-xl md:text-2xl font-semibold text-[#333] mb-10">
//                     {t("introduction.certificates.j company")}
//                 </h3>
//             </div>
//             <div className="flex justify-center items-start">
//                 {/* 日本施工證書 */}
//                 <SlideInFromLeft delay={0.4}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         {/* 證書名稱 */}
//                         <p className="text-lg font-semibold mb-4">{t("introduction.certificates.j construction")}</p>
//                         {/* 證書圖片 */}
//                         <div className="w-[250px] sm:w-[360px] shadow-md ">
//                             <img
//                                 src="/about/jp/4.png"
//                                 alt="ISO Certification"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//             </div>
//         </div>

//         {/* 獲獎事蹟 */}
//         <div className="bg-gradient-to-b from-gray-200 to-white py-12 px-6 xl:px-20">
//             <div className="flex justify-center md:justify-start font-extrabold text-3xl md:text-4xl text-[#375978] px-6 py-10 md:px-8 md:py-16 md:ml-4 mb-10">
//                 {/* 獲獎事蹟標題 */}
//                 {t("introduction.awards.title")}
//                 {/* 分隔線 */}
//                 <span className="block w-[0%] md:w-[70%] h-[1px] bg-[#375978] xl:mx-10 mt-5"></span>
//             </div>
//             <div className="flex justify-center items-center gap-10 md:gap-20 xl:gap-30 flex-wrap">
//                 {/* 2024_GAS HOOK UP F21表揚獎狀 */}
//                 <SlideInFromLeft delay={0.4}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         <p className="text-lg font-semibold my-8">{t("introduction.awards.award1")}</p>
//                         {/* <span className="block w-[80%] h-[1px] bg-[#375978] xl:mx-10 mt-5"></span> */}
//                         <div className="w-[250px] sm:w-[360px]">
//                             <img
//                                 src="/about/award/1_GASHOOKUPF21.jpg"
//                                 alt="ISO Certification"
//                                 className="md:h-[540px]"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//                 {/* 2024_GAS HOOK UP台中廠區表揚獎狀 */}
//                 <SlideInFromLeft delay={0.8}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         <p className="text-lg font-semibold my-8">{t("introduction.awards.award2")}</p>
//                         <div className="w-[250px] sm:w-[360px]">
//                             <img
//                                 src="/about/award/2_GASHOOKUP.jpg"
//                                 alt="ISO Certification"
//                                 className="md:h-[540px]"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//                 {/* 台積頒發榮譽F22優良監工 */}
//                 <SlideInFromLeft delay={1.2}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         <p className="text-lg font-semibold my-8">{t("introduction.awards.award3")}</p>
//                         <div className="w-[250px] sm:w-[360px]">
//                             <img
//                                 src="/about/award/3_F22.jpg"
//                                 alt="ISO Certification"
//                                 className="md:h-[540px]"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//                 {/* 2024 TSMC年度優良廠商 */}
//                 <SlideInFromLeft delay={0.4}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         <p className="text-lg font-semibold my-8">{t("introduction.awards.award4")}</p>
//                         <div className="w-[250px] sm:w-[500px] md:h-[540px]">
//                             <img
//                                 src="/about/award/4_TSMC.png"
//                                 alt="ISO Certification"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//                 {/* 2024 第十八屆金炬獎 */}
//                 <SlideInFromLeft delay={0.8}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         <p className="text-lg font-semibold my-8">{t("introduction.awards.award5")}</p>
//                         <div className="">
//                             <img
//                                 src="/about/award/5_18.png"
//                                 alt="ISO Certification"
//                                 className="h-[540px]"
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//                 {/* 2025 全國創新創業總會 熱心公益 */}
//                 <SlideInFromLeft delay={0.8}>
//                     <div className="flex flex-col items-center hover:scale-105 transition-transform duration-600">
//                         <p className="text-lg font-semibold my-8">{t("introduction.awards.award6")}</p>
//                         <div className="w-[250px] sm:w-[500px] md:h-[540px]">
//                             <img
//                                 src="/about/award/6_2025.png"
//                                 alt="ISO Certification"
                                
//                             />
//                         </div>
//                     </div>
//                 </SlideInFromLeft>
//             </div>
//         </div>
//     </div>
//   );            
// }

// app/[locale]/about/introduction/page.tsx
import { createClient } from '@/src/utils/supabase/server';
import IntroductionClient from '@/src/components/ui/IntroductionClient';

export default async function IntroductionPage() {
  const supabase = await createClient();

  // 平行抓取所有需要的資料
  const [infoRes, historyRes, certsRes] = await Promise.all([
    supabase.from('general_info').select('*').single(),
    supabase.from('company_history').select('*').order('year', { ascending: false }),
    // 抓取所有證書 (之後在 Client 端分類)
    supabase.from('certifications').select('*').order('created_at', { ascending: true }), 
  ]);

  return (
    <IntroductionClient 
      generalInfo={infoRes.data || {}}
      history={historyRes.data || []}
      certifications={certsRes.data || []}
    />
  );
}
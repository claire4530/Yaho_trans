// src/app/admin/adminData.ts

export type ImageItem = { id: number; src: string; name: string };
export type PageData = { 
  slug: string; 
  title: string; 
  description?: string; 
  content: string; 
  images: ImageItem[] 
};

// =================================================================
// 1. 定義選單結構 (11 個獨立頁簽) - 結構保持您要的樣子
// =================================================================
export const MENU_STRUCTURE = [
  {
    id: "home_group",
    name: "首頁 (Home)",
    sections: ["home_main", "core_values", "products_scroll", "exhibitions_summary", "global_map"]
  },
  
  // --- 關於垚鋐 ---
  {
    id: "about_intro_tab",
    name: "1. 公司簡介",
    // 這裡將原本的大長篇內容拆成 5 個區塊，方便您編輯，但內容是您提供的完整版
    sections: ["about_intro", "about_history", "about_core", "about_certificates", "about_awards"]
  },
  {
    id: "about_org_tab",
    name: "2. 公司組織",
    sections: ["about_organization"]
  },
  {
    id: "about_loc_tab",
    name: "3. 全球據點",
    sections: ["about_location"]
  },

  // --- 產品服務 ---
  {
    id: "prod_main_tab",
    name: "4. 產品服務 (主頁)",
    sections: ["products_main"]
  },
  {
    id: "prod_serv_tab",
    name: "5. 服務項目",
    sections: ["services_list"]
  },
  {
    id: "prod_case_tab",
    name: "6. 工程實績",
    sections: ["project_cases"]
  },

  // --- 展覽活動 ---
  {
    id: "exhib_tab",
    name: "7. 展覽活動",
    sections: ["exhibitions_page"]
  },

  // --- 人力資源 ---
  {
    id: "hr_main_tab",
    name: "8. 人力資源 (主頁)",
    sections: ["hr_main"]
  },
  {
    id: "hr_welfare_tab",
    name: "9. 員工福利",
    sections: ["hr_welfare"]
  },
  {
    id: "hr_recruit_tab",
    name: "10. 徵才資訊",
    sections: ["hr_recruit"]
  },
];


// =================================================================
// 2. 資料庫 (SAMPLE_DATA)
// =================================================================
export const SAMPLE_DATA: Record<string, PageData> = {
  
  // ==================== 首頁 (Home) - 保持不動 ====================
  home_main: { 
    slug: "home_main", 
    title: "首頁 - 主視覺", 
    description: "HomePage",
    content: JSON.stringify({
      "title1": "垚鋐 : ",
      "titleOrange1": "專業",
      "description": "從設計到維運，為高科技產業打造完整工程解決方案",
      "slidesSlogan": ["專精廠務 安全高效", "十年經驗 技術領先", "STK配管 自動化整合", "誠實效率 客戶至上", "技術助力 拓展服務"],
    }, null, 4), 
    images: [
      { id: 1, src: "/frontPage/1.jpg", name: "輪播圖 1" },
      { id: 2, src: "/frontPage/2.jpg", name: "輪播圖 2" },
      { id: 3, src: "/frontPage/3.jpg", name: "輪播圖 3" },
      { id: 4, src: "/frontPage/4.jpg", name: "輪播圖 4" },
      { id: 5, src: "/frontPage/5.jpg", name: "輪播圖 5" },
    ] 
  },
  core_values: {
    slug: "core_values",
    title: "首頁 - 核心價值",
    description: "CoreValue",
    content: JSON.stringify({
      "slide1": { "slogan": "誠信", "details": "誠信為本公司至關重要之核心價值..." },
      "slide2": { "slogan": "負責", "details": "YAHO深切體認顧客..." },
      "slide3": { "slogan": "專業", "details": "我們重視細節..." },
      "slide4": { "slogan": "效率", "details": "效率乃工作之本..." },
      "slide5": { "slogan": "客戶滿意度", "details": "於YAHO，客戶居核心地位..." }
    }, null, 4),
    images: [
      { id: 1, src: "/coreValue/1.png", name: "Icon 誠信" },
      { id: 2, src: "/coreValue/2.png", name: "Icon 負責" },
      { id: 3, src: "/coreValue/3.png", name: "Icon 專業" },
      { id: 4, src: "/coreValue/4.png", name: "Icon 效率" },
      { id: 5, src: "/coreValue/5.png", name: "Icon 客戶滿意度" }
    ]
  },
  products_scroll: {
    slug: "products_scroll",
    title: "首頁 - 產品摘要",
    description: "ProductsScroll",
    content: JSON.stringify({
      "title1": "服務項目",
      "description1": "我們提供多樣化的產品與服務...",
      "title2": "工程實績",
      "description2": "我們的工程實績展示了..."
    }, null, 4),
    images: [
      { id: 1, src: "/products/1.png", name: "產品圖 1" },
      { id: 2, src: "/products/2.png", name: "產品圖 2" },
      { id: 3, src: "/products/3.png", name: "產品圖 3" }
    ]
  },
  exhibitions_summary: {
    slug: "exhibitions_summary",
    title: "首頁 - 展覽摘要",
    description: "Exhibition",
    content: JSON.stringify({
      "exhibition1": { "dateRange": "2025/09/10 - 2025/09/12", "title": "SEMICON Taiwan 2025" },
      "exhibition2": { "dateRange": "2024/09/04 - 2024/09/06", "title": "SEMICON Japan 2024" }
    }, null, 4),
    images: []
  },
  global_map: {
    slug: "global_map",
    title: "首頁 - 全球據點",
    description: "GlobalMap (首頁版)",
    content: JSON.stringify({
      "title": "全球據點",
      "Taiwan": {
        "title": "台灣據點",
        "branches1": "台中總公司",
        "branches2": "新竹寶山服務中心",
        "branches3": "新竹科園服務中心",
        "branches4": "台南安定服務中心",
        "branches5": "高雄大社服務中心",
        "branches6": "桃園龜山服務中心",
        "branches7": "嘉義朴子服務中心"
      },
      "USA": {
        "title": "美國據點",
        "branches1": "亞歷桑那子公司"
      },
      "Japan": {
        "title": "日本據點",
        "branches1": "熊本子公司"
      },
      "Germany": {
        "title": "德國據點",
        "branches1": "德勒斯登子公司"
      },
      "Singapore": {
        "title": "新加坡據點",
        "branches1": "新加坡子公司"
      },
      "url": "https://www.zcstcl.com/official_web/"
    }, null, 4),
    images: []
  },


  // ==========================================
  // [About] 1. 公司簡介 - ★ 這裡已修復為您的完整內容 ★
  // ==========================================
  about_intro: {
    slug: "about_intro",
    title: "企業介紹",
    description: "Introduction",
    content: JSON.stringify({
      "title": "公司簡介",
      "homepage": "首頁",
      "about": "關於垚鋐",
      "url": "/about/introduction",
      "descriptionDetail1": "垚鋐是一家「專注於高科技廠房建置及維運、系統設備整合的技術型企業」，涵蓋廠務系統設計、廠務氣體化學配管、保溫加熱工程、機台組裝與耗材銷售服務的科技型產業。我們是一群擁有多年產業經驗的核心團隊，並以高效率與專業客服贏得客戶信賴。我們不僅深耕台灣市場，也積極拓展全球服務據點與技術合作，持續為產業提供完整、高品質的工程解決方案。",
      "descriptionDetail2": "自成立以來，垚鋐始終秉持專業、創新與服務精神，從保溫加熱與廠務配管工程起步，逐步擴展至自動化設備整合與與國外原廠合作代理半導體和光電廠相關設備和耗材，打造一站式解決方案。我們擁有齊全的工程設計能力、技術團隊與完整售後服務，為客戶提供「從設計到安裝、從供應到維護」的全流程服務。  「負責、誠信、效率、專業、客戶滿意」是垚鋐的使命也是企業永續的基石。期許每位加入垚鋐的夥伴都能與公司一同成長、共創價值，我們的起點是台灣，我們的舞台是世界 !",
      "descriptionDetail3": "專精廠務，安全高效： 垚鋐專注廠務系統設計與工程，助您打造安全高效的生產環境",
      "descriptionDetail4": "十年經驗，技術領先： 逾十年產業經驗，提供專業廠務解決方案",
      "descriptionDetail5": "誠實效率，客戶至上: 堅持誠實經營，追求效率卓越，以客戶滿意為首要目標",
      "descriptionDetail6": "技術助力，拓展服務： 擴大服務範疇，滿足多元客戶需求",
      "descriptionDetail7": "STK配管，自動化整合： 精通氣體管路組裝與自動化系統，提供全方位廠務服務"
    }, null, 4),
    images: [
      { id: 1, src: "/frontPage/1.jpg", name: "首頁大圖" }
    ]
  },
  
  about_history: {
    slug: "about_history",
    title: "公司沿革",
    description: "History",
    content: JSON.stringify({
      "title": "公司沿革",
      "year1": "2025",
      "year1_description1": "成立德國子公司、新加坡子公司",
      "year1_description2": "美國美光合格供應商",
      "year1_description3": "",
      "year2": "2024",
      "year2_description1": "成立日本子公司",
      "year2_description2": "榮獲tsmc供應商獎",
      "year2_description3": "美光合格供應商、應材合格供應商",
      "year3": "2023",
      "year3_description1": "成立美國子公司",
      "year3_description2": "",
      "year3_description3": "",
      "year4": "2022",
      "year4_description1": "台灣台積電合格廠商",
      "year4_description2": "",
      "year4_description3": "",
      "year5": "2015 - 2020",
      "year5_description1": "取得Thermon伴熱帶經銷權",
      "year5_description2": "研發半導體二次配um表傳簽及流量計算軟體",
      "year5_description3": ""
    }, null, 4),
    images: [
      { id: 1, src: "/about/history.jpg", name: "公司沿革" }
    ]
  },

  about_core: {
    slug: "about_core",
    title: "核心理念",
    description: "Core Values",
    content: JSON.stringify({
      "title": "核心理念",
      "Integrity": "誠信",
      "Responsibility": "負責",
      "Professionalism": "專業",
      "Efficiency": "效率",
      "Customer Satisfaction": "客戶滿意度",
      "Integrity description": "誠信為本公司至關重要之核心價值。吾等秉持誠實守信之原則，並堅信實質成果乃彰顯價值之最佳體現。",
      "Responsibility description": "YAHO深切體認顧客、供應商、員工、股東與社會福祉對公司成功至關重要。 為回應各利害關係人之信任，本公司承諾將積極履行企業社會責任，以期創造共享價值，並追求永續發展。",
      "Professionalism description": "我們重視細節，力求展現專業精神與卓越品質。 我們的目標是提供精準可靠的服務，以充分發揮專業價值，進而超越客戶的期望。",
      "Efficiency description": "效率乃工作之本。我們致力於簡化流程、優化資源配置，旨在提供迅捷、可靠且具高品質之解決方案。時間節省，價值創造，是我們的終極目標。",
      "Customer Satisfaction description": "於YAHO，客戶居核心地位。我們堅信，客戶之成功等同於我方之成就，並同等重視其競爭力及成長。"
    }, null, 4),
    images: [
      { id: 1, src: "/coreValue/a.png", name: "核心理念" }
    ]
  },

  about_certificates: {
    slug: "about_certificates",
    title: "資質與認證",
    description: "Certificates",
    content: JSON.stringify({
      "title": "資質與認證",
      "Certification": "Certification",
      "tw company": "垚鋐系統科技股份有限公司",
      "tw iso": "ISO證書",
      "tw professional": "專業委員證書",
      "A company": "YAHO Systems Technology Inc.",
      "A construction": "美國施工證書",
      "j company": "YAHO Systems Technology 株式会社",
      "j construction": "日本施工證書"
    }, null, 4),
    images: [
      { id: 1, src: "/about/tw/iso.png", name: "ISO證書" },
      { id: 2, src: "/about/tw/professional.png", name: "專業委員證書" },
      { id: 3, src: "/about/usa/2.png", name: "美國施工證書1" },
      { id: 4, src: "/about/usa/3.png", name: "美國施工證書2" },
      { id: 5, src: "/about/jp/4.png", name: "日本施工證書" }
    ]
  },

  about_awards: {
    slug: "about_awards",
    title: "獲獎事蹟",
    description: "Awards",
    content: JSON.stringify({
      "title": "獲獎事蹟",
      "award1": "2024 GAS HOOK UP F21表揚獎狀",
      "award2": "2024 GAS HOOK UP台中廠區表揚獎狀",
      "award3": "台積頒發榮譽F22優良監工",
      "award4": "2024 TSMC年度優良廠商",
      "award5": "2024 第十八屆金炬獎",
      "award6": "2025 全國創新創業總會 熱心公益"
    }, null, 4),
    images: [
      { id: 1, src: "/about/award/1_GASHOOKUPF21.jpg", name: "F21表揚獎狀" },
      { id: 2, src: "/about/award/2_GASHOOKUP.jpg", name: "台中廠區表揚" },
      { id: 3, src: "/about/award/3_F22.jpg", name: "F22優良監工" },
      { id: 4, src: "/about/award/4_TSMC.png", name: "TSMC優良廠商" },
      { id: 5, src: "/about/award/5_18.png", name: "第十八屆金炬獎" },
      { id: 6, src: "/about/award/6_2025.png", name: "熱心公益" }
    ]
  },

  // ==================== 2. 公司組織 ====================
  about_organization: {
    slug: "about_organization",
    title: "公司組織",
    description: "Organization Structure",
    content: JSON.stringify({
      "about": "關於垚鋐",
      "title": "公司組織"
    }, null, 4),
    images: [
      { id: 1, src: "/about/organization/v3.svg", name: "組織架構圖" }
    ]
  },

  // ==================== 3. 全球據點 ====================
about_location: {
    slug: "about_location",
    title: "全球據點 (詳細)",
    description: "含各國分公司詳細聯絡資訊、地址、圖片",
    content: JSON.stringify({
      "title": "全球據點",
      "Phone": "電話",
      "Email": "電子郵件",
      "Address": "地址",
      "BusinessHours": "營業時間",
      "ContactUs": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
      "Content": "業務內容",
      "Check": "查看地圖",
      "SelectCountry": "選擇一個國家",
      "country": {
        "Taiwan": {
          "name": "Taiwan",
          "Taiwan": "台灣",
          "title": "台灣據點",
          "branchesTotal": 7,
          "branches1": "台中總公司",
          "taichung": "台中",
          "mail1": "yaho-sales@zcstcl.com",
          "phone1": "+886-4-25601662 #1212",
          "address1": "台中市北屯區環中路一段485號",
          "businessHours1": "週一至週五 08:30–17:30",
          "content1": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl1": "/frontPage/1.jpg",

          "branches2": "新竹寶山服務中心",
          "mail2": "yaho-sales@zcstcl.com",
          "phone2": "+886-4-25601662 #1212",
          "address2": "新竹縣寶山鄉嵩翠路103巷58-8號",
          "businessHours2": "週一至週五 08:30–17:30",
          "content2": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl2": "/frontPage/1.jpg",

          "branches3": "新竹科園服務中心",
          "mail3": "yaho-sales@zcstcl.com",
          "phone3": "+886-4-25601662 #1212",
          "address3": "新竹市東區科學園路162巷3弄2號",
          "businessHours3": "週一至週五 08:30–17:30",
          "content3": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl3": "/frontPage/1.jpg",

          "branches4": "台南安定服務中心",
          "mail4": "yaho-sales@zcstcl.com",
          "phone4": "+886-4-25601662 #1212",
          "address4": "台南市安定區蘇厝2-14號",
          "businessHours4": "週一至週五 08:30–17:30",
          "content4": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl4": "/frontPage/1.jpg",

          "branches5": "高雄大社服務中心",
          "mail5": "yaho-sales@zcstcl.com",
          "phone5": "+886-4-25601662 #1212",
          "address5": "高雄市大社區中正路329-3號",
          "businessHours5": "週一至週五 08:30–17:30",
          "content5": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl5": "/frontPage/1.jpg",

          "branches6": "桃園龜山服務中心",
          "mail6": "yaho-sales@zcstcl.com",
          "phone6": "+886-4-25601662 #1212",
          "address6": "桃園市龜山區振興路1085號",
          "businessHours6": "週一至週五 08:30–17:30",
          "content6": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl6": "/frontPage/1.jpg",

          "branches7": "嘉義朴子服務中心",
          "mail7": "yaho-sales@zcstcl.com",
          "phone7": "+886-4-25601662 #1212",
          "address7": "嘉義縣朴子市開元路138號",
          "businessHours7": "週一至週五 08:30–17:30",
          "content7": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl7": "/frontPage/1.jpg"
        },
        "USA": {
          "name": "USA",
          "USA": "美國",
          "title": "美國據點",
          "branchesTotal": 1,
          "branches1": "亞歷桑那子公司",
          "mail1": "",
          "phone1": "480-350-7344",
          "address1": "5260 W Phelps Rd, Glendale, AZ 85306",
          "businessHours1": "週一至週五 08:00-17:00",
          "content1": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl1": "/frontPage/1.jpg"
        },
        "Japan": {
          "name": "Japan",
          "Japan": "日本",
          "title": "日本據點",
          "branchesTotal": 1,
          "branches1": "熊本子公司",
          "mail1": "yaho-sales@zcstcl.com",
          "phone1": "+886-4-25601662 #1212",
          "address1": "",
          "businessHours1": "週一至週五 08:30–17:30",
          "content1": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl1": "/frontPage/1.jpg"
        },
        "Germany": {
          "name": "Germany",
          "Germany": "德國",
          "title": "德國據點",
          "branchesTotal": 1,
          "branches1": "德勒斯登子公司",
          "mail1": "yaho-sales@zcstcl.com",
          "phone1": "+886-4-25601662 #1212",
          "address1": "",
          "businessHours1": "週一至週五 08:30–17:30",
          "content1": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl1": "/frontPage/1.jpg"
        },
        "Singapore": {
          "name": "Singapore",
          "Singapore": "新加坡",
          "title": "新加坡據點",
          "branchesTotal": 1,
          "branches1": "新加坡子公司",
          "mail1": "yaho-sales@zcstcl.com",
          "phone1": "+886-4-25601662 #1212",
          "address1": "8 KAKI BUKIT AVENUE 4, #08-32, PREMIER @ KAKI BUKIT, SINGAPORE 415875",
          "businessHours1": "週一至週五 08:30–17:30",
          "content1": "如有業務／技術需求，歡迎透過電話或信箱聯繫！",
          "imageUrl1": "/frontPage/1.jpg"
        }
      }
    }, null, 4),
    
    images: [
      { id: 1, src: "/about/location/1.jpg", name: "據點大圖" }
    ]
  },

  // ==================== 4. 產品服務 (主頁) ====================
  products_main: {
      slug: "products_main",
      title: "4. 產品服務 (主頁)",
      description: "產品服務主頁面 - 標題與子項目簡介",
      content: JSON.stringify({
        "title": "產品服務",
        "homepage": "首頁",
        "project": {
          "title": "服務項目",
          "description": "我們提供多樣化的產品與服務，專注於滿足客戶需求，並致力於創新與品質。無論是軟體開發、系統整合還是技術支援，我們都能提供專業的解決方案。"
        },
        "result": {
          "title": "工程實績",
          "description": "我們的工程實績展示了我們在各個領域的專業能力與成功案例，涵蓋了半導體、光電等產業的多項重要專案。"
        }
      }, null, 4),
      images: [
        { id: 1, src: "/services/1.jpg", name: "產品服務首頁大圖" }
      ]
    },

  // ==================== 5. 服務項目 ====================
services_list: {
    slug: "services_list",
    title: "5. 服務項目",
    content: JSON.stringify({
      "title": "服務項目",
      
      // 1. 廠務系統設計
      "system_design": {
        "title": "廠務系統設計",
        "description": "提供氣體、化學品、電力、排風、冷卻水等全方位廠務系統設計與整合。"
      },

      // 2. Gas & Chemical System
      "gas_chemical": {
        "title": "Gas & Chemical System",
        "description": "依據客戶需求提供廠務端、氣體與化學品系統之配管施工服務。"
      },

      // 3. AMHS 自動倉儲
      "amhs": {
        "title": "AMHS自動倉儲搬運系統",
        "description": "根據 AMHS 需求，從設計到裝機，一站式解決。儲位櫃體管路之整體設計，完成管路預置、組裝、現場施工與系統裝機。"
      },

      // 4. 裝機服務
      "installation": {
        "title": "裝機服務",
        "description": "致力裝機業務，從機台進入廠區後的Tier-0 組配機台Chamber作業到機台與Chamber之間溝通訊號及水電路相關組立服務，囊括CVD-DSM、PVD-MDP、ETCH等機型。"
      },

      // 5. SMIF POD 清洗機
      "smifpod": {
        "title": "YAHO SMIF POD 清洗機",
        "description": "提供 YAHO SMIF POD 清洗機的安裝、調試與維護服務，確保設備的最佳運行狀態。"
      },

      // 6. Parts 耗材
      "parts": {
        "title": "Parts 耗材銷售",
        "description": "針對現場設備零件需求，垚鋐具備逆向工程、分析、重建與複製之深厚經驗，現已開放客製化報價。",
        "features_1": "壓克力件 - EMO COVER、RACK COVER、GANTRY POWER COVER、DPN COVER、防夾塊、機台壓克力牌等",
        "features_2": "不鏽鋼件 - 零件置物箱、ISSG三角架、不鏽鋼腳踏板、手推台車、不鏽鋼IPA存放筒、不鏽鋼圓形垃圾桶及螺絲等"
      },

      // 7. 全方位服務 (OneStop)
      "onestop": {
        "title": "全方位裝機服務",
        "description": "告別繁瑣，迎接未來。我們整合專業團隊，提供從規劃到安裝的全方位裝機服務，省時省力更省心。",
        "services": [
          { "name": "工程服務", "desc": "氣體管路安裝、化學管路安裝、保溫加熱帶安裝" },
          { "name": "設計服務", "desc": "二次配設計、5D設計、軟體開發" },
          { "name": "設備組裝", "desc": "E-sensor設備/組裝、自動化裝機" },
          { "name": "高效整合", "desc": "整合設計、二次配系統、裝機、維修、耗材" }
        ]
      }
    }, null, 4),
    
    // ★ 圖片區塊策略：
    // 我用命名規則來區分 (主圖用 main, 細節用 detail_1, detail_2...)
    // 這樣你在後台看檔名就知道它是哪一區的圖
    images: [
      { id: 1, src: "/services/project/1.jpg", name: "服務項目首頁大圖" },
      // 1. 廠務設計
      { id: 101, src: "/services/project/design/7.png", name: "[廠務設計] 主圖" },
      { id: 102, src: "/services/project/design/3.jpg", name: "[廠務設計] 細節圖 1" },
      { id: 103, src: "/services/project/design/4.png", name: "[廠務設計] 細節圖 2" },
      { id: 104, src: "/services/project/design/6.png", name: "[廠務設計] 細節圖 3" },
      { id: 105, src: "/services/project/design/7.png", name: "[廠務設計] 細節圖 4" },
      { id: 106, src: "/services/project/design/8.jpg", name: "[廠務設計] 細節圖 5" },
      { id: 107, src: "/services/project/design/9.png", name: "[廠務設計] 細節圖 6" },

      // 2. Gas Chemical
      { id: 201, src: "/services/project/gasChemical/1.jpg", name: "[Gas Chemical] 主圖" },
      { id: 202, src: "/services/project/gasChemical/1.jpg", name: "[Gas Chemical] 細節圖 1" },
      { id: 203, src: "/services/project/gasChemical/2.jpg", name: "[Gas Chemical] 細節圖 2" },

      // 3. AMHS
      { id: 301, src: "/services/project/AMHS/1.png", name: "[AMHS] 主圖" },
      { id: 302, src: "/services/project/AMHS/2.png", name: "[AMHS] 細節圖 1" },
      { id: 303, src: "/services/project/AMHS/3.png", name: "[AMHS] 細節圖 2" },
      { id: 304, src: "/services/project/AMHS/5.png", name: "[AMHS] 細節圖 3" },
      { id: 305, src: "/services/project/AMHS/6.png", name: "[AMHS] 細節圖 4" },
      { id: 306, src: "/services/project/AMHS/7.png", name: "[AMHS] 細節圖 5" },

      // 4. 裝機服務
      { id: 401, src: "/services/project/Installation/1.jpg", name: "[裝機服務] 主圖" },
      { id: 402, src: "/services/project/Installation/1.jpg", name: "[裝機服務] 細節圖 1" },
      { id: 403, src: "/services/project/Installation/2.jpg", name: "[裝機服務] 細節圖 2" },
      
      // 5. SMIF POD
      { id: 501, src: "/services/project/SMIFPOD/1.png", name: "[SMIF POD] 主圖" },
      { id: 502, src: "/services/project/SMIFPOD/1.png", name: "[SMIF POD] 細節圖 1" },
      { id: 503, src: "/services/project/SMIFPOD/2.png", name: "[SMIF POD] 細節圖 2" },
      { id: 504, src: "/services/project/SMIFPOD/3.png", name: "[SMIF POD] 細節圖 3" },
      { id: 505, src: "/services/project/SMIFPOD/4.png", name: "[SMIF POD] 細節圖 4" },
      { id: 506, src: "/services/project/SMIFPOD/5.png", name: "[SMIF POD] 細節圖 5" },
      { id: 507, src: "/services/project/SMIFPOD/6.png", name: "[SMIF POD] 細節圖 6" },


      // 6. Parts
      { id: 601, src: "/services/project/Parts/122.jpg", name: "[Parts] 主圖" },
      { id: 602, src: "/services/project/Parts/122.jpg", name: "[Parts] 細節圖 1" },
      { id: 603, src: "/services/project/Parts/123.png", name: "[Parts] 細節圖 2" },
      { id: 604, src: "/services/project/Parts/124.png", name: "[Parts] 細節圖 3" },
      { id: 605, src: "/services/project/Parts/125.png", name: "[Parts] 細節圖 4" },
      { id: 606, src: "/services/project/Parts/126.png", name: "[Parts] 細節圖 5" },
      { id: 607, src: "/services/project/Parts/127.png", name: "[Parts] 細節圖 6" },
      { id: 608, src: "/services/project/Parts/128.png", name: "[Parts] 細節圖 7" },

      // 7. OneStop
      { id: 701, src: "/services/project/OneStop/4.png", name: "[全方位] 主圖" },
      { id: 702, src: "/services/project/OneStop/1.jpg", name: "[全方位] 流程圖 1" },
      { id: 703, src: "/services/project/OneStop/2.jpg", name: "[全方位] 流程圖 2" },
      { id: 704, src: "/services/project/OneStop/3.jpg", name: "[全方位] 流程圖 3" },
      { id: 705, src: "/services/project/OneStop/4.png", name: "[全方位] 細節圖 4" }
    ]
  },

  // ==================== 6. 工程實績 ====================
  project_cases: {
    slug: "project_cases",
    title: "6. 工程實績",
    content: JSON.stringify({
      "homepage": "首頁",
      "title": "產品服務",
      "result": "工程實績",
      // 客戶名單
      "TSMC": "台積電 tsmc",
      "Cica-Huntek": "矽科宏晟 Cica-Huntek",
      "Micron": "美光科技 Micron",
      "MIC": "帆宣 MIC",
      "GudengPrecision": "家登精密 Gudeng Precision",
      "GudengEquipment": "家碩科技 Gudeng Equipment",
      "Winbond": "華邦電子 Winbond",
      "AppliedMaterials": "應用材料 Applied Materials",
      "VIS": "世界先進 VIS",
      "SPIL": "矽品精密 SPIL",
      "SCIENTECH": "辛耘 SCIENTECH",
      "AUO": "友達光電 AUO",
      "Lotus": "美時 Lotus",
      "SUMCO": "勝高 SUMCO",
      "Lasertec": "雷泰光電 Lasertec",
      "Merck": "台灣默克 Merck",
      "Intel": "英特爾 Intel",
      "GlobalWafers": "環球晶圓 GWC",
      "SUNLIT": "僑力化工 SUNLIT",
      "Avary": "鵬鼎控股 Avary",
      "HUAWEI": "華為 HUAWEI",
      "Bionime": "華廣生技 Bionime",
      "ENTEGRIS": "英特格 ENTEGRIS",
      "CCP": "長春集團 CCP",
      "Macronix": "旺宏電子 Macronix"
    }, null, 4),
    images: [
      { id: 1, src: "/services/result/1.jpg", name: "首頁圖" }
    ]
  },

  // ==================== 7. 展覽活動 ====================
  exhibitions_page: {
    slug: "exhibitions_page",
    title: "7. 展覽活動",
    content: JSON.stringify({
    "title": "展覽活動",
    "homepage": "首頁",
    "noNews": "無本年資料",
    "date": "日期",
    "location": "地點",
    "booth": "攤位編號: ",
    "location1": "南港展覽館2館",
    "description": "全球最大半導體盛會，聚焦AI與前沿技術，引領產業創新未來。"
    }, null, 4),
    images: [
      { id: 1, src: "/exhibition/1.jpg", name: "展覽活動 首頁圖" },
      { id: 202501, src: "/exhibition/2025/202509-01.jpg", name: "展覽活動 2025細節圖1" },
      { id: 202502, src: "/exhibition/2025/202509-02.jpg", name: "展覽活動 2025細節圖2" },
      { id: 202503, src: "/exhibition/2025/202509-03.jpg", name: "展覽活動 2025細節圖3" },
      { id: 202504, src: "/exhibition/2025/202509-04.jpg", name: "展覽活動 2025細節圖4" },
      { id: 202505, src: "/exhibition/2025/202509-05.jpg", name: "展覽活動 2025細節圖5" },
      { id: 202506, src: "/exhibition/2025/202509-06.jpg", name: "展覽活動 2025細節圖6" },
      { id: 202507, src: "/exhibition/2025/202509-07.jpg", name: "展覽活動 2025細節圖7" },
      { id: 202508, src: "/exhibition/2025/202509-08.jpg", name: "展覽活動 2025細節圖8" },

      { id: 202401, src: "/exhibition/2024/1.jpg", name: "展覽活動 2024細節圖1" },
      { id: 202402, src: "/exhibition/2024/2.jpg", name: "展覽活動 2024細節圖2" },
      { id: 202403, src: "/exhibition/2024/3.jpg", name: "展覽活動 2024細節圖3" }

    ]
  },

  // ==================== 8.  ====================
  hr_main: {
      slug: "hr_main",
      title: "8. 人力資源 (主頁)",
      description: "含: 首頁導覽、標題、福利與徵才簡介圖文",
      content: JSON.stringify({
        "homepage": "首頁",
        "title": "人力資源",
        "benefits": "員工福利",
        "jobs": "徵才資訊",
        "benefits-description": "我們重視員工專業、深入的職能培養，並提供完善的員工福利。",
        "jobs-description": "加入垚鋐，與我們一同成長、共創價值！"
      }, null, 4),
      images: [
        { id: 1, src: "/career/1.jpg", name: "首頁大圖" },
        { id: 2, src: "/career/benefits.svg", name: "員工福利示意圖" },
        { id: 3, src: "/career/jobs.svg", name: "徵才資訊示意圖" }
      ]
    },

  // ==================== 9. 員工福利 ====================
  hr_welfare: {
      slug: "hr_welfare",
      title: "9. 員工福利",
      description: "含: 8項福利圖文說明",
      content: JSON.stringify({
        "title": "員工福利",
        // 將 8 項福利整理在一起
        "benefits_list": {
          "benefits1": "我們提供員工旅遊補助，鼓勵同仁走出辦公室，放鬆心情、增進交流，讓身心都能充電再出發。",
          "benefits2": "公司定期補助部門聚餐，讓團隊在輕鬆氛圍中加深情誼，培養默契，共創更有凝聚力的合作關係。",
          "benefits3": "每年歲末舉辦尾牙盛宴與摸彩活動，感謝同仁一年的辛勤付出，讓大家共享喜悅與驚喜。",
          "benefits4": "同仁每滿五年年資，公司將特別表揚並致贈紀念禮品，感謝一路相伴與付出，見證彼此的成長與榮耀。",
          "benefits5": "優於法令的有薪生日假，並可獲得生日禮金，讓員工在生日當月可以享受一日專屬休息與歡慶時光。",
          "benefits6": "公司提供節慶、結婚、生育及慰問金，透過實際支持表達對員工的關懷與祝福，在員工重要人生時刻獲得適切的支持與肯定。",
          "benefits7": "我們重視每位同仁的成長，透過完善的專業訓練，陪伴員工持續學習與成長，讓每一步職涯都與公司一同前進。",
          "benefits8": "公開透明定期調薪制度，支持員工一整年努力付出，共享營運成果。"
        }
      }, null, 4),
      
      // 設定 8 張福利 Icon (SVG)
      images: [
        { id: 1, src: "/career/benefits/1.svg", name: "旅遊補助 (benefits1)" },
        { id: 2, src: "/career/benefits/2.svg", name: "部門聚餐 (benefits2)" },
        { id: 3, src: "/career/benefits/3.svg", name: "尾牙活動 (benefits3)" },
        { id: 4, src: "/career/benefits/4.svg", name: "資深表揚 (benefits4)" },
        { id: 5, src: "/career/benefits/5.svg", name: "生日禮遇 (benefits5)" },
        { id: 6, src: "/career/benefits/6.svg", name: "津貼補助 (benefits6)" },
        { id: 7, src: "/career/benefits/7.svg", name: "教育訓練 (benefits7)" },
        { id: 8, src: "/career/benefits/8.svg", name: "定期調薪 (benefits8)" }
      ]
    },

  // ==================== 10. 徵才資訊 ====================
  hr_recruit: {
      slug: "hr_recruit",
      title: "10. 徵才資訊",
      description: "含: 企業介紹、104連結、美國人才招募詳細列表",
      content: JSON.stringify({
        // 1. 公司介紹與104
        "intro_section": {
          "description": "垚鋐是一家「專注於高科技廠房建置及維運、系統設備整合的技術型企業」，涵蓋hook up design、Tool design、裝機、維修與耗材服務的科技型產業。我們是一群擁有超過多年產業經驗的核心團隊，並以高效率與專業客服贏得客戶信賴。我們不僅深耕台灣市場，也積極拓展全球服務據點與技術合作，持續為半導體、光電等產業提供完整、高品質的工程解決方案。",
          "more_jobs_label": "更多熱門職缺:",
          "jobs_104_label": "104人力銀行",
          "jobs_url": "https://www.104.com.tw/company/1a2x6bjp2x?jobsource=google"
        },

        // 2. 美國人才招募專區 (Job Types)
        "US_Recruitment": {
          "title": "美國人才招募",
          "search_placeholder": "搜尋職稱、說明或要求...",
          "filters": {
            "reset": "重設",
            "label": "篩選標籤："
          },
          "info": {
            "heading": "工作資訊",
            "location_label": "工作地點",
            "location_val": "Bell Rd. & 51th Ave. / TSMC 鳳凰城廠區",
            "time_label": "上班時間",
            "time_val": "8:00 AM – 5:00 PM（依職務不同相應不同班別與工作時段，INTERN 另議）"
          },
          "requirements": {
            "must_have_label": "必備條件",
            "must_have": ["須具備美國合法工作身分（VISA 類型不拘）"],
            "bonus_label": "加分條件",
            "bonus": ["工程、製造、電子等相關專業知識", "科技廠工作經驗", "中英文流利"]
          },
          "apply": {
            "email_text": "請將您的「中英文履歷 及（如有）作品集或相關證明文件」寄至： ",
            "email_subject": "主旨請註明：「應徵＋職位名稱＋姓名」",
            "email_note": "我們將儘速安排面試，歡迎優秀人才加入，謝謝！",
            "btn_text": "立即應徵",
            "contact": "如需協助請聯絡: "
          },
          "ui_text": {
            "job_count_suffix": "筆職缺",
            "no_results": "目前無符合搜尋結果，請調整關鍵字或清除搜尋。",
            "col_desc": "職務說明",
            "col_req": "職務要求"
          },
          // ★ 8 個職缺列表 (陣列化)
          "jobs": {
            "job1": {
              "title": "工程業務 / 助理",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "彙整工程範疇，建立估算報價",
                "具備成本計算與成本控制能力",
                "跨部門協調詢價、議價與下單時程，並與現場監工同步物料需求與交期",
                "製作提案與週報估算成本風險與進度，並能清楚對內對外報告"
              ],
              "requirements": [
                "工程相關背景（營建、機電、製造、電子等）或具備強烈學習動機的新人",
                "熟悉 Microsoft Office 基本操作",
                "跨部門溝通協作能力、簡報技巧並具良好的客戶服務態度"
              ],
              "tags": ["工程", "業務"]
            },
            "job2": {
              "title": "工程採購 / 助理",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "熟悉工程物料與採購流程，負責詢價、議價與下訂單",
                "系統記錄並追蹤訂單狀態與供應商進度",
                "與供應商、採購單位與現場監工協調，確保物料如期送達，避免供應中斷",
                "協助處理品質／數量異常問題，並維持正確文件與紀錄管理"
              ],
              "requirements": [
                "工程或製造業物料採購背景佳，或願意學習者",
                "熟悉 ERP 等採購系統，能追蹤訂單與供應商進度",
                "良好的議價能力與供應商／跨部門溝通技巧",
                "注重細節、能處理異常狀況（如延誤或品質問題）"
              ],
              "tags": ["採購", "ERP"]
            },
            "job3": {
              "title": "倉儲管理主管 / 人員",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "熟悉 ERP 或倉庫管理系統（如 SAP、Oracle 等），監控並維護倉庫作業流程",
                "管理庫存控管與盤點制度，處理庫存與系統記錄間的差異",
                "與第三方物流公司及運輸商協作，確保運輸與配送流程順暢"
              ],
              "requirements": [
                "具資工或供應鏈相關背景，有倉庫操作與庫存管理經驗者佳",
                "熟練使用 ERP 或倉庫管理系統，能追蹤庫存、訂單狀態與物流時間表",
                "注重細節、有能力處理庫存差異與異常狀況",
                "基本資料分析能力（如 Excel）、數據報表"
              ],
              "tags": ["倉儲", "ERP"]
            },
            "job4": {
              "title": "工程設計 PM / 繪圖人員 / 文管專員",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "使用 2D 或 3D 軟體（如 AutoCAD、Revit），繪製工程設計圖",
                "負責專案設計進度追蹤與協調，確保繪圖與現場／設計團隊同步",
                "管理圖面與文件版本，維持圖檔與規格的一致性",
                "協助設計圖說的審查與修改，確保符合材料與工程要求"
              ],
              "requirements": [
                "熟練操作 AutoCAD、Revit 或其他 2D／3D 繪圖軟體",
                "熟悉設計圖說與工程規格，具備圖面與設計細節敏感度",
                "良好溝通與協作能力，能與設計師、工程師與現場監工協同作業"
              ],
              "tags": ["設計"]
            },
            "job5": {
              "title": "人資專員 / 助理",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "協助招聘與入職流程",
                "處理薪酬與福利相關事務，維護員工檔案（出勤、假期、保險等）",
                "協助員工關係維護、培訓安排與法規遵循",
                "支援外派人員的在地事務（身分辦理、銀行開戶、宿舍安排、租車等）..."
              ],
              "requirements": [
                "有人力資源或行政相關經驗者佳，亦歡迎具備學習意願的新人",
                "熟悉 Microsoft Office，具 HR 系統操作經驗者更佳",
                "良好的溝通協調能力，能同時處理多項事務並注重細節",
                "熟悉勞動法規與員工福利相關規範者優先"
              ],
              "tags": ["HR", "行政"]
            },
            "job6": {
              "title": "風險管理 / 工安專員",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "負責施工與營運現場的安全稽核，確保符合美國職安法規（OSHA）...",
                "規劃與執行安全教育訓練，協助改善現場安全流程",
                "追蹤並調查事故或異常事件，提出改善方案"
              ],
              "requirements": [
                "具備 OSHA 10／30／510／500 證照者佳",
                "了解職安相關法規與施工安全規範",
                "熟悉工程品質檢驗流程與材料驗收標準",
                "細心負責，能發現並解決現場問題",
                "良好的溝通與協調能力"
              ],
              "tags": ["工安"]
            },
            "job7": {
              "title": "風險管理 / 品管人員",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "進行工程品質檢驗，確保施工成果符合設計與規範",
                "負責材料驗收與製程品質控管",
                "檢查承包商交付成果，並建立檢驗報告與改善建議"
              ],
              "requirements": [
                "具備 OSHA 10／30／510／500 證照者佳",
                "了解職安相關法規與施工安全規範",
                "熟悉工程品質檢驗流程與材料驗收標準",
                "細心負責，能發現並解決現場問題",
                "良好的溝通與協調能力"
              ],
              "tags": ["品管"]
            },
            "job8": {
              "title": "總務專員",
              "location": "Phoenix, AZ",
              "time": "8:00 AM – 5:00 PM",
              "descriptions": [
                "負責員工宿舍日常管理與維護（入住/退宿流程、房間安排）",
                "處理宿舍相關簡易修繕與維護事項",
                "協助繳納水電瓦斯及其他相關帳單費用",
                "支援公司一般行政與總務相關事項"
              ],
              "requirements": [
                "基本修繕與維護能力",
                "能熟悉與管理水電瓦斯帳單或其他基礎後勤事務",
                "良好的溝通與協調能力",
                "具備中英文溝通能力者佳"
              ],
              "tags": ["總務", "行政"]
            }
          }
        }
      }, null, 4),
      
      images: [] // 無指定圖片
    }

};
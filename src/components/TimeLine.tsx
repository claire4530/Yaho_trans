// import React, { useEffect, useRef } from 'react';
// import { useTranslations } from "next-intl";

// const Timeline = () => {
//     const t = useTranslations("about");

//     return (
//         <div className="grid grid-cols-[40px_1fr] lg:grid-cols-[60px_1fr] gap-x-4 lg:gap-x-8 max-w-6xl mx-auto px-2 lg:px-4 relative">
//             {/* 左側：時間軸 */}
//             <div className="flex flex-col items-center col-span-1 relative">
//                 {[
//                 { year: "year1", color: "border-white" },
//                 { year: "year2", color: "border-white" },
//                 { year: "year3", color: "border-white" },
//                 { year: "year4", color: "border-yellow-400" },
//                 { year: "year5", color: "border-red-500" },
//                 // { year: "year6", color: "border-red-500" }, // 最底節點（無文字）
//                 ].map((item, index, array) => {
//                 // 線段顏色對應表
//                 const lineColors = [
//                     "bg-white",      // 線段 1
//                     "bg-white",      // 線段 2
//                     "bg-white",      // 線段 3
//                     "bg-yellow-400",    // 線段 4
//                     "bg-red-500", // 線段 5
//                 ];

//                 return (
//                     <div key={index} className="flex flex-col items-center">
//                     {/* 節點 */}
//                     <div
//                         className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 ${item.color} bg-[#375978] z-10`}
//                     ></div>

//                     {/* 線段（最後一個節點不畫線） */}
//                     {index < array.length - 1 && (
//                         <div className={`w-0.5 sm:w-1 ${lineColors[index]} h-24 sm:h-32 lg:h-30 xl:h-38`}></div>
//                     )}
//                     </div>
//                 );
//                 })}
//             </div>

//             {/* 右側：文字區塊 */}
//             <div className="flex flex-col ">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                 <div key={i} className="flex h-24 sm:h-32 md:h-35 xl:h-43">
//                     <div>
//                         {/* 年份標題 */}
//                         <h3 className="text-lg sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2">
//                             {t(`introduction.history.year${i}`)}
//                         </h3>
//                         {/* 描述文字 */}
//                         <p className="text-white text-sm sm:text-base md:text-xl leading-tight sm:leading-normal">
//                             {t(`introduction.history.year${i}_description1`)}
//                         </p>
//                         {/* 第二行描述文字（如果有的話） */}
//                         <p className="text-white text-sm sm:text-base md:text-xl leading-tight sm:leading-normal">
//                             {t(`introduction.history.year${i}_description2`)}
//                         </p>
//                         {/* 第二行描述文字（如果有的話） */}
//                         <p className="text-white text-sm sm:text-base md:text-xl leading-tight sm:leading-normal">
//                             {t(`introduction.history.year${i}_description3`)}
//                         </p>
//                     </div>
//                 </div>
//                 ))}
//             </div>
//         </div>

//     );
// };

// export default Timeline;

import React from 'react';
import { useLocale } from "next-intl";

// 定義 Props，讓這個元件可以接收資料庫傳來的 items
interface TimelineProps {
    items?: any[];
}

const Timeline = ({ items = [] }: TimelineProps) => {
    const locale = useLocale();

    // 輔助函式：根據索引值決定顏色 (保留你原本的設計風格)
    // 0-2 (前三個): 白色
    // 3 (第四個): 黃色
    // 4+ (第五個以後): 紅色
    const getColorClass = (index: number) => {
        if (index < 3) return { border: "border-white", bg: "bg-white" };
        if (index === 3) return { border: "border-yellow-400", bg: "bg-yellow-400" };
        return { border: "border-red-500", bg: "bg-red-500" };
    };

    return (
        <div className="max-w-6xl mx-auto px-2 lg:px-4 relative">
            {/* 這裡我們改用 map 產生每一 "列" (Row)，
               每一列包含 [左邊的時間節點] + [右邊的文字]
               這樣可以確保當文字變長時，左邊的線條也會自動跟著變長，不會跑版。
            */}
            {items.map((item, index) => {
                const style = getColorClass(index);
                const isLast = index === items.length - 1;

                return (
                    // 使用原本的 Grid 設定來排版
                    <div key={item.id || index} className="grid grid-cols-[40px_1fr] lg:grid-cols-[60px_1fr] gap-x-4 lg:gap-x-8">
                        
                        {/* === 左側：時間軸 (節點 + 線條) === */}
                        <div className="flex flex-col items-center col-span-1 relative">
                            {/* 節點圓圈 */}
                            <div
                                className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 ${style.border} bg-[#375978] z-10 shrink-0 `}
                            ></div>

                            {/* 連接線段 */}
                            {/* 如果不是最後一個節點，就顯示線段。使用 flex-1 讓它自動填滿高度 */}
                            {!isLast && (
                                <div 
                                    className={`w-0.5 sm:w-1 ${style.bg} flex-1 min-h-[6rem] sm:min-h-[8rem]`}
                                ></div>
                            )}
                        </div>

                        {/* === 右側：文字區塊 === */}
                        {/* pb-8 是為了讓每個年份之間保持原本視覺上的間距 */}
                        <div className="flex flex-col pb-8 sm:pb-12">
                            <div>
                                {/* 年份標題 */}
                                <h3 className="text-lg sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2">
                                    {item.year}
                                </h3>
                                
                                {/* 描述文字 */}
                                {/* whitespace-pre-wrap: 讓資料庫裡的 \n 自動換行 */}
                                <p className="text-white text-sm sm:text-base md:text-xl leading-tight sm:leading-normal whitespace-pre-wrap">
                                    {item.event[locale]}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Timeline;
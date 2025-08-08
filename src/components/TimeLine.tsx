import React, { useEffect, useRef } from 'react';
import { useTranslations } from "next-intl";

const Timeline = () => {
    const t = useTranslations("about");

    return (
        <div className="grid grid-cols-[40px_1fr] lg:grid-cols-[60px_1fr] gap-x-4 lg:gap-x-8 max-w-6xl mx-auto px-2 lg:px-4 relative">
            {/* 左側：時間軸 */}
            <div className="flex flex-col items-center col-span-1 relative">
                {[
                { year: "year1", color: "border-white" },
                { year: "year2", color: "border-white" },
                { year: "year3", color: "border-white" },
                { year: "year4", color: "border-yellow-400" },
                { year: "year5", color: "border-red-500" },
                // { year: "year6", color: "border-red-500" }, // 最底節點（無文字）
                ].map((item, index, array) => {
                // 線段顏色對應表
                const lineColors = [
                    "bg-white",      // 線段 1
                    "bg-white",      // 線段 2
                    "bg-white",      // 線段 3
                    "bg-yellow-400",    // 線段 4
                    "bg-red-500", // 線段 5
                ];

                return (
                    <div key={index} className="flex flex-col items-center">
                    {/* 節點 */}
                    <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 ${item.color} bg-[#375978] z-10`}
                    ></div>

                    {/* 線段（最後一個節點不畫線） */}
                    {index < array.length - 1 && (
                        <div className={`w-0.5 sm:w-1 ${lineColors[index]} h-24 sm:h-32 lg:h-30 xl:h-38`}></div>
                    )}
                    </div>
                );
                })}
            </div>

            {/* 右側：文字區塊 */}
            <div className="flex flex-col ">
                {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex h-24 sm:h-32 md:h-35 xl:h-43">
                    <div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2">
                        {t(`introduction.history.year${i}`)}
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-xl leading-tight sm:leading-normal">
                        {t(`introduction.history.year${i}_description1`)}
                    </p>
                    <p className="text-white text-sm sm:text-base md:text-xl leading-tight sm:leading-normal">
                        {t(`introduction.history.year${i}_description2`)}
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </div>

    );
};

export default Timeline;
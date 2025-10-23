"use client";
import Link from "next/link";
import { useState } from "react";
import { MoveRight } from 'lucide-react';

interface TextLinkProps {
    text: string;
    href: string;
}

export default function AboutLink({ text, href }: TextLinkProps) {
    return (
        <Link href={href} className="inline-block">
            <div className="relative inline-block group">
                <div className="inline-flex items-center gap-3 cursor-pointer text-[#375978] hover:text-[#F3981B] transition-colors duration-300 pt-4">
                    {/* 連結上要顯示的文字 */}
                    <span className="md:text-2xl text-lg font-serif">
                        {text}
                    </span>
                    {/* 右側的箭頭圖示 */}
                    {/* 在 hover 時會有平移效果 */}
                    <div className="w-6 h-6 md:w-10 md:h-10  flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 mt-1">
                        <MoveRight />
                    </div> 
                </div>

                {/* 這條線只在 link 區域 hover 才有效 */}
                <span className="hover:ji absolute left-0 -bottom-1 w-0 h-0.5 bg-[#F3981B] transition-all duration-300 group-hover:w-full"></span>
            </div>
        </Link>
    );
}

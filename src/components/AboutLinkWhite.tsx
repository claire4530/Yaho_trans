"use client";
import Link from "next/link";
import { useState } from "react";
import { MoveRight } from 'lucide-react';

interface TextLinkProps {
    text: string;
    href: string;
}

export default function AboutLinkWhite({ text, href }: TextLinkProps) {
    return (
        <Link href={href} className="inline-block">
            <div className="relative inline-block group">
                <div className="inline-flex items-center gap-2 cursor-pointer text-[#375978] hover:text-[#F3981B] transition-colors duration-300 pt-6">
                    <span className="text-base font-serif">
                        {text}
                    </span>
                    <div className="flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 mt-1">
                        <MoveRight size={24} />
                    </div> 
                </div>

                {/* 🔽 這條線只在 link 區域 hover 才有效 */}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#F3981B] transition-all duration-300 group-hover:w-full"></span>
            </div>
        </Link>
    );
}
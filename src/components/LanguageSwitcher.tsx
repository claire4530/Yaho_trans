"use client";

import { useLocale, useTranslations } from "next-intl";
import { setLocale } from "../actions/locale";
import { useEffect, useRef, useState, useTransition } from "react";

// export default function LanguageSwitcher() {
//   const t = useTranslations("Common");
//   const [isPending, startTransition] = useTransition();

//   const switchLanguage = (locale: string) => {
//     startTransition(() => {
//       setLocale(locale);
//     });
//   };

//   return (
//     <div className="language-switcher">
//       <button
//         onClick={() => switchLanguage("en")}
//         disabled={isPending}
//         className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
//       >#375978#F3981B
//         {isPending ? "..." : "English"}
//       </button>
//       <button
//         onClick={() => switchLanguage("zh")}
//         disabled={isPending}
//         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
//       >
//         {isPending ? "..." : "中文"}
//       </button>
//     </div>
//   );
// }
export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Language");
  const languages = [
    { code: 'zh', label: t('zh') },
    { code: 'en', label: t('en') },
  ];

  const switchLanguage = (locale: string) => {
    // setIsOpen(false);
    // if (locale === currentLocale) return;
    // startTransition(() => {
    //   setLocale(locale);
    // });
  };

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangLabel = languages.find((l) => l.code === currentLocale)?.label || currentLocale;

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* 主按鈕 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-8 py-2 bg-[#375978] text-white font-medium rounded-2xl hover:bg-[#F3981B] hover:text-white hover:scale-105 duration-300 transition-transform cursor-pointer"
        disabled={isPending}
      >
        {isPending ? '...' : `${currentLangLabel}`}
      </button>

      {/* 下拉選單 */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => switchLanguage(code)}
              className={`w-full px-4 py-2 text-sm rounded-2xl hover:bg-[#F3981B] hover:text-white transition-colors cursor-pointer ${
                currentLocale === code ? 'font-bold text-[#375978]' : 'text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
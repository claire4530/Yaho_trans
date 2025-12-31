// types/database.ts

// 定義 JSONB 的內容結構 (中英文)
export type LocaleText = {
  zh: string;
  en: string;
  [key: string]: string; // 預留給未來可能擴充的日文等
};

// 定義 "Partner" (工程實績) 的資料結構
export interface Partner {
  id: number;
  name: LocaleText; // 這裡我們告訴 TS，name 裡面會有 zh 和 en
  created_at: string;
}

// 定義 "Certification" (獎項) 的資料結構
export interface Certification {
  id: number;
  name: LocaleText;
  image_url: string | null;
  created_at: string;
}

// ...以此類推，之後可以把其他表的型別加進來
// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("帳號或密碼錯誤");
        setLoading(false);
      } else if (res?.ok) {
        router.push("/admin"); 
        router.refresh();
      }
    } catch (err) {
      setError("發生未預期的錯誤");
      setLoading(false);
    }
  };

  return (
    // 背景使用深藍色漸層，營造專業感
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#375978]/20">
        
        {/* 頂部品牌區塊：使用主色深藍 */}
        <div className="bg-[#375978] p-8 text-center relative overflow-hidden">
            {/* 增加一點裝飾圓圈讓背景不無聊 */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F3981B] opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
            
            <h1 className="text-3xl font-bold text-white tracking-wide relative z-10">Welcome</h1>
            <p className="text-blue-100 mt-2 text-sm relative z-10">後台管理系統</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg flex items-center gap-2 border border-red-100 animate-pulse">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="relative group">
              <input
                type="email"
                placeholder="電子信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#375978] focus:border-transparent transition-all text-gray-700 bg-gray-50 group-hover:bg-white"
                required
              />
            </div>

            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#375978] focus:border-transparent transition-all text-gray-700 bg-gray-50 group-hover:bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#375978] transition-colors focus:outline-none"
              >
                {showPassword ? "隱藏" : "顯示"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              // 按鈕使用亮橘色 #F3981B，hover 時稍微變深
              className="w-full bg-[#F3981B] hover:bg-[#d68516] text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {loading ? "登入中..." : "登入系統"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
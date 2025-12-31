"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("請輸入有效的電子郵件地址");
      return;
    }

    setLoading(true);
    try {
      // 呼叫後端發送重設密碼郵件（請依專案調整 API 路徑）
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("已發送重設密碼連結至您的信箱，請檢查郵件。");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "無法發送重設連結，請稍後再試");
      }
    } catch {
      setError("網路錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow p-6"
        aria-label="forgot-password form"
      >
        <h1 className="text-2xl font-semibold mb-4 text-[#375978]">忘記密碼</h1>

        {message && (
          <div className="mb-4 text-sm text-green-600" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-600" role="alert">
            {error}
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4">
          輸入您註冊時使用的電子郵件，我們會寄送重設密碼的連結給您。 
        </p>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">電子郵件</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F3981B]"
            placeholder="you@example.com"
            aria-required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#375978] text-white py-2 rounded-md hover:bg-[#2f4858] disabled:opacity-60"
        >
          {loading ? "處理中…" : "寄送重設連結"}
        </button>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="underline"
          >
            返回登入
          </button>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="underline"
          >
            註冊新帳號
          </button>
        </div>
      </form>
    </main>
  );
}
// app/admin/page.tsx (Server component)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createClient } from '@/src/utils/supabase/server'; // 1. 引入 Supabase
import AdminUI from "./AdminUI"; // 2. 改用我們剛剛寫的新 UI 元件

export default async function AdminPage() {
  // --- 原本的權限檢查邏輯 (保留不動) ---
  const session = await getServerSession(authOptions);

  // 未登入 -> 導到登入頁
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/admin`);
  }

  // 權限檢查
  // 注意：這裡假設你的 session.user 裡真的有 role 欄位
  // 如果 TS 報錯，可能需要檢查你的 next-auth 型別定義
  if ((session.user as any)?.role !== "ADMIN") {
    return <div className="p-10 text-center">抱歉，您沒有管理員權限</div>;
  }

  // --- 新增：Supabase 抓資料邏輯 ---
  const supabase = await createClient();

  // 使用 Promise.all 一次平行抓取所有資料表
  const [
    partnersRes, 
    exhibitionsRes,
    locationsRes,
    historyRes,
    servicesRes,
    benefitsRes,
    certificationsRes,
    generalInfoRes,
    serviceProjectsRes
  ] = await Promise.all([
    supabase.from('partners').select('*').order('created_at', { ascending: false }),
    supabase.from('exhibitions').select('*').order('date_start', { ascending: false }),
    supabase.from('locations').select('*').order('id'),
    supabase.from('company_history').select('*').order('year', { ascending: false }), // 年份倒序
    supabase.from('services').select('*').order('id'),
    supabase.from('benefits').select('*').order('id'),
    supabase.from('certifications').select('*').order('created_at', { ascending: false }),
    supabase.from('general_info').select('*').single(),
    supabase.from('services').select('*').order('display_order', { ascending: true }),
  ]);

  // --- 最後：把資料傳給 Client Component ---
  return (
    <AdminUI 
      partners={partnersRes.data || []} 
      exhibitions={exhibitionsRes.data || []}
      locations={locationsRes.data || []}
      history={historyRes.data || []}
      services={servicesRes.data || []}
      benefits={benefitsRes.data || []}
      certifications={certificationsRes.data || []}
      generalInfo={generalInfoRes.data || {}}
      serviceProjects={serviceProjectsRes.data || []}
    />
  );
}
// app/(main)/about/organization/page.tsx
import { createClient } from '@/src/utils/supabase/server';
import OrganizationClient from '@/src/components/ui/OrganizationClient'; // 引入剛剛改好的 UI 元件

export default async function OrganizationPage() {
  const supabase = await createClient();

  // 1. 從 general_info 表抓取組織圖欄位 (org_chart_url)
  // 因為只有一筆 id=1 的資料，所以用 single()
  const { data } = await supabase
    .from('general_info')
    .select('org_chart_url')
    .single();

  // 2. 把抓到的網址傳給 Client Component
  return (
    <OrganizationClient 
      orgChartUrl={data?.org_chart_url} 
    />
  );
}
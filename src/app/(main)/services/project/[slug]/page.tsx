import { createClient } from '@/src/utils/supabase/server';
import ServiceDetailClient from '@/src/components/ui/ServiceDetailClient';
import { notFound } from 'next/navigation';

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { slug } = await params;

  // 根據網址上的 slug (例如 parts) 去抓那一筆資料
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) {
    notFound(); // 如果找不到 (例如網址亂打)，顯示 404
  }

  return <ServiceDetailClient service={service} />;
}
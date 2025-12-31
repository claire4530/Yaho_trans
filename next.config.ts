import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    // 原有的其他設定 (如果有)...
  
  // ★ 新增這段：放寬 Server Actions 的檔案大小限制
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.supabase.co', // 允許所有 supabase 專案
        },
      ],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
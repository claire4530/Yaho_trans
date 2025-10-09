// app/sitemap.ts
// import { MetadataRoute } from 'next';

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseUrl = process.env.SITE_URL || 'https://www.zcstcl.com';

//   return [
//     { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
//     // 若有其他公開頁面，加入這裡（例如 /about /contact /products 等）
//   ];
// }
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zcstcl.com'

  return [
    { url: `${baseUrl}/`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/about`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/about/introduction`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/about/locations`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/about/news`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/about/organization`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/career`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/career/jobs`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/career/benefits`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/exhibitions`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/AMHS`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/GasChemical`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/Installation`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/OneStop`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/Parts`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/SMIFPOD`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/project/SystemDesign`, lastModified: '2025-10-09T00:00:00Z' },
    { url: `${baseUrl}/services/result`, lastModified: '2025-10-09T00:00:00Z' },
  ]
}

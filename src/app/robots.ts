export async function GET() {
  const sitemapUrl = `${process.env.SITE_URL || 'https://www.zcstcl.com'}/sitemap.xml`;
  const txt = `User-agent: *
Disallow:

Sitemap: ${sitemapUrl}
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain' } });
}

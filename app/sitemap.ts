import type { MetadataRoute } from 'next';
import { siteConfig } from '@shared/config/site';
import { getAllSlugs } from '@features/news/lib/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl.replace(/\/$/, '')
  const now = new Date()
  const staticPaths = ['', '/invest', '/loans', '/shares', '/partners', '/about', '/news', '/vacancies', '/contacts']
  const routes = staticPaths.map((p) => ({ url: `${base}${p === '' ? '/' : p}`, priority: p === '' ? 0.8 : 0.7, lastModified: now }))
  const news = getAllSlugs().map((slug) => ({ url: `${base}/news/${slug}`, priority: 0.6, lastModified: now }))
  return [...routes, ...news]
}

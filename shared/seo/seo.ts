import type { Metadata } from 'next'
import { siteConfig } from '@shared/config/site'

export function buildMetadata({
  path,
  title,
  description,
}: {
  path: string // e.g. '/news' or '/news/slug'
  title: string
  description?: string
}): Metadata {
  const base = siteConfig.baseUrl.replace(/\/$/, '')
  const url = `${base}${path === '/' ? '/' : path}`
  return {
    title,
    description: description || siteConfig.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'ru_RU',
    },
  }
}

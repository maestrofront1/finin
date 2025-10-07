import type { Metadata } from 'next';
import { siteConfig } from '@shared/config/site';

export function defaultMetadata(): Metadata {
  return {
    title: siteConfig.name,
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.baseUrl),
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.baseUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
    },
  };
}


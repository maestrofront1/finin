import type { Metadata } from 'next'
import { buildMetadata } from '@shared/seo/seo'
import { HeroSection } from '@/features/home/components/HeroSection'
import { ModulesSection } from '@/features/home/components/ModulesSection'
import CardScrollList from '@features/home/components/CardScrollList'
import CalculatorSection from '@/features/home/components/CalculatorSection'
import AboutDigitalSection from '@/features/home/components/AboutDigitalSection'
import MarqueeBlocks from '@shared/sections/MarqueeBlocks'
import { PartnersSection } from '@shared/sections/PartnersSection'
// import { HistorySection } from '@/features/home/components/HistorySection'
import { EngagementSections } from '@/features/home/components/EngagementSections'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: '/',
    title: 'Финин',
  })
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ModulesSection />
      <CardScrollList />
      <CalculatorSection />
      <MarqueeBlocks />
      <PartnersSection />
      {/*<HistorySection />*/}
      <AboutDigitalSection title="Стабильный рост компании на протяжении 7 лет" />
      <EngagementSections />
    </>
  )
}

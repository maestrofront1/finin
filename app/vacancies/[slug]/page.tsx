import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@shared/ui/Container'
import { buildMetadata } from '@shared/seo/seo'
import { getAllVacancies, getVacancy } from '@features/vacancies/lib/vacancies'

export async function generateStaticParams() {
  return getAllVacancies().map(v => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = getVacancy(params.slug)
  if (!v) return {}
  return buildMetadata({ path: `/vacancies/${params.slug}`, title: v.title, description: v.short })
}

export default function VacancyPage({ params }: { params: { slug: string } }) {
  const v = getVacancy(params.slug)
  if (!v) notFound()
  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-4">{v!.title}</h1>
      <p className="text-gray-700 max-w-3xl">{v!.description}</p>
    </Container>
  )
}


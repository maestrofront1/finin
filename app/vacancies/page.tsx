import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@shared/ui/Container'
import { buildMetadata } from '@shared/seo/seo'
import { getAllVacancies } from '@features/vacancies/lib/vacancies'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ path: '/vacancies', title: 'Вакансии — Финин' })
}

export default function VacanciesPage() {
  const list = getAllVacancies()
  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6">Вакансии</h1>
      <ul className="space-y-4">
        {list.map((v) => (
          <li key={v.slug} className="border border-muted-200 rounded-xl p-4 bg-white">
            <h2 className="text-lg font-medium">
              <Link href={`/vacancies/${v.slug}`} className="no-underline hover:underline">
                {v.title}
              </Link>
            </h2>
            <p className="text-gray-600">{v.short}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}


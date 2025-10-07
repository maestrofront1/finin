import type { Metadata } from 'next'
import { Container } from '@shared/ui/Container'
import { buildMetadata } from '@shared/seo/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ path: '/shares', title: 'Акционирование — Финин' })
}

export default function SharesPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-4">Акционирование</h1>
      <p className="text-gray-600">Информация об акционировании и возможностях участия.</p>
    </Container>
  )
}


import type { Metadata } from 'next'
import { Container } from '@shared/ui/Container'
import { buildMetadata } from '@shared/seo/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ path: '/contacts', title: 'Контакты — Финин' })
}

export default function ContactsPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-4">Контакты</h1>
      <p className="text-gray-600">Адрес, телефоны, email и мессенджеры.</p>
    </Container>
  )
}


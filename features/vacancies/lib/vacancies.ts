import fs from 'node:fs'
import path from 'node:path'

export type Vacancy = {
  slug: string
  title: string
  short: string
  description: string
}

const FILE = path.join(process.cwd(), 'content', 'vacancies', 'vacancies.json')

export function getAllVacancies(): Vacancy[] {
  if (!fs.existsSync(FILE)) return []
  const raw = fs.readFileSync(FILE, 'utf8')
  return JSON.parse(raw) as Vacancy[]
}

export function getVacancy(slug: string): Vacancy | null {
  return getAllVacancies().find(v => v.slug === slug) ?? null
}


import { Card } from './Card'

export function VideoCard({ title }: { title: string }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="aspect-video bg-black/10 flex items-center justify-center">▶</div>
      <div className="p-4 text-sm text-gray-800">{title}</div>
    </Card>
  )
}


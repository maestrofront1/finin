import { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

type CardVariant = 'elevated' | 'soft' | 'outline'

export type CardProps = {
  children?: ReactNode
  className?: string
  variant?: CardVariant
  title?: ReactNode
  description?: ReactNode
  media?: ReactNode
  action?: ReactNode
}

export function Card({
  children,
  className,
  variant = 'outline',
  title,
  description,
  media,
  action,
}: CardProps) {
  const base = 'rounded-xl bg-white'
  const styles: Record<CardVariant, string> = {
    outline: 'border border-muted-200',
    soft: 'border border-transparent shadow-sm',
    elevated: 'shadow-lg border border-transparent',
  }

  return (
    <div className={cn(base, styles[variant], className)}>
      {media && <div className="mb-4">{media}</div>}
      {title && <h3 className="text-xl font-medium mb-4">{title}</h3>}
      {description && <div className="text-sm text-gray-600 mb-3">{description}</div>}
      {children}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

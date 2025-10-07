import { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn('text-[64px] max-lg:text-[48px] max-md:text-[24px] font-semibold', className)}>{children}</h1>
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('text-[48px] max-lg:text-[32px] max-sm:text-[24px] font-semibold', className)}>{children}</h2>
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-[18px] max-md:text-[14px] text-gray-600', className)}>{children}</p>
}

export function Muted({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-[14px] text-gray-300', className)}>{children}</p>
}


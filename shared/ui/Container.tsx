import { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full px-[20px]', className)}>{children}</div>
}

export default Container

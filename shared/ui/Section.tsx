import { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'
import { Container } from '@shared/ui/Container'

type Bg = 'default' | 'muted' | 'dark' | 'gradient'
type Pad = 'sm' | 'md' | 'lg'



export function Section({
  children,
  className,
  background = 'default',
  pad = 'md',
  container = true,
  id,
}: {
  children: ReactNode
  className?: string
  background?: Bg
  pad?: Pad
  container?: boolean
  id?: string
}) {
  const bg =
    background === 'muted'
      ? 'bg-muted-100'
      : background === 'dark'
        ? 'bg-gradient-to-b from-black to-gray-900 text-white'
        : background === 'gradient'
          ? 'relative bg-white'
          : 'bg-white'

  const content = container ? (
    <Container className={className}>{children}</Container>
  ) : (
    <div className={cn('mx-auto w-full max-w-[1280px] px-4', className)}>{children}</div>
  )

  return (
    <section id={id}>

      {content}
    </section>
  )
}


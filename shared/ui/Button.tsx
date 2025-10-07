import Link from 'next/link'
import type { Route } from 'next'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

type ButtonVariant =
  | 'green'
  | 'black'
  | 'white'
  | 'gray'
  | 'text'
  | 'blur'
  | 'link'
  | 'gosuslugi'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string // внутренний ('/...') либо внешний URL
  children: ReactNode
  withArrow?: boolean // показывать стрелку справа для основных вариантов
  startIcon?: ReactNode
  endIcon?: ReactNode
}

function isInternalRoute(href: string): href is Route {
  return href.startsWith('/')
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-5 h-5', className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M5.77307 0.813112C6.1523 0.411761 6.7847 0.393916 7.18616 0.773073L16.1862 9.27307C16.3861 9.46197 16.4996 9.72459 16.4996 9.99964C16.4996 10.2747 16.3861 10.5373 16.1862 10.7262L7.18616 19.2262C6.7847 19.6054 6.1523 19.5875 5.77307 19.1862C5.39392 18.7847 5.41176 18.1523 5.81311 17.7731L14.0436 9.99964L5.81311 2.2262C5.41176 1.84697 5.39392 1.21457 5.77307 0.813112Z" fill="currentColor" />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}

export function Button({
  variant = 'green',
  href,
  children,
  className,
  withArrow = true,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2  rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'

  const variants: Record<ButtonVariant, string> = {
    green:
      ' bg-green-500 w-max font-semibold text-white h-[60px] text-[18px] gap-8 px-[36px] py-[16px] transition hover:bg-green-400 active:bg-green-600 lowercase leading-[1]',
    black: 'bg-gray-400 w-max font-semibold text-white h-[60px] text-[18px] gap-8 px-[36px] py-[16px] transition hover:bg-black active:bg-gray-400 lowercase leading-[1]',
    white: ' bg-white w-max font-semibold text-black h-[60px] text-[18px] gap-8 px-[36px] py-[16px] transition hover:bg-gray-100 active:bg-white lowercase leading-[1]',
    gray: ' bg-gray-200 w-max font-semibold text-black h-[60px] text-[18px] gap-8 px-[36px] py-[16px] transition hover:bg-gray-200 active:bg-green-600 lowercase leading-[1]',
    blur: ' bg-gray-400 w-max font-semibold text-white h-[60px] text-[18px] gap-8 px-[36px] py-[16px] transition hover:bg-white/20  lowercase  leading-[1]',
    text: ' bg-transparent text-green-600 hover:text-green-700 active:text-green-700 whitespace-nowrap',
    link: 'bg-transparent text-muted-300 hover:text-green-600 active:text-green-700 underline underline-offset-2',
    gosuslugi:
      'w-max border border-blue-500 text-blue-500 rounded-[10px] px-[40px] py-[10px] gap-4 hover:bg-blue-500/10 active:bg-blue-500/20 text-[20px]',
  }

  const chevronClass = variant === 'white' ? 'text-green-600' : undefined

  const inner = (
    <>
      {startIcon ?? (variant === 'gosuslugi' ? (
        <img src="/icons/gosuslugi.svg" alt="Госуслуги" className="w-[36px] h-[36px]" />
      ) : null)}
      {children}
      {endIcon ?? (
        <>
          {withArrow && ['green', 'black', 'white', 'gray', 'blur', 'text'].includes(variant) && (
            <ChevronRight className={chevronClass} />
          )}
          {variant === 'link' && <ArrowUpRight />}
        </>
      )}
    </>
  )

  const content = (
    <span className={cn(base, variants[variant], className)} {...props}>
      {inner}
    </span>
  )

  if (href) {
    if (isInternalRoute(href)) {
      return (
        <Link href={href as Route} className="inline-block">
          {content}
        </Link>
      )
    } else {
      return (
        <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )
    }
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {inner}
    </button>
  )
}

export default Button

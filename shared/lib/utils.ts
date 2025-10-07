import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Пример: cn('px-2', condition && 'bg-red-500')
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


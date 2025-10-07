'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@shared/lib/utils'
import { Button } from '@shared/ui/Button'

/**
 * Один экран (шаг). Левая колонка = маленький заголовок + картинка телефона.
 * Правая колонка (общая для шага) — берётся из props компонента (heading/subheading/button).
 */
export type RegistrationLearningCard = {
  id: number
  /** Текст слева под номером шага (как "Пройдите регистрацию на платформе") */
  leftTitle: string
  /** Путь к картинке (макап телефона) */
  image: string
  /** Альт-текст для картинки */
  imageAlt?: string
}

export interface RegistrationLearningProps {
  /** Массив шагов. Каждый шаг = один экран. */
  cards: RegistrationLearningCard[]

  /** Правый большой заголовок (жирный, многострочный) */
  heading?: ReactNode
  /** Светло-серый подзаголовок (можно часть текста вынести сюда) */
  subheading?: ReactNode

  /** Кнопка справа — опционально */
  buttonLabel?: string
  buttonHref?: string
  buttonClassName?: string

  /** Кастомные классы (опционально) */
  className?: string
  containerClassName?: string
  leftColClassName?: string
  rightColClassName?: string
}

/**
 * Sticky-секция на N экранов. Колёсико листает по шагам.
 */
export default function RegistrationLearning({
  cards,
  heading,
  subheading,
  buttonLabel,
  buttonHref,
  buttonClassName,
  className,
  containerClassName,
  leftColClassName,
  rightColClassName,
}: RegistrationLearningProps) {
  const [index, setIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrolling = useRef(false)

  const cardsLength = cards.length
  const safeIndex = Math.min(index, Math.max(0, cardsLength - 1))
  const active = cards[safeIndex]

  // Держим индекс в допустимых пределах
  useEffect(() => {
    setIndex((prev) => Math.min(prev, Math.max(0, cardsLength - 1)))
  }, [cardsLength])

  // Обработка колесика: листаем по экранам внутри секции
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const root = sectionRef.current
      if (!root || cardsLength <= 0) return

      const rect = root.getBoundingClientRect()
      const fullyInView = rect.top <= 0 && rect.bottom >= window.innerHeight
      if (!fullyInView) return
      if (scrolling.current) return

      if (e.deltaY > 0 && safeIndex < cardsLength - 1) {
        scrolling.current = true
        const next = safeIndex + 1
        setIndex(next)
        window.scrollTo({
          top: root.offsetTop + next * window.innerHeight,
          behavior: 'smooth',
        })
        window.setTimeout(() => (scrolling.current = false), 800)
      } else if (e.deltaY < 0 && safeIndex > 0) {
        scrolling.current = true
        const prev = safeIndex - 1
        setIndex(prev)
        window.scrollTo({
          top: root.offsetTop + prev * window.innerHeight,
          behavior: 'smooth',
        })
        window.setTimeout(() => (scrolling.current = false), 800)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [safeIndex, cardsLength])

  if (!active) return null

  return (
    <section
      ref={sectionRef}
      className={cn(className)}
      style={{ height: `${cardsLength * 100}vh`, position: 'relative' }}
    >
      <div
        className={cn('w-full bg-white', containerClassName)}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Контент шага: две колонки */}
        <div className="con-container w-full h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Левая колонка — серый бокс со скруглением, номер шага, левый заголовок и картинка */}
                <div
                  className={cn(
                    'relative bg-gray-50 rounded-2xl p-8 md:p-10 h-[360px] md:h-[420px] flex',
                    'items-center justify-between overflow-hidden',
                    leftColClassName
                  )}
                >
                  <div className="absolute top-6 left-6 text-gray-300 text-sm select-none">
                    /{String(active.id).padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="text-gray-700 font-semibold text-[20px] leading-tight md:text-[22px]">
                      {active.leftTitle}
                    </h3>
                  </div>

                  <div className="shrink-0 relative">
                    <img
                      src={active.image}
                      alt={active.imageAlt ?? active.leftTitle}
                      className="w-[220px] md:w-[260px] lg:w-[300px] h-auto rounded-xl object-contain"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Правая колонка — большой заголовок + серенькая часть + кнопка */}
                <div className={cn('flex flex-col', rightColClassName)}>
                  {(heading || subheading) && (
                    <h2 className="text-[28px] leading-[1.15] md:text-[40px] md:leading-[1.2] font-semibold text-gray-900 mb-6">
                      {heading}
                      {subheading && (
                        <>
                          <br />
                          <span className="text-gray-400 font-medium">
                            {subheading}
                          </span>
                        </>
                      )}
                    </h2>
                  )}

                  {buttonLabel && (
                    <Button
                      href={buttonHref}
                      variant="gray"
                      className={cn(
                        'w-max h-[44px] md:h-[48px] px-6 md:px-7 rounded-xl text-sm md:text-base',
                        buttonClassName
                      )}
                    >
                      {buttonLabel}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

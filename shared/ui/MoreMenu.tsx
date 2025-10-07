'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import Button from "@shared/ui/Button";
import { useState } from 'react'
// Simple placeholder icon to keep layout stable
function IconStub({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: 16,
        height: 16,
        background: 'linear-gradient(135deg, #e5e7eb 60%, #d1d5db 100%)',
        borderRadius: 4,
        display: 'inline-block',
      }}
    />
  )
}
export function MoreMenu() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="group bg-transparent text-muted-300 hover:text-green-600 font-medium active:text-green-700 header-link hover:underline cursor-pointer flex items-center gap-1 select-none">
        Ещё
        <svg
          className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:rotate-180"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute w-[700px] left-0 top-full bg-white shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)] z-50 overflow-hidden rounded-2xl border border-gray-100"
            style={{ marginTop: '8px' }}
          >
            <div className="gap-10 p-10">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Больше разделов</h3>

              {/* Сетка разделов - 2 колонки */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <Link href={{ pathname: "/partners" }} 
                  className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 pt-[18px] pb-5 hover:bg-gray-200 transition-colors no-underline group h-[74px]"
                  style={{ textDecoration: 'none' }}
                > {/* <div >
                    <IconStub className="w-4 h-4 text-gray-600" />
                  </div> */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold">Партнерам</span>
                    <span className="text-gray-300  transition-colors text-[14px]">Подробнее о программе</span>
                  </div>
                </Link>

                <Link
                  href={{ pathname: "/about" }}
                  className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 pt-[18px] pb-5 hover:bg-gray-200 transition-colors no-underline group h-[74px]"
                  style={{ textDecoration: 'none' }}
                >
                  {/* <div>
                    <IconStub className="w-[26px] h-[26px] text-gray-900  transition-colors" />
                  </div> */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold">О нас</span>
                    <span className="text-gray-300  transition-colors text-[14px]">Компания и наша история</span>
                  </div>
                </Link>

                <Link href={{ pathname: "/docs" }} 
                  className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 pt-[18px] pb-5 hover:bg-gray-200 transition-colors no-underline group h-[74px]"
                  style={{ textDecoration: 'none' }}
                 >   

{/* <div >
                    <IconStub className="w-4 h-4 text-gray-600" />
                  </div> */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold">Документы</span>
                    <span className="text-gray-300  transition-colors text-[14px]">Правила, положения, договоры</span>
                  </div>
                </Link>

                <Link href={{ pathname: "/news" }} 
                  className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 pt-[18px] pb-5 hover:bg-gray-200 transition-colors no-underline group h-[74px]"
                  style={{ textDecoration: 'none' }}
                 >   

{/* <div >
                    <IconStub className="w-4 h-4 text-gray-600" />
                  </div> */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold">Новости</span>
                    <span className="text-gray-300  transition-colors text-[14px]">Последние обновления</span>
                  </div>
                </Link>

                <Link href={{ pathname: "/jobs" }} 
                  className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 pt-[18px] pb-5 hover:bg-gray-200 transition-colors no-underline group h-[74px]"
                  style={{ textDecoration: 'none' }}
                 >   

{/* {/* <div >
                    <IconStub className="w-4 h-4 text-gray-600" />
                  </div> */} 
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold">Вакансии</span>
                    <span className="text-gray-300  transition-colors text-[14px]">Работа в Финин</span>
                  </div>
                </Link>

                <Link href={{ pathname: "/contacts" }} 
                  className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 pt-[18px] pb-5 hover:bg-gray-200 transition-colors no-underline group h-[74px]"
                  style={{ textDecoration: 'none' }}
                 >   

{/* <div >
                    <IconStub className="w-4 h-4 text-gray-600" />
                  </div> */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold">Контакты</span>
                    <span className="text-gray-300  transition-colors text-[14px]">Способы связи</span>
                  </div>
                </Link>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">Калькуляторы</h3>

              {/* Калькуляторы в одну строку */}
              <div className="flex gap-3">
                <Link style={{ textDecoration: 'none' }} href={{ pathname: "/calc/investments" }} className="w-[100%] justify-content-center flex items-center gap-2 px-4 pt-[18px] pb-5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">

                  <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold" >Инвестиции</span>
                </Link>
                <Link style={{ textDecoration: 'none' }} href={{ pathname: "/calc/loans" }} className="w-[100%] justify-content-center flex items-center gap-2 px-4 pt-[18px] pb-5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">

                  <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold" >Займы</span>
                </Link>
                <Link style={{ textDecoration: 'none' }} href={{ pathname: "/calc/stocks" }} className="w-[100%] justify-content-center flex items-center gap-2 px-4 pt-[18px] pb-5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">

                  <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold" >Акции</span>
                </Link>
                <Link style={{ textDecoration: 'none' }} href={{ pathname: "/calc/finin-shares" }} className="w-[100%] justify-content-center flex items-center gap-2 px-4 pt-[18px] pb-5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">

                  <span className="font-medium text-gray-400  text-[16px] transition-colors font-semibold" >Акции Финин</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

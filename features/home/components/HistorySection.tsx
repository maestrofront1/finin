"use client";

import {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

import {Container} from '@/shared/ui/Container'
import Button from "@shared/ui/Button";

const YEAR_DATA = [
    {
        year: '2025',
        amount: '1 791 905 706 ₽',
        label: 'Выдано займов',
        description: 'Компания выдала первый займ из собственных средств акционеров',
        fundAmount: '224 000 000 ₽',
        fundLabel: 'Общий инвестиционный фонд',
    },
    {
        year: '2024',
        amount: '1 456 789 123 ₽',
        label: 'Общий оборот',
        description: 'Расширение клиентской базы и географии присутствия компании',
        fundAmount: '189 500 000 ₽',
        fundLabel: 'Капитализация компании',
    },
    {
        year: '2023',
        amount: '987 654 321 ₽',
        label: 'Привлеченные инвестиции',
        description: 'Запуск цифровой платформы для работы с клиентами и партнерами',
        fundAmount: '156 000 000 ₽',
        fundLabel: 'Собственные средства',
    },
    {
        year: '2022',
        amount: '524 000 000 ₽',
        label: 'Стартовый капитал',
        description: 'Основание компании и получение первых лицензий',
        fundAmount: '98 000 000 ₽',
        fundLabel: 'Уставный капитал',
    },
] as const

export function HistorySection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentData = YEAR_DATA[currentIndex]

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % YEAR_DATA.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + YEAR_DATA.length) % YEAR_DATA.length)
    }

    return (
        <section className="font-sans bg-white py-16">
            <Container className="relative w-full">
                <h2 className="text-center text-[48px] mb-10 font-semibold">История компании</h2>
                <div className="flex w-ful h-[500px] gap-6 px-[180px] max-2xl:h-fit max-2xl:px-10 max-md:px-0">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentData.year}
                            initial={{opacity: 0, x: 80}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -80}}
                            transition={{duration: 0.5}}
                            className="flex flex-1 flex-row gap-8 max-2xl:flex-col max-2xl:items-start"
                        >
                            <div className="flex w-[40%] mr-10 self-center justify-center">
                                <div
                                    className="select-none text-[342px] font-bold leading-none text-green-200 max-md:text-[100px] max-lg:text-[200px]">
                                    {currentData.year}
                                </div>
                            </div>

                            <div className="flex w-[50%] h-full flex-col gap-4  ml-auto max-2xl:w-full">
                                <motion.div
                                    key={`${currentData.year}-amount`}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.4}}
                                    className="h-1/2 rounded-xl bg-gray-100 p-6 text-center flex flex-col justify-center items-center gap-5 shadow-sm"
                                >
                                    <div
                                        className="text-[84px] font-bold text-gray-400 max-md:text-[28px]">{currentData.amount}</div>
                                    <div
                                        className="text-[19px] text-gray-300 max-md:text-[16px]">{currentData.label}</div>
                                </motion.div>

                                <div className="flex flex-row gap-5 h-1/2 max-md:flex-col">

                                    <div className="flex flex-col gap-5 max-md:w-full">

                                        <Button variant="green" className="max-md:hidden" withArrow>больше о нас</Button>

                                        <motion.div
                                            key={`${currentData.year}-fund`}
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: -20}}
                                            transition={{duration: 0.4}}
                                            className="rounded-xl bg-gray-100 h-full px-3 justify-center text-center flex flex-col items-center gap-3 shadow-sm max-md:py-5"
                                        >
                                            <div
                                                className="text-[30px] font-bold text-gray-400 max-md:text-[28px]">{currentData.fundAmount}</div>
                                            <div
                                                className="text-[19px] text-gray-300 max-md:text-[16px]">{currentData.fundLabel}</div>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        key={`${currentData.year}-description`}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -20}}
                                        transition={{duration: 0.4}}
                                        className="rounded-xl w-full bg-gray-100 flex items-center justify-center px-10 text-center text-sm text-neutral-700 shadow-sm md:text-base max-md:py-10"
                                    >
                                        <div className="text-[24px] font-semibold text-[#545454]">{currentData.description}</div>
                                    </motion.div>
                                </div>
                                <Button variant="green" className="hidden max-md:flex w-full mt-[10px]" withArrow>больше о нас</Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
                <div className="absolute px-8 flex left-0 w-full top-1/2 -translate-y-1/2 justify-between max-xl:top-[20%]">

                    <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Предыдущий год"
                        className="flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-green-500 text-2xl text-white transition hover:bg-green-600 max-md:w-[30px] max-md:h-[30px]"
                    >
                        <svg width="22" height="22" className="max-md:w-[10px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.93188 0.496829C10.3252 0.101317 10.9628 0.101318 11.3561 0.49683C11.7493 0.892342 11.7493 1.53359 11.3561 1.92911L3.34321 9.98753L20.7931 9.98753C21.3492 9.98753 21.8 10.4409 21.8 11.0002C21.8 11.5595 21.3492 12.0129 20.7931 12.0129L3.34321 12.0129L11.3561 20.0713C11.7493 20.4668 11.7493 21.108 11.3561 21.5036C10.9628 21.8991 10.3252 21.8991 9.93188 21.5036L0.200012 11.7163L0.200012 10.2841L9.93188 0.496829Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Следующий год"
                        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-green-500 text-2xl text-white transition hover:bg-green-600 max-md:w-[30px] max-md:h-[30px]"
                    >
                        <svg width="22" height="22" className="max-md:w-[10px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0681 21.5036C11.6748 21.8991 11.0372 21.8991 10.6439 21.5036C10.2506 21.108 10.2506 20.4668 10.6439 20.0713L18.6567 12.0129H1.20689C0.65077 12.0129 0.199951 11.5595 0.199951 11.0002C0.199951 10.4409 0.650772 9.98753 1.20689 9.98753H18.6567L10.6439 1.92911C10.2506 1.53359 10.2506 0.892342 10.6439 0.49683C11.0372 0.101317 11.6748 0.101317 12.0681 0.496829L21.7999 10.2841V11.7163L12.0681 21.5036Z"
                                fill="white"/>
                        </svg>

                    </button>
                </div>
            </Container>
        </section>
    )
}

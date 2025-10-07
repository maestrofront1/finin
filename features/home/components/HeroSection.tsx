"use client"

import {useEffect, useState} from 'react'
import {Button} from '@/shared/ui/Button'
import {Section} from '@/shared/ui/Section'
import {Container} from '@/shared/ui/Container'
import {H1, Lead} from '@/shared/ui/Typography'

export function HeroSection() {
    const [expanded, setExpanded] = useState(false)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        // Запуск анимации при монтировании
        const expandTimer = setTimeout(() => setExpanded(true), 50)
        const contentTimer = setTimeout(() => setShowContent(true), 800)
        return () => {
            clearTimeout(expandTimer)
            clearTimeout(contentTimer)
        }
    }, [])

    return (
        <Section background="gradient" className="p-0">
            <Container>
                <div
                    className={[
                        'rounded-3xl overflow-hidden text-white relative mt-[80px]',
                        'transform origin-top transition-transform duration-700 ease-out',
                        expanded ? 'scale-y-100' : 'scale-y-0',
                    ].join(' ')}
                    tabIndex={0}
                >
                    <div
                        className="bg-black-500 from-black-500 to-gray-900 px-6 max-md:min-h-[75vh] min-h-[88vh] flex flex-col ">
                        <div className={[
                            'grid grid-cols-1 gap-8',
                            'transition-opacity ease-out duration-[700ms] ease-out ',
                            showContent ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}>
                            <div className="flex flex-col items-center text-center z-[2] max-md:pt-10">
                                <div
                                    className="flex flex-wrap items-center gap-8 text-xs text-white/70 mb-[50px] relative top-10 h-[180px] w-full justify-around max-md:hidden">
                                    <a
                                        href="https://www.cbr.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Банк России
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Имеем лицензию ЦБ России и находимся <br/> в реестре операторов
                                            инвестиционных платформ
                                        </div>
                                    </a>
                                    <a
                                        href="https://rkn.gov.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Роскомнадзор
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Зарегистрированы в реестре Роскомнадзора<br/> № 77–20–018717 приказ 252 от
                                            31.12.2020г.
                                        </div>
                                    </a>
                                    <a
                                        href="https://sk.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Сколково
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Мы являемся резидентом Инновационного <br/> Центра Сколково с 2025 года
                                        </div>
                                    </a>
                                </div>

                                <H1 className="mb-6 text-animate max-md:mx-0">Финин — экосистема инвестиций <br/> и развития бизнеса</H1>
                                <Lead className="mb-8 max-w-2xl mx-auto text-white/85 max-md:max-w-[unset] max-md:mx-[unset]">
                                    Платформа, где встречаются предприниматели и инвесторы. <br/> Займы, акции и новые
                                    финансовые инструменты — всё в одном месте.
                                </Lead>




                                <div
                                    className="gap-3 flex-col hidden max-md:flex w-full">
                                    <a
                                        href="https://www.cbr.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition bg-white/10 rounded-2xl px-4 py-5 w-full"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Банк России
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Имеем лицензию ЦБ России и находимся <br/> в реестре операторов
                                            инвестиционных платформ
                                        </div>
                                    </a>
                                    <a
                                        href="https://rkn.gov.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition bg-white/10 rounded-2xl px-4 py-5 w-full"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Роскомнадзор
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Зарегистрированы в реестре Роскомнадзора<br/> № 77–20–018717 приказ 252 от
                                            31.12.2020г.
                                        </div>
                                    </a>
                                    <a
                                        href="https://sk.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition bg-white/10 rounded-2xl px-4 py-5 w-full"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Сколково
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Мы являемся резидентом Инновационного <br/> Центра Сколково с 2025 года
                                        </div>
                                    </a>
                                </div>



                                <div className="flex justify-center gap-4 max-md:flex-col max-md:pt-[20px] max-md:w-full">
                                    <Button variant="blur" className="max-md:w-full" withArrow={false}>Калькулятор инвестора</Button>
                                    <Button variant="green" className="max-md:w-full" withArrow={false}>Личный кабинет</Button>
                                </div>
                            </div>
                            {/* SVG-фон для секции Hero */}
                            <img
                                src="/img/main-hero.svg"
                                alt="Фоновая иллюстрация"
                                className={[
                                    "absolute inset-0 w-full h-full z-[1] object-cover pointer-events-none select-none z-0",
                                    "transition-all duration-[5000ms] ease-out delay-[1000ms]",
                                    showContent
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-400"
                                ].join(" ")}
                                aria-hidden="true"
                            />
                            {/* Анимированные карточки Hero */}
                            <div
                                className="z-[2] w-[90vw] absolute m-auto bottom-[-140px] left-0 right-0 flex justify-center -space-x-24 group max-md:relative"
                                style={{height: '400px', maxWidth: '890px'}}
                            >
                                <img
                                    src="/img/Card%201.png"
                                    alt="Card 1"
                                    className="relative w-[400px] top-[-10px] h-[400px] object-cover transition-transform duration-700 ease-out select-none group-hover:scale-105 group-hover:-rotate-3 group-hover:translate-y-1"
                                    style={{
                                        transitionDelay: '0ms',
                                        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: showContent ? 1 : 0,
                                    }}
                                />
                                <img
                                    src="/img/Card%202.png"
                                    alt="Card 2"
                                    className="relative w-[360px] top-[10px] h-[360px] object-cover transition-transform duration-700 ease-out select-none group-hover:scale-110 group-hover:rotate-2 group-hover:translate-y-1"
                                    style={{
                                        transitionDelay: '100ms',
                                        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: showContent ? 1 : 0,
                                    }}
                                />
                                <img
                                    src="/img/Card%203.png"
                                    alt="Card 3"
                                    className="relative w-[360px] top-[40px] h-[360px] object-cover transition-transform duration-700 ease-out select-none group-hover:scale-105 group-hover:-rotate-2 group-hover:translate-y-1"
                                    style={{
                                        transitionDelay: '200ms',
                                        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: showContent ? 1 : 0,
                                    }}
                                />
                                <img
                                    src="/img/Card%204.png"
                                    alt="Card 4"
                                    className="relative w-[300px] h-[300px] object-cover transition-transform duration-700 ease-out select-none group-hover:scale-110 group-hover:rotate-3 group-hover:translate-y-1"
                                    style={{
                                        transitionDelay: '300ms',
                                        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: showContent ? 1 : 0,
                                    }}
                                />
                                <img
                                    src="/img/Card%205.png"
                                    alt="Card 5"
                                    className="relative top-[-40px] w-[346px] h-[346px] object-cover transition-transform duration-700 ease-out select-none group-hover:scale-105 group-hover:-rotate-2 group-hover:translate-y-1"
                                    style={{
                                        transitionDelay: '400ms',
                                        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: showContent ? 1 : 0,
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}

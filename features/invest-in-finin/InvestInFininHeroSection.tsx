"use client"

import {useEffect, useState} from 'react'
import {Button} from '@/shared/ui/Button'
import {Section} from '@/shared/ui/Section'
import {Container} from '@/shared/ui/Container'
import {H1, Lead} from '@/shared/ui/Typography'

export function InvestInFininHeroSection() {
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
                    <div className="bg-black-500 from-black-500 to-gray-900 px-6 flex flex-col h-[55dvh] ">
                        <div className={[
                            'h-full z-[2]',
                            'transition-opacity ease-out duration-[700ms] ease-out ',
                            showContent ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}>
                            <div className="flex flex-col g-[40px] h-full relative text-center z-[2] max-md:pt-10">
                                <div
                                    className="flex flex-wrap items-center gap-8 text-xs text-white/70 mb-[50px] relative top-10 h-[180px] w-full justify-around max-md:hidden self-start">
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

                                <H1 className="mb-6 text-animate max-md:mx-0">Станьте совладельцем <br/>финтех-компании</H1>
                                <Lead className="mb-8 max-w-2xl mx-auto text-white/85 max-md:max-w-[unset] max-md:mx-[unset]">
                                    Получайте диведенты и будьте уверены в росте акций
                                </Lead>




                                <div
                                    className="gap-3 flex-col hidden max-md:flex w-full mb-[40px]">
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



                                <div className="flex justify-center gap-4 max-md:flex-col max-md:pt-[20px] max-md:w-full mb-[89px]">
                                    <Button variant="gosuslugi" className="max-2xl:p-[10px] bg-white" href="https://www.gosuslugi.ru">
                                        <span className="max-[1800px]:hidden">Войти через Госуслуги</span>
                                    </Button>
                                    <Button variant="green" className="max-md:w-full" withArrow={false}>Личный кабинет</Button>
                                </div>
                            </div>
                            {/* SVG-фон для секции Hero */}
                            <img
                                src="/img/main-hero.svg"
                                alt="Фоновая иллюстрация"
                                className={[
                                    "absolute inset-0 w-full h-full  object-cover pointer-events-none select-none z-[1]",
                                    "transition-all duration-[5000ms] ease-out delay-[1000ms]",
                                    showContent
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-400"
                                ].join(" ")}
                                aria-hidden="true"
                            />

                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}

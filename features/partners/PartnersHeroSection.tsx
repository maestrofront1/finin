'use client'

import {useEffect, useState} from 'react'
import {Button} from '@/shared/ui/Button'
import {Section} from '@/shared/ui/Section'
import {Container} from '@/shared/ui/Container'
import {H1, Lead} from '@/shared/ui/Typography'

const highlights = [
    'Займы до 10 млн ₽ без залога',
    'Решение за 24 часа',
    'Индивидуальная ставка под ваш бизнес'
]


export function PartnersHeroSection() {
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
        <Section background="gradient" className="p-0 ">
            <Container>
                <div
                    className={[
                        'rounded-3xl overflow-hidden bg-[#F4F5F7] text-white relative mt-[80px]',
                        'transform origin-top transition-transform duration-700 ease-out',
                        expanded ? 'scale-y-100' : 'scale-y-0',
                    ].join(' ')}
                    tabIndex={0}
                >
                    <div className="px-6 flex flex-col h-[55dvh] py-[80px]">
                        <div className={[
                            'h-full z-[2]',
                            'transition-opacity ease-out duration-[700ms] ease-out ',
                            showContent ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}>
                            <div className="flex flex-col g-[40px] h-full items-center relative text-center z-[2]">
                                <div
                                    className="flex flex-wrap items-center gap-8 text-xs text-white/70 mb-[50px] relative  w-full justify-around max-md:hidden">
                                    <a
                                        href="https://www.cbr.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-[10px] w-[300px] flex flex-col justify-center group transition"
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
                                        className="gap-[10px] flex w-[300px] flex-col justify-center group transition"
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
                                        className="gap-[10px] flex flex-col justify-center group transition"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <div
                                            className="font-regular w-[300px] text-gray-300 text-[22px] group-hover:text-green-300 transition-colors duration-200">
                                            Сколково
                                        </div>
                                        <div
                                            className="font-regular text-gray-300 text-[12px] group-hover:text-green-300 transition-colors duration-200">
                                            Мы являемся резидентом Инновационного <br/> Центра Сколково с 2025 года
                                        </div>
                                    </a>
                                </div>
                                <div className="w-full h-full flex-col flex justify-center items-center">

                                    <H1 className="mb-6 text-animate"><span className="text-gray-300">Привлекайте клиентов в Финин</span>
                                        <br/><span className="text-gray-400">и <span className="relative">зарабатывайте
                <div className="absolute left-0 -bottom-[10px]">
                   <svg width="464" height="12" className="w-full" viewBox="0 0 464 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.625 6.79561C93.7223 -6.12347 331.095 17.5623 463.467 5.79553" stroke="#009E6C" stroke-width="4"/>
</svg>

                </div>
            </span> на каждой сделке</span></H1>
                                    <Lead className="mb-8  mx-auto text-gray-300">
                                        Подключайтесь к партнёрской программе и <span className="text-gray-400">получайте до 5%</span> с
                                        каждой сделки.<br/> Быстрые
                                        выплаты, прозрачные условия, никаких скрытых комиссий.</Lead>
                                    <div className="flex justify-center gap-4">
                                        <Button variant="green" withArrow={false}>стать партнером</Button>
                                    </div>
                                </div>

                                <div
                                    className="gap-3 flex-col hidden max-md:flex w-full">
                                    <a
                                        href="https://www.cbr.ru/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2 flex flex-col justify-center group transition bg-black/02 rounded-2xl px-4 py-5 w-full"
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
                                        className="gap-2 flex flex-col justify-center group transition bg-black/02 rounded-2xl px-4 py-5 w-full"
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
                                        className="gap-2 flex flex-col justify-center group transition bg-black/02 rounded-2xl px-4 py-5 w-full"
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
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
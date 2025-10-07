'use client'

import {useEffect, useState} from 'react'
import {Button} from '@/shared/ui/Button'
import {Section} from '@/shared/ui/Section'
import {Container} from '@/shared/ui/Container'
import {H1, Lead} from '@/shared/ui/Typography'
import Image from "next/image";
import Img1 from "../../public/img/about/pic.png"
import Img2 from "../../public/img/about/pic-1.png"
import Img3 from "../../public/img/about/pic-2.png"
const highlights = [
    'Займы до 10 млн ₽ без залога',
    'Решение за 24 часа',
    'Индивидуальная ставка под ваш бизнес'
]




export function AboutHeroSection() {
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
                    <div className="px-6 flex flex-col h-[55dvh] py-[80px] max-lg:h-fit">
                        <div className={[
                            'h-full z-[2]',
                            'transition-opacity ease-out duration-[700ms] ease-out ',
                            showContent ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}>
                            <div className="flex flex-col g-[40px] h-full items-center relative text-center z-[2]">
                                <div className="w-full h-full flex-col flex justify-center items-center">
                                    <H1 className="mb-6 text-animate"><span className="text-gray-300">Финин — инвестиционная</span>
                                        <br/><span className="text-gray-400"><span className="relative">платформа №1
                <div className="absolute left-0 -bottom-[10px]">
                   <svg width="464" height="12" className="w-full" viewBox="0 0 464 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.625 6.79561C93.7223 -6.12347 331.095 17.5623 463.467 5.79553" stroke="#009E6C" stroke-width="4"/>
</svg>

                </div>
            </span> по госзакупкам</span></H1>
                                    <Lead className="mb-8  mx-auto text-gray-300">
                                        Мы соединяем инвесторов и бизнес, помогая компаниям быстро получать <br/> финансирование, а инвесторам — надёжный доход выше банковских ставок. </Lead>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5 px-[158px] max-2xl:px-10 max-lg:flex-col">
                            <div className="relative p-10 flex items-center h-[240px] rounded-[20px] bg-white w-full">
                                <div className="flex flex-col gap-5 max-w-[60%]">
                                    <p className="text-[28px] font-bold text-gray-400 max-md:text-[16px]">Лицензия <br/>Центрального Банка</p>
                                    <p className="text-[18px] text-gray-300">Находимся в реестре операторов инвестиционных платформ</p>
                                </div>
                                <Image src={Img1} className="absolute right-0" alt="img"></Image>
                            </div>
                            <div className="relative p-10 flex items-center h-[240px] rounded-[20px] bg-white w-full">
                                <div className="flex flex-col gap-5 max-w-[60%]">
                                    <p className="text-[28px] font-bold text-gray-400 max-md:text-[16px]">В реестре <br/>Роскомнадзора</p>
                                    <p className="text-[18px] text-gray-300">Зарегистрированы в реестре  Роскомнадзора № 77–20–018717  приказ 252 от 31.12.2020г.</p>
                                </div>
                                <Image src={Img2} className="absolute right-0" alt="img"></Image>
                            </div>
                            <div className="relative p-10 flex items-center h-[240px] rounded-[20px] bg-white w-full">
                                <div className="flex flex-col gap-5 max-w-[60%]">
                                    <p className="text-[28px] font-bold text-gray-400 max-md:text-[16px]">Резидент<br/>Сколково</p>
                                    <p className="text-[18px] text-gray-300">Мы являемся резидентом<br/>Инновационного Центра Сколково  с 2025 года</p>
                                </div>
                                <Image src={Img3} className="absolute right-0" alt="img"></Image>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
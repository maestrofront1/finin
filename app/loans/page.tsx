import type {Metadata} from 'next'
import {buildMetadata} from '@shared/seo/seo'

import RegistrationLearning, {type RegistrationLearningCard} from '@shared/sections/RegistrationLearningSection'
import {LoansHeroSection} from '@/features/loans/components/LoansHeroSection'
import {LoanCalculator} from '@/features/loans/components/LoanCalculator'
import MarqueeBlocks from '@shared/sections/MarqueeBlocks'
import {PartnersSection} from '@shared/sections/PartnersSection'
import {HistorySection} from '@/features/home/components/HistorySection'
import AboutDigitalSection from '@/features/home/components/AboutDigitalSection'
import {EngagementSections} from '@/features/home/components/EngagementSections'
import LoanCard from '@/features/loans/components/LoanTypesFancy'
import Link from "next/link";
import Image from "next/image"; // <-- Add this import
import PhoneImg from "../../public/img/phone.png"
import Button from "@shared/ui/Button";
import {RegisterSection} from "@shared/sections/RegisterSection";
// ...metadata and steps as before

export const metadata: Metadata = buildMetadata({
    path: '/loans',
    title: 'Займы — простая схема от регистрации до выдачи',
    description:
        'Пошаговый процесс: регистрация, документы, доступ к заявкам. Всё за несколько шагов.',
})

const steps: RegistrationLearningCard[] = [
    {
        id: 1,
        leftTitle: 'Пройдите регистрацию на платформе',
        image: '/img/phone-1.png',
        imageAlt: 'Экран входа партнёра',
    },
    {
        id: 2,
        leftTitle: 'Подпишите документы онлайн',
        image: '/img/phone-2.png',
        imageAlt: 'Экран подписания документов',
    },
    {
        id: 3,
        leftTitle: 'Получите доступ к разделам и заявкам',
        image: '/img/phone-3.png',
        imageAlt: 'Экран разделов и заявок партнёра',
    },
]

export default function Page() {
    return (
        <main>
            <LoansHeroSection/>

            {/* Replace LoanTypesFancy with your new LoanCard section */}
            <section className="con-container py-12">
                <div className="con-container">
                    <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-semibold text-gray-800 mb-10">
                        Выберите вид займа от проверенных инвесторов
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <LoanCard
                            title="Займ на бизнес"
                            goals={[
                                'Увеличение оборотного капитала',
                                'Урегулирование кассовых разрывов',
                                'Ремонт и обновление оборудования',
                                'Рефинансирование',
                                'Расширение и рост бизнеса',
                            ]}
                            conditions={[
                                {label: 'Годовая ставка', value: 'от 25%'},
                                {label: 'Срок работы бизнеса', value: 'более 12 месяцев'},
                                {label: 'Срок займа', value: 'до 12 месяцев'},
                                {label: 'Сумма займа', value: 'от 100 тыс. до 15 млн'},
                            ]}
                            icon={<svg width="43" height="42" viewBox="0 0 43 42" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.453125" width="42" height="42" rx="10" fill="#009E6C"/>
                                <path
                                    d="M21.4544 33.5416C16.7878 33.5416 12.9961 30.1933 12.9961 26.075V21.7583C12.9961 21.28 13.3928 20.8833 13.8711 20.8833C14.3494 20.8833 14.7461 21.28 14.7461 21.7583C14.7461 24.815 17.6278 27.125 21.4544 27.125C25.2811 27.125 28.1628 24.815 28.1628 21.7583C28.1628 21.28 28.5594 20.8833 29.0378 20.8833C29.5161 20.8833 29.9128 21.28 29.9128 21.7583V26.075C29.9128 30.1933 26.1211 33.5416 21.4544 33.5416ZM14.7461 26.2033C14.8278 29.295 17.8028 31.7916 21.4544 31.7916C25.1061 31.7916 28.0811 29.295 28.1628 26.2033C26.6461 27.8483 24.2428 28.875 21.4544 28.875C18.6661 28.875 16.2744 27.8483 14.7461 26.2033Z"
                                    fill="#F4F5F7"/>
                                <path
                                    d="M21.4544 23.0416C18.2344 23.0416 15.3411 21.5949 13.9294 19.2616C13.3227 18.2699 12.9961 17.1149 12.9961 15.9249C12.9961 13.9183 13.8944 12.0283 15.5161 10.6049C17.1028 9.21659 19.2144 8.45825 21.4544 8.45825C23.6944 8.45825 25.7944 9.21659 27.3928 10.5933C29.0144 12.0283 29.9128 13.9183 29.9128 15.9249C29.9128 17.1149 29.5861 18.2582 28.9794 19.2616C27.5678 21.5949 24.6744 23.0416 21.4544 23.0416ZM21.4544 10.2083C19.6344 10.2083 17.9311 10.8149 16.6594 11.9349C15.4228 13.0083 14.7461 14.4316 14.7461 15.9249C14.7461 16.7999 14.9794 17.6166 15.4227 18.3516C16.5311 20.1716 18.8411 21.2916 21.4544 21.2916C24.0678 21.2916 26.3778 20.1599 27.4861 18.3516C27.9411 17.6166 28.1628 16.7999 28.1628 15.9249C28.1628 14.4316 27.4861 13.0083 26.2378 11.9116C24.9661 10.8149 23.2744 10.2083 21.4544 10.2083Z"
                                    fill="#F4F5F7"/>
                                <path
                                    d="M21.4544 28.8749C16.6361 28.8749 12.9961 25.8183 12.9961 21.7583V15.9249C12.9961 11.8066 16.7878 8.45825 21.4544 8.45825C23.6944 8.45825 25.7944 9.21659 27.3928 10.5933C29.0144 12.0283 29.9128 13.9183 29.9128 15.9249V21.7583C29.9128 25.8183 26.2728 28.8749 21.4544 28.8749ZM21.4544 10.2083C17.7561 10.2083 14.7461 12.7749 14.7461 15.9249V21.7583C14.7461 24.8149 17.6278 27.1249 21.4544 27.1249C25.2811 27.1249 28.1628 24.8149 28.1628 21.7583V15.9249C28.1628 14.4316 27.4861 13.0083 26.2378 11.9116C24.9661 10.8149 23.2744 10.2083 21.4544 10.2083Z"
                                    fill="#F4F5F7"/>
                            </svg>
                            }
                            href="/loans/business"
                        />
                        <LoanCard
                            title="Займ на исполнение госконтракта"
                            goals={[
                                'Финансирование под контракт',
                                'Закрытие кассовых разрывов',
                                'Поставка и услуги в срок',
                                'Обновление оборудования',
                                'Рост оборотов',
                            ]}
                            type="secondary"
                            conditions={[
                                {label: 'Годовая ставка', value: 'от 25%'},
                                {label: 'Срок работы бизнеса', value: 'более 12 месяцев'},
                                {label: 'Срок займа', value: 'до 12 месяцев'},
                                {label: 'Сумма займа', value: 'от 100 тыс. до 15 млн'},
                            ]}
                            href="/loans/gos"
                        />
                        <LoanCard
                            title="Недвижимость"
                            goals={[
                                'Покупка/ремонт коммерческой недвижимости',
                                'Рефинансирование',
                                'Докупка площадей',
                                'Улучшение залоговой базы',
                                'Модернизация',
                            ]}
                            type="secondary"
                            conditions={[
                                {label: 'Годовая ставка', value: 'от 23%'},
                                {label: 'Срок займа', value: 'до 24 месяцев'},
                                {label: 'Сумма займа', value: 'от 500 тыс. до 30 млн'},
                            ]}
                            href="/loans/realty"
                        />
                    </div>
                </div>
            </section>

            <RegisterSection text={
                <span>Простая
                схема: от регистрации до займа <span
                        className="text-[#9499A3]">за несколько шагов</span></span>
            }
                             desc={<span>Простая схема: <br/>от регистрации <br/>до
                        займа <span className="text-[#9499A3]">за несколько шагов</span></span>}
            ></RegisterSection>

            <LoanCalculator/>
            <div className="mb-20"></div>
            {/*<RegistrationLearning*/}
            {/*    cards={steps}*/}
            {/*    heading={*/}
            {/*        <>*/}
            {/*            Простая схема:*/}
            {/*            <br/>от регистрации*/}
            {/*        </>*/}
            {/*    }*/}
            {/*    subheading={<>до займа за несколько шагов</>}*/}
            {/*    buttonLabel="стать партнёром"*/}
            {/*    buttonHref="/partner"*/}
            {/*/>*/}
            <MarqueeBlocks/>
            <PartnersSection/>
            {/*<HistorySection/>*/}
            <EngagementSections/>
        </main>
    )
}

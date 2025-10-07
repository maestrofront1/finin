import type {Metadata} from 'next'
import {Container} from '@shared/ui/Container'
import {buildMetadata} from '@shared/seo/seo'
import {AboutHeroSection} from "@features/about/AboutHeroSection";
import Image from "next/image";
import Card11 from "@/public/img/invest-in-finin/cards-2/pic.png";
import Link from "next/link";
import Card22 from "@/public/img/invest-in-finin/cards-2/pic-1.png";
import Card33 from "@/public/img/invest-in-finin/cards-2/pic-2.png";
import GraphImg from "../../public/img/about/about-graph.svg"
import GraphImgMobile from "../../public/img/about/about-graph-mobile.svg"
import {AboutSection} from "@shared/sections/AboutSection";
import Button from "@shared/ui/Button";
import Img1 from "@/public/img/invest-in-finin/pic.png";
import {HistorySection} from "@features/home/components/HistorySection";
import People1 from "../../public/img/about/people/pic.png";
import People2 from "../../public/img/about/people/pic-1.png";
import People3 from "../../public/img/about/people/pic-2.png";
import {H2} from "@shared/ui/Typography";
import {ConfiguredSwiper} from "@shared/ui/ConfiguredSwiper";
import {SwiperSlide} from "swiper/react";
import {TeamSection} from "@features/about/TeamSection";
import {PartnersSection} from "@shared/sections/PartnersSection";
import {CTASection} from "@shared/sections/CTASection";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadata({path: '/about', title: 'О нас — Финин'})
}

const PEOPLE =
    {
        main: [
            {
                name: "Андрей Груничев",
                role: <>Генеральный директор.<br/>Основатель компании</>,
                description: "Отвечает за юридическое сопровождение проектов и управление проблемными активами. Консультирует ключевых заёмщиков.",
                image: People1,
            },
            {
                name: "Артем Старостин",
                role: <>Директор по информационным<br/> технологиям</>,
                description: "Получил опыт в крупнейшей IT-компании в сфере услуг управленческого и ИТ-консалтинга, системной интеграции, разработки и внедрения (ТОП-10).",
                image: People2,
            },
            {
                name: "Роман Фетисов",
                role: <>Коммерческий <br/>директор</>,
                description: "Более 15 лет опыта в области управления коммерческим блоком. Отвечает за развитие новых продуктов и каналов, развитие партнерской сети, создание эффективных бизнес-моделей и IT решений.",
                image: People3,
            },
        ],
        clients: [
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
        ],
        legalDeparment: [
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
        ],
        development: [
            {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            }, {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                image: People1
            },
        ]
    }


export default function AboutPage() {
    return (
        <Container>
            <AboutHeroSection></AboutHeroSection>
            <AboutSection></AboutSection>
            <section className="con-container mx-auto">
                <div className="flex flex-row gap-10 mt-5 max-lg:flex-col">
                    <div className="flex flex-col gap-5 min-w-[31.5%] max-lg:grid max-lg:grid-cols-2">
                        <div className="px-4 py-2 bg-gray-100 rounded-[20px]">
                            <div className="flex flex-col gap-5">
                                <p className="text-[24px] text-gray-400">Выдано займов </p>
                                <p className="text-[28px] font-bold text-green-500">1 710 000 000 ₽</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-[20px]">
                            <div className="flex flex-col gap-5">
                                <p className="text-[24px] text-gray-400">Уставный капитал</p>
                                <p className="text-[28px] font-bold text-green-500">33 600 000 ₽</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-[20px]">
                            <div className="flex flex-col gap-5">
                                <p className="text-[24px] text-gray-400">Чистая прибыль </p>
                                <p className="text-[28px] font-bold text-green-500">51 752 000 ₽</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-[20px]">
                            <div className="flex flex-col gap-5">
                                <p className="text-[24px] text-gray-400">Средняя ставка</p>
                                <p className="text-[28px] font-bold text-green-500">36%</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-[20px]">
                            <div className="flex flex-col gap-5">
                                <p className="text-[24px] text-gray-400">Выручка</p>
                                <p className="text-[28px] font-bold text-green-500">58 048 000 ₽</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-[20px]">
                            <div className="flex flex-col gap-5">
                                <p className="text-[24px] text-gray-400">Активы</p>
                                <p className="text-[28px] font-bold text-green-500">156 519 000 ₽</p>
                            </div>
                        </div>
                    </div>
                    <Image className="hidden max-lg:flex max-lg:h-auto max-lg:w-full" src={GraphImgMobile}
                           alt="Graph"></Image>
                    <Image className="max-h-[628px]  max-lg:h-auto max-md:hidden max-lg:w-full" src={GraphImg}
                           alt="Graph"></Image>
                </div>
            </section>
            <HistorySection/>
            <TeamSection people={PEOPLE}></TeamSection>
            <PartnersSection></PartnersSection>
            <CTASection></CTASection>
        </Container>
    )
}


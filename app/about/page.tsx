import type {Metadata} from 'next'
import {Container} from '@shared/ui/Container'
import {buildMetadata} from '@shared/seo/seo'
import {AboutHeroSection} from "@features/about/AboutHeroSection";
import {AboutSection} from "@shared/sections/AboutSection";
import {HistorySection} from "@features/home/components/HistorySection";
import People1 from "../../public/img/about/people/pic.png";
import People2 from "../../public/img/about/people/pic-1.png";
import People3 from "../../public/img/about/people/pic-2.png";
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
            <HistorySection/>
            <TeamSection people={PEOPLE}></TeamSection>
            <PartnersSection></PartnersSection>
            <CTASection></CTASection>
        </Container>
    )
}


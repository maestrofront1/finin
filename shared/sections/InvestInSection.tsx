'use client'
import { SwiperSlide } from "swiper/react";
import ImgCardMock from "../../public/img/mock/card-1.png";
import { CaseCard } from "@shared/ui/CaseCard";
import {SwiperSection} from "@shared/sections/SwiperSection";

const items = [
    { name: 'ООО “Вектор”', text: 'Производство мебели для офисов и предприятий', amount: "3 200 000 ₽", features: ["Ставка 25,1%", "180 дней", "Рейтинг 12"], href: "/", img: ImgCardMock },
    { name: 'АО “ТехноПром”', text: 'Разработка программного обеспечения для бизнеса', amount: "8 500 000 ₽", features: ["Ставка 28,0%", "365 дней", "Рейтинг 15"], href: "/", img: ImgCardMock },
    { name: 'ООО “Зеленый Мир”', text: 'Выращивание и продажа комнатных растений', amount: "1 750 000 ₽", features: ["Ставка 24,5%", "90 дней", "Рейтинг 10"], href: "/", img: ImgCardMock },
    { name: 'ИП Иванов А.А.', text: 'Ремонт и обслуживание автомобилей', amount: "2 900 000 ₽", features: ["Ставка 26,3%", "270 дней", "Рейтинг 13"], href: "/", img: ImgCardMock },
    { name: 'ООО “СеверСтрой”', text: 'Строительство жилых домов и коттеджей', amount: "12 000 000 ₽", features: ["Ставка 29,2%", "540 дней", "Рейтинг 16"], href: "/", img: ImgCardMock },
    { name: 'ЗАО “Молочные продукты”', text: 'Производство и поставка молочной продукции', amount: "5 600 000 ₽", features: ["Ставка 27,0%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “Лазурит”', text: 'Деятельность прочего сухопутного пассажирского транспорта', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
]

export function InvestInSection() {
    return (
        <SwiperSection
            title="Инвестируйте в реальные компании уже сегодня"

        >
            {items.map((it, i) => (
                <SwiperSlide key={i}>
                    <CaseCard {...it} />
                </SwiperSlide>
            ))}
        </SwiperSection>
    )
}
'use client'
import { SwiperSlide } from "swiper/react";
import ImgCardMock from "../../public/img/mock/card-1.png";
import { CaseCard } from "@shared/ui/CaseCard";
import {SwiperSection} from "@shared/sections/SwiperSection";

const items = [
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
    { name: 'ООО “ЛАЗУРИТ”', text: 'Деятельность прочего сухопутного пассажирского Деятельность прочего сухопутного пассажирского', amount: "6 100 000 ₽", features: ["Ставка 27,4%", "360 дней", "Рейтинг 14"], href: "/", img: ImgCardMock },
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
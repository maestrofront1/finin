'use client';
import { FeedbackCard } from '@/shared/ui/FeedbackCard';
import { SwiperSlide } from 'swiper/react';
import {SwiperSection} from "@shared/sections/SwiperSection";
import Image from "next/image";

const services = [
    { id: 0, reviewsCount: 84, serviceImg: '/img/reviewIcons/yandex.png', rating: 5 },
    { id: 1, reviewsCount: 96, serviceImg: '/img/reviewIcons/2gis.png', rating: 4 },
    { id: 2, reviewsCount: 73, serviceImg: '/img/reviewIcons/hz.png', rating: 2 },
    { id: 3, reviewsCount: 261, serviceImg: '/img/reviewIcons/zoon.png', rating: 5 },
    { id: 4, reviewsCount: 47, serviceImg: '/img/reviewIcons/f.png', rating: 1 },
];

const items = [
    { name: 'Анна', text: 'Решила попробовать эту платформу, так как слышала о её высоком качестве и отсутствии троттлингов. Платформа действительно отличная: удобно отслеживать проекты через Telegram-канал, несколько раз посещал. Платформа действительно отличная: удобно отслеживать проекты через Telegram-канал, несколько раз посещал' },
    { name: 'Павел', text: 'Инвестирую регулярно, всё прозрачно.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
    { name: 'Ольга', text: 'Помогли привлечь финансирование для бизнеса.' },
];

const StarIcon = () => (
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" fill="currentColor" />
    </svg>
);


export function ReviewsSection() {
    return (
        <SwiperSection
            title="Отзывы о платформе Финин"
            headerContent={
                <div className="flex flex-row flex-wrap justify-center gap-x-20 gap-y-4 my-10 max-md:flex-nowrap max-md:overflow-x-auto max-md:overflow-y-hidden max-md:pb-2 max-md:pr-10 max-md:justify-start max-md:px-5">
                    {services.map((service) => (
                        <div key={service.id} className="flex flex-row items-center gap-3">
                            <Image src={service.serviceImg} width={36} height={36} className="w-[36px] h-[36px]" alt="service" />
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-[16px] font-semibold">{service.rating}.0</span>
                                    <div className="flex flex-row gap-1 text-yellow-500">
                                        {Array.from({ length: service.rating }).map((_, i) => (
                                            <StarIcon key={i} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[16px]">{service.reviewsCount} оценки</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        >
            {items.map((it, i) => (
                <SwiperSlide key={i}>
                    <FeedbackCard name={it.name} text={it.text} />
                </SwiperSlide>
            ))}
        </SwiperSection>
    );
}
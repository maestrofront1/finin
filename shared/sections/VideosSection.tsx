'use client'
import {Container} from '@/shared/ui/Container'
import {FeedbackCard} from '@/shared/ui/FeedbackCard'
import {Swiper as SwiperType} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react";
import {useRef} from "react";
import 'swiper/css';
import {Navigation} from "swiper/modules";
import {H2} from "@shared/ui/Typography";


export function VideosSection() {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="py-12">
            <Container className="px-0">
                <H2 className="text-[48px] text-center font-semibold mb-6">Полезные видео</H2>

                <div className="relative px-[180px] max-xl:px-10 max-xl:pr-0 max-md:p-0">
                    <Swiper
                        modules={[Navigation]}
                        loop={true}
                        navigation={{
                            nextEl: '.swiper-next',
                            prevEl: '.swiper-prev',
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.25,
                                spaceBetween: 20,
                                slidesOffsetBefore: 20,
                            },
                            720: {
                                slidesPerView: 1.5,
                                spaceBetween: 20,
                                slidesOffsetBefore: 0, // No offset needed, 1.5 slides does the peeking
                                slidesOffsetAfter: 0,
                            },
                            // --- Small Desktop / Large Tablet (>= 1024px) ---
                            // When the screen is 1024px or wider, these settings OVERRIDE the 720px settings
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            // --- Large Desktop (>= 1280px) ---
                            // Finally, when the screen is 1280px or wider, these settings OVERRIDE the 1024px settings
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        className="overflow-hidden w-full"
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {Array.from(Array(10)).map((it, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col rounded-3xl overflow-hidden bg-gray-100 gap-[10px] w-full">
                                    <div className="rounded-b-3xl h-[546px] flex items-center justify-center bg-gray-200">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="white"/>
                                            <path d="M54.2303 39.5838C54.897 39.9687 54.897 40.931 54.2303 41.3159L34.309 52.8175C33.6423 53.2024 32.809 52.7212 32.809 51.9514L32.809 28.9482C32.809 28.1784 33.6423 27.6973 34.309 28.0822L54.2303 39.5838Z" fill="#E7EBF2"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-1.5 p-4">
                                        <p className="text-[20px] leading-[24px] text-gray-400">Как зарегистрироваться на платформе</p>
                                        <p className="text-[16px] leading-[12px] font-light text-gray-400">30 июля 2024</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="absolute flex justify-between w-full z-[4] left-0 top-1/2 -translate-y-1/2 px-10 max-xl:-top-[55px] max-xl:translate-y-0">
                        <button
                            className="swiper-prev w-[60px] rounded-full h-[60px] bg-white shadow-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center max-md:w-[40px] max-md:h-[40px]">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.93188 0.496829C10.3252 0.101317 10.9628 0.101318 11.3561 0.49683C11.7493 0.892342 11.7493 1.53359 11.3561 1.92911L3.34321 9.98753L20.7931 9.98753C21.3492 9.98753 21.8 10.4409 21.8 11.0002C21.8 11.5595 21.3492 12.0129 20.7931 12.0129L3.34321 12.0129L11.3561 20.0713C11.7493 20.4668 11.7493 21.108 11.3561 21.5036C10.9628 21.8991 10.3252 21.8991 9.93188 21.5036L0.200012 11.7163L0.200012 10.2841L9.93188 0.496829Z"
                                    fill="#A5ADBD"/>
                            </svg>
                        </button>
                        <button
                            className="swiper-next w-[60px] rounded-full h-[60px] bg-white shadow-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center max-md:w-[40px] max-md:h-[40px]">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.0681 21.5036C11.6748 21.8991 11.0372 21.8991 10.6439 21.5036C10.2506 21.108 10.2506 20.4668 10.6439 20.0713L18.6567 12.0129H1.20689C0.65077 12.0129 0.199951 11.5595 0.199951 11.0002C0.199951 10.4409 0.650772 9.98753 1.20689 9.98753H18.6567L10.6439 1.92911C10.2506 1.53359 10.2506 0.892342 10.6439 0.49683C11.0372 0.101317 11.6748 0.101317 12.0681 0.496829L21.7999 10.2841V11.7163L12.0681 21.5036Z"
                                    fill="#A5ADBD"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
'use client';

import React, { useRef, type ReactNode } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

// --- Arrow Icon Sub-components ---
const ArrowLeftIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.93188 0.496829C10.3252 0.101317 10.9628 0.101318 11.3561 0.49683C11.7493 0.892342 11.7493 1.53359 11.3561 1.92911L3.34321 9.98753L20.7931 9.98753C21.3492 9.98753 21.8 10.4409 21.8 11.0002C21.8 11.5595 21.3492 12.0129 20.7931 12.0129L3.34321 12.0129L11.3561 20.0713C11.7493 20.4668 11.7493 21.108 11.3561 21.5036C10.9628 21.8991 10.3252 21.8991 9.93188 21.5036L0.200012 11.7163L0.200012 10.2841L9.93188 0.496829Z" fill="#A5ADBD"/>
    </svg>
);
const ArrowRightIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0681 21.5036C11.6748 21.8991 11.0372 21.8991 10.6439 21.5036C10.2506 21.108 10.2506 20.4668 10.6439 20.0713L18.6567 12.0129H1.20689C0.65077 12.0129 0.199951 11.5595 0.199951 11.0002C0.199951 10.4409 0.650772 9.98753 1.20689 9.98753H18.6567L10.6439 1.92911C10.2506 1.53359 10.2506 0.892342 10.6439 0.49683C11.0372 0.101317 11.6748 0.101317 12.0681 0.496829L21.7999 10.2841V11.7163L12.0681 21.5036Z" fill="#A5ADBD"/>
    </svg>
);


// --- Component Props Interface ---
interface ConfiguredSwiperProps {
    children: ReactNode;
    swiperProps?: SwiperProps;
    className?: string;
    showNavigation?: boolean;
}

// --- Main Component ---
export function ConfiguredSwiper({ children, swiperProps, className, showNavigation = true }: ConfiguredSwiperProps) {
    const prevElRef = useRef<HTMLButtonElement>(null);
    const nextElRef = useRef<HTMLButtonElement>(null);

    // Default Swiper settings, can be overridden by props
    const defaultSwiperProps: SwiperProps = {
        modules: [Navigation],
        loop: true,
        navigation: {
            prevEl: prevElRef.current,
            nextEl: nextElRef.current,
        },
        breakpoints: {
            0: { slidesPerView: 1.15, spaceBetween: 20 },
            720: { slidesPerView: 1.5, spaceBetween: 20, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20, slidesOffsetBefore: -250, slidesOffsetAfter: -250 },
        },
    };

    const finalSwiperProps = { ...defaultSwiperProps, ...swiperProps };

    return (
        <div className={`relative ${className || ''}`}>
            <Swiper
                {...finalSwiperProps}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation!.prevEl = prevElRef.current;
                        swiper.params.navigation!.nextEl = nextElRef.current;
                    }
                }}
                className="!overflow-visible w-full"
            >
                {children}
            </Swiper>

            {showNavigation && (
                <div className="absolute flex justify-between w-full z-[4] left-0 top-1/2 -translate-y-1/2 px-10 max-md:hidden">
                    <button ref={prevElRef} className="w-[60px] rounded-full h-[60px] bg-white shadow-2xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                        <ArrowLeftIcon />
                    </button>
                    <button ref={nextElRef} className="w-[60px] rounded-full h-[60px] bg-white shadow-2xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                        <ArrowRightIcon />
                    </button>
                </div>
            )}
        </div>
    );
}
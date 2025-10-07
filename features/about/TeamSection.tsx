"use client";

import React from 'react';
import Image, {StaticImageData} from "next/image";
import {H2} from "@shared/ui/Typography";
import {ConfiguredSwiper} from "@shared/ui/ConfiguredSwiper";
import {SwiperSlide} from "swiper/react";

// Define a type for a single person for clean props
type Person = {
    name: string;
    role: React.ReactNode;
    description?: string;
    image: StaticImageData;
};

// Define the props for our new component
interface TeamSectionProps {
    people: {
        main: Person[];
        clients: Person[];
        legalDeparment: Person[];
        development: Person[];
    };
}

export function TeamSection({people}: TeamSectionProps) {
    return (
        <section className="my-[120px] max-w-[1564px] mx-auto overflow-hidden">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Наша команда</h2>

            {/* --- GUIDES SECTION --- */}
            {/* Desktop */}
            <div className="flex flex-col gap-5 px-12 py-10 rounded-[20px] bg-gray-100 max-md:hidden">
                <p className="text-[36px] text-[#7D8492] font-semibold">Руководство</p>
                <div className="grid grid-cols-3 gap-5">
                    {people.main.map((item, index) => (
                        <div key={`main-${index}`}
                             className="px-10 flex rounded-3xl flex-col items-center justify-center bg-white gap-5 py-12">
                            <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                   alt={item.name}/>
                            <div className="flex flex-col gap-2">
                                <p className="text-center text-[28px] font-bold">{item.name}</p>
                                <p className="text-center text-[18px] font-medium">{item.role}</p>
                            </div>
                            <p className="text-center text-[18px] text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Mobile */}
            <div className="flex-col gap-5 px-12 py-10 rounded-[20px] hidden max-md:flex">
                <H2 className="text-center">Руководство</H2>
                <div className="flex flex-col gap-5">
                    {people.main.map((item, index) => (
                        <div key={`main-mobile-${index}`}
                             className="p-6 flex flex-col items-center justify-center bg-gray-100 rounded-xl gap-5">
                            <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                   alt={item.name}/>
                            <div className="flex flex-col gap-2">
                                <p className="text-center text-[28px] font-bold max-md:text-[20px]">{item.name}</p>
                                <p className="text-center text-[18px] font-medium">{item.role}</p>
                            </div>
                            <p className="text-center text-[18px] text-gray-300 max-md:text-[16px]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- CLIENTS SECTION --- */}
            {/* Desktop */}
            <div className="flex flex-col gap-5 px-12 py-10 mt-5 rounded-[20px] bg-gray-100 max-md:hidden">
                <p className="text-[36px] text-[#7D8492] font-semibold">Отдел по работе с клиентами</p>
                <div className="grid grid-cols-5 gap-5">
                    {people.clients.map((item, index) => (
                        <div key={`client-${index}`}
                             className="px-10 rounded-3xl flex flex-col items-center justify-center bg-white gap-5 py-12">
                            <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                   alt={item.name}/>
                            <div className="flex flex-col gap-2">
                                <p className="text-center text-[28px] font-bold">{item.name}</p>
                                <p className="text-center text-[18px] font-medium">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Mobile */}
            <div className="flex-col gap-5 px-12 py-10 rounded-[20px] hidden max-md:flex">
                <H2 className="text-center">Отдел по работе с клиентами</H2>
                <ConfiguredSwiper>
                    {people.clients.map((item, index) => (
                        <SwiperSlide key={`client-mobile-${index}`}>
                            <div className="p-6 flex flex-col items-center justify-center bg-gray-100 rounded-xl gap-5">
                                <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                       alt={item.name}/>
                                <div className="flex flex-col gap-2">
                                    <p className="text-center text-[28px] font-bold">{item.name}</p>
                                    <p className="text-center text-[18px] font-medium">{item.role}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </ConfiguredSwiper>
            </div>

            {/* --- LEGAL DEPARTMENT SECTION --- */}
            {/* Desktop */}
            <div className="flex flex-row gap-5">

                <div className="flex flex-col w-1/2 gap-5 px-12 py-10 mt-5 rounded-[20px] bg-gray-100 max-md:hidden">
                    <p className="text-[36px] text-[#7D8492] font-semibold">Юридический отдел</p>
                    <div className="grid grid-cols-2 gap-5">
                        {people.legalDeparment.map((item, index) => (
                            <div key={`legal-${index}`}
                                 className="px-10 rounded-3xl flex flex-col items-center justify-center bg-white gap-5 py-12">
                                <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                       alt={item.name}/>
                                <div className="flex flex-col gap-2">
                                    <p className="text-center text-[28px] font-bold">{item.name}</p>
                                    <p className="text-center text-[18px] font-medium">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-1/2 gap-5 px-12 py-10 mt-5 rounded-[20px] bg-gray-100 max-md:hidden">
                    <p className="text-[36px] text-[#7D8492] font-semibold">Отдел разработки</p>
                    <div className="grid grid-cols-2 gap-5">
                        {people.development.map((item, index) => (
                            <div key={`dev-${index}`}
                                 className="px-10 rounded-3xl flex flex-col items-center justify-center bg-white gap-5 py-12">
                                <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                       alt={item.name}/>
                                <div className="flex flex-col gap-2">
                                    <p className="text-center text-[28px] font-bold">{item.name}</p>
                                    <p className="text-center text-[18px] font-medium">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="flex-col gap-5 px-12 py-10 rounded-[20px] hidden max-md:flex mt-5">
                <H2 className="text-center">Юридический отдел</H2>
                <ConfiguredSwiper>
                    {people.legalDeparment.map((item, index) => (
                        <SwiperSlide key={`legal-mobile-${index}`}>
                            <div className="p-6 flex flex-col items-center justify-center bg-gray-100 rounded-xl gap-5">
                                <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                       alt={item.name}/>
                                <div className="flex flex-col gap-2">
                                    <p className="text-center text-[28px] font-bold">{item.name}</p>
                                    <p className="text-center text-[18px] font-medium">{item.role}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </ConfiguredSwiper>
            </div>

            {/* --- DEVELOPMENT DEPARTMENT SECTION --- */}
            {/* Desktop */}
            {/* Mobile */}
            <div className="flex-col gap-5 px-12 py-10 rounded-[20px] hidden max-md:flex mt-5">
                <H2 className="text-center">Отдел разработки</H2>
                <ConfiguredSwiper>
                    {people.development.map((item, index) => (
                        <SwiperSlide key={`dev-mobile-${index}`}>
                            <div className="p-6 flex flex-col items-center justify-center bg-gray-100 rounded-xl gap-5">
                                <Image className="rounded-full object-center w-[120px] h-[120px]" src={item.image}
                                       alt={item.name}/>
                                <div className="flex flex-col gap-2">
                                    <p className="text-center text-[28px] font-bold">{item.name}</p>
                                    <p className="text-center text-[18px] font-medium">{item.role}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </ConfiguredSwiper>
            </div>

        </section>
    );
}
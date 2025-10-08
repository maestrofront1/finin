import type {Metadata} from "next";
import {Container} from "@shared/ui/Container";
import {buildMetadata} from "@shared/seo/seo";
import {LoansHeroSection} from "@features/loans/components/LoansHeroSection";
import Image from "next/image";
import PhoneImg from "@/public/img/phone.png";
import Button from "@shared/ui/Button";
import CardScrollList from "@features/home/components/CardScrollList";
import MarqueeBlocks from "@shared/sections/MarqueeBlocks";
import {PartnersSection} from "@shared/sections/PartnersSection";
import {EngagementSections} from "@features/home/components/EngagementSections";
import Card1 from "../../public/img/invest/pic.png";
import Card2 from "../../public/img/invest/pic-1.png";
import Card3 from "../../public/img/invest/pic-2.png";
import Card4 from "../../public/img/invest/pic-3.png";
import Card5 from "../../public/img/invest/pic-4.png";
import Card11 from "../../public/img/loans/cards-2/pic.png";
import Card22 from "../../public/img/loans/cards-2/pic-1.png";
import Card33 from "../../public/img/loans/cards-2/pic-2.png";
import Card44 from "../../public/img/loans/cards-2/pic-3.png";
import Card55 from "../../public/img/loans/cards-2/pic-4.png";
import {InvestInSection} from "@shared/sections/InvestInSection";
import {InvestCalculatorSection} from "@features/home/components/InvestCalculatorSection";
import {RegisterSection} from "@shared/sections/RegisterSection";
import CalculatorSection from "@features/home/components/CalculatorSection";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadata({path: "/invest", title: "Инвестиции — Финин"});
}


export default function InvestPage() {
    return (
        <Container>
            <LoansHeroSection/>

          
            <CardScrollList/>
            <CalculatorSection></CalculatorSection>

            <section className="con-container my-[120px]">
                <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
            <span className="relative">5 преимуществ
                <div className="absolute left-0 -bottom-[10px]">
                    <svg width="348" height="11" viewBox="0 0 348 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.98213C70.6269 -6.93695 248.157 16.7488 347.157 4.98206" stroke="#009E6C"
                              stroke-width="4"/>
                    </svg>
                </div>
            </span> для инвестора
                </h2>

                <div className="flex flex-col gap-5">

                    <div className="flex flex-row gap-5">

                        <div
                            className="rounded-[20px] relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col gap-[28px]">
                                <Image className="object-cover w-full" src={Card1}
                                       alt="phone"></Image>
                                <p className="text-[28px] font-bold text-gray-400">Доходность выше <br/>банковских
                                    вкладов
                                </p>
                            </div>
                        </div>
                        <div
                            className="rounded-[20px] relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col gap-[28px]">
                                <Image className="object-cover w-full" src={Card2}
                                       alt="phone"></Image>
                                <p className="text-[28px] font-bold text-gray-400">Защита инвесторов <br/>по закону
                                    259-ФЗ
                                </p>
                            </div>
                        </div>
                        <div
                            className="rounded-[20px] relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col gap-[28px]">
                                <Image className="object-cover w-full" src={Card3}
                                       alt="phone"></Image>
                                <p className="text-[28px] font-bold text-gray-400">Проекты проходят проверку<br/>и
                                    скоринг
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5">

                        <div
                            className="rounded-[20px] col-span-1 relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col gap-[28px]">
                                <Image className="object-cover w-full" src={Card4}
                                       alt="phone"></Image>
                                <p className="text-[28px] font-bold text-gray-400">Возможность диверсифицировать
                                    портфель
                                </p>
                            </div>
                        </div>
                        <div
                            className="rounded-[20px] col-span-1 relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col gap-[28px]">
                                <Image className="object-cover w-full" src={Card5}
                                       alt="phone"></Image>
                                <p className="text-[28px] font-bold text-gray-400">Прозрачные условия и доступ к
                                    аналитике в личном кабинете
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            
            <InvestInSection></InvestInSection>
            <MarqueeBlocks/>
            <PartnersSection/>
            <EngagementSections/>
        </Container>
    );
}


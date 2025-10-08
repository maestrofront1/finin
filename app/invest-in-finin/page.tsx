import {StrategySection} from "@shared/sections/StrategySection";
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
import Card1 from "../../public/img/invest-in-finin/cards-1/pic.png";
import Card2 from "../../public/img/invest-in-finin/cards-1/pic-1.png";
import Card3 from "../../public/img/invest-in-finin/cards-1/pic-2.png";
import Card4 from "../../public/img/invest-in-finin/cards-1/pic-3.png";
import Card5 from "../../public/img/invest-in-finin/cards-1/pic-4.png";
import Card11 from "../../public/img/invest-in-finin/cards-2/pic.png";
import Card22 from "../../public/img/invest-in-finin/cards-2/pic-1.png";
import Card33 from "../../public/img/invest-in-finin/cards-2/pic-2.png";
import Img1 from "../../public/img/invest-in-finin/pic.png"
import {InvestInSection} from "@shared/sections/InvestInSection";
import {InvestCalculatorSection} from "@features/home/components/InvestCalculatorSection";
import {InvestInFininHeroSection} from "@features/invest-in-finin/InvestInFininHeroSection";
import Link from "next/link";
import AboutDigitalSection from "@features/home/components/AboutDigitalSection";
import {RegisterSection} from "@shared/sections/RegisterSection";
import {AboutSection} from "@shared/sections/AboutSection";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadata({path: "/invest", title: "Инвестиции — Финин"});
}


export default function InvestInFininPage() {
    return (
        <Container>
            <InvestInFininHeroSection/>

            <section className="con-container my-[120px]">
                <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
            <span className="relative">5 преимуществ
                <div className="absolute left-0 w-full -bottom-[10px]">
                    <svg className="w-full" width="348" height="11" viewBox="0 0 348 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.98213C70.6269 -6.93695 248.157 16.7488 347.157 4.98206" stroke="#009E6C"
                              stroke-width="4"/>
                    </svg>
                </div>
            </span> владеть акциями Финин
                </h2>

                <div className="flex flex-col gap-5">

                    <div className="flex flex-row gap-5 max-md:flex-col">

                        <div
                            className="rounded-[20px] flex-[40%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card1}
                                       alt="phone"></Image>
                                <div className="flex flex-col gap-5 mt-auto">

                                    <p className="text-[28px] font-bold text-gray-400">Возможность продать или подарить
                                        акцию</p>
                                    <p className="text-[18px] text-gray-300">Подарите акции своим детям или внукам,
                                        обеспечив им финансовую поддержку.</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="rounded-[20px] flex-[40%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card2}
                                       alt="phone"></Image>
                                <div className="flex flex-col gap-5 mt-auto">

                                    <p className="text-[28px] font-bold text-gray-400">Получение дивидендов</p>
                                    <p className="text-[18px] text-gray-300">Стабильные выплаты в соответствии с ФЗ
                                        акционерных обществ</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="rounded-[20px] flex-[40%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card3}
                                       alt="phone"></Image>
                                <div className="flex flex-col gap-5 mt-auto">

                                    <p className="text-[28px] font-bold text-gray-400">Рост акций</p>
                                    <p className="text-[18px] text-gray-300">С 2023 по 2025 цена акции выросла в два
                                        раза</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-5 max-md:flex-col">

                        <div
                            className="rounded-[20px] flex-[40%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card4}
                                       alt="phone"></Image>
                                <div className="flex flex-col gap-5 mt-auto">

                                    <p className="text-[28px] font-bold text-gray-400">Доступ к закрытому <br/>чату
                                        инвесторов и руководства компании</p>
                                    <p className="text-[18px] text-gray-300">Подарите акции своим детям или внукам,
                                        обеспечив им финансовую поддержку.</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="rounded-[20px] flex-[40%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card5}
                                       alt="phone"></Image>
                                <div className="flex flex-col gap-5 mt-auto">

                                    <p className="text-[28px] font-bold text-gray-400">Возможность
                                        автоинвестирования</p>
                                    <p className="text-[18px] text-gray-300">Подарите акции своим детям или внукам,
                                        обеспечив им финансовую поддержку.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/*<AboutSection></AboutSection>*/}
            <StrategySection/>
            <AboutDigitalSection className="!py-[unset] !pt-5 !pb-[120px]" title={"Стабильный рост компании на протяжении 7 лет"} />

            {/*<section className="my-[120px] max-w-[1564px] mx-auto">*/}
            {/*    <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Теперь про акцию</h2>*/}
            {/*    <div className="flex flex-col mt-10">*/}
            {/*        <div className="flex flex-row gap-5 max-md:flex-col">*/}
            {/*            <div className="p-6 flex-[60%] rounded-[20px] bg-gray-100 flex flex-col gap-5">*/}
            {/*                <p className="text-[28px] max-md:text-[28px] text-gray-400 font-bold">Цена одной акции</p>*/}
            {/*                <p className="text-[100px] max-md:text-[68px] text-gray-300">3 500 ₽ </p>*/}
            {/*            </div>*/}
            {/*            <div className="p-6 flex-[40%] rounded-[20px] bg-gray-100 flex flex-col gap-5">*/}
            {/*                <p className="text-[28px] max-md:text-[28px] text-gray-400 font-bold">Акции с 2023 выросли</p>*/}
            {/*                <p className="text-[100px] max-md:text-[68px] text-green-500">на 200%</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="relative p-6 mt-5 overflow-hidden flex-[40%] rounded-[20px] bg-gray-100 gap-5 max-md:flex max-md:flex-col-reverse">*/}
            {/*            <div className="flex flex-col">*/}

            {/*                <p className="text-[28px] max-md:text-[28px] text-gray-400 mb-5 font-bold">Решайте сами</p>*/}
            {/*                <ul className="list-disc flex flex-col gap-5 ml-6">*/}
            {/*                    <li className="text-[18px] text-gray-300">Продать к декабрю дороже на нашей платформе</li>*/}
            {/*                    <li className="text-[18px] text-gray-300">Держать, чтобы заработать ещё больше и получать дивиденды</li>*/}
            {/*                </ul>*/}
            {/*                <Button className="mt-[28px]" variant="green" withArrow>начать инвестировать</Button>*/}
            {/*            </div>*/}
            {/*            <Image src={Img1} className="absolute h-full object-contain right-[10%] bottom-0 max-md:relative max-md:right-[unset] [mask-image:linear-gradient(to_top,transparent,black_20%)] max-md:relative max-md:self-center"*/}
            {/*                   alt="Ivest"></Image>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <InvestCalculatorSection></InvestCalculatorSection>


            <MarqueeBlocks/>
            <PartnersSection/>
            <EngagementSections/>
        </Container>
    );
}


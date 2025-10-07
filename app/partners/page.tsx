import type {Metadata} from "next";
import {Container} from "@shared/ui/Container";
import {buildMetadata} from "@shared/seo/seo";
import Image from "next/image";
import PhoneImg from "@/public/img/phone.png";
import Button from "@shared/ui/Button";
import {PartnersSection} from "@shared/sections/PartnersSection";
import {EngagementSections} from "@features/home/components/EngagementSections";
import Card1 from "../../public/img/partners-page/pic.png";
import Card2 from "../../public/img/partners-page/pic-1.png";
import Card3 from "../../public/img/partners-page/pic-2.png";
import Card4 from "../../public/img/partners-page/pic-3.png";
import Card5 from "../../public/img/partners-page/pic-4.png";
import Icon1 from "../../public/img/partners-page/icons/pic.png";
import Icon2 from "../../public/img/partners-page/icons/pic-1.png";
import Icon3 from "../../public/img/partners-page/icons/pic-2.png";
import {PartnersHeroSection} from "@features/partners/PartnersHeroSection";
import {RegisterSection} from "@shared/sections/RegisterSection";
import {H2} from "@shared/ui/Typography";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadata({path: "/invest", title: "Инвестиции — Финин"});
}


export default function PartnersPage() {
    return (
        <Container>
            <PartnersHeroSection/>

            <section className="con-container my-[120px] max-md:px-0">
                <H2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Доверие и безопасность</H2>

                <div className="flex flex-col gap-5">

                    <div className="flex flex-row gap-5 max-md:flex max-md:flex-col">

                        <div
                            className="rounded-[20px] flex-[72%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col relative h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card1}
                                       alt="phone"></Image>
                                <div className="flex flex-col gap-5 mt-auto">

                                    <p className="text-[28px] font-bold text-gray-400">Готовые инструменты для
                                        продвижения и персональная поддержка</p>
                                    <p className="text-[18px] text-gray-300">Получите доступ к баннерам, презентациям и
                                        аналитике, а также помощь персонального менеджера.</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="rounded-[20px] flex-[28%]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover absolute inset-5 w-full max-md:relative max-md:inset-0"
                                       src={Card2}
                                       alt="phone"></Image>
                                <div className="flex flex-col mt-auto gap-5 relative z-[1]">

                                    <p className="text-[28px] font-bold text-gray-400">Платформа регулируется
                                        Центральным банком РФ</p>
                                    <p className="text-[18px] text-gray-300">Мы работаем по лицензии ЦБ и соблюдаем все
                                        требования законодательства.</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="flex flex-row gap-5 max-md:flex max-md:flex-col">

                        <div
                            className="rounded-[20px]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover absolute inset-5 w-full max-md:relative max-md:inset-0"
                                       src={Card3}
                                       alt="phone"></Image>
                                <div className="flex flex-col mt-auto gap-5 relative z-[1]">

                                    <p className="text-[28px] font-bold text-gray-400">Один из самых высоких процентов
                                        на рынке</p>
                                    <p className="text-[18px] text-gray-300">Зарабатывайте больше, чем в других
                                        партнёрских программах — мы предлагаем максимальные ставки вознаграждения.</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="rounded-[20px]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card4}
                                       alt="phone"></Image>
                                <div className="flex flex-col mt-auto gap-5">

                                    <p className="text-[28px] font-bold text-gray-400">Мгновенные выплаты 24/7 без
                                        ограничений</p>
                                    <p className="text-[18px] text-gray-300">Выводите доход в любое время суток, без
                                        лимитов и задержек, прямо из личного кабинета.</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="rounded-[20px]  relative bg-gray-100 pt-[50px] px-10 pb-6 w-full flex flex-col shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col h-full gap-[28px]">
                                <Image className="object-cover w-full" src={Card5}
                                       alt="phone"></Image>
                                <div className="flex flex-col mt-auto gap-5">

                                    <p className="text-[28px] font-bold text-gray-400">Официальное оформление через
                                        агентский договор</p>
                                    <p className="text-[18px] text-gray-300">Всё сотрудничество ведётся прозрачно и
                                        легально, без «серых схем» и рисков.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="con-container my-[120px] max-md:px-0">
                <H2 className="text-4xl font-semibold text-center mb-5 text-gray-400">
                    Условия сотрудничества
                </H2>
                <h2 className="text-[22px] text-center mb-10 px-6 py-2 rounded-[10px] bg-[#D5F5E3] w-fit justify-self-center text-gray-800 max-md:text-[16px] max-md:mb-5">
                    Чёткие проценты и официальные выплаты без скрытых комиссий
                </h2>

                <div className="grid grid-cols-2 gap-5 max-md:gap-3">
                    <div className="p-10 flex items-center justify-center rounded-[20px] bg-gray-100 max-md:p-5">
                        <p className="text-[28px] max-md:text-[14px] text-center"><span className="font-bold">Инвесторы — до 1,5%</span> от
                            суммы инвестиций</p>
                    </div>
                    <div className="p-10 flex items-center justify-center rounded-[20px] bg-gray-100 max-md:p-5">
                        <p className="text-[28px] max-md:text-[14px] text-center"><span className="font-bold">Заёмщики — до 2%</span> от
                            суммы займа</p>
                    </div>
                    <div className="py-[72px] flex col-span-2 items-center justify-center rounded-[20px] bg-gray-100">
                        <p className="text-[28px] max-md:text-[14px] text-center"><span className="font-bold">Акционерные общества — до 5%</span> от
                            суммы размещения акций.
                        </p>
                    </div>
                </div>

            </section>

            <section className="con-container my-[120px] max-md:px-0">
                <div className="flex flex-row gap-20 max-lg:flex-col max-lg:items-center">
                    <H2 className="hidden max-lg:block text-center">Кто может <br/>стать партнёром</H2>
                    <div className="flex flex-col gap-5 justify-center max-lg:hidden">
                        <p>Кто может <br/>стать партнёром</p>
                        <Button variant="gray">стать партнером</Button>
                    </div>
                    <div className="flex flex-row w-full gap-5 max-md:flex-col">
                        <div
                            className="rounded-[20px] relative bg-gray-100 p-10 w-full max-w-[950px] h-[449px] md:p-8 flex flex-col shadow-sm hover:shadow-md transition max-md:h-full">
                            <div className="flex flex-col h-full justify-between">
                                <span className="text-[28px] text-black-500"><span
                                    className="font-[900] text-[#9499A3]">/</span> 01</span>
                                <div className="flex flex-col gap-5 max-md:flex-row max-md:mt-5">
                                    <Image src={Icon1} alt="Icon" className="mb-2 object-contain"></Image>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[28px] font-bold max-md:text-[18px]">Физические<br/>лица</p>
                                        <p className="text-[18px] max-md:text-[14px]">Подходит каждому, кто хочет
                                            зарабатывать вместе с Финин.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="rounded-[20px] relative bg-gray-100 p-10 w-full max-w-[950px] h-[449px] md:p-8 flex flex-col shadow-sm hover:shadow-md transition max-md:h-full">
                            <div className="flex flex-col h-full justify-between">
                                <span className="text-[28px] text-black-500"><span
                                    className="font-[900] text-[#9499A3]">/</span> 02</span>
                                <div className="flex flex-col gap-5 max-md:flex-row max-md:mt-5">
                                    <Image src={Icon2} alt="Icon" className="mb-2 object-contain"></Image>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[28px] font-bold max-md:text-[18px]">Физические<br/>лица</p>
                                        <p className="text-[18px] max-md:text-[14px]">Подходит каждому, кто хочет
                                            зарабатывать вместе с Финин.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="rounded-[20px] relative bg-gray-100 p-10 w-full max-w-[950px] h-[449px] md:p-8 flex flex-col shadow-sm hover:shadow-md transition max-md:h-full">
                            <div className="flex flex-col h-full justify-between">
                                <span className="text-[28px] text-black-500"><span
                                    className="font-[900] text-[#9499A3]">/</span> 03</span>
                                <div className="flex flex-col gap-5 max-md:flex-row max-md:mt-5">
                                    <Image src={Icon3} alt="Icon" className="mb-2 object-contain"></Image>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[28px] font-bold max-md:text-[18px]">Компании <br/>и агентства</p>
                                        <p className="text-[18px] max-md:text-[14px]">Добавьте партнёрскую программу в портфель ваших услуг.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RegisterSection text={
                <span>Простая схема: <br className="max-md:hidden"/>от регистрации <br className="max-md:hidden"/>до дохода <span
                        className="text-[#9499A3]">за несколько шагов</span></span>
            }
            ></RegisterSection>

            <PartnersSection/>
            <EngagementSections/>
        </Container>
    );
}


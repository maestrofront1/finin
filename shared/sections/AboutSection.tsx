import Image from "next/image";
import Card11 from "@/public/img/invest-in-finin/cards-2/pic.png";
import Link from "next/link";
import Card22 from "@/public/img/invest-in-finin/cards-2/pic-1.png";
import Card33 from "@/public/img/invest-in-finin/cards-2/pic-2.png";
import {H2} from "@shared/ui/Typography";
import {MainCard} from "@shared/ui/InfoCard";

export const AboutSection = () => {
    return (
        <section className="con-container mt-[120px]">
            <H2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Основались и активно развиваем
                направления <span className="relative">с 2017 года<div className="absolute left-0 w-full -bottom-[10px]">
                    <svg className="w-full" width="348" height="11" viewBox="0 0 348 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.98213C70.6269 -6.93695 248.157 16.7488 347.157 4.98206" stroke="#009E6C"
                              stroke-width="4"/>
                    </svg>
                </div>
                </span>
            </H2>


            <div className="flex flex-row gap-5 max-lg:flex-col">
                <MainCard
                    variant="vertical"
                    title="Займы"
                    description="Оформите займ с прозрачными условиями на развитие Вашего бизнеса"
                    subtitle="от 21% годовых"
                    pic={<img src="/img/modules/pic.png" className="h-[200px]" alt="Займы" />}
                    href="/loans"
                />
                <MainCard
                    variant="vertical"
                    title="Инвестиции"
                    description="Надежное инвестирование в акции, бизнес или недвижимость с доходностью"
                    subtitle="от 15% годовых"
                    pic={<img src="/img/modules/pic-1.png" className="h-[200px]" alt="Инвестиции" />}
                    href="/invest"
                />
                <MainCard
                    variant="vertical"
                    title="Акционирование"
                    description="Привлекайте инвестиции с помощью выпуска акций вашей компании"

                    pic={<img src="/img/modules/pic-2.png" className="h-[260px]" alt="Акционирование" />}
                    href="/shares"
                />
            </div>

        </section>
    )
}
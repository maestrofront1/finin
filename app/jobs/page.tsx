import type {Metadata} from "next";
import {Container} from "@shared/ui/Container";
import {buildMetadata} from "@shared/seo/seo";
import Button from "@shared/ui/Button";
import {cn} from "@shared/lib/utils";
import { ellipse } from "@shared/sections/CTASection";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadata({path: "/invest", title: "Инвестиции — Финин"});
}

const VACANCIES = [
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
    {
        name: "Менеджер по работе с партнёрами",
        payment: "от 55 000 ₽",
        description: "R&D направление компании Финин занимается исследованием передовых технологий и созданием цифровых продуктов на основе автоматизации процессов и искусственного интеллекта.",
        features: [
            "гибрид",
            "5/2",
            "от 3-х лет опыта",
            "полная занятость"
        ]
    },
]


export default function PartnersPage() {
    return (
        <Container>
            <div className="flex flex-col gap-10 mb-[100px] mt-[120px] con-container">
                <h2>Вакансии</h2>

                <div className="grid grid-cols-2 gap-5">
                    {VACANCIES.map((item, i) => (
                        <div key={i} className={cn("flex flex-col gap-5 px-10 py-[60px] rounded-[20px] bg-gray-100", VACANCIES.length % 2 !==0 && i == VACANCIES.length-1 && "col-span-2")}>
                            <p>{item.name}</p>
                            <div className="flex flex-row items-center gap-5">
                                <p>{item.payment}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    {item.features.map((item, i) => (
                                        <div key={i} className="px-3 py-1.5">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                                <p className={cn("", VACANCIES.length % 2 !==0 && i == VACANCIES.length-1 && "max-w-[50%]")}>{item.description}</p>
                            <div className="flex flex-row gap-5 mt-8">
                                <Button variant="black">отправить резюме</Button>
                                <Button variant="gray">смотреть на hh</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="pt-10 px-[180px]">
                <Container
                    className="text-center relative bg-gradient-to-r overflow-hidden from-green-200 to-green-100 px-20 flex items-center h-[460px] bg-[#171717] rounded-[30px]">
                    <div className="absolute right-0 bottom-0 scale-[-1]">
                        {ellipse}
                    </div>
                    <div className="flex flex-row justify-between w-full relative z-[1]">
                        <div className="flex flex-col items-start gap-5 self-center">
                            <h2 className="text-[48px] leading-[100%] font-bold text-white text-start mb-4">Не нашли подходящую вакансию?</h2>
                            <p className="text-[24px] leading-[100%] font-bold text-white text-start mb-4">Присылайте ваше резюме и мы рассмотрим вашу кандидатуру</p>
                            <div className="flex justify-center gap-5">
                                <Button variant="white">отправить резюме</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </Container>
    );
}


import {Card} from './Card'
import Image, {StaticImageData} from "next/image";
import "swiper/css"

interface CaseCardProps {
    name: string,
    text: string,
    amount: string,
    features: string[],
    href: string,
    img: string | StaticImageData,
}

export function CaseCard({name, text, amount, features, href, img}: CaseCardProps) {
    return (
        <Card className="w-full flex flex-col rounded-[20px] overflow-hidden justify-between !p-0 border border-muted-200 shadow-soft-blue">
            <Image className="h-[248px] w-full object-cover" src={img} alt={name}></Image>
            <div className="flex flex-col px-8 pb-8 pt-6">
                <div className="flex flex-col gap-2">
                    <p className="text-gray-300 text-[28px] font-medium">{name}</p>
                    <p className="text-gray-300 text-[14px] leading-5 line-clamp-2">{text}</p>
                </div>
                <p className="text-gray-400 text-[52px] my-4 font-semibold">{amount}</p>
                <div className="grid grid-cols-3 gap-4">
                    {/* Ставка */}
                    <div className="flex flex-col">
                        <span className="text-[16px] text-gray-300">Ставка</span>
                        <span className="text-[18px] text-gray-400 font-medium">
                            {(features[0] || '').replace(/^\s*Ставка\s*/i, '')}
                        </span>
                    </div>
                    {/* Срок */}
                    <div className="flex flex-col">
                        <span className="text-[16px] text-gray-300">Срок</span>
                        <span className="text-[18px] text-gray-400 font-medium">
                            {features[1]}
                        </span>
                    </div>
                    {/* Рейтинг */}
                    <div className="flex flex-col">
                        <span className="text-[16px] text-gray-300">Рейтинг</span>
                        <span className="text-[18px] text-gray-400 font-medium">
                            {(features[2] || '').replace(/^\s*Рейтинг\s*/i, '')}
                        </span>
                    </div>
                </div>
                {/* Ссылка не отображается в макете; при необходимости добавить CTA */}
            </div>
        </Card>
    )
}
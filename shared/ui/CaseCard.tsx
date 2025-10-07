import {Card} from './Card'
import Image, {StaticImageData} from "next/image";
import Button from "@shared/ui/Button";
import Link from "next/link";
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
        <Card className="w-full flex flex-col rounded-[10px] overflow-hidden justify-between h-[553px] !p-0 border-none bg-gray-100">
            <Image className="h-[248px] w-full object-cover rounded-b-[10px]" src={img} alt="Image"></Image>
            <div className="flex flex-col px-10 pb-6 pt-6">

                <div className="flex flex-col gap-2">
                    <p className="text-gray-300 text-[28px] font-medium">{name}</p>
                    <p className="text-gray-300 truncate text-[14px]">{text}</p>
                </div>
                <p className="text-gray-400 text-[52px] my-4 font-semibold">{amount}</p>
                <div className="flex flex-row gap-2">

                    {features.map((item, index) => (
                        <div key={index} className="px-4 py-[10px] bg-white shadow-xl rounded-full">
                            <p className="text-[16px] text-gray-400 last:text-green-700">{item}</p>
                        </div>
                    ))}
                </div>
                <Link href={href} className="mt-5">
                    <Button variant="green">подробнее</Button>
                </Link>
            </div>
        </Card>
    )
}
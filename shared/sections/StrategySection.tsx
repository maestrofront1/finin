import Image from "next/image";
import Pick1 from "public/img/invest-in-finin/cards3/pic-1.png"
import Pick2 from "public/img/invest-in-finin/cards3/pic-2.png"
import Pick3 from "public/img/invest-in-finin/cards3/pic-3.png"

export const StrategySection = () => {
    return (
        <div className="mb-[82px]">
            <h1 className="text-center font-[600] text-[48px] text-gray-900 w-full mb-[80px]">Стратегия на 2025-2026 год</h1>
            <div className="grid grid-cols-3 gap-5 items-center ">
                <div className="w-full flex flex-col gap-5 bg-gray-100 rounded-[20px] ">
                    <Image src={Pick1} alt={"pick1"}/>
                    <div className="flex flex-col gap-5 items-center text-center pt-[24px] pb-[20px]">
                        <p className="text-[28px] font-bold ">Биржа</p>
                        <span className="text-[22px] font-normal text-grey-500 leading-10">Продажа акций на нашей <br/>бирже сторонних <br/> компаний</span>
                    </div>
                </div>
                <div>
                    <div className="w-full bg-gray-100  rounded-[20px]">
                        <Image src={Pick2} alt={"pick1"}/>
                        <div className="flex flex-col gap-5 items-center text-center pt-[24px] pb-[20px]">
                            <p className="text-[28px] font-bold ">Недвижимость</p>
                            <span className="text-[22px] font-normal text-grey-500 leading-10">Инвестиции в недвижимость: <br/>прибыль для фондов и частных<br/> инвесторов</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full bg-gray-100  rounded-[20px]">
                        <Image src={Pick3} alt={"pick1"}/>
                        <div className="flex flex-col gap-5 items-center text-center pt-[24px] pb-[20px]">
                            <p className="text-[28px] font-bold  ">Облигации</p>
                            <span className="text-[22px] font-normal text-grey-500 leading-10">Помогаем компаниям<br/> привлекать финансирование,<br/> выпуская облигации</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
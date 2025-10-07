import Image from "next/image";
import PhoneImg from "@/public/img/phone.png";
import Button from "@shared/ui/Button";

export const RegisterSection = ({text}: {text:string | React.ReactNode}) => {
    return (
        <section className="con-container my-[120px] max-md:px-0">
            <h2 className="text-[#3B3B3B] text-[48px] font-semibold hidden max-md:block max-md:text-[20px] mb-5 text-center">{text}</h2>
            <div className="flex flex-row justify-between max-md:flex-col">
                <div
                    className="rounded-[20px] relative bg-gray-100 p-10 w-full max-w-[950px] h-[449px] md:p-8 flex flex-col shadow-sm hover:shadow-md transition max-md:flex max-md:flex-col-reverse max-md:h-fit max-md:p-6">
                    <div className="flex flex-row h-full justify-between max-md:mt-5">
                        <div className="flex flex-col max-md:gap-2">
                                <span className="text-[28px] text-black-500 max-md:text-gray-400 max-md:text-[14px]"><span
                                    className="font-[900] text-[#9499A3]">/</span> 01</span>
                            <div className="h-full flex items-center">
                                <p className="text-[#545454] text-[28px] font-bold leading-[100%] max-md:text-[14px] max-md:font-normal">
                                    Пройдите регистрацию <br className="max-sm:hidden"/>на платформе
                                </p>
                            </div>
                        </div>
                    </div>
                    <Image width={254} height={360} className="object-cover absolute bottom-0 right-[10%] max-md:relative max-md:right-[unset] max-md:[mask-image:linear-gradient(to_top,transparent,black_20%)] max-md:h-[200px] max-md:object-contain max-md:object-left"
                           src={PhoneImg} alt="phone"></Image>
                </div>

                <div className="flex flex-col gap-5 justify-center max-w-[455px] max-md:hidden">
                    <p className="text-[#3B3B3B] text-[48px] font-semibold">{text}</p>
                    <Button variant="gray" withArrow={false}>стать партнером</Button>
                </div>

                <Button className="hidden max-md:flex w-full mt-5" variant="gray">стать партнером</Button>
            </div>

        </section>
    )
}
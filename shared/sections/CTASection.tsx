import {Container} from '@/shared/ui/Container'
import {Button} from '@/shared/ui/Button'


export const ellipse = (
    <svg width="1910" height="1604" viewBox="0 0 1910 1604" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_2413_19991)">
            <ellipse cx="955.121" cy="802" rx="654.785" ry="501.459" fill="url(#paint0_radial_2413_19991)"/>
        </g>
        <defs>
            <filter id="filter0_f_2413_19991" x="0.33606" y="0.541016" width="1909.57" height="1602.92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2413_19991"/>
            </filter>
            <radialGradient id="paint0_radial_2413_19991" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(955.121 802) rotate(90) scale(501.459 654.785)">
                <stop offset="0.00480769" stop-color="#00A772"/>
                <stop offset="0.456731" stop-color="#2B7D63"/>
                <stop offset="1" stop-color="#003323"/>
            </radialGradient>
        </defs>
    </svg>
)

export function CTASection() {
    return (
        <section className="py-16 con-container">
            <Container
                className="text-center relative bg-gradient-to-r overflow-hidden from-green-200 to-green-100 px-20 flex items-center h-[460px] bg-[#171717] rounded-[30px] max-lg:h-fit max-xl:p-8">
                <div className="absolute right-1/3 -top-1/2 max-xl:h-full object-center max-lg:right-[unset] max-lg:left-[25%] max-lg:top-[unset] max-lg:bottom-[100%]  max-xl:left-[unset] max-xl:right-0">
                    {ellipse}
                </div>
                <div className="flex flex-row justify-between w-full relative z-[1] max-lg:flex-col">
                    <div className="flex flex-col items-start gap-5 self-center max-md:w-full">
                        <h2 className="text-[48px] leading-[100%] font-bold text-white text-start mb-4 max-md:text-[24px]">Станьте заёмщиком <br/>или
                            инвестором прямо сейчас</h2>
                        <div className="flex justify-center gap-5 max-md:flex-col max-md:w-full">
                            <Button variant="white" className="max-md:w-full">Стать инвестором</Button>
                            <Button variant="white" className="max-md:w-full">Стать заёмщиком</Button>
                        </div>
                    </div>
                    <img src="/img/cards.png" className="max-w-[442px]  object-contain max-xl:self-center max-xl:mt-6 max-md:w-full max-md:max-w-[281px]" alt="cards"></img>
                </div>
            </Container>
        </section>
    )
}



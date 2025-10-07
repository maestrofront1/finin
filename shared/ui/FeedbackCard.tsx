import {Card} from './Card'

export function FeedbackCard({name, text, rating = 5}: { name: string; text: string; rating?: number }) {
    return (
        <Card className="w-full flex flex-col justify-between h-[354px] p-10 border-none bg-gray-100">
            <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-yellow-500 flex flex-row gap-0.5 text-[18px]"
                         aria-label={`Рейтинг ${rating} из 5`}>
                        {Array.from(Array(rating)).map((_, i) => (
                            <svg key={i} width="18" height="17" viewBox="0 0 18 17" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                    fill="currentColor"/>
                            </svg>
                        ))}
                    </div>
                    <p className="text-[18px] text-gray-300">
                        30 июля 2024
                    </p>
                </div>
                <div className="flex items-center flex-row gap-3">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="38" height="38" rx="19" fill="#F8604A"/>
                        <path
                            d="M10.8203 28.4388L15.0952 21.6842C13.8944 21.2934 12.9658 20.6477 12.3093 19.7471C11.6529 18.8294 11.3247 17.657 11.3247 16.2296C11.3247 15.125 11.5008 14.1989 11.853 13.4513C12.2213 12.7036 12.7176 12.1088 13.342 11.667C13.9665 11.2082 14.687 10.8854 15.5035 10.6984C16.3361 10.4945 17.2167 10.3926 18.1453 10.3926H24.7979V28.4388H21.3635V22.296H18.5056L14.8791 28.4388H10.8203ZM18.1693 19.0334H21.3635V13.7826H17.8811C17.2407 13.7826 16.6883 13.8676 16.224 14.0375C15.7597 14.2074 15.3914 14.4793 15.1193 14.8532C14.8631 15.227 14.735 15.7283 14.735 16.357C14.735 17.0707 14.9031 17.623 15.2393 18.0138C15.5756 18.4046 16.0079 18.6765 16.5362 18.8294C17.0806 18.9654 17.625 19.0334 18.1693 19.0334Z"
                            fill="white"/>
                    </svg>
                    <p className="text-[24px] font-bold">{name}</p>
                </div>
                {/* Fixed text ellipsis */}
                <p className="text-[18px] font-[400] h-full overflow-hidden text-ellipsis line-clamp-[5]">
                    {text}
                </p>
            </div>
            <a className="flex flex-row items-center gap-3.5 hover:text-gray-400 text-gray-300 cursor-pointer">
                <span className="text-[18px]">Посмотреть отзыв</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18 16.1234C18 16.7306 17.5078 17.2227 16.9007 17.2227C16.2935 17.2227 15.8014 16.7306 15.8014 16.1234V3.75316L2.33177 17.2227C1.9025 17.652 1.20652 17.652 0.777256 17.2227C0.34799 16.7935 0.34799 16.0975 0.777257 15.6682L14.2468 2.19865H1.87658C1.26944 2.19865 0.777256 1.70646 0.777256 1.09932C0.777256 0.492184 1.26944 0 1.87658 0H16.9007L18 1.09932V16.1234Z"
                        fill="currentColor"/>
                </svg>
            </a>
        </Card>
    )
}
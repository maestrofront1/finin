'use client'

import Link from 'next/link'

const Check = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <polyline points="20 6 9 17 4 12"/>
    </svg>
)

export type LoanCardProps = {
    icon?: React.ReactNode // можно svg сюда передавать
    title: string
    type?: "default" | "secondary"
    goals: string[]
    conditions: { label: string; value: string }[]
    href: string
}

export default function LoanCard({
                                     icon,
                                     title,
                                     goals,
                                     type = "default",
                                     conditions,
                                     href,
                                 }: LoanCardProps) {
    return (
        <div
            className="rounded-2xl bg-gray-50 p-6 max-w-[508px] md:p-8 flex flex-col h-full shadow-sm hover:shadow-md transition">
            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-4">
                {icon && (
                    <div className="h-9 w-9 flex items-center justify-center rounded-lg text-white">
                        {icon}
                    </div>
                )}
                <h3 className="text-gray-400 font-bold text-[32px] md:text-xl">
                    {title}
                </h3>
            </div>

            {/* Список целей */}
            <p className="text-gray-600 mb-2 font-medium">Цели:</p>
            <ul className="mb-5 space-y-2">
                {goals.map((goal, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0"/>
                        <span>{goal}</span>
                    </li>
                ))}
            </ul>

            {/* Условия */}

            <div className="mb-6 space-y-2">
                {conditions.map((c, i) => (
                    <>
                        {type === "secondary" ? (
                            <div
                                key={i}
                                className="px-[10px] py-1.5 bg-white border shadow-xl w-fit rounded-full"
                            >
                                <span className="text-gray-400 font-medium">{c.label} {c.value}</span>
                            </div>
                        ) : (
                            <div
                                key={i}
                                className="flex justify-between items-center border-b border-gray-200/70 py-1 text-sm md:text-[15px]"
                            >
                                <span className="text-gray-500">{c.label}</span>
                                <span className="text-gray-700 font-medium">{c.value}</span>
                            </div>
                        )}
                    </>
                ))}
            </div>
            {/* Кнопка */}
            <Link
                href={href as any}
                className={`mt-auto w-fit inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white px-5 h-[44px] md:h-[48px] font-medium hover:text-white transition hover:bg-emerald-500/90 active:scale-[0.98] ${type === "secondary" ? "self-end" : 'self-center'}`}
            >
                подробнее
                <svg width="12" height="14" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.2262 0.313112C1.60543 -0.0882387 2.23782 -0.106084 2.63929 0.273073L11.6393 8.77307C11.8392 8.96197 11.9528 9.22459 11.9528 9.49964C11.9528 9.77468 11.8392 10.0373 11.6393 10.2262L2.63929 18.7262C2.23782 19.1054 1.60543 19.0875 1.2262 18.6862C0.847041 18.2847 0.864886 17.6523 1.26624 17.2731L9.49671 9.49964L1.26624 1.7262C0.864887 1.34697 0.847042 0.714573 1.2262 0.313112Z" fill="white"/>
                </svg>

            </Link>
        </div>
    )
}

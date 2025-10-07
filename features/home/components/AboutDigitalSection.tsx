"use client"

import React, {useEffect, useRef, useState} from "react"
import {Button} from "@shared/ui/Button";
import {cn} from "@shared/lib/utils";

const stats = [
    {label: "Выдано займов", value: 1710000000},
    {label: "Уставный капитал", value: 33600000},
    {label: "Чистая прибыль", value: 51752000},
    {label: "Средняя ставка", value: 36, suffix: "%"},
    {label: "Выручка", value: 58048000},
    {label: "Активы", value: 156519000},
]

const graphData = [
    {year: 2019, value: 10_000_000, rate: 31, fund: 1_300_000},
    {year: 2020, value: 30_000_000, rate: 31, fund: 3_900_000},
    {year: 2021, value: 45_000_000, rate: 31, fund: 5_850_000},
    {year: 2022, value: 90_000_000, rate: 31, fund: 11_700_000},
    {year: 2023, value: 596_488_000, rate: 31, fund: 76_891_428},
    {year: 2025, value: 1_710_000_000, rate: 31, fund: 222_300_000},
]

function formatCurrency(v: number): string {
    return v.toLocaleString("ru-RU") + " ₽"
}

function formatCurrencyShort(v: number): string {
    if (v >= 1000000000) {
        return (v / 1000000000).toFixed(0) + " млрд ₽"
    } else if (v >= 1000000) {
        return (v / 1000000).toFixed(0) + " млн ₽"
    }
    return v.toLocaleString("ru-RU") + " ₽"
}

export default function StatsSection({title, className}: { title?: string, className?: string }) {
    const chartContainerRef = useRef<HTMLDivElement>(null)
    const [chartWidth, setChartWidth] = useState<number>(600)
    const [chartHeight, setChartHeight] = useState(400);
    const [chartPadding, setChartPadding] = useState(40);
    const [isMobile, setIsMobile] = useState(false);

    const svgWidth = Math.max(chartWidth, chartPadding * 2 + 1);
    const maxVal = Math.max(...graphData.map(d => d.value))
    const minVal = 0
    const range = maxVal - minVal

    useEffect(() => {
        const handleResize = () => {
            if (!chartContainerRef.current) return;

            const mobile = window.innerWidth < 1024;
            const currentWidth = chartContainerRef.current.clientWidth;

            setIsMobile(mobile);
            setChartWidth(currentWidth);
            setChartHeight(mobile ? currentWidth * 1.4 : 400);
            setChartPadding(mobile ? 20 : 40);
        };

        handleResize();
        const observer = new ResizeObserver(handleResize);
        observer.observe(chartContainerRef.current);
        return () => observer.disconnect();
    }, []);

    const points = graphData.map((d, i) => {
        const x = chartPadding + ((svgWidth - chartPadding * 2) * i) / (graphData.length - 1)
        const y = chartHeight - chartPadding - ((d.value - minVal) / range) * (chartHeight - chartPadding * 2)
        return {...d, x, y}
    })

    const createSmoothPath = (points: Array<{ x: number; y: number }>): string => {
        if (points.length < 2) return "";
        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const cp1x = prev.x + (curr.x - prev.x) / 2;
            const cp1y = prev.y;
            const cp2x = curr.x - (curr.x - prev.x) / 2;
            const cp2y = curr.y;
            path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
        }
        return path;
    }

    const smoothPath = createSmoothPath(points);
    const [hover, setHover] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);
    const [mousePx, setMousePx] = useState<{ x: number; y: number } | null>(null);
    const hoveredPoint = hover !== null ? points[hover] : null;

    return (
        <div className={cn("con-container mx-auto py-12 px-4", className)}>
            {title && (
                <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">{title}</h2>
            )}

            {/* REFACTORED: Grid by default, stacks to flex-col on smaller screens */}
            <div className="grid grid-cols-12 gap-8 items-start max-lg:flex max-lg:flex-col-reverse">
                {/* REFACTORED: col-span is now the default */}
                <div className="col-span-5 space-y-6 max-md:w-full">
                    <div className="grid grid-cols-2 gap-4 max-md:w-full">
                        {stats.map((s) => (
                            <div key={s.label} className="px-3 py-[18px] bg-gray-100 rounded-lg">
                                <div className="text-[24px] text-gray-400 max-md:text-[14px] mb-2">{s.label}</div>
                                <div className="text-[28px] font-bold text-green-500 max-md:text-[18px]">
                                    {s.suffix ? s.value + s.suffix : formatCurrencyShort(s.value)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3 pt-4">
                        <a href="#" className="flex items-center gap-2 text-gray-400 hover:underline">
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 16.5H11M6 1.5V13.1667M6 13.1667L10.1667 9M6 13.1667L1.83333 9"
                                      stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-[18px] font-medium text-gray-400 max-md:text-[16px]">Статистика Финин 2025</span></a>
                        <a href="#" className="flex items-center gap-2 text-gray-400 hover:underline">
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 16.5H11M6 1.5V13.1667M6 13.1667L10.1667 9M6 13.1667L1.83333 9"
                                      stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-[18px] font-medium text-gray-400 max-md:text-[16px]">Годовая финансовая отчетность 2023</span></a>
                        <a href="#" className="flex items-center gap-2 text-gray-400 hover:underline">
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 16.5H11M6 1.5V13.1667M6 13.1667L10.1667 9M6 13.1667L1.83333 9"
                                      stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-[18px] font-medium text-gray-400 max-md:text-[16px]">Годовая финансовая отчетность 2024</span></a>
                    </div>
                    <Button variant="green" className="max-md:w-full" withArrow>больше о нас</Button>
                </div>

                {/* REFACTORED: col-span and padding are now desktop-first */}
                <div ref={chartContainerRef}
                     className="col-span-7 relative bg-white border border-gray-200 rounded-lg p-6 max-lg:p-4 w-full">
                    <svg ref={svgRef} width="100%" height={chartHeight} viewBox={`0 0 ${svgWidth} ${chartHeight}`}
                         className="block">
                        {[0, 1, 2, 3, 4].map((i) => {
                            const y = chartPadding + ((chartHeight - chartPadding * 2) / 4) * i
                            return <line key={i} x1={chartPadding} x2={svgWidth - chartPadding} y1={y} y2={y}
                                         stroke="#f3f4f6" strokeWidth="1"/>
                        })}
                        <path d={smoothPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        {points.map((p, i) => (
                            <g key={i}>
                                <circle cx={p.x} cy={p.y} r={hover === i ? 7 : 4} fill="#10b981" stroke="white"
                                        strokeWidth="2" className="transition-all duration-150"/>
                            </g>
                        ))}
                        <rect x={chartPadding} y={chartPadding} width={svgWidth - chartPadding * 2}
                              height={chartHeight - chartPadding * 2} fill="transparent" className="cursor-pointer"
                              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => {
                            setIsHovering(false);
                            setHover(null);
                            setMousePx(null);
                        }} onMouseMove={(e) => {
                            const rect = chartContainerRef.current!.getBoundingClientRect();
                            const localX = e.clientX - rect.left;
                            const localY = e.clientY - rect.top;
                            setMousePx({x: localX, y: localY});
                            const svgX = (localX / rect.width) * svgWidth;
                            let nearest = 0;
                            let best = Math.abs(points[0].x - svgX);
                            for (let i = 1; i < points.length; i++) {
                                const d = Math.abs(points[i].x - svgX);
                                if (d < best) {
                                    best = d;
                                    nearest = i;
                                }
                            }
                            setHover(nearest);
                        }}/>
                        {hoveredPoint && <line x1={hoveredPoint.x} x2={hoveredPoint.x} y1={chartPadding}
                                               y2={chartHeight - chartPadding} stroke="#D1D5DB" strokeWidth="1"
                                               strokeDasharray="4 4"/>}
                        {points.map((p, i) => {
                            if (isMobile && i % 2 !== 0) return null;
                            return <text key={i} x={p.x} y={chartHeight - 5} textAnchor="middle"
                                         className="text-xs fill-gray-500">{p.year}</text>
                        })}
                    </svg>

                    {/* REFACTORED: flex-row is default, stacks to flex-col on smaller screens */}
                    <div
                        className="mt-8 flex flex-row items-center justify-center text-left gap-8 lg:gap-16 text-gray-600 text-sm max-md:hidden">
                        <div>Инвесторов на платформе <br className="sm:hidden"/><span
                            className="font-semibold text-gray-800">8425</span></div>
                        <div>Заемщиков на платформе <br className="sm:hidden"/><span
                            className="font-semibold text-gray-800">2403</span></div>
                        <div>Выдано займов на сумму, <br/>более <span className="font-semibold text-gray-800">1720+ млн. ₽</span>
                        </div>
                    </div>

                    {hoveredPoint && (
                        <div
                            className="absolute bg-white shadow-lg border rounded-lg p-3 pointer-events-none z-10 w-full max-w-[280px]"
                            style={{
                                left: Math.min((chartContainerRef.current?.clientWidth ?? svgWidth) - 288, Math.max(8, (mousePx?.x ?? hoveredPoint.x) + 12)),
                                top: Math.min((chartContainerRef.current?.clientHeight ?? chartHeight) - 148, Math.max(8, (mousePx?.y ?? hoveredPoint.y) - 148)),
                                opacity: isHovering ? 1 : 0,
                                transition: 'opacity 0.2s, transform 0.2s',
                                transform: `translateY(${isHovering ? 0 : 4}px)`
                            }}>
                            <div className="text-sm text-gray-500 mb-1">{hoveredPoint.year} г.</div>
                            <div
                                className="text-lg font-semibold text-gray-900 mb-1">{formatCurrency(hoveredPoint.value)}</div>
                            {hoveredPoint.rate &&
                                <div className="text-sm text-gray-600">Ставка: {hoveredPoint.rate}%</div>}
                            {hoveredPoint.fund && <div className="text-sm text-gray-600">Общий инвестиционный
                                фонд: {formatCurrency(hoveredPoint.fund)}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
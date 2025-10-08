"use client"

import Image from "next/image";
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Card} from '@shared/ui/Card'
import {Button} from '@shared/ui/Button'
import {Muted} from '@shared/ui/Typography'
import {Input} from '@shared/ui/Input' // Re-added the import for your custom component
import Dates from "public/img/invest-in-finin/dates.png"
import Pic1 from "public/img/modules/pic-4.png"

// --- Helper functions ---
function createLinePath(points: { x: number; y: number }[]) {
    if (points.length === 0) return "";
    return points.slice(1).reduce((path, point) => `${path} L ${point.x} ${point.y}`, `M ${points[0].x} ${points[0].y}`);
}

function formatCurrency(v: number) {
    return v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
}

function formatAxisLabel(value: number): string {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M ₽`;
    }
    if (value >= 1000) {
        return `${Math.round(value / 1000)}k ₽`;
    }
    return `${Math.round(value)} ₽`;
}

// --- Component ---
export function InvestCalculatorSection() {
    // --- State and Constants ---
    const [investmentAmount, setInvestmentAmount] = useState<number>(9920);
    const [activeYear, setActiveYear] = useState<number | null>(null);
    const [isTooltipPinned, setIsTooltipPinned] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const CURRENT_SHARE_PRICE = 3500;
    const ANNUAL_GROWTH_RATE = 0.40; // 40%
    const DIVIDEND_RATE = 0.15; // 15%
    const YEARS = 3;
    const MAX_INVESTMENT_AMOUNT = 1000000;

    // --- Memoized calculation logic ---
    const calculateProjection = (amount: number) => {
        const numberOfShares = amount / CURRENT_SHARE_PRICE;
        const series = Array.from({length: YEARS + 1}, (_, i) => {
            const year = i;
            const sharePrice = CURRENT_SHARE_PRICE * Math.pow(1 + ANNUAL_GROWTH_RATE, year);
            const portfolioValue = numberOfShares * sharePrice;
            const dividends = portfolioValue * DIVIDEND_RATE;
            const gain = portfolioValue - amount;
            return {year, sharePrice, portfolioValue, dividends, gain};
        });
        return {numberOfShares, series};
    };

    const projectionData = useMemo(() => calculateProjection(investmentAmount), [investmentAmount]);
    const maxProjectionData = useMemo(() => calculateProjection(MAX_INVESTMENT_AMOUNT), []);


    // --- Chart rendering logic ---
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState(1000);
    const [chartHeight, setChartHeight] = useState(400);
    const PADDING = {top: 20, right: 20, bottom: 40, left: 60};

    useEffect(() => {
        const handleResize = () => {
            if (!chartContainerRef.current) return;
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            const newWidth = chartContainerRef.current.clientWidth;
            setChartWidth(newWidth);
            // Changed multiplier from 0.8 to 1.2 to make the chart taller on mobile
            setChartHeight(mobile ? newWidth * 1.2 : 400);
        };

        handleResize();
        const observer = new ResizeObserver(handleResize);
        if (chartContainerRef.current) observer.observe(chartContainerRef.current);
        return () => observer.disconnect();
    }, []);

    // --- Chart Scale & Point Calculation (Based on Gain) ---
    const yMin = 0;
    const yMax = maxProjectionData.series[YEARS].gain; // Y-axis scales to max possible GAIN
    const yRange = Math.max(yMax - yMin, 1);

    const dataToPoints = (series: typeof projectionData.series) => {
        return series.map(d => {
            const x = PADDING.left + (d.year / YEARS) * (chartWidth - PADDING.left - PADDING.right);
            // Plot GAIN, not absolute value. This makes the line always start at y=0.
            const y = (chartHeight - PADDING.bottom) - ((d.gain - yMin) / yRange) * (chartHeight - PADDING.top - PADDING.bottom);
            return {x, y};
        });
    };
    const points = dataToPoints(projectionData.series);

    // --- Tooltip Positioning & Interaction Logic ---
    const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number }>({left: 0, top: 0});

    useEffect(() => {
        if (isMobile && isTooltipPinned && activeYear !== null && tooltipRef.current && chartContainerRef.current) {
            const point = points[activeYear];
            const tooltipW = tooltipRef.current.offsetWidth;
            const tooltipH = tooltipRef.current.offsetHeight;
            const containerWidth = chartContainerRef.current.clientWidth;
            let left = point.x - tooltipW / 2;
            left = Math.max(8, Math.min(left, containerWidth - tooltipW - 8));
            let top = point.y - tooltipH - 20;
            if (top < 8) top = point.y + 20;
            setTooltipPos({left, top});
        }
    }, [activeYear, isTooltipPinned, isMobile, points, chartWidth]);

    useEffect(() => {
        if (!isTooltipPinned) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (chartContainerRef.current && !chartContainerRef.current.contains(event.target as Node)) {
                setIsTooltipPinned(false);
                setActiveYear(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isTooltipPinned]);

    const updateTooltipPosFromEvent = (e: React.PointerEvent<SVGRectElement>) => {
        const container = chartContainerRef.current;
        if (!container || !tooltipRef.current) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const tooltipW = tooltipRef.current.offsetWidth;
        const gap = 20;
        let left = x + gap;
        if (left + tooltipW > rect.width) left = x - tooltipW - gap;
        setTooltipPos({left: Math.max(0, left), top: y - 40});
    };

    const handlePointerEnter = (e: React.PointerEvent<SVGRectElement>, yearIndex: number) => {
        if (!isTooltipPinned) {
            setActiveYear(yearIndex);
            updateTooltipPosFromEvent(e);
        }
    };
    const handlePointerMove = (e: React.PointerEvent<SVGRectElement>) => {
        if (!isTooltipPinned) {
            updateTooltipPosFromEvent(e);
        }
    };
    const handlePointerLeave = () => {
        if (!isTooltipPinned) {
            setActiveYear(null);
        }
    };
    const handlePointerDown = (yearIndex: number) => {
        if (isMobile) {
            if (activeYear === yearIndex && isTooltipPinned) {
                setIsTooltipPinned(false);
                setActiveYear(null);
            } else {
                setIsTooltipPinned(true);
                setActiveYear(yearIndex);
            }
        }
    };

    return (
        <section className="con-container py-12">
            <div className="flex items-start gap-5 ">
                <div>
                    <div className="flex flex-col gap-5 max-lg:flex-col max-lg:items-center mb-[80px]">

                        <div className="flex flex-col gap-8 mb-[20px]">
                            <h1 className="text-gray-900 font-semibold text-[48px]">Инвестируйте в акции Финин</h1>
                            <span className="text-gray-500 font-bold text-[28px]">Рост стоимости акций</span>
                        </div>
                        <div className="flex flex-col gap-5">
                            <Image  src={Dates} alt={"dates"}/>
                            <p className="leading-10 text-[28px] text-gray-500">Акции Финин продемонстрировали стабильный рост с 2023 года, увеличившись более чем в три раза.<br/>
                                Это подтверждает эффективность бизнес-модели и доверие инвесторов.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-start max-lg:flex max-lg:flex-col-reverse">

                        <div>
                            <h1 className="text-[48px] text-gray-900 font-semibold">Узнайте сумму предполагаемых<br/> дивидендов и рост стоимости акции</h1>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="">
                                <div className="grid grid-cols-2 items-center align-center mb-6">
                                    <Input
                                        type="range-number"
                                        label="сумма инвестиций"
                                        min={1000}
                                        max={MAX_INVESTMENT_AMOUNT}
                                        step={100}
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(Number(e.target.value || 0))}
                                    />
                                    <Input
                                        type="range-number"
                                        label="вы покупаете"
                                        min={10}
                                        max={1000000}
                                        step={10}
                                        value={projectionData.numberOfShares}
                                        onChange={(e) => setInvestmentAmount(Number(e.target.value || 0))}
                                    />

                                </div>

                                <div ref={chartContainerRef} className="relative w-full">
                                    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                                         className="block overflow-visible">
                                        {Array.from({length: 6}).map((_, i) => {
                                            const y = PADDING.top + i * (chartHeight - PADDING.top - PADDING.bottom) / 5;
                                            const gainValue = yMax - i * (yRange / 5);
                                            const labelValue = gainValue + investmentAmount;
                                            return (<g key={i}>
                                                <line x1={PADDING.left} x2={chartWidth - PADDING.right} y1={y} y2={y}
                                                      stroke="#E5E7EB" strokeWidth="1"/>
                                                <text x={PADDING.left - 8} y={y + 4} textAnchor="end"
                                                      className="text-xs fill-gray-400">{formatAxisLabel(labelValue)}</text>
                                            </g>);
                                        })}
                                        {Array.from({length: YEARS}).map((_, i) => {
                                            const year = i + 1;
                                            const x = PADDING.left + (year / YEARS) * (chartWidth - PADDING.left - PADDING.right);
                                            return (
                                                <text key={year} x={x} y={chartHeight - PADDING.bottom + 20} textAnchor="middle"
                                                      className="text-xs fill-gray-400">{year} {year === 1 ? 'год' : 'года'}</text>);
                                        })}
                                        <path d={createLinePath(points)} fill="none" stroke="#10B981" strokeWidth="3"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                        {Array.from({length: YEARS}).map((_, i) => {
                                            const yearIndex = i + 1;
                                            const bandWidth = (chartWidth - PADDING.left - PADDING.right) / YEARS;
                                            const x = PADDING.left + i * bandWidth;
                                            return (<rect key={yearIndex} x={x} y={PADDING.top} width={bandWidth}
                                                          height={chartHeight - PADDING.top - PADDING.bottom} fill="transparent"
                                                          onPointerEnter={(e) => handlePointerEnter(e, yearIndex)}
                                                          onPointerMove={handlePointerMove}
                                                          onPointerLeave={handlePointerLeave}
                                                          onPointerDown={() => handlePointerDown(yearIndex)}
                                                          style={{touchAction: 'none'}}
                                            />);
                                        })}
                                    </svg>

                                    {activeYear !== null && (
                                        <div ref={tooltipRef}
                                             className="absolute bg-white rounded-2xl shadow-lg p-4 w-full max-w-sm pointer-events-none transition-opacity duration-200"
                                             style={{left: tooltipPos.left, top: tooltipPos.top, opacity: 1}}>
                                            <div
                                                className="text-sm text-gray-500 mb-3 font-medium">{activeYear} {activeYear === 1 ? 'год' : 'года'}</div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {[
                                                    // {
                                                    //     label: 'вы покупаете',
                                                    //     value: `${projectionData.numberOfShares.toFixed(2)} акций`
                                                    // },
                                                    {
                                                        label: 'предпологаемая цена акции',
                                                        value: formatCurrency(projectionData.series[activeYear].sharePrice).replace('RUB', '₽')
                                                    },
                                                    {
                                                        label: 'прогноз дивидендов',
                                                        value: formatCurrency(projectionData.series[activeYear].dividends).replace('RUB', '₽')
                                                    },
                                                    {
                                                        label: 'сумма вашего портфеля',
                                                        value: formatCurrency(projectionData.series[activeYear].portfolioValue).replace('RUB', '₽')
                                                    },
                                                ].map(item => (
                                                    <div key={item.label} className="bg-gray-50 p-3 rounded-lg text-center">
                                                        <div
                                                            className="text-xs text-gray-500 leading-tight mb-1">{item.label}</div>
                                                        <div className="font-semibold text-gray-900">{item.value}</div>
                                                    </div>))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-[40px] bg-gray-100 w-full flex flex-col gap-5 items-center h-full ">
                    <div className="flex flex-col gap-5 items-center pb-[160px] pt-[49px]" >
                        <h1 className="text-gray-900 text-[28px] font-medium text-center">Цена акции 30 сентября 2025</h1>
                        <div className="flex flex-col gap-5 items-center">
                            <span className="text-gray-400 font-bold text-[64px] text-center">3500</span>
                            <p className="text-center text-green-400 font-bold text-[36px]"> 1400 (+200%)</p>
                        </div>
                        <button type="button" className="text-white bg-green-500 rounded-[10px] py-[19px] pl-[36px] pr-[36px]">купить акции</button>
                    </div>
                    <Image src={Pic1} alt={"pic1"}/>
                </div>
            </div>
        </section>
    );
}

export default InvestCalculatorSection;
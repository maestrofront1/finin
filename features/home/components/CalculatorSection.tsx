"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Card } from '@shared/ui/Card'
import { Button } from '@shared/ui/Button'
import { H2, Muted } from '@shared/ui/Typography'
import { Input } from '@shared/ui/Input'

// --- Data, Types, and Helper functions remain unchanged ---
type InvestmentType = { key: string; label: string; rate: number; color: string; strokeColor: string; }
type ChartPoint = { x: number; y: number; }
const INVESTMENT_TYPES: InvestmentType[] = [ { key: 'fintech', label: 'Финин', rate: 43, color: '#10B981', strokeColor: '#059669' }, { key: 'stocks', label: 'Акции', rate: 38, color: '#3B82F6', strokeColor: '#2563EB' }, { key: 'bonds', label: 'Облигации', rate: 32, color: '#8B5CF6', strokeColor: '#7C3AED' }, { key: 'deposits', label: 'Депозит', rate: 28, color: '#F59E0B', strokeColor: '#D97706' }, { key: 'savings', label: 'Вклады', rate: 24, color: '#EF4444', strokeColor: '#DC2626' }, { key: 'metals', label: 'Металлы', rate: 20, color: '#6B7280', strokeColor: '#4B5563' }, ]
function formatCurrency(v: number) { return v.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }) }
function calculateSeries(initial: number, months: number, monthly: number, annualPercent: number) { const arr: number[] = []; const r = annualPercent / 100 / 12; let balance = initial; for (let m = 1; m <= months; m++) { balance += balance * r; balance += monthly; arr.push(Number(balance.toFixed(2))); } return arr; }
function createLinePath(points: ChartPoint[]) { if (points.length === 0) return ""; return points.slice(1).reduce((path, point) => `${path} L ${point.x} ${point.y}`, `M ${points[0].x} ${points[0].y}`); }
function formatAxisLabel(value: number): string { if (value >= 1_000_000) { return `${(value / 1_000_000).toFixed(1)}M`; } if (value >= 1_000) { return `${Math.round(value / 1_000)}k`; } return value.toString(); }

export function CalculatorSection() {
    // --- State and Memos for calculator logic remain unchanged ---
    const [initial, setInitial] = useState<number>(1000);
    const [months, setMonths] = useState<number>(12);
    const [monthly, setMonthly] = useState<number>(1000);
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(['fintech', 'stocks', 'bonds']));
    const RISK_OPTIONS = [{ key: 'safe', label: 'Без риска', rate: 28 }, { key: 'base', label: 'Базовая', rate: 34 }, { key: 'aggressive', label: 'Агрессивная', rate: 43 }] as const;
    type RiskKey = typeof RISK_OPTIONS[number]['key'];
    const [risk, setRisk] = useState<RiskKey>('aggressive');
    const riskRate = useMemo(() => RISK_OPTIONS.find(r => r.key === risk)!.rate, [risk]);
    const allSeries = useMemo(() => { return INVESTMENT_TYPES.map(type => { const rate = type.key === 'fintech' ? riskRate : type.rate; return { ...type, rate: rate, series: calculateSeries(initial, months, monthly, rate) }; }); }, [initial, months, monthly, riskRate]);
    const fininSeries = allSeries.find(s => s.key === 'fintech');
    const fininFinal = fininSeries?.series[fininSeries.series.length - 1] ?? 0;
    const totalInvested = initial + monthly * months;
    const fininGain = Math.max(fininFinal - totalInvested, 0);

    // --- START OF REFACTORED GRAPH LOGIC ---

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState(1000);
    const [chartHeight, setChartHeight] = useState(400);
    const [chartPadding, setChartPadding] = useState(60);
    const [isMobile, setIsMobile] = useState(false);

    const svgWidth = Math.max(chartWidth, chartPadding * 2 + 1);

    useEffect(() => {
        const handleResize = () => {
            if (!chartContainerRef.current) return;

            const mobile = window.innerWidth < 1024;
            const currentWidth = chartContainerRef.current.clientWidth;

            setIsMobile(mobile);
            setChartWidth(currentWidth);

            // CHANGE 1: Increase the height multiplier for a taller graph on mobile
            const newHeight = mobile ? currentWidth * 1.8 : 400;
            setChartHeight(newHeight);

            // CHANGE 2: Reduce the padding significantly on mobile
            setChartPadding(mobile ? 25 : 60);
        };

        handleResize();

        const observer = new ResizeObserver(handleResize);
        observer.observe(chartContainerRef.current);

        return () => observer.disconnect();
    }, []);

    // --- END OF REFACTORED GRAPH LOGIC ---

    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number }>({ left: chartPadding, top: 40 });
    const updateTooltipPosFromEvent = (e: React.MouseEvent<Element, MouseEvent>) => {
        const container = chartContainerRef.current; if (!container) return; const rect = container.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; const tooltipW = tooltipRef.current?.offsetWidth ?? 300; const tooltipH = tooltipRef.current?.offsetHeight ?? 140; const maxLeft = Math.max(8, rect.width - tooltipW - 8); const maxTop = Math.max(8, rect.height - tooltipH - 8); const gap = 12; const preferredTop = y - tooltipH - gap; const top = preferredTop >= 8 ? Math.min(preferredTop, maxTop) : Math.min(y + gap, maxTop); let left = x + gap; if (left > maxLeft) { left = Math.max(8, x - tooltipW - gap) } left = Math.min(Math.max(left, 8), maxLeft); setTooltipPos({ left, top });
    };

    const maxVal = Math.max(...allSeries.map(s => Math.max(...s.series)));
    const minVal = Math.min(initial, ...allSeries.map(s => Math.min(...s.series)));
    const valueRange = Math.max(maxVal - minVal, 1);
    const safeMonths = Math.max(months, 1);
    const monthLabelStep = Math.max(1, Math.ceil(safeMonths / (isMobile ? 6 : 12)));

    const toggleType = (key: string) => { setSelectedTypes(prev => { const newSet = new Set(prev); if (newSet.has(key)) { newSet.delete(key); } else { newSet.add(key); } return newSet; }); };
    useEffect(() => { setHoverIndex(prev => (prev !== null && prev >= months ? null : prev)); }, [months]);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [isTooltipHover, setIsTooltipHover] = useState(false);

    return (
        <section className="con-container py-12">
            <div className="text-center mb-14">
                <H2 className="text-[48px] font-semibold mb-4 leading-normal">
                    Узнайте сумму предполагаемого дохода
                </H2>
            </div>

            <div className="grid grid-cols-10 gap-8 items-start max-lg:flex-col max-lg:flex">
                <div className="col-span-2 max-lg:w-full">
                    {/* UI Controls - Unchanged */}
                    <div className="space-y-6 max-lg:w-full">
                        <Input type="range-number" label="первоначальная сумма вложений" min={0} max={100000} step={1000} value={initial} onChange={(e) => setInitial(Number(e.target.value || 0))} />
                        <Input type="range-number" label="срок инвестирования (месяцев)" min={1} max={60} step={1} value={months} onChange={(e) => setMonths(Number(e.target.value || 0))} />
                        <Input type="range-number" label="сумма ежемесячного пополнения" min={0} max={100000} step={1000} value={monthly} onChange={(e) => setMonthly(Number(e.target.value || 0))} />
                        <div className="mt-4">
                            <label className="block mb-2 text-sm text-gray-500 uppercase tracking-wide">Профиль риска</label>
                            <div className="flex flex-col space-y-2">
                                {RISK_OPTIONS.map((opt) => (
                                    <button key={opt.key} type="button" onClick={() => setRisk(opt.key)} className={`h-[48px] text-left w-full px-4 py-3 rounded-xl transition border ${risk === opt.key ? "border-green-500 bg-white font-semibold text-gray-900" : "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-50"}`}>
                                        {opt.label} {opt.rate}%
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 space-y-2 max-lg:hidden">
                            <Button variant="green" className="w-full">инвестировать</Button>
                            <Muted className="pt-[48px]">* Годовая доходность рассчитана на основе текущих ставок по стратегиям, исходя из срока займа в 1 год, без учета дефолтов. Реальная доходность зависит от сроков заключенных договоров займа и исполнения заемщиками обязательств по договорам займа.</Muted>
                        </div>
                    </div>
                </div>

                <div className="col-span-8 relative">
                    {/* Desktop Stat Cards - Unchanged */}
                    <div className="grid grid-cols-2 gap-4 mb-6 max-md:hidden">
                        <Card className="px-[24px] py-[20px] border-none bg-gray-100">
                            <div className="block mb-2 text-sm text-gray-500 uppercase tracking-wide">Итоговая сумма (Финин)</div>
                            <div className="text-gray-800 text-[32px] font-semibold leading-9">{formatCurrency(fininFinal).replace('RUB', '₽')}</div>
                        </Card>
                        <Card className="px-[24px] py-[20px] border-none bg-gray-100">
                            <div className="block mb-2 text-sm text-gray-500 uppercase tracking-wide">Прирост (к взносам)</div>
                            <div className="text-gray-800 text-[32px] font-semibold leading-9">{formatCurrency(fininGain).replace('RUB', '₽')}</div>
                        </Card>
                    </div>

                    <div ref={chartContainerRef} className="relative border border-gray-200 rounded-2xl p-4 w-full">
                        <svg width="100%" height={chartHeight} viewBox={`0 0 ${svgWidth} ${chartHeight}`} className="block overflow-visible">
                            {[0, 1, 2, 3, 4, 5].map((i) => {
                                const y = chartPadding + ((chartHeight - chartPadding * 2) / 5) * i;
                                return (
                                    <g key={i}>
                                        <line x1={chartPadding} x2={svgWidth - chartPadding} y1={y} y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray={i === 5 ? "none" : "3 3"} />
                                        {i < 5 && (
                                            <text x={chartPadding - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-400">
                                                {isMobile ? formatAxisLabel(maxVal - (valueRange / 5) * i) : Math.round(maxVal - (valueRange / 5) * i).toLocaleString('ru-RU') + ' ₽'}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                            {Array.from({ length: months }, (_, i) => {
                                const x = chartPadding + ((svgWidth - chartPadding * 2) * (i + 1)) / safeMonths;
                                if ((i + 1) % monthLabelStep !== 0 && i !== months - 1) return null;
                                return (
                                    <text key={`month-${i}`} x={x} y={chartHeight - chartPadding + 24} textAnchor="middle" className="text-xs fill-gray-400 select-none">
                                        {i + 1} мес.
                                    </text>
                                );
                            })}
                            {allSeries.map((type) => {
                                if (!selectedTypes.has(type.key)) return null;
                                const points = type.series.map((v, i) => {
                                    const x = chartPadding + ((svgWidth - chartPadding * 2) * (i + 1)) / safeMonths;
                                    const y = chartHeight - chartPadding - ((v - minVal) / valueRange) * (chartHeight - chartPadding * 2);
                                    return { x, y };
                                });
                                return <g key={type.key}><path d={createLinePath(points)} fill="none" stroke={type.strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></g>;
                            })}
                            {Array.from({ length: months }, (_, i) => {
                                const x = chartPadding + ((svgWidth - chartPadding * 2) * (i + 1)) / safeMonths;
                                return <rect key={i} x={x - (svgWidth - chartPadding * 2) / safeMonths / 2} y={chartPadding} width={(svgWidth - chartPadding * 2) / safeMonths} height={chartHeight - chartPadding * 2} fill="transparent" onMouseEnter={(e) => { setHoverIndex(i); updateTooltipPosFromEvent(e); }} onMouseMove={updateTooltipPosFromEvent} onMouseLeave={() => { if (!isTooltipHover) setHoverIndex(null); }} />;
                            })}
                        </svg>

                        {hoverIndex !== null && hoverIndex < months && (
                            <div ref={tooltipRef} onMouseEnter={() => setIsTooltipHover(true)} onMouseLeave={() => { setIsTooltipHover(false); setHoverIndex(null); }} className="absolute bg-white rounded-2xl shadow-lg p-4 w-full max-w-[300px] sm:max-w-[500px] text-xs sm:text-base" style={{ top: tooltipPos.top, left: tooltipPos.left }}>
                                <div className="text-gray-500 mb-2">{hoverIndex + 1} месяц</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{allSeries.filter((entry) => selectedTypes.has(entry.key)).map((entry) => (<div key={entry.key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"><div className="flex items-center space-x-2"><span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span><span className="text-sm text-gray-800">{entry.label}</span></div><div className="text-right"><div className="text-xs text-gray-500">{entry.rate}% годовых</div><div className="text-sm font-medium text-gray-900">{formatCurrency(entry.series[hoverIndex]).replace('RUB', '₽')}</div></div></div>))}</div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {INVESTMENT_TYPES.map((type) => (
                            <button key={type.key} onClick={() => toggleType(type.key)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${selectedTypes.has(type.key) ? "bg-white shadow-md border-gray-300" : "bg-gray-50 border-gray-200 opacity-60 hover:opacity-80"}`}>
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} /><span className="text-sm font-medium">{type.key === 'fintech' ? 'Финин' : type.label}</span><span className="text-xs text-gray-500">{type.key === 'fintech' ? riskRate : type.rate}%</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5 hidden max-lg:flex flex-col gap-5">
                <Card className="px-[24px] py-[20px] border-none bg-gray-100">
                    <div className="block mb-2 text-sm text-gray-500 uppercase tracking-wide">Итоговая сумма (Финин)</div>
                    <div className="text-gray-800 text-[32px] font-semibold leading-9">{formatCurrency(fininFinal).replace('RUB', '₽')}</div>
                </Card>
                <Card className="px-[24px] py-[20px] border-none bg-gray-100">
                    <div className="block mb-2 text-sm text-gray-500 uppercase tracking-wide">Прирост (к взносам)</div>
                    <div className="text-gray-800 text-[32px] font-semibold leading-9">{formatCurrency(fininGain).replace('RUB', '₽')}</div>
                </Card>
            </div>
            <div className="mt-5 hidden max-lg:flex max-lg:flex-col">
                <Button variant="green" className="w-full">инвестировать</Button>
                <Muted className="pt-5 ">* Годовая доходность рассчитана на основе текущих ставок по стратегиям, исходя из срока займа в 1 год, без учета дефолтов. Реальная доходность зависит от сроков заключенных договоров займа и исполнения заемщиками обязательств по договорам займа.</Muted>
            </div>
        </section>
    )
}

export default CalculatorSection
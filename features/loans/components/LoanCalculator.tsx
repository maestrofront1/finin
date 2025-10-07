'use client'

import React, {useMemo, useState} from 'react'
import {Input} from "@shared/ui/Input"; // CORRECTED IMPORT

type LoanType = 'business' | 'state' | 'realty'

type ToggleState = {
    companyOlder12m: boolean
    goodHistory: boolean
    hasGuarantor: boolean
    hasStateExp: boolean
}

type Bar = {
    month: number
    principal: number
    interest: number
    balance: number
}

const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0}).format(
        Math.max(0, Math.round(n)),
    )

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const baseRateByType: Record<LoanType, number> = {
    business: 0.18,
    state: 0.16,
    realty: 0.14,
}

export function LoanCalculator() {
    const [loanType, setLoanType] = useState<LoanType>('business')
    const [amount, setAmount] = useState(10_000_000)
    const [months, setMonths] = useState(12)
    const [revenue, setRevenue] = useState(5_000_000)
    const [toggles, setToggles] = useState<ToggleState>({
        companyOlder12m: true,
        goodHistory: false,
        hasGuarantor: false,
        hasStateExp: false,
    })
    const [hover, setHover] = useState<number | null>(null)

    const rateYear = useMemo(() => {
        let r = baseRateByType[loanType]
        r += months > 24 ? 0.04 : 0.02
        if (toggles.goodHistory) r -= 0.02
        if (toggles.hasGuarantor) r -= 0.01
        if (toggles.hasStateExp && loanType === 'state') r -= 0.015
        if (!toggles.companyOlder12m) r += 0.02
        return clamp(r, 0.07, 0.35)
    }, [loanType, months, toggles])

    const schedule = useMemo<{
        payment: number
        overpayment: number
        bars: Bar[]
    }>(() => {
        const rMonthly = rateYear / 12
        const n = clamp(months, 1, 360)
        const S = clamp(amount, 100_000, 300_000_000)

        const payment =
            rMonthly > 0 ? (S * rMonthly) / (1 - Math.pow(1 + rMonthly, -n)) : S / n

        let balance = S
        const bars: Bar[] = []
        for (let m = 1; m <= n; m++) {
            const interest = balance * rMonthly
            const principal = Math.max(0, payment - interest)
            balance = Math.max(0, balance - principal)
            bars.push({month: m, principal, interest, balance})
        }
        const overpayment = payment * n - S
        return {payment, overpayment, bars}
    }, [amount, months, rateYear])

    const approval = useMemo(() => {
        let p = 0.5
        if (revenue > amount * 2) p += 0.2
        else if (revenue > amount * 1) p += 0.1
        if (toggles.goodHistory) p += 0.15
        if (toggles.hasGuarantor) p += 0.1
        if (toggles.companyOlder12m) p += 0.1
        if (toggles.hasStateExp && loanType === 'state') p += 0.1

        const ratio = schedule.payment / Math.max(1, revenue)
        if (ratio > 0.4) p -= 0.35
        else if (ratio > 0.25) p -= 0.2

        return clamp(p, 0, 0.98)
    }, [amount, revenue, schedule.payment, toggles, loanType])

    // Max for scaling heights (use all months, no buckets)
    const maxBar = useMemo(
        () => Math.max(...schedule.bars.map(b => b.principal + b.interest), 1),
        [schedule.bars],
    )

    const card = (title: string, value: string) => (
        <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
            <div className="text-gray-300 text-[18px] mb-5">{title}</div>
            <div className="text-[36px] text-gray-400">{value}</div>
        </div>
    )

    return (
        <section className="max-w-[1484px] mx-auto px-4 my-6">
            <h2 className="text-center text-[48px] mb-10 font-semibold">Кредитный калькулятор</h2>

            {/* Tabs */}
            <div className="bg-gray-100 rounded-2xl p-2 w-fit self-center justify-self-center mb-12">
                {[
                    {id: 'business', label: 'Займ бизнесу'},
                    {id: 'state', label: 'Займ на исполнение госконтракта'},
                    {id: 'realty', label: 'Займ на недвижимость'},
                ].map(t => {
                    const id = t.id as LoanType
                    const active = loanType === id
                    return (
                        <button
                            key={id}
                            onClick={() => setLoanType(id)}
                            className={`w-fit px-3.5 py-2.5 rounded-xl cursor-pointer whitespace-nowrap ${active ? 'bg-white font-semibold text-[#008F62]' : 'bg-transparent'}`}
                        >
                            {t.label}
                        </button>
                    )
                })}
            </div>


            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 items-stretch">
                {/* Left controls */}
                <div className="flex flex-col gap-[6px]">
                    {/* amount */}
                    <Labeled>
                        <label className="text-gray-500 text-xs mb-1.5 block">желаемая сумма займа</label>
                        <NumberWithRange
                            value={amount}
                            min={100_000}
                            max={100_000_000}
                            step={100_000}
                            onChange={setAmount}
                        />
                    </Labeled>

                    {/* months */}
                    <Labeled>
                        <label className="text-gray-500 text-xs mb-1.5 block">желаемый срок займа (месяцев)</label>
                        <NumberWithRange
                            value={months}
                            min={3}
                            max={36}
                            step={1}
                            onChange={setMonths}
                        />
                    </Labeled>

                    {/* revenue */}
                    <Labeled>
                        <label className="text-gray-500 text-xs mb-1.5 block">среднемесячная выручка за последний
                            год</label>
                        <NumberWithRange
                            value={revenue}
                            min={100_000}
                            max={200_000_000}
                            step={100_000}
                            onChange={setRevenue}
                        />
                    </Labeled>

                    {/* toggles */}
                    <Toggle
                        label="Компания зарегистрирована более 12 месяцев назад"
                        checked={toggles.companyOlder12m}
                        onChange={v => setToggles(s => ({...s, companyOlder12m: v}))}
                    />
                    <Toggle
                        label="Положительная кредитная история"
                        checked={toggles.goodHistory}
                        onChange={v => setToggles(s => ({...s, goodHistory: v}))}
                    />
                    <Toggle
                        label="Есть поручитель"
                        checked={toggles.hasGuarantor}
                        onChange={v => setToggles(s => ({...s, hasGuarantor: v}))}
                    />
                    <Toggle
                        label="Есть опыт исполнения госконтрактов"
                        checked={toggles.hasStateExp}
                        onChange={v => setToggles(s => ({...s, hasStateExp: v}))}
                    />

                    {/* CTA */}
                    <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-gray-50">
                        <div className="font-bold text-xl mb-1.5">Подайте заявку на кредит</div>
                        <div className="text-gray-500 text-sm leading-tight mb-3.5">
                            И получите решение уже за 3 минуты по двум документам онлайн, на счёт в любом банке.
                        </div>
                        <button
                            className="bg-emerald-400 text-white rounded-lg py-3 px-4 font-bold cursor-pointer">подать
                            заявку на кредит
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    {/* Top stats */}
                    <div className="grid grid-cols-4 gap-3 mb-[18px]">
                        {card('ежемесячный платёж', `${formatCurrency(schedule.payment)}`)}
                        {card('процентная ставка', `~${Math.round(rateYear * 100)}%`)}
                        {card('вероятность одобрения', `${Math.round(approval * 100)} %`)}
                        {card('общая сумма переплат', `${formatCurrency(schedule.overpayment)}`)}
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 relative min-h-[360px]">
                        <div
                            className="flex flex-row items-end gap-[6px] h-full px-2 relative overflow-x-auto"
                        >
                            {schedule.bars.map(b => {
                                const total = b.principal + b.interest
                                const h = (total / maxBar) * 640
                                const greenH = (b.principal / Math.max(1, total)) * h
                                const grayH = h - greenH
                                const active = hover === b.month
                                return (
                                    <div
                                        key={b.month}
                                        onMouseEnter={() => setHover(b.month)}
                                        onMouseLeave={() => setHover(null)}
                                        className="flex-1 min-w-[8px] relative flex flex-col items-center gap-2"
                                    >
                                        <div style={{height: h}}
                                             className="w-full rounded-lg overflow-hidden bg-gray-100 flex flex-col justify-end transition-height duration-300">
                                            <div style={{height: grayH}}
                                                 className="w-full bg-gray-200 transition-height duration-300"/>
                                            <div style={{height: greenH}}
                                                 className="w-full bg-[#A8E1CF] transition-height duration-300"/>
                                        </div>
                                        <div className="text-xs text-gray-500">{b.month}</div>

                                        {active && (
                                            <div
                                                className="absolute bottom-[60px] -right-[10px] w-[220px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-10">
                                                <div className="text-xs text-gray-500 mb-1.5">
                                                    {new Date(new Date().setMonth(new Date().getMonth() + b.month)).toLocaleString('ru-RU', {
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <Legend color="#A8E1CF" label="Основной долг"
                                                        value={formatCurrency(b.principal)}/>
                                                <Legend color="#e5e7eb" label="Проценты"
                                                        value={formatCurrency(b.interest)}/>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Labeled({children}: { children: React.ReactNode }) {
    return <div className="mb-[18px]">{children}</div>
}

function Toggle({
                    label,
                    checked,
                    onChange,
                }: {
    label: string
    checked: boolean
    onChange: (v: boolean) => void
}) {
    return (
        <label className="flex items-center justify-between gap-3 border border-gray-100 rounded-xl p-3 bg-white">
            <span>{label}</span>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                aria-pressed={checked}
                className={`w-12 h-7 rounded-full border border-gray-200 p-[3px] flex items-center ${checked ? 'bg-emerald-400 justify-end' : 'bg-gray-200 justify-start'}`}
            >
                <span className="w-5 h-5 bg-white rounded-full shadow-sm"/>
            </button>
        </label>
    )
}

function NumberWithRange({
                             value,
                             min,
                             max,
                             step,
                             onChange,
                         }: {
    value: number
    min: number
    max: number
    step: number
    onChange: (v: number) => void
}) {
    return (
        <>
            <Input
                type="range-number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </>
    )
}

function Legend({color, label, value}: { color: string; label: string; value: string }) {
    return (
        <div className="flex items-center gap-2.5 mt-1.5">
            <span className="w-2.5 h-2.5 bg-[var(--color)] rounded-sm inline-block" style={{'--color': color}}/>
            <span className="text-gray-500">{label}</span>
            <span className="ml-auto font-semibold">{value}</span>
        </div>
    )
}
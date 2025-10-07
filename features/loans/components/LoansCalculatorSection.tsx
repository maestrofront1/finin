'use client'

import { useMemo, useState } from 'react'
import { Container } from '@shared/ui/Container'
import { Card } from '@shared/ui/Card'
import { Button } from '@shared/ui/Button'
import { H2, Lead, Muted } from '@shared/ui/Typography'
import Input from '@shared/ui/Input'

const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})


const amountMin = 100_000
const amountMax = 10_000_000
const termMin = 3
const termMax = 60
const rateMin = 10
const rateMax = 36

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function calculateMonthlyPayment(amount: number, months: number, annualRate: number) {
  if (!months) return 0
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) {
    return amount / months
  }
  const factor = Math.pow(1 + monthlyRate, months)
  return (amount * monthlyRate * factor) / (factor - 1)
}

export function LoansCalculatorSection() {
  const [amount, setAmount] = useState(3_000_000)
  const [term, setTerm] = useState(18)
  const [rate, setRate] = useState(18)

  const monthlyPayment = useMemo(() => calculateMonthlyPayment(amount, term, rate), [amount, term, rate])
  const totalPayment = useMemo(() => monthlyPayment * term, [monthlyPayment, term])
  const overpayment = useMemo(() => totalPayment - amount, [totalPayment, amount])
  const effectiveRate = useMemo(() => {
    if (!term || amount <= 0) return 0
    const overall = totalPayment / amount
    const ratePerMonth = Math.pow(overall, 1 / term) - 1
    return ratePerMonth * 12 * 100
  }, [totalPayment, amount, term])

  const handleAmountChange = (value: number) => setAmount(clamp(Math.round(value / 10_000) * 10_000, amountMin, amountMax))
  const handleTermChange = (value: number) => setTerm(clamp(Math.round(value), termMin, termMax))
  const handleRateChange = (value: number) => setRate(clamp(Math.round(value * 10) / 10, rateMin, rateMax))

  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Card variant="soft" className="p-8">
            <div className="space-y-8">
              <div>
                <H2 className="mb-3">Рассчитайте платёж по займу</H2>
                <Lead className="text-gray-500">
                  Подберите комфортную сумму и срок. Мы покажем ориентировочный график и ключевые показатели.
                </Lead>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                    <span>Сумма займа</span>
                    <span className="text-lg text-gray-900">{currency.format(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={amountMin}
                    max={amountMax}
                    step={50_000}
                    value={amount}
                    onChange={event => handleAmountChange(Number(event.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-emerald-100 accent-emerald-500"
                  />
                  <div className="flex flex-wrap gap-3">
                    <Input
                      type="number"
                      min={amountMin}
                      max={amountMax}
                      step={50_000}
                      value={amount}
                      onChange={event => handleAmountChange(Number(event.target.value))}
                      className="w-40"
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>min {currency.format(amountMin)}</span>
                      <span className="h-px w-6 bg-gray-300" aria-hidden />
                      <span>max {currency.format(amountMax)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                    <span>Срок, месяцев</span>
                    <span className="text-lg text-gray-900">{term}</span>
                  </div>
                  <input
                    type="range"
                    min={termMin}
                    max={termMax}
                    step={1}
                    value={term}
                    onChange={event => handleTermChange(Number(event.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-emerald-100 accent-emerald-500"
                  />
                  <div className="flex flex-wrap gap-3">
                    <Input
                      type="number"
                      min={termMin}
                      max={termMax}
                      step={1}
                      value={term}
                      onChange={event => handleTermChange(Number(event.target.value))}
                      className="w-32"
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>min {termMin}</span>
                      <span className="h-px w-6 bg-gray-300" aria-hidden />
                      <span>max {termMax}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                    <span>Ставка, % годовых</span>
                    <span className="text-lg text-gray-900">{rate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={rateMin}
                    max={rateMax}
                    step={0.1}
                    value={rate}
                    onChange={event => handleRateChange(Number(event.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-emerald-100 accent-emerald-500"
                  />
                  <div className="flex flex-wrap gap-3">
                    <Input
                      type="number"
                      min={rateMin}
                      max={rateMax}
                      step={0.1}
                      value={rate}
                      onChange={event => handleRateChange(Number(event.target.value))}
                      className="w-32"
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>min {rateMin}%</span>
                      <span className="h-px w-6 bg-gray-300" aria-hidden />
                      <span>max {rateMax}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full sm:w-auto">Получить персональное предложение</Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card variant="outline" className="p-6">
              <div className="space-y-2">
                <Muted>Ежемесячный платёж</Muted>
                <div className="text-3xl font-semibold text-gray-900">{currency.format(monthlyPayment)}</div>
                <p className="text-sm text-gray-500">
                  Расчёт носит ориентировочный характер и не является публичной офертой.
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Всего к выплате</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">{currency.format(totalPayment)}</div>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Переплата</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">{currency.format(overpayment)}</div>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Эффективная ставка</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">{effectiveRate.toFixed(1)}%</div>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Требуемый оборот*</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">{currency.format(monthlyPayment * 3)}</div>
                  <p className="mt-2 text-[11px] text-gray-400">*Рекомендованный оборот для комфортного обслуживания займа.</p>
                </div>
              </div>
            </Card>
            <Card variant="soft" className="p-6">
              <H2 className="mb-2 text-xl">Что дальше?</H2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>1. Оставьте заявку и загрузите базовые документы компании.</li>
                <li>2. Наш менеджер свяжется в течение рабочего дня и подтвердит условия.</li>
                <li>3. Подпишем договор онлайн и перечислим средства на расчётный счёт.</li>
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default LoansCalculatorSection

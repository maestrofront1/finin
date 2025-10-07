// Centralized rates to easily tweak competitor and strategy values

export const FININ_STRATEGIES = [
  { key: 'low', label: 'Без риска 28%', rate: 28 },
  { key: 'base', label: 'Базовая 34%', rate: 34 },
  { key: 'aggr', label: 'Агрессивная 43%', rate: 43 },
]

// Competitors. Keep these lower than Finin strategies by default.
export const COMPETITOR_RATES = {
  stocksDividend: 9, // средняя дивидендная доходность по рынку (простые %)
  bonds: 14,
  deposit: 12,
  savings: 10, // вклады/сберегательные счета
  metals: 7,
}

export const STOCK_PRICE_RUB = 5000 // цена акции для покупок


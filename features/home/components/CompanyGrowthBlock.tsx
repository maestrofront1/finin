"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type YearPoint = {
  year: number;
  loansIssuedRub: number;
  investmentIncomeRub: number;
  ratePercent: number;
};

function formatRub(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + "\u202F₽";
}

export default function CompanyGrowthBlock() {
  const data: YearPoint[] = useMemo(
    () => [
      { year: 2019, loansIssuedRub: 45_000_000, investmentIncomeRub: 3_500_000, ratePercent: 26 },
      { year: 2020, loansIssuedRub: 90_000_000, investmentIncomeRub: 7_900_000, ratePercent: 28 },
      { year: 2021, loansIssuedRub: 120_000_000, investmentIncomeRub: 12_300_000, ratePercent: 29 },
      { year: 2022, loansIssuedRub: 180_000_000, investmentIncomeRub: 20_500_000, ratePercent: 30 },
      { year: 2023, loansIssuedRub: 360_000_000, investmentIncomeRub: 45_000_000, ratePercent: 31 },
      { year: 2024, loansIssuedRub: 520_000_000, investmentIncomeRub: 63_000_000, ratePercent: 31 },
      { year: 2025, loansIssuedRub: 596_488_000, investmentIncomeRub: 76_891_428, ratePercent: 31 },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(data.length - 1);
  const active = data[activeIndex];
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgHeight, setSvgHeight] = useState(500);

  const staticLeftCards = useMemo(
    () => [
      { title: "Выдано займов", value: "1 710 000 000 ₽", increase: "+20%" },
      { title: "Общий инвестиционный доход", value: "33 600 000 ₽", increase: "+20%" },
      { title: "Уставный капитал", value: "33 600 000 ₽" },
      { title: "Чистая прибыль", value: "51 752 000 ₽", increase: "+8 123 100 ₽" },
      { title: "Средняя ставка", value: "36%", green: true },
      { title: "Выручка", value: "58 048 011 ₽", increase: "+31 123 100 ₽" },
      { title: "Активы", value: "156 519 000 ₽" },
    ],
    []
  );

  useEffect(() => {
    function updateHeight() {
      const container = svgRef.current?.parentElement;
      if (container) {
        const newHeight = Math.max(window.innerHeight * 0.5, 600);
        setSvgHeight(newHeight);
      }
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const width = 880;
  const height = svgHeight;
  const padding = { top: 24, right: 24, bottom: 48, left: 48 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const years = data.map((d) => d.year);
  const minYear = years[0];
  const maxYear = years[years.length - 1];
  const minValue = 0;
  const maxValue = Math.max(...data.map((d) => d.loansIssuedRub)) * 1.1;

  const xForYear = (year: number) => {
    const t = (year - minYear) / (maxYear - minYear);
    return padding.left + t * innerW;
  };

  const yForValue = (v: number) => {
    const t = (v - minValue) / (maxValue - minValue);
    return padding.top + innerH - t * innerH;
  };

  const pathD = useMemo(() => {
    return data
      .map((d, i) => `${i === 0 ? "M" : "L"} ${xForYear(d.year)} ${yForValue(d.loansIssuedRub)}`)
      .join(" ");
  }, [data, svgHeight]);

  const gridLinesY = useMemo(() => {
    const lines: number[] = [];
    const steps = 6;
    for (let i = 0; i <= steps; i++) lines.push(padding.top + (innerH / steps) * i);
    return lines;
  }, [innerH]);

  function setActiveByClientX(clientX: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const localX = clientX - rect.left;
    const xInView = (localX / rect.width) * width;
    const clamped = Math.max(padding.left, Math.min(width - padding.right, xInView));
    const t = (clamped - padding.left) / innerW;
    const approxYear = minYear + t * (maxYear - minYear);
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < data.length; i++) {
      const dist = Math.abs(data[i].year - approxYear);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    }
    setActiveIndex(nearest);
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    setActiveByClientX(e.clientX);
  }

  function handleTouchMove(e: React.TouchEvent<SVGSVGElement>) {
    if (e.touches && e.touches[0]) setActiveByClientX(e.touches[0].clientX);
  }

  return (
    <section className="con-container bg-[#f4f5f7] rounded-[40px] p-10 flex flex-col gap-8">
      <h2 className="text-3xl font-bold text-center text-[#1f242a]">
        Стабильный рост компании на протяжении 7 лет
      </h2>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 flex flex-col gap-3 max-lg:col-span-12">
          {staticLeftCards.map((item, i) => (
            <div key={i} className="bg-white rounded-[20px] h-[100%] p-5">
              <div className="text-[#1f242a] text-lg">{item.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`text-[24px] font-bold whitespace-nowrap ${
                    item.green ? "text-green-600" : "text-[#55606f]"
                  }`}
                >
                  {item.value}
                </div>
                {item.increase && (
                  <span className="text-green-600 text-sm font-semibold">{item.increase}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-5 flex flex-col max-lg:col-span-12">
          <div className="bg-white border border-[#e7ebf2] rounded-[28px] w-full flex-1 relative overflow-hidden min-h-0">
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full rounded-[28px]"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMidYMid meet"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseLeave={() => setActiveIndex(data.length - 1)}
            >
              <rect x={0} y={0} width={width} height={height} rx={24} fill="#ffffff" />
              {gridLinesY.map((y, idx) => (
                <line
                  key={idx}
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#E7EBF2"
                />
              ))}
              {years.map((y, idx) => (
                <line
                  key={idx}
                  y1={padding.top}
                  y2={height - padding.bottom}
                  x1={xForYear(y)}
                  x2={xForYear(y)}
                  stroke="#E7EBF2"
                />
              ))}

              <motion.path
                d={pathD}
                fill="none"
                stroke="#22C55E"
                strokeWidth={3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              <motion.line
                y1={padding.top}
                y2={height - padding.bottom}
                animate={{ x1: xForYear(data[activeIndex].year), x2: xForYear(data[activeIndex].year) }}
                stroke="#A7F3D0"
                strokeWidth={2}
              />

              {data.map((d, i) => (
                <g
                  key={d.year}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={xForYear(d.year)}
                    cy={yForValue(d.loansIssuedRub)}
                    r={i === activeIndex ? 8 : 6}
                    className="transition-all duration-200"
                    fill="#22C55E"
                    stroke="#22C55E"
                  />
                </g>
              ))}

              {years.map((y, idx) => (
                <text
                  key={idx}
                  x={xForYear(y)}
                  y={height - 16}
                  textAnchor="middle"
                  fill="#6B7280"
                  fontSize={14}
                >
                  {y}
                </text>
              ))}
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.year}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute top-10 left-10 bg-white rounded-[20px] shadow-soft-blue p-4 w-[300px]"
              >
                <div className="text-gray-400 text-sm mb-2">{active.year} г.</div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[#f4f5f7] rounded-xl p-2 grid grid-cols-2 gap-3 items-center">
                    <div>
                      <div className="text-gray-400 text-sm">Выдано займов</div>
                      <div className="text-[#545454] text-[20px] font-semibold whitespace-nowrap">
                        {formatRub(active.loansIssuedRub)}
                      </div>
                    </div>
                    <div className="justify-self-end self-start">
                      <div className="text-gray-400 text-sm">Ставка</div>
                      <div className="text-[#545454] text-[20px] font-semibold">{active.ratePercent}%</div>
                    </div>
                  </div>
                  <div className="bg-[#f4f5f7] rounded-xl p-2">
                    <div className="text-gray-400 text-sm">Общий инвестиционный доход</div>
                    <div className="text-[#545454] text-[20px] font-semibold whitespace-nowrap">
                      {formatRub(active.investmentIncomeRub)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-white rounded-[20px] p-4 w-full mt-4 flex flex-col gap-2">
            <a
              href="/docs/finin-stats-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:bg-[#f0f2f5] rounded-lg transition"
            >
              <div className="p-2 bg-[#f4f5f7] rounded-lg">
                <img src="/img/icons/pdf.svg" alt="Статистика Финин 2025" className="w-6 h-6 object-contain" />
              </div>
              <span className=" text-gray-500">Статистика Финин 2025</span>
            </a>
            <a
              href="/docs/finin-report-2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:bg-[#f0f2f5] rounded-lg transition"
            >
              <div className="p-2 bg-[#f4f5f7] rounded-lg">
                <img src="/img/icons/pdf.svg" alt="Годовая финансовая отчетность 2023" className="w-6 h-6 object-contain" />
              </div>
              <span className=" text-gray-500">Годовая финансовая отчетность 2023</span>
            </a>
            <a
              href="/docs/finin-report-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:bg-[#f0f2f5] rounded-lg transition"
            >
              <div className="p-2 bg-[#f4f5f7] rounded-lg">
                <img src="/img/icons/pdf.svg" alt="Годовая финансовая отчетность 2024" className="w-6 h-6 object-contain" />
              </div>
              <span className=" text-gray-500">Годовая финансовая отчетность 2024</span>
            </a>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-5 max-lg:col-span-12">
          <div className="bg-white rounded-[20px] p-6 flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-[#1f242a]">Наша команда</h3>
            {[
              {
                name: "Андрей Груничев",
                role: "Генеральный директор",
                img: "/img/about/people-mini/Andrey.png",
              },
              {
                name: "Артем Старостин",
                role: "Директор IT отдела",
                img: "/img/about/people-mini/Artem.png",
              },
              {
                name: "Роман Фетисов",
                role: "Коммерческий директор",
                img: "/img/about/people-mini/Roman.png",
              },
              {
                name: "Антон",
                role: "Руководитель отдела инвестиций",
                img: "/img/about/people-mini/Anton.png",
              },
              {
                name: "Ирина",
                role: "Главный бухгалтер",
                img: "/img/about/people-mini/Irina.png",
              },
              {
                name: "Роман",
                role: "Руководитель",
                img: "/img/about/people-mini/Roman-2.png",
              },
              {
                name: "Владислава",
                role: "Юрист",
                img: "/img/about/people-mini/Vladislava.png",
              },
            ].map(({ name, role, img }, i) => (
              <div key={i} className="flex items-center gap-4 border border-[#e7ebf2] rounded-[20px] p-3">
                <img
                  src={img}
                  alt={name}
                  className="rounded-full border border-[#e7ebf2] w-10 h-10 object-cover"
                />
                <div>
                  <div className="font-semibold text-[#1f242a]">{name}</div>
                  <div className="text-sm text-[#a5adbd]">{role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[20px] p-6">
              <div className="text-[28px] font-semibold text-green-500">9870</div>
              <div className="text-[#1f242a] text-lg">инвесторов на платформе</div>
            </div>
            <div className="bg-white rounded-[20px] p-6">
              <div className="text-[28px] font-semibold text-green-500">2610</div>
              <div className="text-[#1f242a] text-lg">заемщиков на платформе</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <button className="bg-[#1f242a] text-white text-lg font-bold px-10 py-4 rounded-[10px]">
          стать заемщиком
        </button>
        <button className="bg-green-500 text-white text-lg font-bold px-10 py-4 rounded-[10px]">
          стать инвестором
        </button>
      </div>
    </section>
  );
}
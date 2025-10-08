"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Button } from "@shared/ui/Button";
import { H2 } from "@shared/ui/Typography";

// Data and main component structure remain the same
const cards = [
  { id: 1, tag: "ВЫСОКОДОХОДНЫЕ ИНВЕСТИЦИИ", title: "Госконтракты", prefix: "до", percent: "36%", suffix: "годовых", description: "Защищённые инструменты с гарантированной доходностью до 25% годовых", image: "/img/list/Pic-3.png", },
  { id: 2, tag: "ПОЛУЧАЙТЕ ДИВИДЕНДЫ", title: "Акции", prefix: "от", percent: "18%", suffix: "годовых", description: "Покупка акций – это возможность приумножить капитал, получая прибыль от роста стоимости компании и дивидендов", image: "/img/list/Pic-2.png", },
  { id: 3, tag: "ЕЖЕМЕСЯЧНЫЕ ПЛАТЕЖИ", title: "Бизнес", prefix: "ставка от", percent: "25%", suffix: "годовых", description: "Быстрое и удобное финансирование для роста вашего бизнеса", image: "/img/list/Pic.png", },
  { id: 4, tag: "СКОРО", title: "Недвижимость", prefix: "", percent: "", suffix: "", description: "Новое направление, которое поможет увеличить ваш доход", image: "/img/list/Pic-1.png", },
];

export default function CardScrollList() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? <MobileView /> : <DesktopView />;
}

function DesktopView() {
  // DesktopView remains unchanged
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"], });
  useEffect(() => { const unsubscribe = scrollYProgress.on("change", (latest) => { const newIndex = Math.floor(latest * cards.length); const clampedIndex = Math.min(newIndex, cards.length - 1); if (clampedIndex !== activeIndex) { setActiveIndex(clampedIndex); } }); return () => unsubscribe(); }, [scrollYProgress, activeIndex]);
  return (<div ref={sectionRef} style={{ height: `${cards.length * 100}vh`, position: "relative", }}><div className="sticky top-0 h-screen w-full bg-white flex flex-col"><div className="text-center pt-10 mb-8"><H2 className="mt-[80px] text-[44px] md:text-[56px] font-semibold text-gray-400">Получайте стабильный доход от вложений<br /><span className="text-gray-300 font-medium">в перспективные проекты</span></H2></div><div className="flex-grow flex items-center"><AnimatePresence mode="wait"><motion.div key={activeIndex} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.4 }} className="w-full"><CardContent card={cards[activeIndex]} /></motion.div></AnimatePresence></div></div></div>);
}

function MobileView() {
  // MobileView remains unchanged
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const handleToggle = (index: number) => { setOpenIndex(openIndex === index ? null : index); };
  return (<section className="bg-white py-12 px-4"><div className="text-center mb-8"><H2 className="text-3xl font-semibold text-gray-400">Получайте стабильный доход от вложений в перспективные проекты</H2></div><div className="space-y-4">{cards.map((card, index) => (<AccordionCard key={card.id} card={card} isOpen={openIndex === index} onToggle={() => handleToggle(index)} />))}</div></section>);
}

// --- START OF CORRECTED COMPONENT ---
function AccordionCard({ card, isOpen, onToggle }: any) {
  return (
      // The main container is now a standard div. No 'layout' prop.
      <div
          className="rounded-2xl bg-gray-100 overflow-hidden shadow-sm"
          onClick={onToggle}
      >
        {/* The clickable header. 'layout' is fine here as it's not fighting a height animation. */}
        <motion.div
            layout
            className="flex items-center gap-4 p-4 cursor-pointer"
        >
          <div className="text-muted-300 text-sm">
            /{String(card.id).padStart(2, "0")}
          </div>
          <h3 className="text-gray-400 text-lg font-semibold">{card.title}</h3>
        </motion.div>

        {/* This AnimatePresence and motion.section now have SOLE responsibility for the animation */}
        <AnimatePresence>
          {isOpen && (
              <motion.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden" // Prevents content from spilling during animation
              >
                {/* The content that determines the 'auto' height */}
                <div className="p-4 pt-0">
                  <div className="relative mb-4">
                    <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-auto rounded-xl object-cover"
                    />
                  </div>
                  <p className="text-green-500 uppercase tracking-wide font-medium text-sm mb-2">
                    {card.tag}
                  </p>
                  {card.percent && (
                      <div className="flex items-baseline gap-2 mb-4">
                        {card.prefix && (
                            <span className="text-gray-400 font-medium text-lg">
                      {card.prefix}
                    </span>
                        )}
                        <span className="text-gray-400 text-3xl leading-none font-medium">
                    {card.percent}
                  </span>
                        {card.suffix && (
                            <span className="text-gray-400 font-medium text-lg">
                      {card.suffix}
                    </span>
                        )}
                      </div>
                  )}
                  <p className="text-black font-light text-base mb-6">
                    {card.description}
                  </p>
                  <Button variant="green" withArrow={true} className="w-full">
                    Подробнее
                  </Button>
                </div>
              </motion.section>
          )}
        </AnimatePresence>
      </div>
  );
}

function CardContent({ card }: any) {
  return (
      <div className="con-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-center">
          <div className="relative md:col-span-3 flex items-end justify-end">
            <div className="rounded-2xl bg-gray-100 h-[440px] flex items-end justify-end shadow-sm relative overflow-hidden">
              <div className="absolute top-6 left-6 text-muted-300 text-sm">
                /{String(card.id).padStart(2, "0")}
              </div>
              <div className="relative max-w-[460px]">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="relative w-full md:col-span-7">
            <p className="text-green-500 uppercase tracking-wide font-medium text-[22px] max-md:text-[16px]">
              {card.tag}
            </p>
            <h3 className="text-gray-400 text-[48px] max-md:text-[28px] mb-3">
              {card.title}
            </h3>
            {card.percent && (
                <div className="flex items-baseline gap-2 mb-6">
                  {card.prefix && (
                      <span className="text-gray-400 font-medium text-[24px] max-md:text-[28px]">
                  {card.prefix}
                </span>
                  )}
                  <span className="text-gray-400 text-[48px] leading-none font-medium max-md:text-[28px]">
                {card.percent}
              </span>
                  {card.suffix && (
                      <span className="text-gray-400 font-medium text-[24px] max-md:text-[28px]">
                  {card.suffix}
                </span>
                  )}
                </div>
            )}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <p className="text-black text-2xl max-w-[80%] font-light text-[24px] max-md:w-full max-md:text-[14px]">
                {card.description}
              </p>
              <div className="flex md:justify-end">
                <Button variant="green" withArrow={true}>
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
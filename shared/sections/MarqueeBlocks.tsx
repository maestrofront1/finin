"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@shared/ui/Button";

type Item = { title: string; text: string; icon: string };

const ITEMS: Item[] = [
    {
        title: "Многоуровневая проверка",
        text: "Мы проводим комплексный, глубокий и поэтапный процесс исследования и анализа потенциального инвестиционного объекта перед принятием решения о вложении средств. Цель — максимально точно оценить реальные риски, перспективы, стоимость и соответствие инвестиции целям инвестора.",
        icon: "/img/icons/Levels.svg",
    },
    {
        title: "Диверсификация рисков",
        text: "Мы рекомендуем инвесторам распределять свои средства между разными проектами, отраслями и заёмщиками. Такой подход снижает зависимость доходности от одного конкретного заёмщика или сектора экономики. Наша платформа позволяет легко управлять портфелем инвестиций, обеспечивая широкие возможности для диверсификации и минимизации возможных потерь.",
        icon: "/img/icons/Danger.svg",
    },
    {
        title: "Номинальный счет",
        text: "Для обеспечения безопасности и прозрачности все операции проходят через номинальный счёт, открытый в надёжном банке. Это позволяет исключить несанкционированное использование средств и гарантирует их целевое назначение. Инвесторы могут быть уверены, что их деньги находятся под защитой и распределяются строго в рамках установленных условий.",
        icon: "/img/icons/Wallet.svg",
    },
    {
        title: "Юридическая помощь",
        text: "В случае возникновения просрочек наша команда опытных юристов берет на себя весь процесс взыскания задолженности. Мы осуществляем досудебную работу, инициируем судебные разбирательства и сопровождаем исполнительное производство. Это позволяет инвесторам минимизировать риски и сохранить свои инвестиции под надёжной защитой профессионалов. Важно отметить, что эта услуга для инвестора предоставляется абсолютно бесплатно.",
        icon: "/img/icons/Law.svg",
    },
    {
        title: "Поручительство",
        text: "Все займы на нашей платформе обеспечиваются поручителем, который проходит тщательную проверку. Поручительство играет ключевую роль в снижении рисков для кредитора, предоставляя дополнительную гарантию возврата долга. Поручитель также усиливает ответственность заёмщика, мотивируя его соблюдать обязательства. В случае проблем с возвратом долга кредитор может обратиться к поручителю, что повышает вероятность возврата средств.",
        icon: "/img/icons/Star-User.svg",
    },
];

export default function MarqueeBlocks() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const prevTimeRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const isPointerDownRef = useRef(false);
    const startXRef = useRef(0);
    const startOffsetRef = useRef(0);
    const draggingRef = useRef(false);
    const [isDraggingState, setIsDraggingState] = useState(false);
    const movedRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [overlayBox, setOverlayBox] = useState<{ left: number; top: number } | null>(null);
    const singleWidthRef = useRef(1);
    const SPEED = 70;
    const DRAG_THRESHOLD = 6;
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const measure = () => {
            if (!trackRef.current) return;
            const full = trackRef.current.scrollWidth;
            singleWidthRef.current = Math.max(1, full / 2);
            offsetRef.current = ((offsetRef.current % singleWidthRef.current) + singleWidthRef.current) % singleWidthRef.current;
            trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
        const step = (t: number) => {
            if (prevTimeRef.current == null) prevTimeRef.current = t;
            const dt = (t - prevTimeRef.current) / 1000;
            prevTimeRef.current = t;
            if (!isPaused && !draggingRef.current && singleWidthRef.current > 0) {
                offsetRef.current += SPEED * dt;
                if (offsetRef.current >= singleWidthRef.current) offsetRef.current -= singleWidthRef.current;
                if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
            }
            rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            prevTimeRef.current = null;
        };
    }, [isPaused]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const onPointerDown = (ev: PointerEvent) => {
            if (ev.button !== 0) return;
            container.setPointerCapture(ev.pointerId);
            isPointerDownRef.current = true;
            startXRef.current = ev.clientX;
            startOffsetRef.current = offsetRef.current;
            movedRef.current = 0;
        };
        const onPointerMove = (ev: PointerEvent) => {
            if (!isPointerDownRef.current) return;
            const dx = ev.clientX - startXRef.current;
            movedRef.current = dx;
            if (!draggingRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
                draggingRef.current = true;
                setIsDraggingState(true);
                setIsPaused(true);
            }
            if (draggingRef.current) {
                let newOffset = startOffsetRef.current - dx;
                const w = singleWidthRef.current || 1;
                newOffset = ((newOffset % w) + w) % w;
                offsetRef.current = newOffset;
                if (trackRef.current) trackRef.current.style.transform = `translate3d(${-newOffset}px,0,0)`;
            }
        };
        const onPointerUp = () => {
            if (!isPointerDownRef.current) return;
            isPointerDownRef.current = false;
            if (draggingRef.current) {
                draggingRef.current = false;
                setIsDraggingState(false);
                setIsPaused(false);
            }
            movedRef.current = 0;
        };
        container.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        return () => {
            container.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (isMobile) {
                if (containerRef.current && !containerRef.current.contains(target) && dropdownRef.current && !dropdownRef.current.contains(target)) {
                    setOpenIndex(null);
                }
            } else {
                if (containerRef.current && !containerRef.current.contains(target) && overlayRef.current && !overlayRef.current.contains(target)) {
                    setOpenIndex(null);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, openIndex]);

    const openPortal = (currentTarget: EventTarget, realIndex: number) => {
        const rect = (currentTarget as Element).getBoundingClientRect();
        const overlayW = 520, overlayH = 230, margin = 12;
        let left = rect.left + rect.width / 2 - overlayW / 2;
        left = Math.max(margin, Math.min(left, window.innerWidth - overlayW - margin));
        const top = rect.top - margin > overlayH ? rect.top - overlayH - margin : rect.bottom + margin;
        setOverlayBox({ left, top });
        setOpenIndex(realIndex);
    };

    const onCardClick = (e: React.MouseEvent, realIndex: number) => {
        if (Math.abs(movedRef.current) > DRAG_THRESHOLD) {
            movedRef.current = 0;
            return;
        }
        if (isMobile) {
            setOpenIndex(openIndex === realIndex ? null : realIndex);
        } else {
            // On desktop, a click also opens the portal, toggle is handled by outside click
            openPortal(e.currentTarget, realIndex);
        }
    };

    // --- HOVER LOGIC RE-INTRODUCED FOR DESKTOP ---
    const hoverTimeoutRef = useRef<number | null>(null);
    const leaveTimeoutRef = useRef<number | null>(null);

    const handleHoverEnter = (e: React.PointerEvent, realIndex: number) => {
        if (isMobile || draggingRef.current) return; // Only run on desktop
        clearTimeout(leaveTimeoutRef.current!);
        const target = e.currentTarget; // Capture target before setTimeout
        hoverTimeoutRef.current = window.setTimeout(() => {
            if (draggingRef.current) return;
            openPortal(target, realIndex); // Use captured target
        }, 160);
    };

    const handleHoverLeave = () => {
        if (isMobile) return; // Only run on desktop
        clearTimeout(hoverTimeoutRef.current!);
        leaveTimeoutRef.current = window.setTimeout(() => setOpenIndex(null), 120);
    };

    const onOverlayPointerEnter = () => clearTimeout(leaveTimeoutRef.current!);
    const onOverlayPointerLeave = () => {
        leaveTimeoutRef.current = window.setTimeout(() => setOpenIndex(null), 120);
    };

    const overlayPortal = !isMobile && openIndex !== null && overlayBox ? ReactDOM.createPortal(
        <div ref={overlayRef} style={{ position: "fixed", left: 0, top: 0, zIndex: 9999, pointerEvents: "none" }}>
            <div
                style={{ position: "absolute", left: `${overlayBox.left}px`, top: `${overlayBox.top}px`, pointerEvents: "auto" }}
                onPointerEnter={onOverlayPointerEnter}
                onPointerLeave={onOverlayPointerLeave}
            >
                <div className="w-[520px] bg-white rounded-2xl shadow-lg p-5">
                    <h3 className="text-2xl font-regular mb-3">{ITEMS[openIndex].title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{ITEMS[openIndex].text}</p>
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <div className="w-full">
            <div
                ref={containerRef}
                className="relative w-full h-36 bg-transparent overflow-hidden select-none cursor-grab max-md:h-fit"
                style={{ touchAction: "none" }}
                onMouseEnter={() => !isMobile && setIsPaused(true)}
                onMouseLeave={() => !isMobile && !isDraggingState && setIsPaused(false)}
            >
                <div
                    ref={trackRef}
                    className="flex items-center gap-20"
                    style={{ willChange: "transform", transform: `translate3d(${-offsetRef.current}px,0,0)` }}
                >
                    {[...ITEMS, ...ITEMS].map((it, idx) => {
                        const realIndex = idx % ITEMS.length;
                        return (
                            <div
                                key={idx}
                                className="min-w-[280px] flex-shrink-0 cursor-pointer"
                                onClick={(e) => onCardClick(e, realIndex)}
                                onPointerEnter={(e) => handleHoverEnter(e, realIndex)}
                                onPointerLeave={handleHoverLeave}
                                onDragStart={(e) => e.preventDefault()}
                            >
                                <div className="px-5 py-4 max-md:px-2">
                                    <div className="flex items-center gap-[20px] text-[68px] text-green-500 font-regular mb-3 max-md:text-[22px]">
                                        <img
                                            src={it.icon}
                                            alt={it.title}
                                            width={48}
                                            height={48}
                                            className="w-[48px] h-[48px] max-md:w-[22px] max-md:h-[22px]"
                                            style={{ display: "inline-block" }}
                                        />
                                        {it.title}
                                        <img
                                            src="/img/icons/Arrow.svg"
                                            alt="Подробнее"
                                            width={25}
                                            height={25}
                                            className="max-md:w-[14px] max-md:h-[14px]"
                                            style={{ display: "inline-block" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {isMobile && openIndex !== null && (
                    <motion.div
                        ref={dropdownRef}
                        key="mobile-dropdown"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white p-5 border-t border-gray-200">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={ITEMS[openIndex].icon}
                                    alt={ITEMS[openIndex].title}
                                    width={32}
                                    height={32}
                                    className="w-[32px] h-[32px]"
                                    style={{ display: "inline-block" }}
                                />
                                <h3 className="text-xl font-semibold">{ITEMS[openIndex].title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{ITEMS[openIndex].text}</p>
                            <div className="flex justify-end">
                                <Button variant="gray" withArrow={false}>Подробнее</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {overlayPortal}
        </div>
    );
}
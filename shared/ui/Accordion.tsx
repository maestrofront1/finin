'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full p-10 group rounded-2xl bg-gray-100 max-md:py-5 max-md:px-6">
            <button
                className="flex flex-row justify-between items-center pb-[10px] w-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title}`}
            >
                <span className="text-[28px] leading-[30px] text-gray-400 font-bold text-start max-md:text-[18px]">{title}</span>
                <div className="min-w-10 h-10 max-sm:h-full">
                    <motion.svg
                        className="text-gray-300 transition-colors duration-200 ease-in"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 40 40"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <g className="t849__lines" strokeWidth="2px" fill="none">
                            <path stroke="currentColor" d="M9 20H31"></path>
                            <path stroke="currentColor" d="M20 9V31"></path>
                        </g>
                    </motion.svg>
                </div>
            </button>

            <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                        id={`accordion-content-${title}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-[10px] border-t border-gray-300 ">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
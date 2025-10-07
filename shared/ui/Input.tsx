"use client";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string;
  // Allow any other props
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
                                       label,
                                       type = "text",
                                       min = 0,
                                       max = 100,
                                       step = 1,
                                       defaultValue = 0,
                                       ...props
                                     }) => {
  const [innerValue, setInnerValue] = useState(defaultValue);

  // Standard text or number input
  if (type === "text" || type === "number") {
    return (
        <div className="w-full">
          {label && (
              <label className="block text-sm text-gray-300 uppercase tracking-wide">
                {label}
              </label>
          )}
          <input
              type={type}
              className="w-full bg-white rounded-lg border px-3 py-2"
              {...props}
          />
        </div>
    );
  }

  // Custom range slider with number display
  if (type === "range-number") {
    const labelText =
        label ??
        (props.name === 'initial'
            ? 'Initial amount'
            : props.name === 'months'
                ? 'Investment term (months)'
                : props.name === 'monthly'
                    ? 'Monthly contribution'
                    : undefined);

    const isControlled = props.value !== undefined;
    const currentValue = isControlled ? Number(props.value) : Number(innerValue);
    const progress =
        ((currentValue - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
        <div className="w-full">
          {labelText && (
              <label className="block mb-2 text-sm text-gray-300 uppercase tracking-wide">
                {labelText}
              </label>
          )}
          <div className="relative rounded-2xl bg-gray-100 px-4 py-4">
            <div className="text-[18px] font-regular text-gray-800">{currentValue}</div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={(e) => {
                  if (!isControlled) setInnerValue(Number(e.target.value));
                  props.onChange?.(e);
                }}
                className={[
                  // Base and layout styles
                  "absolute bottom-[8px] w-[calc(100%-2rem)] h-1 cursor-pointer appearance-none rounded-md outline-none",
                  // Background gradient using an arbitrary value and CSS variable
                  "bg-[linear-gradient(to_right,#16a34a_var(--progress),#B5E4CE_var(--progress))]",
                  // Webkit (Chrome, Safari) thumb styles
                  "[&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#16a34a]",
                  // Mozilla (Firefox) thumb styles
                  "[&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[#16a34a]",
                ].join(" ")}
                style={
                  {
                    "--progress": `${progress}%`,
                  } as React.CSSProperties
                }
            />
          </div>
        </div>
    );
  }

  return null;
};

export { Input };
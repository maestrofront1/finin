// shared/ui/MainCard.tsx
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { ReactNode } from "react";

type CardVariant = "horizontal" | "vertical" | "small";

interface MainCardProps {
  variant?: CardVariant;
  title: string;
  description?: string;
  subtitle?: string;
  pic?: ReactNode;      // картинка / иконка
  buttonText?: string;
  href?: string;
  className?: string;
}

export function MainCard({
  variant = "horizontal",
  title,
  description,
  subtitle,
  pic,
  buttonText = "Подробнее",
  href = "#",
  className,
}: MainCardProps) {
  return (  
    <div
      className={cn(
        "bg-gray-100 rounded-[20px] overflow-hidden flex relative min-h-[300px] line-height-[1]",
        variant === "horizontal" && "flex max-md:grid-cols-1 items-center" +
          " gap-6 px-[40px] py-6 line-height-[1] max-md:px-6 max-md:pt-[10px] max-md:pb-6",
        variant === "vertical" && "flex-col-reverse p-6 line-height-[1]",
        variant === "small" && "flex-col p-4 text-sm line-height-[1]",
        className
      )}
    >
      <div className={cn("flex-1 flex flex-col items-center w-[33%]" +
          " max-md:w-full", variant === "horizontal" ? "" : " w-full")}>
        <h3 className="text-[28px] text-gray-400 font-bold mb-[20px] line-height-[1] whitespace-nowrap text-center">{title}</h3>
        {description && <p className="text-gray-300 text-[18px] mb-[20px] line-height-[1] text-center ">{description}</p>}
        {subtitle && <p className="text-gray-400 text-[36px] font-regular mb-[28px] line-height-[1] text-center ">{subtitle}</p>}
        {buttonText && <Button withArrow={false} variant="green" href={href} >{buttonText}</Button>}
      </div>

      {pic && (
        <div className={cn(variant === "horizontal" ? "flex-1 w-[33%] max-md:w-full flex justify-center" : "mb-4 w-full")}>
          {pic}
        </div>
      )}
    </div>
  );
}

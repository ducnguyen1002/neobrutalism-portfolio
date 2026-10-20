import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "aurora" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

    const variants = {
      primary:
        "bg-[#1a73e8] dark:bg-[#8ab4f8] text-white dark:text-[#08090d] hover:bg-[#1557b0] dark:hover:bg-[#adc8fa] shadow-[0_4px_20px_rgba(26,115,232,0.3)] dark:shadow-[0_4px_24px_rgba(138,180,248,0.3)] font-semibold",
      secondary:
        "bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/60 dark:border-white/15 text-foreground hover:bg-white/90 dark:hover:bg-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] font-medium",
      aurora:
        "bg-gradient-to-r from-[#1a73e8] to-[#8b5cf6] text-white shadow-[0_4px_20px_rgba(26,115,232,0.35)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.4)] hover:brightness-105 font-semibold",
      outline:
        "bg-transparent border border-foreground/20 text-foreground hover:border-foreground/60 hover:bg-foreground/5",
      subtle: "bg-foreground/5 text-foreground hover:bg-foreground/10",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-xs tracking-wide",
      md: "px-6 py-2.5 text-sm tracking-wide",
      lg: "px-8 py-3.5 text-base tracking-wide",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

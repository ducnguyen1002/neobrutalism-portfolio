import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "glass" | "outline" | "subtle";
	size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "primary", size = "md", ...props }, ref) => {
		const baseStyles =
			"relative inline-flex items-center justify-center font-semibold transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

		const variants = {
			primary:
				"bg-[#0052ff] text-white hover:bg-[#0041cc] dark:bg-[#38bdf8] dark:text-[#040914] dark:hover:bg-[#7dd3fc] shadow-[0_4px_24px_-4px_rgba(0,82,255,0.45)] dark:shadow-[0_4px_24px_-4px_rgba(56,189,248,0.5)] border border-[#0052ff] dark:border-[#38bdf8]",
			secondary:
				"liquid-glass text-foreground hover:bg-white dark:hover:bg-[#0b1a34] hover:border-[#0052ff]/50 dark:hover:border-[#38bdf8]/50 shadow-md",
			glass:
				"bg-white/80 dark:bg-white/10 backdrop-blur-md border border-blue-500/30 dark:border-blue-300/30 text-foreground hover:bg-white dark:hover:bg-white/20 shadow-[0_4px_16px_rgba(0,82,255,0.08)]",
			outline:
				"bg-transparent border border-foreground/30 text-foreground hover:border-[#0052ff] hover:text-[#0052ff] dark:hover:border-[#38bdf8] dark:hover:text-[#38bdf8] hover:bg-blue-50/50 dark:hover:bg-blue-950/30",
			subtle:
				"bg-blue-500/10 text-[#0052ff] dark:text-[#38bdf8] border border-blue-500/20 hover:bg-blue-500/20",
		};

		const sizes = {
			sm: "px-4 py-1.5 text-xs tracking-wider uppercase font-bold",
			md: "px-6 py-2.5 text-sm tracking-wide font-semibold",
			lg: "px-8 py-3.5 text-base tracking-wide font-bold",
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

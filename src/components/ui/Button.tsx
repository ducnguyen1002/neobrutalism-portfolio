import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "glass" | "outline" | "subtle";
	size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "primary", size = "md", ...props }, ref) => {
		const baseStyles =
			"relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

		const variants = {
			primary:
				"bg-[#0a192f] text-[#f2f6fa] dark:bg-[#93c5fd] dark:text-[#070e18] border border-[#0a192f] dark:border-[#93c5fd] hover:bg-[#132744] dark:hover:bg-[#bfdbfe] shadow-[0_4px_20px_-4px_rgba(10,25,47,0.25)] dark:shadow-[0_4px_24px_-4px_rgba(147,197,253,0.35)]",
			secondary:
				"liquid-glass text-foreground hover:bg-white/90 dark:hover:bg-[#102038]/90 hover:border-blue-400/40",
			glass:
				"bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/90 dark:border-blue-200/20 text-foreground hover:bg-white/90 dark:hover:bg-white/20 shadow-[0_4px_16px_rgba(10,25,47,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(147,197,253,0.25)]",
			outline:
				"bg-transparent border border-foreground/20 text-foreground hover:border-[#0a192f] dark:hover:border-blue-300 hover:bg-foreground/5",
			subtle:
				"bg-foreground/5 text-foreground border border-transparent hover:border-foreground/15 hover:bg-foreground/10",
		};

		const sizes = {
			sm: "px-3.5 py-1.5 text-xs tracking-wider uppercase font-semibold",
			md: "px-5 py-2.5 text-sm tracking-wide font-medium",
			lg: "px-7 py-3.5 text-base tracking-wide font-medium",
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

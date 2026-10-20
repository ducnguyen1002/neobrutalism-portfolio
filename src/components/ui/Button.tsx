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
				"bg-foreground text-background border border-foreground/80 hover:bg-foreground/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.08)]",
			secondary:
				"liquid-glass text-foreground hover:bg-white/85 dark:hover:bg-zinc-800/85 hover:border-foreground/30",
			glass:
				"bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/15 text-foreground hover:bg-white/80 dark:hover:bg-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]",
			outline:
				"bg-transparent border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5",
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

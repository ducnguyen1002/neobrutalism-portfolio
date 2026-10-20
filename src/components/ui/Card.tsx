import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated" | "flat";
	color?: string; // backwards compatibility
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant = "default", color, ...props }, ref) => {
		const variants = {
			default: "liquid-glass-card p-6 md:p-8",
			elevated:
				"liquid-glass-card p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20",
			flat:
				"bg-foreground/5 rounded-3xl p-6 border border-foreground/10 hover:border-foreground/20 transition-all",
		};

		return (
			<div
				ref={ref}
				className={cn(variants[variant], className)}
				{...props}
			/>
		);
	},
);
Card.displayName = "Card";

export { Card };

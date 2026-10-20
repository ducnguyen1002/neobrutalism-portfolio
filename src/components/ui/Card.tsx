import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "glass" | "dossier" | "minimal";
	color?: string; // Kept for backwards compatibility
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant = "glass", color, ...props }, ref) => {
		const variants = {
			glass: "liquid-glass-card p-6 md:p-8",
			dossier:
				"bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-foreground/15 p-6 md:p-8 relative shadow-sm",
			minimal:
				"bg-transparent border border-foreground/10 p-6 hover:border-foreground/20 transition-colors",
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

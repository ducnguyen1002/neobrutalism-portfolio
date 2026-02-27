import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "accent" | "danger" | "outline";
	size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "primary", size = "md", ...props }, ref) => {
		const variants = {
			primary: "bg-neo-yellow",
			secondary: "bg-neo-purple",
			accent: "bg-neo-green",
			danger: "bg-neo-red",
			outline: "bg-background text-foreground",
		};

		const sizes = {
			sm: "px-3 py-1.5 text-sm",
			md: "px-6 py-3 text-base",
			lg: "px-8 py-4 text-lg",
		};

		return (
			<button
				ref={ref}
				className={cn(
					"neo-brutalism-button",
					variants[variant],
					sizes[size],
					className,
				)}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button };

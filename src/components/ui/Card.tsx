import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	color?: "white" | "yellow" | "purple" | "green" | "red" | "blue";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, color = "white", ...props }, ref) => {
		const colors = {
			white: "bg-white",
			yellow: "bg-neo-yellow",
			purple: "bg-neo-purple",
			green: "bg-neo-green",
			red: "bg-neo-red",
			blue: "bg-neo-blue",
		};

		return (
			<div
				ref={ref}
				className={cn("neo-brutalism-card p-6", colors[color], className)}
				{...props}
			/>
		);
	},
);
Card.displayName = "Card";

export { Card };

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: "fb-btn-primary",
      secondary: "fb-btn-secondary",
      accent: "fb-btn-primary",
      danger: "fb-btn-primary",
      outline: "fb-btn-secondary",
      ghost: "fb-btn-secondary",
    };

    const sizes: Record<string, React.CSSProperties> = {
      sm: { height: "32px", fontSize: "0.875rem", padding: "0 10px" },
      md: { height: "36px", fontSize: "0.9375rem", padding: "0 12px" },
      lg: { height: "40px", fontSize: "1rem", padding: "0 16px" },
    };

    return (
      <button
        ref={ref}
        className={cn(variants[variant], className)}
        style={sizes[size]}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

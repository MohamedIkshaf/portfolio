import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs",
      outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
      ghost: "hover:bg-slate-100 text-slate-700",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-xs",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-semibold rounded-lg",
      md: "px-4 py-2.5 text-sm font-semibold rounded-xl",
      lg: "px-6 py-3 text-base font-semibold rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger" | "wa";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none text-center";

    const variantStyles = {
      primary:
        "bg-primary-500 hover:bg-primary-600 text-white focus-visible:outline-primary-500 shadow-sm hover:shadow",
      secondary:
        "bg-white hover:bg-primary-50 text-primary-500 border border-primary-500 focus-visible:outline-primary-500",
      accent:
        "bg-accent-400 hover:bg-accent-500 text-neutral-900 focus-visible:outline-accent-400 shadow-sm",
      ghost:
        "bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 focus-visible:outline-primary-500",
      danger:
        "bg-danger hover:opacity-90 text-white focus-visible:outline-danger shadow-sm",
      wa: "bg-wa-700 hover:bg-wa-800 text-white focus-visible:outline-wa-700 shadow-sm hover:shadow",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs sm:text-sm rounded-md gap-1.5",
      md: "h-11 px-4 text-sm sm:text-base rounded-md gap-2",
      lg: "h-13 px-6 text-base sm:text-lg rounded-lg gap-2.5",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={combinedClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";


/* ── Button ──────────────────────────────────────────────────────
 *  Variants: primary (accent fill) | secondary (outlined) |
 *            ghost (text only)     | danger (red destructive)
 *  Sizes:    sm | md (default) | lg
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-1.5 font-mono tracking-tight " +
  "rounded-sm transition focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-50 " +
  "select-none cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent hover:bg-accent-hover text-white",
  secondary:
    "bg-surface border border-grid " +
    "text-foreground " +
    "hover:bg-surface-hover",
  ghost:
    "text-muted hover:text-foreground hover:bg-surface-raised",
  danger:
    "bg-surface border border-grid text-red-600 dark:text-red-400 " +
    "hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800",
};

const sizes: Record<ButtonSize, string> = {
  sm:  "px-2.5 py-1 text-[10px]",
  md:  "px-4 py-2 text-xs",
  lg:  "px-6 py-2.5 text-sm",
};

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const iconSize = size === "sm" ? 10 : size === "lg" ? 16 : 12;

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin-sm" />
      ) : (
        iconLeft && <span className="shrink-0">{iconLeft}</span>
      )}
      {children}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}

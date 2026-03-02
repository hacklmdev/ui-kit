/* ── Badge / Tag ─────────────────────────────────────────────────
 *  Variants: default | accent | success | warning | error | info
 *  Sizes:    sm | md (default)
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { cn } from "@/utils/cn";

export type BadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-white dark:bg-[#1a1a1a] border border-grid text-muted dark:text-[#888]",
  accent:
    "bg-accent/10 border border-accent/30 text-accent",
  success:
    "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400",
  warning:
    "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400",
  error:
    "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400",
  info:
    "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-faint",
  accent: "bg-accent",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[9px]",
  md: "px-2 py-0.5 text-[10px]",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono rounded-sm",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {dot && (
        <span className={cn("inline-block w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

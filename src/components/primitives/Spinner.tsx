/* ── Spinner ─────────────────────────────────────────────────────
 *  Sizes: sm (12) | md (16, default) | lg (24) | xl (32)
 *  Color: inherits currentColor by default; override via className
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const px: Record<SpinnerSize, number> = { sm: 12, md: 16, lg: 24, xl: 32 };

export function Spinner({ size = "md", className, label = "Loading…" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center text-accent", className)}
    >
      <Loader2 size={px[size]} className="animate-spin-sm" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

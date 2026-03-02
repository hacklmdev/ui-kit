/* ── Divider ─────────────────────────────────────────────────────
 *  Horizontal or vertical separator using the grid token.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { cn } from "@/utils/cn";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("w-px self-stretch bg-grid shrink-0", className)} />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3 w-full", className)}>
        <div className="flex-1 h-px bg-grid" />
        <span className="text-[10px] font-mono text-faint">{label}</span>
        <div className="flex-1 h-px bg-grid" />
      </div>
    );
  }

  return <div className={cn("h-px w-full bg-grid", className)} />;
}

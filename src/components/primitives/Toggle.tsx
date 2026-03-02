/* ── Toggle ──────────────────────────────────────────────────────
 *  Accessible switch input.
 *  Controlled: pass `checked` + `onChange`.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { cn } from "@/utils/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, label, disabled, className }: ToggleProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative inline-flex w-9 h-5 rounded-full border transition-colors",
          "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:outline-none",
          checked
            ? "bg-accent border-accent"
            : "bg-white dark:bg-[#1a1a1a] border-grid",
        )}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            !disabled && onChange(!checked);
          }
        }}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </span>
      {label && (
        <span className="text-xs font-mono text-black dark:text-[#e8e8e8]">{label}</span>
      )}
    </label>
  );
}

/* ── ProviderBadge ────────────────────────────────────────────────
 *  Small coloured dot + provider name. Used in thread lists.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { PROVIDER_COLORS, PROVIDER_LABELS, type Provider } from "@/types";
import { cn } from "@/utils/cn";

interface ProviderBadgeProps {
  provider: Provider;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { dot: "w-1.5 h-1.5", text: "text-[10px]" },
  md: { dot: "w-2 h-2",     text: "text-xs" },
};

export function ProviderBadge({
  provider,
  size = "md",
  showLabel = true,
  className,
}: ProviderBadgeProps) {
  const { dot, text } = sizeClasses[size];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono", text, className)}>
      <span
        className={cn("inline-block rounded-full shrink-0", dot)}
        style={{ background: PROVIDER_COLORS[provider] }}
      />
      {showLabel && PROVIDER_LABELS[provider]}
    </span>
  );
}

/* ── ProviderPill ────────────────────────────────────────────── */
/** A rounded pill chip for provider filtering. */
interface ProviderPillProps extends ProviderBadgeProps {
  active?: boolean;
  onClick?: () => void;
}

export function ProviderPill({
  provider,
  active = false,
  onClick,
  className,
}: ProviderPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border font-mono text-[10px] transition",
        active
          ? "border-accent text-accent bg-accent/5"
          : "border-grid text-faint hover:border-muted hover:text-muted",
        className,
      )}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: PROVIDER_COLORS[provider] }}
      />
      {PROVIDER_LABELS[provider]}
    </button>
  );
}

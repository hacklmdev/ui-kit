/* ── Typography ──────────────────────────────────────────────────
 *  Composable type components that match design-token scale.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { cn } from "@/utils/cn";

/* ── Headings ─────────────────────────────────────────────────── */

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  as?: HeadingLevel;
  level?: HeadingLevel;          // alias
  children: React.ReactNode;
  className?: string;
}

const headingClasses: Record<HeadingLevel, string> = {
  h1: "text-xl font-semibold text-foreground tracking-tight",
  h2: "text-base font-semibold text-foreground tracking-tight",
  h3: "text-sm font-semibold text-foreground",
  h4: "text-xs font-semibold text-muted uppercase tracking-wide",
};

export function Heading({ as, level, children, className }: HeadingProps) {
  const tag = as ?? level ?? "h2";
  return React.createElement(
    tag,
    { className: cn(headingClasses[tag], className) },
    children,
  );
}

/* ── Body text ────────────────────────────────────────────────── */

interface TextProps {
  size?: "xs" | "sm" | "base";
  variant?: "default" | "muted" | "faint";
  mono?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}

const textSizeClasses = { xs: "text-xs", sm: "text-sm", base: "text-base" };
const textVariantClasses = {
  default: "text-foreground",
  muted: "text-muted",
  faint: "text-faint",
};

export function Text({
  size = "sm",
  variant = "default",
  mono = false,
  children,
  className,
  as: Tag = "p",
}: TextProps) {
  return (
    <Tag
      className={cn(
        textSizeClasses[size],
        textVariantClasses[variant],
        mono ? "font-mono" : "font-sans",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ── Inline code / code label ─────────────────────────────────── */

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: CodeProps) {
  return (
    <code
      className={cn(
        "font-mono text-xs bg-code border border-grid",
        "px-1 py-0.5 rounded-sm text-foreground",
        className,
      )}
    >
      {children}
    </code>
  );
}

/* ── Mono label ───────────────────────────────────────────────── */

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
}

export function MonoLabel({ children, className, uppercase = false }: LabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] text-faint tracking-tight",
        uppercase && "uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

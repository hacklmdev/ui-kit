/* ── Card ────────────────────────────────────────────────────────
 *  A surface component (white bg + border-grid border).
 *  Optionally has a header, body, and footer slot.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm:  "p-3",
  md:  "p-4",
  lg:  "p-6",
};

export function Card({ children, className, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-[#1a1a1a] border border-grid rounded-sm",
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ── Card.Header / Body / Footer slots ──────────────────────── */

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("pb-3 mb-3 border-b border-grid flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("pt-3 mt-3 border-t border-grid", className)}>
      {children}
    </div>
  );
}

/* ── EmptyState ─────────────────────────────────────────────── */

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className,
      )}
    >
      {icon && (
        <div className="text-faint mb-1">{icon}</div>
      )}
      <p className="text-sm font-semibold text-black dark:text-[#e8e8e8] tracking-tight">
        {title}
      </p>
      {description && (
        <p className="text-xs text-muted max-w-[260px] leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

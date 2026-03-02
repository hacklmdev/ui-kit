/* ── Alert ───────────────────────────────────────────────────────
 *  Inline notification banner — info / success / warning / error.
 *  Optional title, dismiss button, and action slot.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { classes: string; icon: React.ComponentType<{ size: number; strokeWidth: number }> }
> = {
  info: {
    classes:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400",
    icon: Info,
  },
  success: {
    classes:
      "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400",
    icon: CheckCircle2,
  },
  warning: {
    classes:
      "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400",
    icon: AlertTriangle,
  },
  error: {
    classes:
      "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400",
    icon: XCircle,
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  action,
  className,
}: AlertProps) {
  const { classes, icon: Icon } = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-2.5 text-xs font-mono px-3 py-2.5 rounded-sm border",
        classes,
        className,
      )}
    >
      <span className="shrink-0 mt-0.5"><Icon size={13} strokeWidth={2} /></span>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold mb-0.5">{title}</p>
        )}
        <div className="leading-relaxed">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 opacity-60 hover:opacity-100 transition"
        >
          <X size={12} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

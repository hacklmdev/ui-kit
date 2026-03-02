/* ── StatusIndicator ─────────────────────────────────────────────
 *  Shows save/sync status: idle | saving | done | error
 *  Used in FloatingDial and action buttons.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type SaveStatus = "idle" | "saving" | "done" | "error";

interface StatusIndicatorProps {
  status: SaveStatus;
  size?: number;
  className?: string;
  /** Override label text */
  labels?: Partial<Record<SaveStatus, string>>;
}

const defaultLabels: Record<SaveStatus, string> = {
  idle:   "Save",
  saving: "Saving…",
  done:   "Saved",
  error:  "Error",
};

const statusColors: Record<SaveStatus, string> = {
  idle:   "#fbfbfb",
  saving: "#fb631b",
  done:   "#27ae60",
  error:  "#ef4444",
};

export function StatusIndicator({
  status,
  size = 40,
  className,
  labels,
}: StatusIndicatorProps) {
  const bg = statusColors[status];
  const textColor = status === "idle" ? "#000" : "#fff";
  const label = { ...defaultLabels, ...labels }[status];

  return (
    <div
      className={cn("inline-flex flex-col items-center gap-1", className)}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: bg,
          border: "1px solid #e2e2e2",
          color: textColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
      >
        {status === "saving" && (
          <Loader2 size={size * 0.4} style={{ animation: "hacklm-spin 0.8s linear infinite" }} />
        )}
        {status === "done" && <Check size={size * 0.4} strokeWidth={2.5} />}
        {status === "error" && <X size={size * 0.4} strokeWidth={2.5} />}
      </div>
      <span className="font-mono text-[9px] text-muted">{label}</span>
    </div>
  );
}

/* ── SaveProgressCounter ─────────────────────────────────────── */

interface SaveProgressCounterProps {
  completed: number;
  total: number;
  className?: string;
}

export function SaveProgressCounter({ completed, total, className }: SaveProgressCounterProps) {
  return (
    <div
      className={cn(
        "bg-accent text-white font-mono text-[10px] px-2 py-0.5 rounded-full",
        className,
      )}
    >
      {completed}/{total}
    </div>
  );
}

/* ── PopupApp ────────────────────────────────────────────────────
 *  Extension popup — shows per-provider saved-chat counts.
 *  Takes props directly (no Chrome APIs).
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { LayoutDashboard } from "lucide-react";
import { HacklmLogo } from "@/components/brand/HacklmIcon";
import { ProviderBadge } from "@/components/content/ProviderBadge";
import { Spinner } from "@/components/primitives/Spinner";
import type { ThreadMeta, Provider } from "@/types";
import { ALL_PROVIDERS, PROVIDER_LABELS } from "@/types";

interface PopupAppProps {
  threads?: ThreadMeta[];
  loading?: boolean;
  version?: string;
  onOpenDashboard?: () => void;
  initialDark?: boolean;
}

export function PopupApp({
  threads = [],
  loading = false,
  version = "0.1.0",
  onOpenDashboard,
  initialDark = false,
}: PopupAppProps) {
  const [dark, setDark] = React.useState(initialDark);
  const countFor = (p: Provider) => threads.filter((t) => t.provider === p).length;

  return (
    <div className={`p-4 flex flex-col gap-4 bg-background text-foreground${dark ? " dark" : ""}`} style={{ width: 360 }}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-grid">
        <HacklmLogo size={28} />
        <span className="text-xs text-muted font-mono bg-surface px-2 py-0.5 rounded-sm border border-grid">
          v{version}
        </span>
      </div>

      {/* Stats */}
      <div className="bg-surface border border-grid p-4">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Spinner size="md" />
          </div>
        ) : threads.length === 0 ? (
          <p className="text-xs text-muted text-center font-mono py-2">
            No conversations saved yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">Total</span>
              <span className="font-mono text-xs">{threads.length}</span>
            </div>
            {ALL_PROVIDERS.map((p) => {
              const count = countFor(p);
              if (count === 0) return null;
              return (
                <div key={p} className="flex items-center justify-between">
                  <ProviderBadge provider={p} size="sm" />
                  <span className="font-mono text-xs">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Open Dashboard */}
      <button
        onClick={onOpenDashboard}
        className="w-full bg-accent hover:bg-accent-hover text-white font-mono text-sm
                   py-2.5 rounded-sm transition tracking-tight flex items-center justify-center gap-2"
      >
        <LayoutDashboard size={14} strokeWidth={2} />
        Open Vault Dashboard
      </button>

      <p className="text-[10px] text-faint text-center">
        Visit ChatGPT, Claude, Gemini, Perplexity, or Grok to save chats.
      </p>
    </div>
  );
}

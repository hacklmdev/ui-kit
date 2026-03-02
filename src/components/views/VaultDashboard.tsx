/* ── VaultDashboard ──────────────────────────────────────────────
 *  Full-page Vault Dashboard — mirrors DataPort options/App.tsx.
 *  Fully props-driven, no Chrome APIs.
 * ─────────────────────────────────────────────────────────────── */

import React, { useState, useMemo } from "react";
import { Sun, Moon, Search, Trash2, Copy, Check, Share2, Download, Upload } from "lucide-react";
import { HacklmLogo } from "@/components/brand/HacklmIcon";
import { ProviderBadge, ProviderPill } from "@/components/content/ProviderBadge";
import { ThreadList } from "@/components/content/ThreadListItem";
import MarkdownContent from "@/components/content/MarkdownContent";
import { Alert } from "@/components/feedback/Alert";
import { EmptyState } from "@/components/layout/Card";
import type { Thread, ThreadMeta, Provider, Message } from "@/types";
import { ALL_PROVIDERS } from "@/types";
import { MessageSquare } from "lucide-react";

interface VaultDashboardProps {
  threads?: ThreadMeta[];
  getThread?: (id: string) => Thread | undefined;
  onDelete?: (id: string) => void;
  onExport?: () => void;
  onImport?: () => void;
  initialDark?: boolean;
}

export function VaultDashboard({
  threads = [],
  getThread,
  onDelete,
  onExport,
  onImport,
  initialDark = false,
}: VaultDashboardProps) {
  const [dark, setDark] = useState(initialDark);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | "All">("All");
  const [copyMode, setCopyMode] = useState<"md" | "txt">("md");
  const [copiedId, setCopiedId] = useState<string | undefined>();

  const activeThread = activeId ? getThread?.(activeId) : undefined;

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchProv = selectedProvider === "All" || t.provider === selectedProvider;
      return matchSearch && matchProv;
    });
  }, [threads, searchQuery, selectedProvider]);

  function copyMessage(m: Message) {
    const text = copyMode === "md" ? m.content : m.content.replace(/[*_`#>~\[\]]/g, "");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(undefined), 2000);
  }

  const providersWithThreads = ALL_PROVIDERS.filter((p) => threads.some((t) => t.provider === p));

  return (
    <div className={`flex h-screen bg-background text-foreground${dark ? " dark" : ""}`}>

      {/* ── Sidebar ─────────────────────────────────────────┤ */}
      <aside className="w-64 shrink-0 bg-surface border-r border-grid p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="pb-4 border-b border-grid flex items-center justify-between">
          <HacklmLogo size={28} />
          <button
            onClick={() => setDark(!dark)}
            title={dark ? "Light mode" : "Dark mode"}
            className="p-1.5 rounded-sm text-faint hover:text-muted hover:bg-surface-raised transition"
          >
            {dark ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search threads…"
            className="w-full pl-7 pr-3 py-1.5 text-xs font-mono border border-grid rounded-sm
                       bg-surface text-foreground
                       placeholder:text-faint focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>

        {/* Provider filter */}
        {providersWithThreads.length > 0 && (
          <div className="flex flex-col gap-1 text-sm font-mono mt-2">
            <button
              onClick={() => setSelectedProvider("All")}
              className={`text-left px-2 py-1.5 rounded-sm text-xs font-mono transition
                ${selectedProvider === "All"
                  ? "bg-accent/5 text-accent border border-accent/20"
                  : "text-muted hover:bg-surface-hover border border-transparent"}`}
            >
              All ({threads.length})
            </button>
            {providersWithThreads.map((p) => {
              const count = threads.filter((t) => t.provider === p).length;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedProvider(p)}
                  className={`text-left px-2 py-1.5 rounded-sm text-xs font-mono transition flex items-center gap-2
                    ${selectedProvider === p
                      ? "bg-accent/5 text-accent border border-accent/20"
                      : "text-muted hover:bg-surface-hover border border-transparent"}`}
                >
                  <ProviderBadge provider={p} size="sm" />
                  ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Thread list */}
        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 ? (
            <p className="text-[11px] font-mono text-faint text-center py-6">No threads found.</p>
          ) : (
            <ThreadList
              threads={filteredThreads}
              activeId={activeId}
              onSelect={setActiveId}
            />
          )}
        </div>

        {/* Export / Import */}
        <div className="mt-auto pt-4 border-t border-grid flex flex-col gap-2">
          <button
            onClick={onExport}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-accent hover:bg-accent-hover
                       text-white text-xs font-mono rounded-sm transition"
          >
            <Download size={12} strokeWidth={2} /> Export JSON
          </button>
          <button
            onClick={onImport}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-surface
                       border border-grid hover:bg-surface-hover
                       text-foreground text-xs font-mono rounded-sm transition"
          >
            <Upload size={12} strokeWidth={2} /> Import File
          </button>
        </div>
      </aside>

      {/* ── Chat Viewer ─────────────────────────────────────┤ */}
      <main className="flex-1 flex flex-col min-w-0 bg-background">
        {!activeThread ? (
          <div className="flex-1 flex items-center justify-center text-muted">
            <EmptyState
              icon={<MessageSquare size={32} />}
              title="Select a conversation"
              description="Choose a thread from the sidebar to view the full conversation."
            />
          </div>
        ) : (
          <>
            {/* Thread header */}
            <div className="px-6 py-4 border-b border-grid flex items-start justify-between gap-4 shrink-0">
              <div className="min-w-0">
                <h1 className="text-base font-semibold text-foreground truncate">
                  {activeThread.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <ProviderBadge provider={activeThread.provider} size="sm" />
                  <span className="text-[11px] text-faint font-mono">
                    · {activeThread.messageCount} messages
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onDelete?.(activeThread.id)}
                  className="px-3 py-1.5 bg-surface border border-grid
                             hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300
                             text-muted hover:text-red-600 text-[11px] font-mono rounded-sm transition
                             flex items-center gap-1.5"
                >
                  <Trash2 size={11} strokeWidth={2} /> Delete
                </button>
              </div>
            </div>

            {/* Copy mode toggle */}
            <div className="flex items-center gap-1 px-6 pt-3">
              <span className="text-[10px] font-mono text-faint">Copy as:</span>
              {(["md", "txt"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setCopyMode(m)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-sm border transition
                    ${copyMode === m
                      ? "border-accent text-accent bg-accent/5"
                      : "border-grid text-faint hover:border-muted hover:text-muted"}`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {activeThread.messages.map((m) => (
                <div key={m.id} className="group relative flex flex-col gap-1">
                  {/* Action bar */}
                  <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <button
                      onClick={() => copyMessage(m)}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded-sm
                                 bg-surface border border-grid text-faint
                                 hover:text-foreground hover:border-muted transition"
                    >
                      {copiedId === m.id
                        ? <><Check size={10} strokeWidth={2.5} /> Copied</>
                        : <><Copy size={10} strokeWidth={2} /> {copyMode.toUpperCase()}</>}
                    </button>
                  </div>

                  {/* Bubble */}
                  <div className={`px-5 py-4 rounded-sm text-sm leading-relaxed border border-grid overflow-hidden
                    ${m.role === "user"
                      ? "bg-surface-hover"
                      : "bg-surface"}
                    text-foreground`}
                  >
                    <MarkdownContent>{m.content}</MarkdownContent>
                  </div>

                  {/* Meta */}
                  <div className={`text-[10px] font-mono text-faint mt-0.5 px-1 ${m.role === "user" ? "text-right" : "text-left"}`}>
                    {m.role === "user" ? "You" : "Assistant"}
                    {m.model ? ` · ${m.model}` : ""} ·{" "}
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

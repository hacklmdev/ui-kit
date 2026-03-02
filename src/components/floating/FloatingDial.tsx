/* ── FloatingDial ────────────────────────────────────────────────
 *  Floating action button that appears on chat pages.
 *  This version is decoupled from Chrome APIs for Storybook.
 *  Pass `onSave`, `onSaveAll`, `onRestore` to hook into real logic.
 * ─────────────────────────────────────────────────────────────── */

import React, { useState } from "react";
import {
  Save, BookMarked, RotateCcw, Loader2, Check, X, Search,
} from "lucide-react";
import { HacklmIcon } from "@/components/brand/HacklmIcon";
import type { Provider, ThreadMeta } from "@/types";
import { PROVIDER_LABELS } from "@/types";

export type DialSaveStatus = "idle" | "saving" | "done" | "error";

interface FloatingDialProps {
  provider?: Provider;
  /** Called when user clicks Save */
  onSave?: () => void | Promise<void>;
  /** Called when user clicks Save All */
  onSaveAll?: () => void | Promise<void>;
  /** Vault threads available for restore */
  threads?: ThreadMeta[];
  onRestore?: (thread: ThreadMeta) => void;
  saveStatus?: DialSaveStatus;
  className?: string;
}

const FAB  = 44;
const ACTION = 40;

export function FloatingDial({
  provider,
  onSave,
  onSaveAll,
  threads = [],
  onRestore,
  saveStatus = "idle",
}: FloatingDialProps) {
  const [open, setOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider] = useState<string>("All");

  const filtered = threads.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProv   = selectedProvider === "All" || t.provider === selectedProvider;
    return matchSearch && matchProv;
  });

  const fabBg =
    saveStatus === "done"  ? "#27ae60" :
    saveStatus === "error" ? "#ef4444" :
    open ? "#fb631b" : "#fbfbfb";

  const fabColor = saveStatus !== "idle" || open ? "#fff" : "#000";

  const FabIcon =
    saveStatus === "saving" ? Loader2 :
    saveStatus === "done"   ? Check :
    saveStatus === "error"  ? X : null;

  const actions = [
    {
      id: "save",
      label: "Save",
      icon: <Save size={16} strokeWidth={1.8} />,
      onClick: () => { onSave?.(); setOpen(false); },
    },
    {
      id: "save-all",
      label: "Save All",
      icon: <BookMarked size={16} strokeWidth={1.8} />,
      onClick: () => { onSaveAll?.(); setOpen(false); },
    },
    {
      id: "restore",
      label: "Restore",
      icon: <RotateCcw size={16} strokeWidth={1.8} />,
      onClick: () => { setRestoreOpen(true); setOpen(false); },
    },
  ];

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>

      {/* Action buttons */}
      {open && (
        <div style={{
          position: "absolute",
          bottom: FAB + 12,
          right: 2,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-end",
          gap: 8,
        }}>
          {actions.map((a, i) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                animation: `hacklm-dial-in 0.18s cubic-bezier(.34,1.56,.64,1) ${i * 0.06}s both`,
              }}
            >
              {/* Tooltip */}
              <div style={{
                background: "#fff",
                border: "1px solid #e2e2e2",
                borderRadius: 4,
                padding: "4px 10px",
                fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace',
                color: "#000",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                pointerEvents: "none",
              }}>
                {a.label}
              </div>
              {/* Button */}
              <button
                onClick={a.onClick}
                title={a.label}
                style={{
                  width: ACTION,
                  height: ACTION,
                  borderRadius: "50%",
                  border: "1px solid #e2e2e2",
                  background: "#fbfbfb",
                  color: "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {a.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        title={open ? "Close" : "HackLM Migrate"}
        style={{
          width: FAB,
          height: FAB,
          borderRadius: "50%",
          border: "1px solid #e2e2e2",
          background: fabBg,
          color: fabColor,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
          transition: "background 0.2s",
        }}
      >
        {FabIcon ? (
          <FabIcon
            size={20}
            strokeWidth={2}
            style={saveStatus === "saving" ? { animation: "hacklm-spin 0.8s linear infinite" } : undefined}
          />
        ) : (
          <HacklmIcon size={22} />
        )}
      </button>

      {/* Restore modal */}
      {restoreOpen && (
        <div
          onClick={() => setRestoreOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 500,
              maxHeight: "70vh",
              background: "#fbfbfb",
              borderRadius: 4,
              border: "1px solid #e2e2e2",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, fontFamily: '"Inter", sans-serif' }}>
                Restore from Vault
              </h2>
              <button
                onClick={() => setRestoreOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations…"
                style={{
                  width: "100%",
                  border: "1px solid #e2e2e2",
                  borderRadius: 4,
                  padding: "8px 10px 8px 30px",
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 12,
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Thread list */}
            <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.length === 0 ? (
                <p style={{ textAlign: "center", color: "#999", fontSize: 13, fontFamily: '"Inter", sans-serif', padding: "24px 0" }}>
                  No conversations found.
                </p>
              ) : (
                filtered.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onRestore?.(t); setRestoreOpen(false); }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      border: "1px solid #e2e2e2",
                      borderRadius: 4,
                      background: "#fff",
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: "#000",
                    }}
                  >
                    <div style={{ fontWeight: 500, fontSize: 14, fontFamily: '"Inter", sans-serif' }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 4, fontFamily: '"JetBrains Mono", monospace' }}>
                      {PROVIDER_LABELS[t.provider]} · {t.messageCount} msgs
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

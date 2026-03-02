/* ── MessageBubble ────────────────────────────────────────────────
 *  Renders a single chat message (user or assistant).
 *  User messages use a light-gray tinted background; assistant is
 *  pure white/dark surface.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { Copy, Share2, Check } from "lucide-react";
import { useState } from "react";
import MarkdownContent from "./MarkdownContent";
import { cn } from "@/utils/cn";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  copyMode?: "md" | "txt";
  onCopy?: (id: string) => void;
  onShare?: (content: string) => void;
  copiedId?: string;
}

export function MessageBubble({
  message: m,
  copyMode = "md",
  onCopy,
  onShare,
  copiedId,
}: MessageBubbleProps) {
  const isCopied = copiedId === m.id;
  const isUser = m.role === "user";

  return (
    <div className="group relative flex flex-col gap-1">
      {/* Action bar — hover revealed */}
      <div
        className={cn(
          "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
          isUser ? "justify-end" : "justify-start",
        )}
      >
        {onCopy && (
          <button
            onClick={() => onCopy(m.id)}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded-sm
                       bg-surface border border-grid text-faint
                       hover:text-foreground hover:border-muted transition"
          >
            {isCopied
              ? <><Check size={10} strokeWidth={2.5} /> Copied</>
              : <><Copy size={10} strokeWidth={2} /> {copyMode.toUpperCase()}</>}
          </button>
        )}
        {onShare && (
          <button
            onClick={() => onShare(m.content)}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded-sm
                       bg-surface border border-grid text-faint
                       hover:text-foreground hover:border-muted transition"
          >
            <Share2 size={10} strokeWidth={2} /> Share
          </button>
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "px-5 py-4 rounded-sm text-sm leading-relaxed border border-grid overflow-hidden",
          isUser
            ? "bg-surface-hover text-foreground"
            : "bg-surface text-foreground",
        )}
      >
        <MarkdownContent>{m.content}</MarkdownContent>
      </div>

      {/* Meta row */}
      <div
        className={cn(
          "text-[10px] font-mono text-faint mt-0.5 px-1",
          isUser ? "text-right" : "text-left",
        )}
      >
        {isUser ? "You" : "Assistant"}
        {m.model ? ` · ${m.model}` : ""} ·{" "}
        {new Date(m.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}

/* ── Convenience: static demo message ──────────────────────── */
export function MessageBubbleDemo() {
  const [copiedId, setCopiedId] = useState<string | undefined>(undefined);

  const messages: Message[] = [
    {
      id: "1",
      role: "user",
      content: "Can you explain how chrome.storage.local works?",
      createdAt: Date.now() - 60_000,
    },
    {
      id: "2",
      role: "assistant",
      model: "gpt-4o",
      content:
        "`chrome.storage.local` is a key-value store provided by the Chrome Extensions API.\n\n" +
        "```ts\nchrome.storage.local.set({ key: 'value' });\nchrome.storage.local.get('key', (result) => {\n  console.log(result.key);\n});\n```\n\n" +
        "It persists until explicitly cleared and is **not synced** across devices (that's `chrome.storage.sync`).",
      createdAt: Date.now() - 30_000,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-[600px] p-4">
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          message={m}
          copiedId={copiedId}
          onCopy={(id) => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(undefined), 2000);
          }}
          onShare={(c) => alert(`Share: ${c.slice(0, 40)}…`)}
        />
      ))}
    </div>
  );
}

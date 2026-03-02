/* ── ThreadListItem ───────────────────────────────────────────────
 *  A clickable row in the sidebar thread list.
 *  Visual design mirrors the Vault Dashboard sidebar.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { ProviderBadge } from "./ProviderBadge";
import type { ThreadMeta } from "@/types";
import { cn } from "@/utils/cn";

interface ThreadListItemProps {
  thread: ThreadMeta;
  active?: boolean;
  onClick?: () => void;
}

export function ThreadListItem({ thread, active = false, onClick }: ThreadListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-sm border transition",
        active
          ? "bg-accent/5 border-accent/20 text-black dark:text-[#e8e8e8]"
          : "bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#1f1f1f] border-transparent",
      )}
    >
      <div className="font-medium text-sm truncate">{thread.title}</div>
      <div className="text-[11px] text-muted font-mono mt-1.5 flex items-center gap-2">
        <ProviderBadge provider={thread.provider} size="sm" />
        · {thread.messageCount} msgs
      </div>
    </button>
  );
}

/* ── ThreadList: full sidebar list ───────────────────────────── */

interface ThreadListProps {
  threads: ThreadMeta[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function ThreadList({ threads, activeId, onSelect }: ThreadListProps) {
  return (
    <div className="flex flex-col gap-1">
      {threads.map((t) => (
        <ThreadListItem
          key={t.id}
          thread={t}
          active={t.id === activeId}
          onClick={() => onSelect?.(t.id)}
        />
      ))}
    </div>
  );
}

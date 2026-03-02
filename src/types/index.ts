/* ─────────────────────────────────────────────────────
 *  Shared types — mirrored from DataPort/src/types/
 * ───────────────────────────────────────────────────── */

export type Provider = "chatgpt" | "claude" | "gemini" | "perplexity" | "grok";
export type Role = "user" | "assistant";

export interface Attachment {
  id: string;
  name: string;
  mimeType: string;
  url?: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  model?: string;
  createdAt: number;
  attachments?: Attachment[];
}

export interface ThreadMeta {
  id: string;
  title: string;
  provider: Provider;
  messageCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Thread extends ThreadMeta {
  messages: Message[];
}

/* ── Provider display helpers ─────────────────────── */

export const PROVIDER_LABELS: Record<Provider, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
  perplexity: "Perplexity",
  grok: "Grok",
};

export const PROVIDER_COLORS: Record<Provider, string> = {
  chatgpt: "#10a37f",
  claude: "#d97706",
  gemini: "#4285f4",
  perplexity: "#22d3ee",
  grok: "#ef4444",
};

export const ALL_PROVIDERS: Provider[] = [
  "chatgpt",
  "claude",
  "gemini",
  "perplexity",
  "grok",
];

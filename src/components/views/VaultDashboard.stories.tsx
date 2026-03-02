import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VaultDashboard } from "./VaultDashboard";
import type { Thread, ThreadMeta } from "@/types";

const meta = {
  title: "Views / Vault Dashboard",
  component: VaultDashboard,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "options" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VaultDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const threads: ThreadMeta[] = [
  { id: "1", title: "Explain async/await in TypeScript",    provider: "chatgpt",    messageCount: 4,  createdAt: Date.now() - 86400_000,     updatedAt: Date.now() - 3600_000 },
  { id: "2", title: "Best practices for React hooks",       provider: "claude",     messageCount: 2,  createdAt: Date.now() - 86400_000 * 2, updatedAt: Date.now() - 86400_000 },
  { id: "3", title: "How to use Tailwind CSS v4?",          provider: "gemini",     messageCount: 3,  createdAt: Date.now() - 86400_000 * 3, updatedAt: Date.now() - 86400_000 * 2 },
  { id: "4", title: "Chrome extension architecture guide",   provider: "perplexity", messageCount: 6,  createdAt: Date.now() - 86400_000 * 5, updatedAt: Date.now() - 86400_000 * 3 },
  { id: "5", title: "Vite build optimisation tips",         provider: "grok",       messageCount: 2,  createdAt: Date.now() - 86400_000 * 7, updatedAt: Date.now() - 86400_000 * 4 },
];

const threadMap: Record<string, Thread> = {
  "1": {
    ...threads[0],
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Can you explain async/await in TypeScript? When should I use it vs raw Promises?",
        createdAt: Date.now() - 90_000,
      },
      {
        id: "m2",
        role: "assistant",
        model: "gpt-4o",
        content:
          "`async/await` is syntactic sugar over Promises. It makes asynchronous code _read_ like synchronous code.\n\n" +
          "```typescript\nasync function fetchUser(id: string): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error('Not found');\n  return res.json();\n}\n```\n\n" +
          "**Use async/await when:**\n- You need to handle multiple async steps sequentially\n- Error handling with `try/catch` is clearer\n\n**Use raw Promises when:**\n- Combining multiple independent promises (`Promise.all`)\n- Working in older codebases",
        createdAt: Date.now() - 60_000,
      },
      {
        id: "m3",
        role: "user",
        content: "What about error handling patterns?",
        createdAt: Date.now() - 30_000,
      },
      {
        id: "m4",
        role: "assistant",
        model: "gpt-4o",
        content:
          "The standard pattern is `try/catch`:\n\n```typescript\ntry {\n  const user = await fetchUser('123');\n  console.log(user.name);\n} catch (err) {\n  console.error('Failed:', err);\n}\n```\n\n" +
          "For a cleaner approach, you can create a helper that never throws:\n\n```typescript\nasync function safe<T>(p: Promise<T>): Promise<[T, null] | [null, Error]> {\n  try { return [await p, null]; }\n  catch (e) { return [null, e as Error]; }\n}\n\nconst [user, err] = await safe(fetchUser('123'));\n```",
        createdAt: Date.now() - 10_000,
      },
    ],
  },
};

export const Empty: Story = {
  args: { threads: [] },
};

export const WithThreads: Story = {
  args: {
    threads,
    getThread: (id) => threadMap[id],
    onDelete: (id) => alert(`Delete ${id}`),
    onExport: () => alert("Export"),
    onImport: () => alert("Import"),
  },
};

export const DarkMode: Story = {
  args: {
    threads,
    getThread: (id) => threadMap[id],
    initialDark: true,
  },
};

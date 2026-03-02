import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThreadListItem, ThreadList } from "./ThreadListItem";
import type { ThreadMeta } from "@/types";

const meta = {
  title: "Content / ThreadListItem",
  component: ThreadListItem,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ThreadListItem>;

export default meta;

const mockThreads: ThreadMeta[] = [
  { id: "1", title: "Explain async/await in TypeScript", provider: "chatgpt",    messageCount: 12, createdAt: Date.now() - 86400_000 * 2, updatedAt: Date.now() - 86400_000 },
  { id: "2", title: "Best practices for React hooks",    provider: "claude",     messageCount: 8,  createdAt: Date.now() - 86400_000 * 3, updatedAt: Date.now() - 86400_000 * 2 },
  { id: "3", title: "How to use Tailwind CSS v4?",       provider: "gemini",     messageCount: 5,  createdAt: Date.now() - 86400_000 * 5, updatedAt: Date.now() - 86400_000 * 3 },
  { id: "4", title: "Chrome extension architecture",     provider: "perplexity", messageCount: 20, createdAt: Date.now() - 86400_000 * 7, updatedAt: Date.now() - 86400_000 * 4 },
  { id: "5", title: "Vite build optimisation tips",      provider: "grok",       messageCount: 6,  createdAt: Date.now() - 86400_000 * 9, updatedAt: Date.now() - 86400_000 * 5 },
];

export const Default: StoryObj = {
  render: () => (
    <div className="w-64">
      <ThreadListItem thread={mockThreads[0]} />
    </div>
  ),
};

export const Active: StoryObj = {
  render: () => (
    <div className="w-64">
      <ThreadListItem thread={mockThreads[0]} active />
    </div>
  ),
};

export const ListInteractive: StoryObj = {
  name: "Full List (interactive)",
  render: () => {
    const [activeId, setActiveId] = useState("1");
    return (
      <div className="w-64 border border-grid rounded-sm p-2 bg-white dark:bg-[#1a1a1a]">
        <ThreadList
          threads={mockThreads}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    );
  },
};

export const DarkMode: StoryObj = {
  render: () => (
    <div className="dark bg-background p-3 w-64">
      <ThreadList threads={mockThreads} activeId="2" />
    </div>
  ),
};

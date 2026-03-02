import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FloatingDial } from "./FloatingDial";
import type { ThreadMeta } from "@/types";

const mockThreads: ThreadMeta[] = [
  { id: "1", title: "Explain async/await in TypeScript",    provider: "chatgpt",    messageCount: 12, createdAt: Date.now() - 86400_000, updatedAt: Date.now() - 3600_000 },
  { id: "2", title: "Best practices for React hooks",       provider: "claude",     messageCount: 8,  createdAt: Date.now() - 86400_000 * 2, updatedAt: Date.now() - 86400_000 },
  { id: "3", title: "How to use Tailwind CSS v4?",          provider: "gemini",     messageCount: 5,  createdAt: Date.now() - 86400_000 * 3, updatedAt: Date.now() - 86400_000 * 2 },
  { id: "4", title: "Chrome extension architecture guide",   provider: "perplexity", messageCount: 20, createdAt: Date.now() - 86400_000 * 5, updatedAt: Date.now() - 86400_000 * 3 },
  { id: "5", title: "Vite build optimisation tips",         provider: "grok",       messageCount: 6,  createdAt: Date.now() - 86400_000 * 7, updatedAt: Date.now() - 86400_000 * 4 },
];

const meta = {
  title: "Floating / FloatingDial",
  component: FloatingDial,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    provider: { control: "select", options: ["chatgpt", "claude", "gemini", "perplexity", "grok"] },
    saveStatus: { control: "select", options: ["idle", "saving", "done", "error"] },
  },
} satisfies Meta<typeof FloatingDial>;

export default meta;
type Story = StoryObj<typeof meta>;

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: "100vh", background: "#f9f9f9", padding: 32, position: "relative" }}>
    <h1 style={{ fontFamily: '"Inter", sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
      Chat Page Simulation
    </h1>
    <p style={{ fontFamily: '"Inter", sans-serif', color: "#666", fontSize: 14 }}>
      The FloatingDial appears in the bottom-right corner, overlaid on the host page.
    </p>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <PageWrapper>
      <FloatingDial
        provider="chatgpt"
        onSave={() => alert("Save triggered")}
        onSaveAll={() => alert("Save All triggered")}
      />
    </PageWrapper>
  ),
};

export const WithRestore: Story = {
  name: "With Restore Threads",
  render: () => (
    <PageWrapper>
      <FloatingDial
        provider="claude"
        threads={mockThreads}
        onSave={() => alert("Save triggered")}
        onSaveAll={() => alert("Save All triggered")}
        onRestore={(t) => alert(`Restore: ${t.title}`)}
      />
    </PageWrapper>
  ),
};

export const SavingState: Story = {
  render: () => (
    <PageWrapper>
      <FloatingDial provider="gemini" saveStatus="saving" />
    </PageWrapper>
  ),
};

export const DoneState: Story = {
  render: () => (
    <PageWrapper>
      <FloatingDial provider="chatgpt" saveStatus="done" />
    </PageWrapper>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <PageWrapper>
      <FloatingDial provider="chatgpt" saveStatus="error" />
    </PageWrapper>
  ),
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PopupApp } from "./PopupApp";
import type { ThreadMeta } from "@/types";

const meta = {
  title: "Views / Popup",
  component: PopupApp,
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "popup" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PopupApp>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockThreads: ThreadMeta[] = [
  { id: "1", title: "Async patterns", provider: "chatgpt",    messageCount: 5,  createdAt: Date.now(), updatedAt: Date.now() },
  { id: "2", title: "React hooks",    provider: "chatgpt",    messageCount: 8,  createdAt: Date.now(), updatedAt: Date.now() },
  { id: "3", title: "TypeScript ADTs",provider: "claude",     messageCount: 14, createdAt: Date.now(), updatedAt: Date.now() },
  { id: "4", title: "Tailwind v4",    provider: "gemini",     messageCount: 6,  createdAt: Date.now(), updatedAt: Date.now() },
  { id: "5", title: "Vite setup",     provider: "perplexity", messageCount: 3,  createdAt: Date.now(), updatedAt: Date.now() },
];

export const Empty: Story = {
  args: { threads: [], loading: false },
};

export const Loading: Story = {
  args: { loading: true },
};

export const WithData: Story = {
  args: {
    threads: mockThreads,
    loading: false,
    onOpenDashboard: () => alert("Open dashboard"),
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark bg-background">
      <PopupApp {...args} />
    </div>
  ),
  args: { threads: mockThreads },
};

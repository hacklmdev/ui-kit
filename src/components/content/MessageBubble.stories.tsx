import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageBubble, MessageBubbleDemo } from "./MessageBubble";
import type { Message } from "@/types";

const meta = {
  title: "Content / MessageBubble",
  component: MessageBubble,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

const userMsg: Message = {
  id: "u1",
  role: "user",
  content: "Can you explain async/await in TypeScript?",
  createdAt: Date.now() - 90_000,
};

const assistantMsg: Message = {
  id: "a1",
  role: "assistant",
  model: "gpt-4o",
  content:
    "**async/await** is syntactic sugar over Promises.\n\n```typescript\nasync function fetchData(): Promise<string> {\n  const res = await fetch('/api/data');\n  return res.json();\n}\n```\n\nUse `try/catch` for error handling.",
  createdAt: Date.now() - 60_000,
};

export const UserMessage: Story = {
  args: { message: userMsg },
};

export const AssistantMessage: Story = {
  args: { message: assistantMsg },
};

export const WithActions: Story = {
  args: {
    message: assistantMsg,
    onCopy: () => alert("Copied!"),
    onShare: () => alert("Shared!"),
  },
};

export const FullConversation: StoryObj = {
  name: "Full Conversation (interactive)",
  render: () => <MessageBubbleDemo />,
};

export const DarkMode: StoryObj = {
  render: () => (
    <div className="dark bg-background p-4">
      <MessageBubble message={assistantMsg} />
    </div>
  ),
};

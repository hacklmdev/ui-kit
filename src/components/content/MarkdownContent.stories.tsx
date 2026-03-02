import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MarkdownContent from "./MarkdownContent";

const meta = {
  title: "Content / MarkdownContent",
  component: MarkdownContent,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof MarkdownContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicText: Story = {
  args: { children: "Hello world! This is **bold** text and _italic_ text with a [link](https://hacklm.dev)." },
};

export const CodeBlock: Story = {
  args: {
    children: `Here is some TypeScript:
\`\`\`typescript
function saveThread(id: string): Promise<void> {
  return chrome.storage.local.set({ [id]: thread });
}
\`\`\`
And some inline \`code\` too.`,
  },
};

export const Table: Story = {
  args: {
    children: `
| Provider   | Color   | Supported |
|------------|---------|-----------|
| ChatGPT    | #10a37f | ✅        |
| Claude     | #d97706 | ✅        |
| Gemini     | #4285f4 | ✅        |
| Perplexity | #22d3ee | ✅        |
| Grok       | #ef4444 | ✅        |
`,
  },
};

export const LongResponse: Story = {
  args: {
    children: `## Chrome extension architecture

A Chrome extension consists of several key parts:

1. **Background script** — runs as a service worker, handles message routing
2. **Content scripts** — injected into web pages, can read/modify the DOM
3. **Popup** — the small UI that appears when you click the extension icon
4. **Options page** — a full-page settings/dashboard UI

### Message passing

Content scripts communicate with the background via \`chrome.runtime.sendMessage\`:

\`\`\`typescript
// From content script
chrome.runtime.sendMessage({ type: "SAVE_THREAD", payload: thread }, (res) => {
  if (res.ok) console.log("Saved", res.data);
});
\`\`\`

The background script listens with \`chrome.runtime.onMessage.addListener\`.

> **Note:** Messages must be JSON-serialisable — no functions, Promises, or class instances.`,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark bg-background p-4 min-h-[200px]">
      <MarkdownContent>{args.children}</MarkdownContent>
    </div>
  ),
  args: { children: "## Dark mode\n\nThis renders **markdown** inside a dark surface.\n\n```ts\nconst x = 1;\n```" },
};

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProviderBadge, ProviderPill } from "./ProviderBadge";
import { ALL_PROVIDERS } from "@/types";

const meta = {
  title: "Content / ProviderBadge",
  component: ProviderBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    provider: { control: "select", options: ALL_PROVIDERS },
    size: { control: "select", options: ["sm", "md"] },
    showLabel: { control: "boolean" },
  },
} satisfies Meta<typeof ProviderBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatGPT: Story     = { args: { provider: "chatgpt" } };
export const Claude: Story      = { args: { provider: "claude" } };
export const Gemini: Story      = { args: { provider: "gemini" } };
export const Perplexity: Story  = { args: { provider: "perplexity" } };
export const Grok: Story        = { args: { provider: "grok" } };

export const AllProviders: StoryObj = {
  name: "All Providers",
  render: () => (
    <div className="flex flex-col gap-2 p-4">
      {ALL_PROVIDERS.map((p) => (
        <ProviderBadge key={p} provider={p} />
      ))}
    </div>
  ),
};

export const DotOnly: StoryObj = {
  name: "Dot only",
  render: () => (
    <div className="flex gap-3 items-center p-4">
      {ALL_PROVIDERS.map((p) => (
        <ProviderBadge key={p} provider={p} showLabel={false} />
      ))}
    </div>
  ),
};

export const FilterPills: StoryObj = {
  name: "Filter Pills (interactive)",
  render: () => {
    const [active, setActive] = useState<string>("chatgpt");
    return (
      <div className="flex flex-wrap gap-2 p-4">
        {ALL_PROVIDERS.map((p) => (
          <ProviderPill
            key={p}
            provider={p}
            active={active === p}
            onClick={() => setActive(p)}
          />
        ))}
      </div>
    );
  },
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta = {
  title: "Primitives / Divider",
  component: Divider,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-xs font-mono text-muted mb-3">Above</p>
      <Divider />
      <p className="text-xs font-mono text-muted mt-3">Below</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-64">
      <Divider label="OR" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-3 h-10">
      <span className="text-xs font-mono text-muted">Left</span>
      <Divider orientation="vertical" />
      <span className="text-xs font-mono text-muted">Right</span>
    </div>
  ),
};

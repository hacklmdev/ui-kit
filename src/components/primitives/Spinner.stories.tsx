import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta = {
  title: "Primitives / Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Small: Story   = { args: { size: "sm" } };
export const Large: Story   = { args: { size: "lg" } };
export const ExtraLarge: Story = { args: { size: "xl" } };

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex gap-6 items-center p-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Inline: Story = {
  name: "Inline with text",
  render: () => (
    <div className="flex items-center gap-2 font-mono text-xs text-muted p-4">
      <Spinner size="sm" />
      <span>Loading vault…</span>
    </div>
  ),
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Primitives / Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "success", "warning", "error", "info"],
    },
    size: { control: "select", options: ["sm", "md"] },
    dot: { control: "boolean" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story  = { args: { children: "Default" } };
export const Accent: Story   = { args: { variant: "accent",  children: "New" } };
export const Success: Story  = { args: { variant: "success", children: "Saved" } };
export const Warning: Story  = { args: { variant: "warning", children: "Stale" } };
export const Error: Story    = { args: { variant: "error",   children: "Failed" } };
export const Info: Story     = { args: { variant: "info",    children: "v0.1.0" } };

export const WithDot: Story = {
  args: { variant: "success", dot: true, children: "Active" },
};

export const AllVariants: StoryObj = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge>Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success" dot>Saved</Badge>
      <Badge variant="warning" dot>Stale</Badge>
      <Badge variant="error" dot>Failed</Badge>
      <Badge variant="info">v0.1.0</Badge>
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: "Sizes",
  render: () => (
    <div className="flex gap-2 items-center p-4">
      <Badge size="sm" variant="accent">sm</Badge>
      <Badge size="md" variant="accent">md</Badge>
    </div>
  ),
};

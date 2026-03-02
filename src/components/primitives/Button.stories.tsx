import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Save, Trash2, Download, Copy, Plus, Loader2 } from "lucide-react";
import { Button } from "./Button";

const meta = {
  title: "Primitives / Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story      = { args: { variant: "primary",   children: "Save Changes" } };
export const Secondary: Story    = { args: { variant: "secondary", children: "Cancel" } };
export const Ghost: Story        = { args: { variant: "ghost",     children: "Dismiss" } };
export const Danger: Story       = { args: { variant: "danger",    children: "Delete Thread" } };

export const Small: Story  = { args: { size: "sm", variant: "primary", children: "Export" } };
export const Large: Story  = { args: { size: "lg", variant: "primary", children: "Open Dashboard" } };

export const WithIconLeft: Story = {
  args: { variant: "primary", children: "Save", iconLeft: <Save size={12} strokeWidth={2} /> },
};

export const WithIconRight: Story = {
  args: { variant: "secondary", children: "Download", iconRight: <Download size={12} strokeWidth={2} /> },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Saving…" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Not available" },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger" iconLeft={<Trash2 size={12} strokeWidth={2} />}>Danger</Button>
      <Button variant="primary" loading>Loading</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-4">
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
};

export const ActionBar: Story = {
  name: "Action Bar (real usage)",
  render: () => (
    <div className="flex items-center gap-2 p-4 border border-grid rounded-sm bg-white dark:bg-[#1a1a1a]">
      <Button variant="primary" size="sm" iconLeft={<Save size={10} strokeWidth={2} />}>Save</Button>
      <Button variant="secondary" size="sm" iconLeft={<Copy size={10} strokeWidth={2} />}>Copy MD</Button>
      <Button variant="secondary" size="sm" iconLeft={<Download size={10} strokeWidth={2} />}>Export</Button>
      <div className="flex-1" />
      <Button variant="danger" size="sm" iconLeft={<Trash2 size={10} strokeWidth={2} />}>Delete</Button>
    </div>
  ),
};

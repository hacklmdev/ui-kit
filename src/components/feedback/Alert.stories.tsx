import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import { Button } from "@/components/primitives/Button";

const meta = {
  title: "Feedback / Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story    = { args: { variant: "info",    children: "Your data is being processed." } };
export const Success: Story = { args: { variant: "success", children: "Conversation saved to vault." } };
export const Warning: Story = { args: { variant: "warning", children: "No backup in 30+ days." } };
export const Error: Story   = { args: { variant: "error",   children: "Failed to reach storage API." } };

export const WithTitle: Story = {
  args: {
    variant: "warning",
    title: "Backup overdue",
    children: "Your last export was more than 30 days ago. Export now to protect your data.",
  },
};

export const Dismissible: StoryObj = {
  name: "Dismissible",
  render: () => {
    const [show, setShow] = useState(true);
    return show ? (
      <Alert variant="info" onDismiss={() => setShow(false)}>
        Pro tip: you can filter threads by provider using the sidebar.
      </Alert>
    ) : (
      <Button size="sm" onClick={() => setShow(true)}>Reset</Button>
    );
  },
};

export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "Backup overdue",
    children: "Export your vault to an offline backup file.",
    action: <Button size="sm" variant="primary">Export now</Button>,
  },
};

export const AllVariants: StoryObj = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Alert variant="info">Syncing in progress…</Alert>
      <Alert variant="success">12 threads saved successfully.</Alert>
      <Alert variant="warning" title="No backup in 30+ days">Export your vault soon.</Alert>
      <Alert variant="error">Failed to parse import file.</Alert>
    </div>
  ),
};

import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatusIndicator, SaveProgressCounter, type SaveStatus } from "./StatusIndicator";

const meta = {
  title: "Feedback / StatusIndicator",
  component: StatusIndicator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select", options: ["idle", "saving", "done", "error"] },
    size:   { control: "range", min: 24, max: 80, step: 4 },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story   = { args: { status: "idle" } };
export const Saving: Story = { args: { status: "saving" } };
export const Done: Story   = { args: { status: "done" } };
export const Error: Story  = { args: { status: "error" } };

export const AllStates: StoryObj = {
  name: "All States",
  render: () => (
    <div className="flex gap-8 p-6">
      <StatusIndicator status="idle" />
      <StatusIndicator status="saving" />
      <StatusIndicator status="done" />
      <StatusIndicator status="error" />
    </div>
  ),
};

export const Animated: StoryObj = {
  name: "Save Cycle (animated)",
  render: () => {
    const cycle: SaveStatus[] = ["idle", "saving", "done", "idle"];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
      if (idx === 0) return;
      const t = setTimeout(() => setIdx((i) => (i + 1) % cycle.length), 1200);
      return () => clearTimeout(t);
    }, [idx]);

    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <StatusIndicator status={cycle[idx]} size={48} />
        {idx === 0 && (
          <button
            onClick={() => setIdx(1)}
            className="font-mono text-xs text-accent hover:underline"
          >
            Trigger save
          </button>
        )}
      </div>
    );
  },
};

export const ProgressCounter: StoryObj = {
  name: "Save Progress Counter",
  render: () => (
    <div className="flex gap-4 items-center p-4">
      <StatusIndicator status="saving" />
      <SaveProgressCounter completed={7} total={12} />
    </div>
  ),
};

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta = {
  title: "Primitives / Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: StoryObj = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle checked={on} onChange={setOn} label="Dark mode" />;
  },
};

export const On: StoryObj = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Toggle checked={on} onChange={setOn} label="Auto-save" />;
  },
};

export const Disabled: StoryObj = {
  render: () => (
    <Toggle checked={false} onChange={() => {}} label="Coming soon" disabled />
  ),
};

export const Group: StoryObj = {
  name: "Settings Group (real usage)",
  render: () => {
    const [settings, setSettings] = useState({
      autoSave: true,
      darkMode: false,
      notifications: true,
    });
    const set = (k: keyof typeof settings) => (v: boolean) =>
      setSettings((s) => ({ ...s, [k]: v }));

    return (
      <div className="flex flex-col gap-4 p-4 w-64 border border-grid rounded-sm bg-surface">
        <p className="text-[10px] font-mono text-faint uppercase tracking-wide">Settings</p>
        <Toggle checked={settings.autoSave} onChange={set("autoSave")} label="Auto-save on navigate" />
        <Toggle checked={settings.darkMode} onChange={set("darkMode")} label="Dark mode" />
        <Toggle checked={settings.notifications} onChange={set("notifications")} label="Backup reminders" />
      </div>
    );
  },
};

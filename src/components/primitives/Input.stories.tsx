import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, Eye, EyeOff } from "lucide-react";
import { Input, Textarea } from "./Input";

const meta = {
  title: "Primitives / Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Enter value…" },
};

export const WithLabel: Story = {
  args: { label: "Thread title", placeholder: "My conversation" },
};

export const WithHint: Story = {
  args: { label: "API endpoint", placeholder: "https://…", hint: "Paste the full URL including protocol." },
};

export const WithError: Story = {
  args: { label: "Email", placeholder: "user@example.com", error: "Must be a valid email address." },
};

export const WithIconLeft: Story = {
  args: {
    placeholder: "Search conversations…",
    iconLeft: <Search size={12} />,
  },
};

export const Sizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input (default)" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
};

export const TextareaStory: StoryObj<typeof Textarea> = {
  name: "Textarea",
  render: () => (
    <div className="w-80">
      <Textarea label="Notes" placeholder="Add notes about this conversation…" hint="Markdown supported." />
    </div>
  ),
};

export const SearchBar: Story = {
  name: "Search Bar (real usage)",
  render: () => {
    const [q, setQ] = useState("");
    return (
      <div className="w-72">
        <Input
          placeholder="Search threads…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          iconLeft={<Search size={12} />}
        />
      </div>
    );
  },
};

export const PasswordField: Story = {
  name: "Password field with toggle",
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div className="w-72">
        <Input
          label="Password"
          type={show ? "text" : "password"}
          placeholder="••••••••"
          iconRight={
            <button onClick={() => setShow(!show)} className="text-faint hover:text-muted transition">
              {show ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
          }
        />
      </div>
    );
  },
};

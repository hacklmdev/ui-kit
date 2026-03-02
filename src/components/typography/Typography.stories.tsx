import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Heading, Text, InlineCode, MonoLabel } from "./Typography";

const meta = {
  title: "Typography / Scale",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-lg">
      <div className="flex items-baseline gap-4">
        <MonoLabel className="w-6">h1</MonoLabel>
        <Heading as="h1">Vault Dashboard</Heading>
      </div>
      <div className="flex items-baseline gap-4">
        <MonoLabel className="w-6">h2</MonoLabel>
        <Heading as="h2">Saved Conversations</Heading>
      </div>
      <div className="flex items-baseline gap-4">
        <MonoLabel className="w-6">h3</MonoLabel>
        <Heading as="h3">ChatGPT (42)</Heading>
      </div>
      <div className="flex items-baseline gap-4">
        <MonoLabel className="w-6">h4</MonoLabel>
        <Heading as="h4">Export / Import</Heading>
      </div>
    </div>
  ),
};

export const BodyText: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3 p-6 max-w-lg">
      <Text size="base">Base body text — used for primary reading content.</Text>
      <Text size="sm">Small body text — default for most UI labels and descriptions.</Text>
      <Text size="xs">Extra-small — metadata, timestamps, helper text.</Text>
      <Text size="sm" variant="muted">Muted variant — secondary information.</Text>
      <Text size="xs" variant="faint">Faint variant — de-emphasised metadata.</Text>
      <Text size="sm" mono>Monospace text — thread IDs, counts, timestamps.</Text>
    </div>
  ),
};

export const CodeAndLabels: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <p className="text-sm">
        The vault stores data as <InlineCode>JSON</InlineCode> in{" "}
        <InlineCode>chrome.storage.local</InlineCode>.
      </p>
      <div className="flex gap-4">
        <MonoLabel>v0.1.0</MonoLabel>
        <MonoLabel uppercase>Settings</MonoLabel>
        <MonoLabel>42 threads</MonoLabel>
      </div>
    </div>
  ),
};

export const DarkMode: StoryObj = {
  render: () => (
    <div className="dark bg-background p-6 flex flex-col gap-4 rounded-sm">
      <Heading as="h1">Dashboard</Heading>
      <Heading as="h2">Threads</Heading>
      <Text size="sm" variant="muted">Secondary text in dark mode.</Text>
      <Text size="xs" variant="faint">Faint text in dark mode.</Text>
      <p className="text-sm text-[#e8e8e8]">
        Use <InlineCode>chrome.storage.local</InlineCode> to persist data.
      </p>
    </div>
  ),
};

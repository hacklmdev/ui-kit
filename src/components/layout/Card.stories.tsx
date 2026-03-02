import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageSquare } from "lucide-react";
import { Card, CardHeader, CardBody, CardFooter, EmptyState } from "./Card";
import { Button } from "@/components/primitives/Button";
import { Heading, Text } from "@/components/typography/Typography";

const meta = {
  title: "Layout / Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: StoryObj = {
  render: () => (
    <Card className="w-72">
      <Text size="sm">A simple card with default medium padding.</Text>
    </Card>
  ),
};

export const WithSlots: StoryObj = {
  name: "With Header / Body / Footer",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <Heading as="h3">ChatGPT</Heading>
        <span className="text-xs font-mono text-faint">42 threads</span>
      </CardHeader>
      <CardBody>
        <Text size="xs" variant="muted">
          Last synced 3 hours ago. Click Export to download a JSON backup.
        </Text>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">Export</Button>
      </CardFooter>
    </Card>
  ),
};

export const EmptyStateStory: StoryObj = {
  name: "Empty State",
  render: () => (
    <Card className="w-80">
      <EmptyState
        icon={<MessageSquare size={32} />}
        title="No conversations yet"
        description="Visit ChatGPT, Claude, Gemini, Perplexity, or Grok to save your first chat."
      />
    </Card>
  ),
};

export const DarkMode: StoryObj = {
  render: () => (
    <div className="dark bg-background p-6 rounded-sm">
      <Card className="w-80">
        <CardHeader>
          <Heading as="h3">Claude</Heading>
        </CardHeader>
        <CardBody>
          <Text size="xs" variant="muted">Content in dark mode.</Text>
        </CardBody>
      </Card>
    </div>
  ),
};

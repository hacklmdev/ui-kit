import type { Meta, StoryObj } from "@storybook/react";
import { HacklmIcon, HacklmLogo } from "./HacklmIcon";

const meta = {
  title: "Brand / HacklmIcon",
  component: HacklmIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HacklmIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story  = { args: { size: 16 } };
export const Default: Story = { args: { size: 24 } };
export const Medium: Story = { args: { size: 48 } };
export const Large: Story  = { args: { size: 128 } };

export const LogoLight: StoryObj<typeof HacklmLogo> = {
  name: "Logo — Light",
  render: (args) => <HacklmLogo {...args} />,
  args: { size: 28 },
};

export const LogoDark: StoryObj<typeof HacklmLogo> = {
  name: "Logo — Dark",
  render: (args) => (
    <div className="dark bg-background p-6 rounded-md">
      <HacklmLogo {...args} />
    </div>
  ),
  args: { size: 28 },
};

export const LogoSizes: StoryObj<typeof HacklmLogo> = {
  name: "Logo — All Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      {([16, 24, 32, 48] as const).map((s) => (
        <div key={s} className="flex items-center gap-4">
          <span className="font-mono text-xs text-faint w-6">{s}</span>
          <HacklmLogo size={s} />
        </div>
      ))}
    </div>
  ),
};

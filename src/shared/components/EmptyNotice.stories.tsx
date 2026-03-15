import type { Meta, StoryObj } from "@storybook/react-vite";
import EmptyNotice from "./EmptyNotice";

const meta = {
  title: "장바구니/장바구니가 빈 경우",
  component: EmptyNotice,
} satisfies Meta<typeof EmptyNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "장바구니가 빈 경우",
  parameters: {
    layout: "padded",
  },
};

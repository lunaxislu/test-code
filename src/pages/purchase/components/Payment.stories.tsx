import type { Meta, StoryObj } from "@storybook/react-vite";
import Payment from "./Payment";

const meta = {
    title: "구매/결제 정보 payment",
    component: Payment,
} satisfies Meta<typeof Payment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react-vite";
import CartTable from ".";

const meta = {
    title: "",
    component: CartTable,
} satisfies Meta<typeof CartTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

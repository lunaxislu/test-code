import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductFilter from ".";

const meta = {
    title: "홈/상품 필터",
    component: ProductFilter,
} satisfies Meta<typeof ProductFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

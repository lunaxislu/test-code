import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductCardSkeleton from "./ProductCardSkeleton";

const meta = {
  title: "로딩페이지/상품카드 스켈레톤",
  component: ProductCardSkeleton,
} satisfies Meta<typeof ProductCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

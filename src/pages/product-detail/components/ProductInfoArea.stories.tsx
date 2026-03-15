import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductInfoArea from "./ProductInfoArea";
import product from "@/mocks/response/product.json";
const meta = {
  title: "상품 상세/상품 상세 이미지 및 설명",

  component: ProductInfoArea,
  argTypes: {
    product: {
      control: "object",
      description: "상품의 정보",
    },
  },
} satisfies Meta<typeof ProductInfoArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "상품 상세 이미지 스와이프 및 설명",
  args: {
    product,
  },
};

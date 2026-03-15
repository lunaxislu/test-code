import type { Meta, StoryObj } from "@storybook/react-vite";
import ActionButtons from "./ActionButtons";
import { fn } from "storybook/test";

const meta = {
  title: "상품 상세/상품 액션 버튼 그룹",
  component: ActionButtons,
  parameters: {
    docs: {
      description: {
        component: "상품 구매, 장바구니 버튼 그룹",
      },
    },
  },
  args: {
    onClickAddCart: fn(),
    onClickPurchase: fn(),
  },
} satisfies Meta<typeof ActionButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "상품 구매 및 장바구니 버튼 그룹",
};

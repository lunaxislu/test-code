import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductCard from "./ProductCard";
import { fn } from "storybook/test";
import product from "@/mocks/response/product.json";
const meta = {
  title: "홈/상품 카드",
  component: ProductCard,
  parameters: {
    docs: {
      description: {
        component: "상품카드",
      },
    },
  },
  args: {
    product: {
      ...product,
    },
    onClickAddCart: fn(),
    onClickCard: fn(),
    onClickPurchase: fn(),
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본",

  parameters: {
    docs: {
      description: {
        story: "기본 상품카드 스토리",
      },
    },
  },
};

export const LongTitle: Story = {
  name: "타이틀이 긴 상품카드",
  parameters: {
    docs: {
      description: {
        story: "타이틀이 긴 상품카드",
      },
    },
  },
  argTypes: {
    product: {
      control: "object",
      description: "상품의 정보",
    },
  },
  args: {
    ...meta.args,
    product: {
      ...meta.args.product,
      title:
        "Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example",
    },
  },
};

export const LongCategoryName: Story = {
  name: "카테고리 이름이 긴 상품카드",
  parameters: {
    docs: {
      description: {
        story: "카테고리 긴 상품카드",
      },
    },
  },
  args: {
    ...meta.args,
    product: {
      ...meta.args.product,
      category: {
        ...meta.args.product.category,
        name: "Long Category Long Category Long Category Long Category Long Category Long Category Long Category Long Category",
      },
    },
  },
};

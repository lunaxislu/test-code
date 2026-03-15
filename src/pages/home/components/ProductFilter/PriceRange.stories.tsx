import type { Meta, StoryObj } from "@storybook/react-vite";
import PriceRange from "./PriceRange";
import { fn } from "storybook/test";
import { useArgs } from "storybook/preview-api";

const meta = {
    title: "홈/상품 필터/가격 검색",
    component: PriceRange,
    args: {
        minPrice: "",
        maxPrice: "",
        onChangeMaxPrice: fn(),
        onChangeMinPrice: fn(),
    },
    render: (args) => {
        const [, updateArgs] = useArgs();
        return (
            <PriceRange
                {...args}
                onChangeMaxPrice={(nextValue) => {
                    args.onChangeMaxPrice(nextValue);
                    updateArgs({ maxPrice: nextValue });
                }}
                onChangeMinPrice={(nextValue) => {
                    args.onChangeMinPrice(nextValue);
                    updateArgs({ minPrice: nextValue });
                }}
            />
        );
    },
} satisfies Meta<typeof PriceRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

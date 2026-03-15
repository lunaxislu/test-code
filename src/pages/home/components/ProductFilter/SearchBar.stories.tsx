import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchBar from "./SearchBar";
import { fn } from "storybook/test";

const meta = {
    title: "홈/상품 필터/상품 검색",
    component: SearchBar,
    args: {
        onChange: fn(),
        value: "",
    },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "기본",
};

export const WithContent: Story = {
    name: "상품이 입력된 상태",
    play: async ({ canvas }) => {
        const input = canvas.getByRole("textbox");
        if (input instanceof HTMLInputElement) {
            input.value = "Handmade Cotton Fish";
        }
        // await userEvent.type(input, "HandSome Cotton Fish");
    },
};

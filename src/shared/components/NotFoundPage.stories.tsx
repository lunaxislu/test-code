import type { Meta, StoryObj } from "@storybook/react-vite";
import NotFoundPage from "./NotFoundPage";

const meta = {
  title: "에러페이지/404페이지",
  component: NotFoundPage,
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react-vite";

import ErrorPage from "./ErrorPage";

const meta = {
  title: "에러페이지/기본 에러 페이지",
  component: ErrorPage,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    viewport: { value: "desktop" },
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

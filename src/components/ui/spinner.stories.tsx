import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta = {
  title: "로딩페이지/기본 로딩페이지",
  component: Spinner,
  argTypes: {
    className: {
      control: "text",
      description: "size 변경하기",
      table: {
        defaultValue: { summary: "size-4" },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

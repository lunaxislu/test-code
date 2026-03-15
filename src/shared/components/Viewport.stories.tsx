import type { Meta, StoryObj } from "@storybook/react-vite";
import EmptyNotice from "./EmptyNotice";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
const meta = {
  title: "Viewport",
  parameters: {
    docs: {
      description: {
        component: "Viewport Stories",
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  globals: {
    viewport: { value: "ipad" },
  },
  component: EmptyNotice,
} satisfies Meta<typeof EmptyNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultGlobalSetViewport: Story = {
  name: "preview 설정 적용",
  parameters: {
    docs: {
      description: {
        story: "Another description on the story, overriding the comments",
      },
    },
  },
};

export const Mobile2: Story = {
  name: "개별 story viewport 설정",
  globals: {
    viewport: { value: "mobile2" },
  },
};

export const NewViewportOptions: Story = {
  name: "meta에서 설정한 새로운 viewport",
};

export const SetDefaultStoryFileViewport: Story = {
  name: "meta에서 설정한 새로운 viewport 옵션에 따른 기본 설정",
};

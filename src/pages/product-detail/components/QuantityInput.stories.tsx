import type { Meta, StoryObj } from "@storybook/react-vite";
import QuantityInput from "./QuantityInput";
import { fn } from "storybook/test";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
  title: "상품 상세/수량",
  component: QuantityInput,
  args: {
    onChange: fn(),
    value: 0,
  },
} satisfies Meta<typeof QuantityInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      story: "Static story이면서 onChange가 작동안함",
    },
  },
};

export const DynamicChangeValue: Story = {
  name: "onChange",
  parameters: {
    docs: {
      story: "onChange로 값 변경",
    },
  },
  args: {
    value: 0,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <QuantityInput
        {...args}
        onChange={(nextValue) => {
          args.onChange(nextValue);
          updateArgs({ value: nextValue });
        }}
      />
    );
  },
};

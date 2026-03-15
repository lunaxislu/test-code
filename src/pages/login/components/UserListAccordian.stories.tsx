import type { Args, Meta, StoryObj } from "@storybook/react-vite";
import UserListAccordion from "./UserListAccordion";
import type { AvailableUser } from "@/shared/types/user";

const mockAvailaleUsers: AvailableUser[] = [
  { id: 1, name: "Coi", email: "coi@example.com", password: "1234" },
  { id: 2, name: "Bao", email: "bao@example.com", password: "12345" },
];
const baseArgs: Args = {
  users: mockAvailaleUsers,
  isLoading: false,
  isError: false,
};
const meta = {
  title: "로그인/사용자 리스트",
  component: UserListAccordion,
  parameters: {
    docs: {
      description: {
        component: "인증가능한 더미 유저 리스트",
      },
    },
  },
  argTypes: {
    users: {
      control: "object",
    },
  },
  args: baseArgs,
} satisfies Meta<typeof UserListAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;
export const DefaultExpanded: Story = {
  name: "기본 펼쳐진 상태",
};
export const Folded: Story = {
  name: "접힌 상태",
  play: async ({ userEvent, canvas }) => {
    await userEvent.click(canvas.getByText("사용 가능한 유저 리스트"));
  },
};

export const LoadingUserList: Story = {
  name: "로딩인 경우",
  parameters: {
    docs: {
      description: {
        story: "로딩 인 경우",
      },
    },
  },
  args: {
    ...baseArgs,
    isLoading: true,
  },
};

export const ErorrUserList: Story = {
  name: "통신 에러인 경우",
  parameters: {
    docs: {
      description: {
        story: "통신 에러 인 경우",
      },
    },
  },
  args: {
    ...baseArgs,
    isError: true,
  },
};

export const EmptyUserList: Story = {
  name: "빈 응답 값인 경우",
  parameters: {
    docs: {
      description: "응답 값이 빈 배열 인 경우",
    },
  },
  args: {
    ...baseArgs,
    users: [],
  },
};

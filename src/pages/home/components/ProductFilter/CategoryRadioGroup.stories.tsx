import type { Meta, StoryObj } from "@storybook/react-vite";
import CategoryRadioGroup from "./CategoryRadioGroup";
import { fn } from "storybook/test";
import { delay, http, HttpResponse } from "msw";
import { apiRoutes } from "@/shared/config/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const API_DOMAIN = "http://localhost:3000";
const meta = {
    title: "홈/상품 필터/카테고리 검색",
    component: CategoryRadioGroup,
    argTypes: {
        categoryId: {
            control: "number",
            description: "카테고리 Id",
        },
    },
    args: {
        onChange: fn(),
        categoryId: 1,
    },
    decorators: [
        (Story) => {
            const queryClient = new QueryClient();
            return (
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            );
        },
    ],
} satisfies Meta<typeof CategoryRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Loading: Story = {
    name: "카테고리 로딩 상태",
    parameters: {
        msw: {
            handlers: [
                http.get(`${API_DOMAIN}${apiRoutes.categories}`, async () => {
                    await delay("infinite");
                }),
            ],
        },
    },
};

export const Empty: Story = {
    name: "빈 응답 결과",
    parameters: {
        msw: {
            handlers: [
                http.get(`${API_DOMAIN}${apiRoutes.categories}`, async () => {
                    return HttpResponse.json([]);
                }),
            ],
        },
    },
};

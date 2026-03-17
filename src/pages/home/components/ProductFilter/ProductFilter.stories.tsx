import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductFilter from ".";
import { useFilterStore } from "@/store/filter-store";
import { delay, http } from "msw";
import { apiRoutes } from "@/shared/config/routes";

import { useQueryClient } from "@tanstack/react-query";
const API_DOMAIN = "http://localhost:3000";
const meta = {
    title: "홈/상품 필터",
    component: ProductFilter,
} satisfies Meta<typeof ProductFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "기본",
    render: () => {
        setFilterState();
        return <ProductFilter />;
    },
};
export const CategoryLoading: Story = {
    name: "카테고리 로딩 상태",
    parameters: {
        msw: {
            handlers: [
                http.get(`${API_DOMAIN}${apiRoutes.categories}`, async () => {
                    await delay(1200);
                }),
            ],
        },
    },
    render: () => {
        const queryClient = useQueryClient();
        queryClient.removeQueries({ queryKey: ["categories"] });
        setFilterState();
        return <ProductFilter />;
    },
};

export const WithKeyword: Story = {
    name: "검색어가 입력된 상태",
    render: () => {
        setFilterState({
            title: "셔츠",
        });
        return <ProductFilter />;
    },
};

export const WithFilters: Story = {
    name: "필터가 적용된 상태",
    render: () => {
        setFilterState({
            categoryId: 1,
            minPrice: "10000",
            maxPrice: "50000",
        });

        return <ProductFilter />;
    },
};

export const Filled: Story = {
    name: "검색어와 필터가 모두 적용된 상태",
    render: () => {
        setFilterState({
            title: "셔츠",
            categoryId: 1,
            minPrice: "10000",
            maxPrice: "50000",
        });

        return <ProductFilter />;
    },
};

function setFilterState(state?: {
    title?: string;
    categoryId?: number | null;
    minPrice?: string;
    maxPrice?: string;
}) {
    const store = useFilterStore.getState();

    store.reset();

    if (!state) return;

    if (state.title !== undefined) store.setTitle(state.title);
    if (state.categoryId !== undefined) store.setCategoryId(state.categoryId);
    if (state.minPrice !== undefined) store.setMinPrice(state.minPrice);
    if (state.maxPrice !== undefined) store.setMaxPrice(state.maxPrice);
}

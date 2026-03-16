import type { CartItem } from "@/shared/types/cart";

const baseCartItem: CartItem = {
    id: 1,
    title: "기본 반팔 티셔츠",
    price: 32000,
    description: "데일리로 입기 좋은 기본 반팔 티셔츠입니다.",
    images: ["https://picsum.photos/seed/cart-item-1/160/160"],
    category: {
        id: 10,
        name: "clothes",
    },
    count: 1,
};

export const defaultItems: CartItem[] = [
    baseCartItem,
    {
        ...baseCartItem,
        id: 2,
        title: "와이드 데님 팬츠",
        price: 54000,
        images: ["https://picsum.photos/seed/cart-item-2/160/160"],
        count: 2,
    },
];

export const longTitleItems: CartItem[] = [
    {
        ...baseCartItem,
        title: "한여름에도 가볍게 입을 수 있는 오버핏 코튼 반팔 티셔츠 한정 컬러 에디션 한여름에도 가볍게 입을 수 있는 오버핏 코튼 반팔 티셔츠 한정 컬러 에디션 한여름에도 가볍게 입을 수 있는 오버핏 코튼 반팔 티셔츠 한정 컬러 에디션",
    },
];

export const manyItems: CartItem[] = [
    ...defaultItems,
    {
        ...baseCartItem,
        id: 3,
        title: "러닝화",
        price: 89000,
        images: ["https://picsum.photos/seed/cart-item-3/160/160"],
        count: 1,
    },
    {
        ...baseCartItem,
        id: 4,
        title: "캔버스 백",
        price: 27000,
        images: ["https://picsum.photos/seed/cart-item-4/160/160"],
        count: 3,
    },
];
export const zeroCountItems: CartItem[] = [
    {
        ...baseCartItem,
        count: 0,
    },
];

export const maxCountItems: CartItem[] = [
    {
        ...baseCartItem,
        count: 999,
    },
];

export const singleItemBeforeEmpty: CartItem[] = [
    {
        ...baseCartItem,
        id: 99,
        title: "마지막 남은 장바구니 상품",
        count: 1,
    },
];

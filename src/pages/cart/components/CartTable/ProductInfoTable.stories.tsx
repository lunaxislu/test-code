import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductInfoTable from "./ProductInfoTable";
import {
    defaultItems,
    longTitleItems,
    manyItems,
    maxCountItems,
    singleItemBeforeEmpty,
} from "./ProductInfo.story-data";
/**
 * 강의 vs 내 프로젝트
 * 강의: Row 단위 스토리로 개념을 잘게 쪼개 설명한다.
 * 내 프로젝트: Table 단위 스토리로 사용자가 실제로 보는 장바구니 화면을 먼저 확인한다.
 *
 * 실무 관점
 * ProductInfoTable
 * -> 개별 Row보다 "장바구니 표 전체"가 책임 단위다.
 * -> 긴 상품명, 여러 상품, 큰 수량, 거의 빈 상태 같은 레이아웃 이슈는
 *    Row 하나보다 Table 맥락에서 확인할 때 더 잘 보인다.
 * -> 그래서 스토리는 상태 시나리오 중심으로 구성하고,
 *    상호작용 검증은 테스트 코드에서 우선 다룬다.
 *
 * 왜 이벤트 전용 story를 기본으로 두지 않는가?
 * - 수량 변경/삭제는 store 변경까지 포함된 런타임 동작이다.
 * - Storybook은 "어떻게 보이는가"를 빠르게 확인하는 도구에 가깝다.
 * - changeCount/remove 호출, 입력 경계값, toast 반응 같은 동작 보장은
 *   play 함수보다 테스트 코드에서 더 엄밀하게 검증하는 편이 유지보수에 유리하다.
 *
 * 현재 스토리의 기준
 * - Default: 기본 장바구니 상태
 * - LongTitle: 긴 상품명으로 인한 셀/줄바꿈 확인
 * - ManyItems: 실제 목록 밀도 확인
 * - MaxCount: 큰 수량 입력 경계값 확인
 * - SingleItemBeforeEmpty: 거의 빈 상태 직전의 균형 확인
 */
const meta = {
    title: "장바구니/상품 항목",
    component: ProductInfoTable,
} satisfies Meta<typeof ProductInfoTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: defaultItems,
    },
};

export const LongTitle: Story = {
    args: {
        items: longTitleItems,
    },
};

export const ManyItems: Story = {
    args: {
        items: manyItems,
    },
};

export const MaxCount: Story = {
    args: {
        items: maxCountItems,
    },
};

export const SingleItemBeforeEmpty: Story = {
    args: {
        items: singleItemBeforeEmpty,
    },
};

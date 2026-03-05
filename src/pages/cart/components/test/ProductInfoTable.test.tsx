import { mockUseCartStore } from "@/test/mockStore";
import { beforeEach, expect, test } from "vitest";
import render from "@/test/setup";

import { screen, within } from "@testing-library/react";
import CartPage from "../..";
import { Route, Routes } from "react-router-dom";
beforeEach(() => {
  mockUseCartStore({
    cart: {
      6: {
        id: 6,
        title: "Handmade Cotton Fish",
        price: 809,
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        images: [
          "https://user-images.githubusercontent.com/35371660/230712070-afa23da8-1bda-4cc4-9a59-50a263ee629f.png",
          "https://user-images.githubusercontent.com/35371660/230711992-01a1a621-cb3d-44a7-b499-20e8d0e1a4bc.png",
          "https://user-images.githubusercontent.com/35371660/230712056-2c468ef4-45c9-4bad-b379-a9a19d9b79a9.png",
        ],
        creationAt: "2023-04-07T20:39:06.000Z",
        updatedAt: "2023-04-07T20:39:06.000Z",
        category: {
          id: 4,
          name: "Shoes",
          creationAt: "2023-04-07T20:39:06.000Z",
          updatedAt: "2023-04-07T20:39:06.000Z",
        },
        count: 4,
      },
      7: {
        id: 7,
        title: "Awesome Concrete Shirt",
        price: 442,
        description:
          "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        images: [
          "https://user-images.githubusercontent.com/35371660/230762100-b119d836-3c5b-4980-9846-b7d32ea4a08f.png",
          "https://user-images.githubusercontent.com/35371660/230762118-46d965ab-7ea8-4e8a-9c0f-3ed90f96e1cd.png",
          "https://user-images.githubusercontent.com/35371660/230762139-002578da-092d-4f34-8cae-2cf3b0dfabe9.png",
        ],
        creationAt: "2023-04-07T20:39:06.000Z",
        updatedAt: "2023-04-07T20:39:06.000Z",
        category: {
          id: 5,
          name: "Others",
          creationAt: "2023-04-07T20:39:06.000Z",
          updatedAt: "2023-04-07T20:39:06.000Z",
        },
        count: 3,
      },
    },
  });
});
test("장바구니 아이템의 이름, 수량 input 값, 행 합계가 올바르게 노출된다.", async () => {
  render(<CartPage />);

  const rowgroups = screen.getAllByRole("rowgroup");
  const tbody = rowgroups[1]; // 0: thead, 1: tbody
  const [first, second] = within(tbody).getAllByRole("row");
  const firstItems = within(first);
  expect(firstItems.getByText("Handmade Cotton Fish")).toBeInTheDocument();
  expect(firstItems.getByRole("spinbutton")).toBeInTheDocument();
  expect(firstItems.getByText("$3,236")).toBeInTheDocument();

  const secondItems = within(second);
  expect(secondItems.getByText("Awesome Concrete Shirt")).toBeInTheDocument();
  expect(secondItems.getByRole("spinbutton")).toBeInTheDocument();
  expect(secondItems.getByText("$1,326")).toBeInTheDocument();
});

test("특정 아이템 수량을 변경하면 행 합계가 재계산되어 업데이트된다.", async () => {
  const { user } = render(<CartPage />);

  const rowgroups = screen.getAllByRole("rowgroup");
  const tbody = rowgroups[1]; // 0: thead, 1: tbody
  const [first] = within(tbody).getAllByRole("row");
  const firstItems = within(first);
  const input = firstItems.getByRole("spinbutton");

  await user.clear(input);
  await user.type(input, "5");

  expect(firstItems.getByText("$4,045")).toBeInTheDocument();
});

test("수량을 1000으로 입력하면 상한 경고 toast로 노출된다.", async () => {
  const { user } = render(<CartPage />);

  const rowgroups = screen.getAllByRole("rowgroup");
  const tbody = rowgroups[1]; // 0: thead, 1: tbody

  const [first] = within(tbody).getAllByRole("row");

  const firstItems = within(first);
  const input = firstItems.getByRole("spinbutton");

  await user.clear(input);
  await user.type(input, "1000");

  expect(
    screen.getByText("수량은 999개 이하로 입력해 주세요."),
  ).toBeInTheDocument();
});
//내 프로젝트: toast.warning("수량은 999개 이하로 입력해 주세요.")

test("특정 아이템의 삭제 버튼 클릭 시 해당 아이템이 목록에서 사라진다.", async () => {
  const { user } = render(<CartPage />);

  const rowgroups = screen.getAllByRole("rowgroup");
  const tbody = rowgroups[1]; // 0: thead, 1: tbody

  const [, second] = within(tbody).getAllByRole("row");
  const secondItems = within(second);

  const deleteButton = secondItems.getByRole("button", { name: "삭제" });
  await user.click(deleteButton);
  expect(screen.queryByText("Awesome Concrete Shirt")).not.toBeInTheDocument();
});

test("장바구니 목록이 아이에 없어지면 Empty Component가 보이고 홈으로 가기 버튼을 클릭하면 홈으로 이동한다.", async () => {
  const { user } = render(
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<h1>홈 페이지</h1>} />
    </Routes>,
    { initialEntries: ["/cart"] }, // 이게 핵심
  );

  while (screen.queryAllByRole("button", { name: "삭제" }).length > 0) {
    await user.click(screen.getAllByRole("button", { name: "삭제" })[0]);
  }
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
  expect(screen.getByText(/텅/)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "홈으로 가기" }));
  expect(
    await screen.findByRole("heading", { name: "홈 페이지" }),
  ).toBeInTheDocument();
});
//
// 통합 테스트 전환 시 확인 포인트
// - useCartStore 초기 상태 주입(setState)
// - 상위(Cart page/CartTable) 렌더 후 ProductInfoTable 반영 확인
// - 입력/삭제 이벤트 이후 store 변경 + 화면(행/합계) 동시 검증

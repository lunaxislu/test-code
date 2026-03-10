import { mockUseCartStore } from "@/test/mockStore";
import { beforeEach, expect, test } from "vitest";
import ItemList from "../ItemList";
import { render, screen, within } from "@testing-library/react";
import { formatCurrency } from "../utils";

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
          id: 1,
          name: "category1",
          creationAt: "2023-04-07T20:39:06.000Z",
          updatedAt: "2023-04-07T20:39:06.000Z",
        },
        count: 3,
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
          id: 2,
          name: "category2",
          creationAt: "2023-04-07T20:39:06.000Z",
          updatedAt: "2023-04-07T20:39:06.000Z",
        },
        count: 4,
      },
    },
  });
});
test("구매 상품들의 이름, 수량, 금액이 순서대로 노출된다.", () => {
  render(<ItemList />);

  const [first, second] = screen.getAllByRole("row");
  const firstItems = within(first);
  const secondItems = within(second);
  expect(firstItems.getByText("Handmade Cotton Fish")).toBeInTheDocument();
  expect(firstItems.getByText(/3/)).toBeInTheDocument();
  expect(firstItems.getByText(formatCurrency(809 * 3))).toBeInTheDocument();

  expect(secondItems.getByText("Awesome Concrete Shirt")).toBeInTheDocument();
  expect(secondItems.getByText(/4/)).toBeInTheDocument();
  expect(secondItems.getByText(formatCurrency(4 * 442)));
});

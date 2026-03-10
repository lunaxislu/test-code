import type { PurchaseFormValues } from "@/shared/types/purchase";
import { mockUseCartStore } from "@/test/mockStore";
import { FormProvider, useForm, type UseFormProps } from "react-hook-form";
import { beforeEach, expect, test } from "vitest";
import Payment from "../Payment";
import { NO_COUPON_ID } from "@/shared/types/coupon";
import render from "@/test/setup";
import { screen } from "@testing-library/react";
beforeEach(() => {
  mockUseCartStore({
    cart: {
      6: {
        id: 6,
        title: "Handmade Cotton Fish",
        price: 100,
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
        price: 50,
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
    totalPrice: 500,
  });
});

const TestPaymentTest = (props: UseFormProps<PurchaseFormValues>) => {
  const methods = useForm({
    defaultValues: {
      name: "asdf",
      address: "",
      phone: "",
      requests: "",
      coupon: NO_COUPON_ID,

      ...props.defaultValues,
    },
  });

  return (
    <FormProvider {...methods}>
      <Payment />
    </FormProvider>
  );
};
test('총 상품 금액은 "$500"로 노출된다', () => {
  render(<TestPaymentTest />);

  expect(screen.getByText("$500")).toBeInTheDocument();
});

test('배송비는 "$5"로 노출된다', () => {
  render(<TestPaymentTest />);

  expect(screen.getByText("$5")).toBeInTheDocument();
});

test('할인 쿠폰을 선택하지 않은 경우 "선택 안함"으로 노출되며, 총 결제 금액은 "$505"로 노출된다', () => {
  render(<TestPaymentTest />);
  expect(screen.getByText("선택 안함")).toBeInTheDocument();

  expect(screen.getByText("$505")).toBeInTheDocument();
});

test('price 타입의 쿠폰인 경우, 총 결제 금액은 "$500"로 노출된다', () => {
  render(
    <TestPaymentTest
      defaultValues={{
        coupon: 1,
      }}
    />,
  );

  expect(screen.getByText("$500")).toBeInTheDocument();
});

test('percent 타입의 쿠폰인 경우, 총 결제 금액은 "$455"로 노출된다', async () => {
  render(
    <TestPaymentTest
      defaultValues={{
        coupon: 3,
      }}
    />,
  );

  // screen.getByText()가 아님 -> useQuery로 coupon값 찾아야하므로 await findByText임
  expect(await screen.findByText("$455")).toBeInTheDocument();
});

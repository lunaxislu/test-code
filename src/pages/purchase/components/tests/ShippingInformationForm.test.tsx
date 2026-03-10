import { NO_COUPON_ID, type CouponListResponse } from "@/shared/types/coupon";
import type { PurchaseFormValues } from "@/shared/types/purchase";
import { screen, waitFor, within } from "@testing-library/react";
import { FormProvider, useForm, type UseFormProps } from "react-hook-form";
import { beforeEach, test } from "vitest";
import ShippingInformationForm from "../ShippingInformationForm";
import render from "@/test/setup";
import response from "@/mocks/response";
import { apiRoutes } from "@/shared/config/routes";
import { expect } from "vitest";
import { describe } from "vitest";

const TestShippingInformationForm = (
  props: UseFormProps<PurchaseFormValues>,
) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      coupon: NO_COUPON_ID,
      requests: "",
      ...props.defaultValues,
    },
  });

  return (
    <FormProvider {...methods}>
      <ShippingInformationForm />
      <button type="button" onClick={methods.handleSubmit(() => {})}>
        테스트 버튼
      </button>
    </FormProvider>
  );
};
test("쿠폰 데이터를 가져오면 정상적으로 쿠폰 항목을 노출한다.", async () => {
  //   const { user } = render(<TestShippingInformationForm />);
  //   const couponResponse = response[apiRoutes.couponList] as CouponListResponse;
  //   const responseCouponList = couponResponse.couponList;
  //   const couponList = await screen.findByRole("combobox", {
  //     name: "쿠폰 리스트",
  //   });
  //   await user.click(couponList);
  // 강의(MUI Select 가능): 클릭이 listbox를 여는 실제 사용자 동작일 수 있다.
  // 내 프로젝트(native select): 클릭이 option을 생성하는 것은 아니고, 비동기 coupon query가 반영될 시간을 한 템포 벌어주는 효과에 가깝다.
  // 그래서 위 코드는 통과할 수 있어도 "클릭해서 보였다"보다 "클릭하는 사이에 데이터 렌더가 끝났다"로 해석하는 편이 정확하다.
  // 내 프로젝트 최신 방식: click 자체보다 option 렌더 완료(findByRole / waitFor)를 직접 기다리는 테스트가 더 엄밀하다.

  //   responseCouponList.forEach((el) => {
  //     const name = el.name;

  //     expect(screen.getByText(name)).toBeInTheDocument();
  //   });
  render(<TestShippingInformationForm />);

  const responseCouponList = (
    response[apiRoutes.couponList] as CouponListResponse
  ).couponList;

  const couponSelect = await screen.findByRole("combobox", {
    name: "쿠폰 리스트",
  });

  await waitFor(() => {
    expect(within(couponSelect).getAllByRole("option")).toHaveLength(
      responseCouponList.length + 1,
    );
  });

  const options = within(couponSelect).getAllByRole("option");

  expect(options[0]).toHaveTextContent("없음");

  responseCouponList.forEach((coupon, idx) => {
    expect(options[idx + 1]).toHaveTextContent(coupon.name);
  });
});

describe("shippingForm required check", () => {
  beforeEach(async () => {
    const { user } = render(<TestShippingInformationForm />);
    const submitBtn = screen.getByRole("button", { name: /테스트 버튼/ });

    await user.click(submitBtn);
  });
  test('이름을 입력하지 않고 폼 전송을 시도하면 "이름을 입력하세요" 텍스트가 노출된다.', async () => {
    expect(await screen.findByText("이름을 입력하세요")).toBeInTheDocument();
  });

  test('주소를 입력하지 않고 폼 전송을 시도하면 "주소를 입력하세요" 텍스트가 노출된다.', async () => {
    expect(await screen.findByText("주소를 입력하세요")).toBeInTheDocument();
  });

  test('휴대폰 번호를 입력하지 않고 폼 전송을 시도하면 "휴대폰 번호를 입력하세요" 텍스트가 노출된다.', async () => {
    expect(
      await screen.findByText("휴대폰 번호를 입력하세요"),
    ).toBeInTheDocument();
  });
});

test('휴대폰 번호의 패턴이 틀린 상태에서 폼 전송을 시도하면 "-를 포함한 휴대폰 번호만 가능합니다" 텍스트가 노출된다.', async () => {
  const { user } = render(
    <TestShippingInformationForm
      defaultValues={{
        phone: "01099999999",
      }}
    />,
  );

  const submitBtn = screen.getByRole("button", { name: /테스트 버튼/ });

  await user.click(submitBtn);

  expect(
    await screen.findByText("-를 포함한 휴대폰 번호만 가능합니다"),
  ).toBeInTheDocument();
});

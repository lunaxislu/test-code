import { screen, within } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import ProductList from "../ProductList";
import render from "@/test/setup";
const PRODUCT_PAGE_LIMIT = 5;
import response from "@/mocks/response/products.json";

import { mockUseCartStore, mockUseUserStore } from "@/test/mockStore";

const navigateFn = vi.fn();
vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});
test("로딩 완료 시 상품 리스트가 모두 노출된다.", async () => {
  //    - 카드별 title / formatted price / category / "장바구니" 버튼 / "구매" 버튼 검증
  render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

  const productCards = await screen.findAllByTestId("product-card");
  const products = response.products;
  productCards.forEach((el, idx) => {
    const product = products[idx];

    expect(within(el).getByText(product.title)).toBeInTheDocument();
    expect(within(el).getByText(`$${product.price}`)).toBeInTheDocument();
    expect(
      within(el).getByText(`카테고리: ${product.category.name}`),
    ).toBeInTheDocument();
  });
});

test('더 보여줄 상품이 있으면 "Show more" 버튼이 노출되고, 클릭 시 리스트가 추가 로드된다.', async () => {
  const { user } = render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

  const moreBtn = await screen.findByRole("button", { name: /show more/i });
  expect(moreBtn).toBeInTheDocument();

  await user.click(moreBtn);

  const productCards = await screen.findAllByTestId("product-card");
  expect(productCards.length).toBeGreaterThan(PRODUCT_PAGE_LIMIT);

  // 이렇게 도 할 수 있고
  //expect(productCards).toHaveLength(PRODUCT_PAGE_LIMIT * 2);
  // 아래 처럼 할 수 있다.
  //   const beforeCards = await screen.findAllByTestId("product-card");
  //   await user.click(moreBtn);
  //   const afterCards = await screen.findAllByTestId("product-card");
  //   expect(afterCards.length).toBeGreaterThan(beforeCards.length);
});
test('더 보여줄 상품이 없으면 "Show more" 버튼이 노출되지 않는다.', async () => {
  render(<ProductList limit={100} />);
  await screen.findAllByTestId("product-card");

  const moreBtn = screen.queryByRole("button", { name: /show more/i });

  expect(moreBtn).not.toBeInTheDocument();
});
describe("로그인 상태일 때 ", () => {
  const addCartFn = vi.fn();

  beforeEach(() => {
    mockUseUserStore({
      isLogin: true,
    });
    mockUseCartStore({
      add: addCartFn,
    });
  });
  test('"구매" 버튼 클릭 시 addCartItem 호출 + "/cart"로 navigate', async () => {
    const { user } = render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);
    const productCards = await screen.findAllByTestId("product-card");
    const purchaseBtn = within(productCards[0]).getByRole("button", {
      name: /구매/,
    });
    await user.click(purchaseBtn);

    expect(addCartFn).toHaveBeenNthCalledWith(1, response.products[0], 1);
    expect(navigateFn).toHaveBeenNthCalledWith(1, "/cart");
  });
  test('"장바구니" 버튼 클릭 시 addCartItem 호출 (강의에서는 toast 문구 노출도 확인)', async () => {
    const { user } = render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);
    const productCards = await screen.findAllByTestId("product-card");
    const cartBtn = within(productCards[0]).getByRole("button", {
      name: /장바구니/,
    });
    await user.click(cartBtn);
    expect(addCartFn).toHaveBeenNthCalledWith(1, response.products[0], 1);
    expect(
      await screen.findByText(
        `${response.products[0].title} 장바구니 추가 완료!`,
      ),
    ).toBeInTheDocument();
  });
});
describe("비로그인 상태일 때", () => {
  test('"구매" 버튼 클릭 시 "/login"으로 navigate', async () => {
    const { user } = render(<ProductList limit={PRODUCT_PAGE_LIMIT} />, {
      initialEntries: ["/prevPath"], // addPurchase의 prevPath에 useLocation 설정 값이 있어서
    });
    const productCards = await screen.findAllByTestId("product-card");
    const purchaseBtn = within(productCards[0]).getByRole("button", {
      name: /구매/,
    });
    await user.click(purchaseBtn);
    expect(navigateFn).toHaveBeenCalledWith("/login", {
      state: { prevPath: "/prevPath" },
    });
  });
  test('"장바구니" 버튼 클릭 시 "/login"으로 navigate', async () => {
    const { user } = render(<ProductList limit={PRODUCT_PAGE_LIMIT} />, {
      initialEntries: ["/prevPath"], // addPurchase의 prevPath에 useLocation 설정 값이 있어서
    });

    const productCards = await screen.findAllByTestId("product-card");
    const addCartBtn = within(productCards[0]).getByRole("button", {
      name: /장바구니/,
    });

    await user.click(addCartBtn);

    expect(navigateFn).toHaveBeenCalledWith("/login", {
      state: { prevPath: "/prevPath" },
    });
  });
});
//첫 상품 클릭 -> "/product/6"
test('상품 카드 클릭 시 "/product/:productId"로 navigate', async () => {
  const { user } = render(<ProductList limit={PRODUCT_PAGE_LIMIT} />, {
    initialEntries: ["/prevPath"], // addPurchase의 prevPath에 useLocation 설정 값이 있어서
  });

  const productCards = await screen.findAllByTestId("product-card");
  const card = productCards[0];

  await user.click(card);

  expect(navigateFn).toHaveBeenCalledWith(
    `/product/${response.products[0].id}`,
  );
});

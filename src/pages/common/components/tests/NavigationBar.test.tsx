import { beforeEach, describe, expect, test, vi } from "vitest";
import render, { server } from "@/test/setup";
import NavigationBar from "../NavigationBar";
import { screen, within } from "@testing-library/react";
import { mockUseCartStore, mockUseUserStore } from "@/test/mockStore";
import type { UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { apiRoutes, pageRoutes } from "@/shared/config/routes";

const navigationFn = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = vi.importActual("react-router-dom");
  return {
    ...original,
    useLocation: () => ({
      pathname: "pathname",
    }),
    useNavigate: () => navigationFn,
  };
});
test('"Wish Mart" 텍스트 로고을 클릭할 경우 "/" 경로로 navigate가 호출된다.', async () => {
  const { user } = render(<NavigationBar />);

  const logo = screen.getByRole("button", { name: /wish mart/i });
  expect(logo).toBeInTheDocument();
  await user.click(logo);

  expect(navigationFn).toHaveBeenCalledWith("/");
});

describe("로그인이 된 경우", () => {
  beforeEach(() => {
    server.use(
      http.get(apiRoutes.profile, () => {
        return HttpResponse.json({
          id: 10,
          name: "Maria",
          email: "test@test.com",
        });
      }),
    );
    mockUseUserStore({
      isLogin: true,
    });

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
          count: 1,
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
          count: 1,
        },
      },
      totalCount: 2,
    });
  });
  test('장바구니(담긴 상품 수와 버튼)와 로그아웃 버튼(사용자 이름: "Maria")이 노출된다.', async () => {
    render(<NavigationBar />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(await screen.findByText("Maria")).toBeInTheDocument();
  });

  test('장바구니 버튼 클릭 시 "/cart" 경로로 navigate를 호출한다.', async () => {
    const { user } = render(<NavigationBar />);
    const cartBtn = screen.getByRole("button", { name: /장바구니/ });
    await user.click(cartBtn);
    expect(navigationFn).toHaveBeenCalledWith("/cart");
  });

  describe('로그아웃 버튼(사용자 이름: "Maria")을 클릭하는 경우', () => {
    let userEvent: UserEvent;
    beforeEach(async () => {
      const { user } = render(<NavigationBar />);
      const logoutBtn = await screen.findByRole("button", { name: /Maria/ });
      userEvent = user;
      await user.click(logoutBtn);
    });
    test('모달이 렌더링되며, 모달 내에 "로그아웃 하시겠습니까?" 텍스트가 렌더링된다.', async () => {
      const modal = await screen.findByRole("alertdialog");

      expect(within(modal).getByText("로그아웃 하시겠습니까?"));
    });

    test("모달의 확인 버튼을 누르면, 로그아웃이 되며, 모달이 사라진다.", async () => {
      const modal = await screen.findByRole("alertdialog");
      await userEvent.click(
        within(modal).getByRole("button", { name: /동의/ }),
      );
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
      // 로그아웃이 된걸 어떻게 유저입장에서 확인하지? -> 로그인 버튼이 보이면됨
      expect(
        await screen.findByRole("button", { name: /로그인/ }),
      ).toBeInTheDocument();
    });

    test("모달의 취소 버튼을 누르면, 모달이 사라진다.", async () => {
      const modal = await screen.findByRole("alertdialog");
      await userEvent.click(
        within(modal).getByRole("button", { name: /취소/ }),
      );
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });
});

describe("로그인이 안된 경우", () => {
  test('로그인 버튼이 노출되며, 클릭 시 "/login" 경로와 현재 pathname인 "pathname"과 함께 navigate를 호출한다.', async () => {
    const { user } = render(<NavigationBar />);
    const loginBtn = screen.getByRole("button", { name: /로그인/ });
    await user.click(loginBtn);

    expect(navigationFn).toHaveBeenCalledWith(pageRoutes.login, {
      state: {
        prevPath: "pathname",
      },
    });
  });
});

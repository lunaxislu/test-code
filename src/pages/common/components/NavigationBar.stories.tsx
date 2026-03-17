import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationBar from "./NavigationBar";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import { http, HttpResponse } from "msw";
import { apiRoutes, pageRoutes } from "@/shared/config/routes";
import { reactRouterParameters } from "storybook-addon-remix-react-router";
const API_DOMAIN = "http://localhost:3000";
const meta = {
    title: "공통/네비게이션바",
    component: NavigationBar,
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                path: pageRoutes.main,
            },
            routing: [
                {
                    path: pageRoutes.main,
                    useStoryElement: true,
                },
                {
                    path: pageRoutes.login,
                    element: <div>Login Page</div>,
                },
                {
                    path: pageRoutes.cart,
                    element: <div>Cart Page</div>,
                },
            ],
        }),
    },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "로그 아웃 상태",
};

export const LoggedIn: Story = {
    name: "로그인 상태",
    render: () => {
        const setIsLogin = useUserStore((state) => state.setIsLogin);
        useEffect(() => {
            setIsLogin(true);

            return () => {
                setIsLogin(false);
            };
        }, [setIsLogin]);
        return <NavigationBar />;
    },
    parameters: {
        msw: {
            handlers: [
                http.get(`${API_DOMAIN}${apiRoutes.profile}`, () => {
                    return HttpResponse.json({
                        id: 10,
                        email: "test@test.com",
                        name: "test",
                    });
                }),
            ],
        },
    },
};

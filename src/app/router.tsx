import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/app/app-layout";
import RouteGuard from "@/app/guards/RouteGuard";
import CartPage from "@/pages/cart";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import ProductDetailPage from "@/pages/product-detail";
import PurchasePage from "@/pages/purchase";
import ErrorPage from "@/shared/components/ErrorPage";
import NotFoundPage from "@/shared/components/NotFoundPage";
import { ROUTE_AUTH_STATUS } from "@/shared/config/auth-policy";
import { pageRoutes } from "@/shared/config/routes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: pageRoutes.main,
        // 내 프로젝트(v7): RouteGuard로 분리해 동일 정책을 라우트 단에서 적용
        element: (
          <RouteGuard authStatus={ROUTE_AUTH_STATUS.COMMON}>
            <HomePage />
          </RouteGuard>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: (
          <RouteGuard authStatus={ROUTE_AUTH_STATUS.NEED_NOT_LOGIN}>
            <LoginPage />
          </RouteGuard>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.productDetail,
        element: (
          <RouteGuard authStatus={ROUTE_AUTH_STATUS.COMMON}>
            <ProductDetailPage />
          </RouteGuard>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.cart,
        element: (
          <RouteGuard authStatus={ROUTE_AUTH_STATUS.NEED_LOGIN}>
            <CartPage />
          </RouteGuard>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: (
          <RouteGuard authStatus={ROUTE_AUTH_STATUS.NEED_LOGIN}>
            <PurchasePage />
          </RouteGuard>
        ),
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;

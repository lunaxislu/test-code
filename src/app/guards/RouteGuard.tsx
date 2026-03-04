import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import type { RouteAuthStatus } from "@/shared/config/auth-policy";
import { ROUTE_AUTH_STATUS } from "@/shared/config/auth-policy";
import { pageRoutes } from "@/shared/config/routes";
import { useUserStore } from "@/store/user-store";

type RouteGuardProps = {
  authStatus?: RouteAuthStatus;
  children: ReactNode;
};

const RouteGuard = ({
  authStatus = ROUTE_AUTH_STATUS.COMMON,
  children,
}: RouteGuardProps) => {
  const location = useLocation();
  const isLogin = useUserStore((state) => state.isLogin);

  if (authStatus === ROUTE_AUTH_STATUS.NEED_LOGIN && !isLogin) {
    return (
      <Navigate
        to={pageRoutes.login}
        replace
        state={{ prevPath: location.pathname }}
      />
    );
  }

  if (authStatus === ROUTE_AUTH_STATUS.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;

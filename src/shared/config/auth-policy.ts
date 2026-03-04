export const ROUTE_AUTH_STATUS = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  COMMON: "COMMON",
} as const;

export type RouteAuthStatus =
  (typeof ROUTE_AUTH_STATUS)[keyof typeof ROUTE_AUTH_STATUS];

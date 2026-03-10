export const pageRoutes = {
  main: "/",
  login: "/login",
  productDetail: "/product/:productId",
  cart: "/cart",
  purchase: "/purchase",
} as const;

export const apiRoutes = {
  users: "/users",
  login: "/login",
  profile: "/user",
  products: "/products",
  product: "/products/:productId",
  categories: "/categories",
  couponList: "/couponList",
  purchase: "/purchase",
};

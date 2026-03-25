import { apiRoutes } from "@/shared/config/routes";
import { http, HttpResponse } from "msw";
import response from "@/mocks/response";
import type { ProductsResponse } from "@/shared/types/product";
import type { LoginCredentials, User } from "@/shared/types/user";
const API_DOMAIN = "http://localhost:3000";
const availableUsers = response[apiRoutes.users].users;
export const handler = [
  ...[apiRoutes.users, apiRoutes.product, apiRoutes.categories].map((path) =>
    http.get(`${API_DOMAIN}${path}`, () => {
      if (path === apiRoutes.users) {
        return HttpResponse.json(availableUsers, { status: 200 });
      }

      return HttpResponse.json(response[path], { status: 200 });
    }),
  ),
  http.get(`${API_DOMAIN}${apiRoutes.products}`, ({ request }) => {
    const data = response[apiRoutes.products] as ProductsResponse;
    const url = new URL(request.url);

    const offset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number(url.searchParams.get("limit") ?? data.products.length);

    const products = data.products.filter(
      (_, idx) => idx >= offset && idx < offset + limit,
    );

    return HttpResponse.json(
      {
        products,
        lastPage: data.products.length <= offset + limit,
      },
      {
        status: 200,
      },
    );
  }),
  http.get(`${API_DOMAIN}${apiRoutes.profile}`, ({ request }) => {
    const accessToken = request.headers.get("Authorization");
    const userId = Number(accessToken?.replace("access_token_", ""));

    if (!accessToken || Number.isNaN(userId)) {
      return HttpResponse.json(null, { status: 401 });
    }

    const user = availableUsers.find((item) => item.id === userId);

    if (!user) {
      return HttpResponse.json(null, { status: 401 });
    }

    return HttpResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      { status: 200 },
    );
  }),
  http.post(`${API_DOMAIN}${apiRoutes.users}`, async ({ request }) => {
    const body = (await request.json()) as User;

    if (body.name === "FAIL") {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.login}`, async ({ request }) => {
    const body = (await request.json()) as LoginCredentials;
    const user = availableUsers.find(
      (item) => item.email === body.email && item.password === body.password,
    );

    if (!user) {
      return HttpResponse.json(null, { status: 401 });
    }

    return HttpResponse.json(
      {
        access_token: `access_token_${user.id}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      },
    );
  }),
  http.get(`${API_DOMAIN}${apiRoutes.couponList}`, () => {
    return HttpResponse.json(response[apiRoutes.couponList], { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.purchase}`, async ({ request }) => {
    const body = (await request.json()) as { name?: string };

    if (body.name === "FAIL") {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(null, { status: 200 });
  }),
];

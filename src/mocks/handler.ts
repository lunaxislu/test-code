import { apiRoutes } from "@/shared/config/routes";
import { http, HttpResponse } from "msw";
import response from "@/mocks/response";
import type { ProductsResponse } from "@/shared/types/product";
import type { User } from "@/shared/types/user";
const API_DOMAIN = "http://localhost:3000";
export const handler = [
  ...[apiRoutes.users, apiRoutes.product, apiRoutes.categories].map((path) =>
    http.get(`${API_DOMAIN}${path}`, () =>
      HttpResponse.json(response[path], { status: 200 }),
    ),
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
  http.get(`${API_DOMAIN}${apiRoutes.profile}`, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.users}`, async ({ request }) => {
    const body = (await request.json()) as User;

    if (body.name === "FAIL") {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.login}`, async ({ request }) => {
    const body = (await request.json()) as User;
    if (body.email === "FAIL@gmail.com") {
      return HttpResponse.json(null, { status: 401 });
    }

    return HttpResponse.json(
      {
        access_token: "access_token",
      },
      {
        status: 200,
      },
    );
  }),
];

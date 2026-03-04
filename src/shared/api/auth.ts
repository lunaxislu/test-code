import { http } from "@/shared/api/http";
import type { User } from "@/shared/types/user";

type LoginPayload = {
  email: string;
  password: string;
};

export const login = async (payload: LoginPayload) => {
  const response = await http.post<User>("/login", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get<User>("/user");
  return response.data;
};

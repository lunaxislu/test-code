import { http } from "@/shared/api/http";
import type {
  AvailableUser,
  LoginCredentials,
  User,
} from "@/shared/types/user";

export const login = async (payload: LoginCredentials) => {
  const response = await http.post<User>("/login", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get<User>("/user");
  return response.data;
};

export const getAvailableUsers = async () => {
  const response = await http.get<AvailableUser[]>("/users");
  return response.data;
};

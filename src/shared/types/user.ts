export type User = {
  id: number;
  name: string;
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AvailableUser = User & {
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: User;
};

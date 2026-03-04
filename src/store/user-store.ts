import { create } from "zustand";

import type { User } from "@/shared/types/user";

type UserStore = {
  isLogin: boolean;
  user: User | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  user: null,
  setIsLogin: (isLogin) => {
    set({ isLogin });
  },
  setUser: (user) => {
    set({ user });
  },
}));

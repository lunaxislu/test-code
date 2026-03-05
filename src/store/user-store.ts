import Cookies from "js-cookie";
import { create } from "zustand";

import type { User } from "@/shared/types/user";

type UserStore = {
  isLogin: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  // 강의: Cookies.get("access_token") 존재 여부로 초기 로그인 상태 결정
  // 내 프로젝트: localStorage 없이 쿠키 기준으로 동일 정책 적용
  isLogin: Boolean(Cookies.get("access_token")),
  user: null,
  login: (user) => {
    set({ isLogin: true, user });
  },
  logout: () => {
    set({ isLogin: false, user: null });
  },
  setIsLogin: (isLogin) => {
    set({ isLogin });
  },
  setUser: (user) => {
    set({ user });
  },
}));

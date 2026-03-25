import Cookies from "js-cookie";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { login as requestLogin } from "@/shared/api/auth";
import { pageRoutes } from "@/shared/config/routes";
import { useUserStore } from "@/store/user-store";

type LoginLocationState = {
  prevPath?: string;
};

const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 형식이 올바르지 않습니다."),
  password: z.string().trim().min(1, "비밀번호를 입력해주세요."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useUserStore((store) => store.login);
  const logout = useUserStore((store) => store.logout);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const state = location.state as LoginLocationState | null;
  // 강의(v6): location.state?.prevPath로 로그인 후 복귀
  // 내 프로젝트(v7): 동일(prevPath) 계약 유지, navigate 시그니처만 현재 버전에 맞춤
  const nextPath = state?.prevPath ?? pageRoutes.main;

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { access_token, user } = await requestLogin(values);
      // 강의(v6): 로그인 응답 access_token을 Cookies.set으로 직접 저장
      // 내 프로젝트(v7): 동일한 쿠키 소유권 정책으로 맞춰 강의 흐름 재현
      Cookies.set("access_token", access_token);
      login(user);

      navigate(nextPath, { replace: true });
    } catch (error) {
      logout();

      if (isAxiosError(error) && error.response?.status === 401) {
        toast.error("이메일 또는 비밀번호가 잘못되었습니다.");
        return;
      }

      toast.error("로그인 중 오류가 발생했습니다.");
    }
  });

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  };
};

import { LogIn } from "lucide-react";

import LoginForm from "@/pages/login/components/LoginForm";
import UserListAccordion from "@/pages/login/components/UserListAccordion";
import { useAvailableUsers } from "@/pages/login/hooks/useAvailableUsers";
import { useLogin } from "@/pages/login/hooks/useLogin";

const LoginPage = () => {
  const { form, isSubmitting, onSubmit } = useLogin();
  const { users, isLoading, isError } = useAvailableUsers();

  // 강의: 페이지 파일에서 폼과 목록을 함께 구성
  // 내 프로젝트: pages는 조합만 담당하고 비즈니스 로직은 hook으로 분리
  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="flex items-center gap-2">
        <LogIn className="size-5" />
        <h1 className="text-2xl font-bold">로그인</h1>
      </div>

      <LoginForm
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />

      <UserListAccordion users={users} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default LoginPage;

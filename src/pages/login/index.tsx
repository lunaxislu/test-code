import { type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { login } from "@/shared/api/auth";
import { pageRoutes } from "@/shared/config/routes";
import { useUserStore } from "@/store/user-store";

type LoginLocationState = {
  prevPath?: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LoginLocationState | null;
  const setIsLogin = useUserStore((store) => store.setIsLogin);
  const setUser = useUserStore((store) => store.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 강의(v6): 로그인 성공 시 location.state?.prevPath로 복귀
  // 내 프로젝트(v7): 동일 key(prevPath) 계약을 먼저 고정해 이후 로그인 구현(B4)에서 그대로 사용
  const nextPath = state?.prevPath ?? pageRoutes.main;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const user = await login({ email, password });
      setUser(user);
      setIsLogin(true);
      navigate(nextPath, { replace: true });
    } catch {
      setUser(null);
      setIsLogin(false);
      setErrorMessage("이메일 또는 비밀번호가 잘못되었습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <p>로그인 성공 후 이동 경로: {nextPath}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};

export default LoginPage;

import Cookies from "js-cookie";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useProfile from "@/pages/common/hooks/useProfile";
import { pageRoutes } from "@/shared/config/routes";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpened, setIsLogoutModalOpened] = useState(false);
  const isLogin = useUserStore((store) => store.isLogin);

  const user = useUserStore((store) => store.user);
  const totalCount = useCartStore((store) => store.totalCount);
  const setIsLogin = useUserStore((store) => store.setIsLogin);
  const setUser = useUserStore((store) => store.setUser);
  const { remove } = useProfile({
    config: {
      enabled: !!isLogin,
      onSuccess: (profile) => {
        // 강의: NavigationBar에서 isLogin 기준으로 profile을 조회하고 user store를 동기화
        // 내 프로젝트: 동일 소유권 규칙으로 /user 응답을 user store에 반영
        setUser(profile);
      },
    },
  });

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  const handleClickLogin = () => {
    navigate(pageRoutes.login);
  };

  const handleClickCart = () => {
    navigate(pageRoutes.cart);
  };

  const handleConfirmLogout = () => {
    remove();
    setIsLogin(false);
    setUser(null);
    // 강의: js-cookie로 access_token 제거
    // 내 프로젝트: localStorage 미사용, 동일하게 쿠키만 정리
    Cookies.remove("access_token");
    setIsLogoutModalOpened(false);
    navigate(pageRoutes.main);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-14 w-full max-w-3xl items-center gap-2 px-4">
          <button
            type="button"
            onClick={handleClickLogo}
            className="cursor-pointer text-lg font-semibold"
          >
            Wish Mart
          </button>
          <div className="ml-auto flex items-center gap-2">
            {isLogin ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="relative"
                  onClick={handleClickCart}
                  aria-label="장바구니"
                >
                  <ShoppingCart className="size-4" />
                  <Badge className="absolute -top-2 -right-2 min-w-5 px-1 text-[10px]">
                    {totalCount}
                  </Badge>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLogoutModalOpened(true)}
                >
                  {user?.name ?? "사용자"}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={handleClickLogin}>
                로그인
              </Button>
            )}
          </div>
        </nav>
      </header>

      <AlertDialog
        open={isLogoutModalOpened}
        onOpenChange={setIsLogoutModalOpened}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>로그아웃 확인</AlertDialogTitle>
            <AlertDialogDescription>
              로그아웃 하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLogout}>
              동의
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NavigationBar;

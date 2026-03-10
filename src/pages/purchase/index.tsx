import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ItemList from "@/pages/purchase/components/ItemList";
import Payment from "@/pages/purchase/components/Payment";
import ShippingInformationForm from "@/pages/purchase/components/ShippingInformationForm";
import { usePurchase } from "@/pages/purchase/hooks/usePurchase";
import { pageRoutes } from "@/shared/config/routes";
import { NO_COUPON_ID } from "@/shared/types/coupon";
import {
  paymentMethod,
  type PurchaseFormValues,
} from "@/shared/types/purchase";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";

const PurchasePage = () => {
  const navigate = useNavigate();
  const clear = useCartStore((store) => store.clear);
  const cart = useCartStore((store) => store.cart);
  const user = useUserStore((store) => store.user);
  const { mutate, isPending } = usePurchase();
  const methods = useForm<PurchaseFormValues>({
    defaultValues: {
      name: user?.name ?? "",
      address: "",
      phone: "",
      requests: "",
      coupon: NO_COUPON_ID,
      payment: paymentMethod.ACCOUNT_TRANSFER,
    },
  });
  const { handleSubmit, setValue, getValues } = methods;

  useEffect(() => {
    if (!user?.name || getValues("name")) {
      return;
    }

    setValue("name", user.name);
  }, [getValues, setValue, user?.name]);

  const handleClickPurchase = handleSubmit((values) => {
    mutate(values, {
      onSuccess: () => {
        clear();
        toast.success("구매 성공!");
        navigate(pageRoutes.main);
      },
      onError: () => {
        toast.error("잠시 문제가 발생했습니다! 다시 시도해 주세요.");
      },
    });
  });

  if (Object.keys(cart).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">구매 물품</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">구매할 상품이 없습니다.</p>
          <Button type="button" onClick={() => navigate(pageRoutes.cart)}>
            장바구니로 이동
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* 강의(MUI Layout): 인증 보호 + 단일 컬럼 섹션 배치 */}
      {/* 내 프로젝트: 기존 AppLayout 안에서 동일한 주문 플로우만 유지 */}
      <section className="space-y-6 pt-2">
        <ShippingInformationForm />
        <ItemList />
        <Payment />
        <div className="flex justify-end">
          <Button
            type="button"
            size="lg"
            disabled={isPending}
            onClick={handleClickPurchase}
          >
            구매하기
          </Button>
        </div>
      </section>
    </FormProvider>
  );
};

export default PurchasePage;

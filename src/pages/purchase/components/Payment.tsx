import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PaymentMethodTableRow from "@/pages/purchase/components/PaymentMethodTableRow";
import useCouponList from "@/pages/purchase/hooks/useCouponList";
import { useCartStore } from "@/store/cart-store";
import { SHIPPING_COST } from "@/shared/types/purchase";

import { formatCurrency, getDiscountPrice } from "./utils";

const Payment = () => {
  const totalPrice = useCartStore((store) => store.totalPrice);
  const { selectedCoupon } = useCouponList();
  const discountPrice = getDiscountPrice({ coupon: selectedCoupon, totalPrice });
  const couponName = selectedCoupon?.name ?? "선택 안함";
  const finalPrice = Math.max(0, totalPrice - discountPrice) + SHIPPING_COST;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">결제정보</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-32 font-semibold">총상품가격</TableCell>
              <TableCell>{formatCurrency(totalPrice)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-32 font-semibold">할인쿠폰</TableCell>
              <TableCell>{couponName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-32 font-semibold">배송비</TableCell>
              <TableCell>{formatCurrency(SHIPPING_COST)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-32 font-semibold">총결제금액</TableCell>
              <TableCell>{formatCurrency(finalPrice)}</TableCell>
            </TableRow>
            <PaymentMethodTableRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Payment;

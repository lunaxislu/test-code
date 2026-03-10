import { useController, useFormContext } from "react-hook-form";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { TableCell, TableRow } from "@/components/ui/table";
import useCouponList from "@/pages/purchase/hooks/useCouponList";
import { NO_COUPON_ID } from "@/shared/types/coupon";
import type { PurchaseFormValues } from "@/shared/types/purchase";

const CouponListTableRow = () => {
  const { control } = useFormContext<PurchaseFormValues>();
  const {
    field: { value, onChange, name },
  } = useController({
    control,
    name: "coupon",
  });
  const { couponList, isPending } = useCouponList();

  return (
    <TableRow>
      <TableCell className="w-32 font-semibold">할인쿠폰</TableCell>
      <TableCell>
        {/* 강의(MUI Select): 비동기 쿠폰 목록을 select에 연결 */}
        {/* 내 프로젝트: native select로 접근성과 테스트 안정성을 유지 */}
        <NativeSelect
          aria-label="쿠폰 리스트"
          className="w-full"
          disabled={isPending}
          name={name}
          value={String(value)}
          onChange={(event) => onChange(Number(event.target.value))}
        >
          <NativeSelectOption value={String(NO_COUPON_ID)}>
            없음
          </NativeSelectOption>
          {couponList.map((coupon) => (
            <NativeSelectOption key={coupon.id} value={String(coupon.id)}>
              {coupon.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </TableCell>
    </TableRow>
  );
};

export default CouponListTableRow;

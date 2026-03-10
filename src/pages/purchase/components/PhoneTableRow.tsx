import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { PHONE_PATTERN } from "@/shared/types/purchase";

const PhoneTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ phone: string }>();

  return (
    <TableRow>
      <TableCell className="w-32 font-semibold">전화번호</TableCell>
      <TableCell>
        <div className="space-y-1">
          <Input
            {...register("phone", {
              required: "휴대폰 번호를 입력하세요",
              pattern: {
                value: PHONE_PATTERN,
                message: "-를 포함한 휴대폰 번호만 가능합니다",
              },
            })}
            placeholder="휴대폰 번호를 입력하세요"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PhoneTableRow;

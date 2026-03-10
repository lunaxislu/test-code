import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

const AddressTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ address: string }>();

  return (
    <TableRow>
      <TableCell className="w-32 font-semibold">주소</TableCell>
      <TableCell>
        <div className="space-y-1">
          <Input
            {...register("address", { required: "주소를 입력하세요" })}
            placeholder="주소를 입력하세요"
            aria-invalid={Boolean(errors.address)}
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AddressTableRow;

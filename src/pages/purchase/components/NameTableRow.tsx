import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

const NameTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ name: string }>();

  return (
    <TableRow>
      <TableCell className="w-32 font-semibold">이름</TableCell>
      <TableCell>
        <div className="space-y-1">
          <Input
            {...register("name", { required: "이름을 입력하세요" })}
            placeholder="이름을 입력하세요"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NameTableRow;

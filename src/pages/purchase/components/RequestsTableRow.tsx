import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { TableCell, TableRow } from "@/components/ui/table";

const RequestsTableRow = () => {
  const { register } = useFormContext<{ requests: string }>();

  return (
    <TableRow>
      <TableCell className="w-32 font-semibold">요청사항</TableCell>
      <TableCell>
        <Textarea {...register("requests")} placeholder="배송 요청사항을 입력하세요" />
      </TableCell>
    </TableRow>
  );
};

export default RequestsTableRow;

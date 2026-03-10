import { useController, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  paymentMethod,
  type PurchaseFormValues,
} from "@/shared/types/purchase";

const paymentOptions = [
  { value: paymentMethod.ACCOUNT_TRANSFER, label: "계좌이체" },
  { value: paymentMethod.CREDIT_CARD, label: "신용/체크카드" },
  { value: paymentMethod.PHONE, label: "휴대폰" },
  { value: paymentMethod.DEPOSIT_WITHOUT_PASSBOOK, label: "무통장입금" },
];

const PaymentMethodTableRow = () => {
  const { control } = useFormContext<PurchaseFormValues>();
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: "payment",
  });

  return (
    <TableRow>
      <TableCell className="w-32 font-semibold">결제 방법</TableCell>
      <TableCell>
        <RadioGroup
          className="grid gap-3 sm:grid-cols-2"
          value={value}
          onValueChange={onChange}
        >
          {paymentOptions.map((option) => (
            <Label
              key={option.value}
              className="flex items-center gap-2 rounded-md border px-3 py-2"
            >
              <RadioGroupItem value={option.value} />
              <span>{option.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </TableCell>
    </TableRow>
  );
};

export default PaymentMethodTableRow;

import { Input } from "@/components/ui/input";

type QuantityInputProps = {
  value: number;
  onChange: (quantity: number) => void;
};

const QuantityInput = ({ value, onChange }: QuantityInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-28"
      />
      <span className="text-sm text-muted-foreground">개</span>
    </div>
  );
};

export default QuantityInput;

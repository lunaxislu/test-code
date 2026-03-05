import { useState } from "react";

import { Input } from "@/components/ui/input";

type QuantityInputProps = {
  value: number;
  onChange: (quantity: number) => void;
};

const QuantityInput = ({ value, onChange }: QuantityInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (nextValue: string) => {
    if (nextValue === "") {
      onChange(0);
      return;
    }

    const parsed = Number(nextValue);
    if (!Number.isFinite(parsed)) {
      return;
    }

    onChange(parsed);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        value={isFocused && value === 0 ? "" : value}
        onFocus={(event) => {
          setIsFocused(true);
          event.currentTarget.select();
        }}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => handleChange(event.target.value)}
        className="w-28"
      />
      <span className="text-sm text-muted-foreground">개</span>
    </div>
  );
};

export default QuantityInput;

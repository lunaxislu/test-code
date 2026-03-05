import { Input } from "@/components/ui/input";

type PriceRangeProps = {
  minPrice: string;
  maxPrice: string;
  onChangeMinPrice: (value: string) => void;
  onChangeMaxPrice: (value: string) => void;
};

const PriceRange = ({
  minPrice,
  maxPrice,
  onChangeMinPrice,
  onChangeMaxPrice,
}: PriceRangeProps) => {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Input
        type="number"
        min={0}
        value={minPrice}
        onChange={(event) => onChangeMinPrice(event.target.value)}
        placeholder="최소 금액"
      />
      <Input
        type="number"
        min={0}
        value={maxPrice}
        onChange={(event) => onChangeMaxPrice(event.target.value)}
        placeholder="최대 금액"
      />
    </div>
  );
};

export default PriceRange;

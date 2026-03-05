import { useQuery } from "@tanstack/react-query";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/shared/api/products";

type CategoryRadioGroupProps = {
  categoryId: number | null;
  onChange: (categoryId: number | null) => void;
};

const ALL_CATEGORY_VALUE = "all";

const CategoryRadioGroup = ({
  categoryId,
  onChange,
}: CategoryRadioGroupProps) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  const selectedValue = categoryId === null ? ALL_CATEGORY_VALUE : String(categoryId);

  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={(value) =>
        onChange(value === ALL_CATEGORY_VALUE ? null : Number(value))
      }
      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
    >
      <Label className="flex items-center gap-2 rounded-md border px-3 py-2">
        <RadioGroupItem value={ALL_CATEGORY_VALUE} />
        전체
      </Label>

      {categories?.map((category) => (
        <Label
          key={category.id}
          className="flex items-center gap-2 rounded-md border px-3 py-2"
        >
          <RadioGroupItem value={String(category.id)} />
          {category.name}
        </Label>
      ))}
    </RadioGroup>
  );
};

export default CategoryRadioGroup;

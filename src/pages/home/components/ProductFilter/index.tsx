import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryRadioGroup from "@/pages/home/components/ProductFilter/CategoryRadioGroup";
import PriceRange from "@/pages/home/components/ProductFilter/PriceRange";
import SearchBar from "@/pages/home/components/ProductFilter/SearchBar";
import { useFilterStore } from "@/store/filter-store";

const ProductFilter = () => {
  const title = useFilterStore((state) => state.title);
  const categoryId = useFilterStore((state) => state.categoryId);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const setTitle = useFilterStore((state) => state.setTitle);
  const setCategoryId = useFilterStore((state) => state.setCategoryId);
  const setMinPrice = useFilterStore((state) => state.setMinPrice);
  const setMaxPrice = useFilterStore((state) => state.setMaxPrice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 필터</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchBar value={title} onChange={setTitle} />
        <CategoryRadioGroup categoryId={categoryId} onChange={setCategoryId} />
        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChangeMinPrice={setMinPrice}
          onChangeMaxPrice={setMaxPrice}
        />
      </CardContent>
    </Card>
  );
};

export default ProductFilter;

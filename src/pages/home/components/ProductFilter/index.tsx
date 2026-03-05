import { useEffect, useState } from "react";

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

  const [localTitle, setLocalTitle] = useState(title);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitle(localTitle);
    }, 300);

    return () => clearTimeout(timer);
  }, [localTitle, setTitle]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinPrice(localMinPrice);
    }, 300);

    return () => clearTimeout(timer);
  }, [localMinPrice, setMinPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxPrice(localMaxPrice);
    }, 300);

    return () => clearTimeout(timer);
  }, [localMaxPrice, setMaxPrice]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 필터</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchBar value={localTitle} onChange={setLocalTitle} />
        <CategoryRadioGroup categoryId={categoryId} onChange={setCategoryId} />
        <PriceRange
          minPrice={localMinPrice}
          maxPrice={localMaxPrice}
          onChangeMinPrice={setLocalMinPrice}
          onChangeMaxPrice={setLocalMaxPrice}
        />
      </CardContent>
    </Card>
  );
};

export default ProductFilter;

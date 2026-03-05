import { useQuery } from "@tanstack/react-query";

import { getProduct } from "@/shared/api/products";

type UseProductOptions = {
  productId: number | null;
};

export const useProduct = ({ productId }: UseProductOptions) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId as number),
    enabled: productId !== null,
  });
};

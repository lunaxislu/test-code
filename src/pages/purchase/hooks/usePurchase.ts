import { useMutation } from "@tanstack/react-query";

import { purchase } from "@/shared/api/purchase";

export const usePurchase = () => {
  return useMutation({
    mutationFn: purchase,
  });
};

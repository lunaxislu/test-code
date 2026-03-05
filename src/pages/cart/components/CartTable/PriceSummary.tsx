import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { pageRoutes } from "@/shared/config/routes";

type PriceSummaryProps = {
  totalCount: number;
  totalPrice: number;
};

const PriceSummary = ({ totalCount, totalPrice }: PriceSummaryProps) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-end gap-2 pt-4">
      <p className="text-sm">
        총 {totalCount.toLocaleString()}개, ${totalPrice.toLocaleString()}
      </p>
      <Button type="button" size="lg" onClick={() => navigate(pageRoutes.purchase)}>
        구매하기
      </Button>
    </section>
  );
};

export default PriceSummary;

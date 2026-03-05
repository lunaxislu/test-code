import { Button } from "@/components/ui/button";

type ActionButtonsProps = {
  onClickAddCart: () => void;
  onClickPurchase: () => void;
};

const ActionButtons = ({
  onClickAddCart,
  onClickPurchase,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button type="button" variant="outline" className="sm:flex-1" onClick={onClickAddCart}>
        장바구니
      </Button>
      <Button type="button" className="sm:flex-1" onClick={onClickPurchase}>
        구매
      </Button>
    </div>
  );
};

export default ActionButtons;

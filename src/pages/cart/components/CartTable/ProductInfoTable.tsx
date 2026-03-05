import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CartItem } from "@/shared/types/cart";
import { useCartStore } from "@/store/cart-store";

const MAX_CART_INPUT = 999;

type ProductInfoTableProps = {
  items: CartItem[];
};

const ProductInfoTable = ({ items }: ProductInfoTableProps) => {
  const remove = useCartStore((state) => state.remove);

  const changeCount = useCartStore((state) => state.changeCount);

  const handleChangeCount = (productId: number) => (nextValue: string) => {
    if (nextValue === "") {
      changeCount(productId, 0);
      return;
    }

    const parsed = Number(nextValue);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0) {
      return;
    }

    if (parsed > MAX_CART_INPUT) {
      // 강의: window.alert로 상한 경고
      // 내 프로젝트: sonner toast.warning으로 같은 경고 의도를 유지(일관된 토스트 UX)
      toast.warning("수량은 999개 이하로 입력해 주세요.");
      return;
    }

    changeCount(productId, parsed);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24 text-center">이미지</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead className="w-36">수량</TableHead>
          <TableHead className="w-32 text-right">행 합계</TableHead>
          <TableHead className="w-20 text-right">삭제</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">
              <img
                src={item.images[0]}
                alt={`${item.title} 썸네일`}
                className="mx-auto h-16 w-16 rounded object-cover"
              />
            </TableCell>
            <TableCell className="max-w-[280px] whitespace-normal">
              {item.title}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  value={item.count}
                  onChange={(event) =>
                    handleChangeCount(item.id)(event.target.value)
                  }
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">개</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">
              ${Number(item.price * item.count).toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="삭제"
                onClick={() => remove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductInfoTable;

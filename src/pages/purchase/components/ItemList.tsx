import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/store/cart-store";

import { formatCurrency } from "./utils";

const ItemList = () => {
  const cart = useCartStore((store) => store.cart);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">구매 물품</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {Object.values(cart).map(({ id, title, count, price }) => (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{count}개</TableCell>
                <TableCell>{formatCurrency(price * count)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ItemList;

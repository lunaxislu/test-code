import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/shared/types/product";

type ProductCardProps = {
  product: Product;
  onClickCard: (productId: number) => void;
  onClickAddCart: (product: Product) => void;
  onClickPurchase: (product: Product) => void;
};

const ProductCard = ({
  product,
  onClickCard,
  onClickAddCart,
  onClickPurchase,
}: ProductCardProps) => {
  const image = product.images[0] ?? "";

  return (
    <Card
      role="button"
      onClick={() => onClickCard(product.id)}
      className="cursor-pointer gap-4 overflow-hidden py-0"
    >
      <img src={image} alt={product.title} className="h-48 w-full object-cover" />
      <CardHeader className="px-4">
        <CardTitle className="line-clamp-1 text-base">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 px-4 text-sm">
        <p className="text-muted-foreground">카테고리: {product.category.name}</p>
        <p className="font-semibold">${product.price}</p>
      </CardContent>
      <CardFooter className="flex gap-2 px-4 pb-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={(event) => {
            event.stopPropagation();
            onClickAddCart(product);
          }}
        >
          장바구니
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={(event) => {
            event.stopPropagation();
            onClickPurchase(product);
          }}
        >
          구매
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

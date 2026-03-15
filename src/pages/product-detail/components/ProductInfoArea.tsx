import type { Product } from "@/shared/types/product";

import ImageSwiper from "./ImageSwiper";
interface Props {
  product: Product;
}
const ProductInfoArea = ({ product }: Props) => {
  return (
    <>
      <ImageSwiper images={product.images} alt={product.title} />

      <div className="space-y-2 text-center">
        <h1 className="line-clamp-2 text-2xl font-semibold italic">
          {product.title}
        </h1>
        <p className="text-xl font-semibold italic">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default ProductInfoArea;

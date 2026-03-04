import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();

  return <div>Product Detail: {productId}</div>;
};

export default ProductDetailPage;

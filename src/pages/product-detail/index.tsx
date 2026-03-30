import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import ActionButtons from "@/pages/product-detail/components/ActionButtons";

import QuantityInput from "@/pages/product-detail/components/QuantityInput";
import { useProduct } from "@/pages/product-detail/hooks/useProduct";
import { pageRoutes } from "@/shared/config/routes";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import ProductInfoArea from "./components/ProductInfoArea";

const MIN_PRODUCT_COUNT = 1;
const MAX_PRODUCT_COUNT = 999;

const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const add = useCartStore((store) => store.add);
    const isLogin = useUserStore((store) => store.isLogin);
    const [quantity, setQuantity] = useState(0);

    const parsedProductId = Number(productId);
    const safeProductId = Number.isFinite(parsedProductId)
        ? parsedProductId
        : null;
    const {
        data: product,
        isPending,
        isError,
    } = useProduct({
        productId: safeProductId,
    });

    const goLogin = () => {
        navigate(pageRoutes.login, {
            state: { prevPath: location.pathname },
        });
    };

    const validateQuantity = () => {
        if (!Number.isInteger(quantity) || quantity < 0) {
            toast.error("올바른 수량을 입력해 주세요.");
            return false;
        }

        if (quantity < MIN_PRODUCT_COUNT) {
            toast.error("수량은 1개 이상이어야 합니다.");
            return false;
        }

        if (quantity > MAX_PRODUCT_COUNT) {
            toast.error("수량은 999개를 초과할 수 없습니다.");
            return false;
        }

        return true;
    };

    const handleChangeQuantity = (nextQuantity: number) => {
        if (!Number.isInteger(nextQuantity) || nextQuantity < 0) {
            return;
        }

        if (nextQuantity > MAX_PRODUCT_COUNT) {
            toast.error("수량은 999개를 초과할 수 없습니다.");
            return;
        }

        setQuantity(nextQuantity);
    };

    const handleClickAddCart = () => {
        if (!product) {
            return;
        }

        if (!isLogin) {
            goLogin();
            return;
        }

        if (!validateQuantity()) {
            return;
        }

        add(product, quantity);
        toast.success(`${product.title} ${quantity}개 장바구니 추가 완료!`);
    };

    const handleClickPurchase = () => {
        if (!product) {
            return;
        }

        if (!isLogin) {
            goLogin();
            return;
        }

        if (!validateQuantity()) {
            return;
        }

        add(product, quantity);
        navigate(pageRoutes.cart);
    };

    if (isPending) {
        return (
            <div className="text-sm text-muted-foreground">
                상품 정보를 불러오는 중...
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="text-sm text-destructive">
                상품 정보를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <section className="mx-auto w-full max-w-xl space-y-6 pt-2">
            <ProductInfoArea product={product} />

            <QuantityInput value={quantity} onChange={handleChangeQuantity} />
            <ActionButtons
                onClickAddCart={handleClickAddCart}
                onClickPurchase={handleClickPurchase}
            />
        </section>
    );
};

export default ProductDetailPage;

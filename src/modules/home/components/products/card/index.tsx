import { memo, useState } from "react";
import Image from "next/image";
import type { ProductItem } from "../types";
import { getFromPrice } from "../utils";
import { useTranslations } from "@/hooks/useTranslations";
import {
  useCartActions,
  useHasProductInCart,
  useProductQuantity,
} from "@/store/cart.store";
import ProductOptionsSheet from "./ProductOptionsSheet";

interface ProductCardProps {
  product: ProductItem;
}

function RawProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const { addToCart } = useCartActions();

  const totalInCart = useProductQuantity(product.id);
  const hasInCart = useHasProductInCart(product.id);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const priceFrom = getFromPrice(product.prices);
  const isCombo = !!product.comboFlavors;

  const handlePrimaryClick = () => {
    setIsSheetOpen(true);
  };

  const handleSubmitFromModal = (payload: {
    priceType: "refrigerated" | "fried";
    quantity: number;
    unitPrice: number;
    selectedFlavors?: Record<string, Record<string, number>>;
    comment?: string;
  }) => {
    addToCart({
      productId: product.id,
      name: t(product.nameKey),
      priceType: payload.priceType,
      quantity: payload.quantity,
      unitPrice: payload.unitPrice,
      selectedFlavors: payload.selectedFlavors,
      comment: payload.comment,
    });
    setIsSheetOpen(false);
  };

  const primaryLabel = hasInCart
    ? t("products.editOrAddMore")
    : t("common.add");

  return (
    <>
      <article className="w-[240px] sm:w-[260px] h-full rounded-2xl bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
        <div className="relative h-[150px] w-full shrink-0">
          <Image
            src="/Banner.png"
            alt={t(product.nameKey)}
            fill
            className="object-cover"
          />
          {totalInCart > 0 && (
            <span className="absolute top-2 right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C62828] px-2 text-xs font-bold text-white shadow-md">
              {totalInCart}
            </span>
          )}
        </div>
        <div className="p-4 text-[#5B2C1D] flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-2">{t(product.nameKey)}</h3>

          {product.contents && (
            <ul className="text-sm mb-3 list-disc list-inside space-y-1">
              {product.contents.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  {item.quantity} {t(`products.flavors.${item.name}`)}
                </li>
              ))}
            </ul>
          )}

          <p className="mb-4 text-sm font-medium text-[#8C5A3A]">
            {t("common.from")}
            <span className="ml-1 text-lg font-extrabold text-[#8B1E1E]">
              ${priceFrom.toLocaleString("es-CO")} COP
            </span>
          </p>

          <div className="mt-auto">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="w-full rounded-lg bg-[#C62828] py-2 font-semibold text-white transition hover:bg-[#AD1F1F] active:scale-[0.97] active:shadow-inner"
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </article>

      <ProductOptionsSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        product={product}
        isCombo={isCombo}
        onSubmit={handleSubmitFromModal}
      />
    </>
  );
}

const ProductCard = memo(RawProductCard);
export default ProductCard;

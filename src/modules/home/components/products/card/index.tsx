import { useState, useMemo } from "react";
import Image from "next/image";
import type { ProductItem } from "../types";
import { getFromPrice } from "../utils";
import { useTranslations } from "@/hooks/useTranslations";
import { useCartActions, useCartItemQuantity } from "@/store/cart.store";
import ProductOptionsSheet, {
  type ProductOption,
  type SheetProduct,
} from "./ProductOptionsSheet";

interface ProductCardProps {
  product: ProductItem;
}

function resolveVariantPrice(value: number | Record<string, number>): number {
  if (typeof value === "number") return value;
  return Math.min(...Object.values(value));
}

function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const { addItem } = useCartActions();
  const quantityInCart = useCartItemQuantity(product.id);
  const hasItemsInCart = quantityInCart > 0;

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const priceFrom = getFromPrice(product.prices);

  const options: ProductOption[] = useMemo(() => {
    const list: ProductOption[] = [];

    if (product.prices.refrigerated != null) {
      list.push({
        id: "refrigerated",
        variant: "refrigerated",
        labelKey: "variants.refrigerated",
        price: resolveVariantPrice(product.prices.refrigerated),
      });
    }

    if (product.prices.fried != null) {
      list.push({
        id: "fried",
        variant: "fried",
        labelKey: "variants.fried",
        price: resolveVariantPrice(product.prices.fried),
      });
    }

    return list;
  }, [product.prices.fried, product.prices.refrigerated]);

  const handlePrimaryAddClick = () => {
    setIsSheetOpen(true);
  };

  const handleAddFromSheet = (option: ProductOption, quantity: number) => {
    addItem({
      id: product.id,
      name: t(product.nameKey),
      variant: option.variant,
      variantLabel: t(option.labelKey),
      unitPrice: option.price,
      quantity,
    });
    setIsSheetOpen(false);
  };

  const sheetProduct: SheetProduct = {
    id: product.id,
    name: t(product.nameKey),
    options,
  };

  return (
    <>
      <article className=" w-[240px] sm:w-[260px] h-full rounded-2xl bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col ">
        <div className="relative h-[150px] w-full shrink-0">
          <Image
            src="/Banner.png"
            alt={t(product.nameKey)}
            fill
            className="object-cover"
          />
          {hasItemsInCart && (
            <span className="absolute top-2 right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C62828] px-2 text-xs font-bold text-white shadow-md">
              {quantityInCart}
            </span>
          )}
        </div>
        <div className="p-4 text-[#5B2C1D] flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-2"> {t(product.nameKey)} </h3>
          {product.contents && (
            <ul className="text-sm mb-3 list-disc list-inside space-y-1">
              {product.contents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <p className="mb-4 text-sm font-medium text-[#8C5A3A]">
            {t("common.from")}
            <span className="ml-1 text-lg font-extrabold text-[#8B1E1E]">
              ${priceFrom.toLocaleString("es-CO")} COP
            </span>
          </p>
          <div className="mt-auto flex flex-col gap-2">
            <button
              type="button"
              onClick={handlePrimaryAddClick}
              className="w-full rounded-lg bg-[#C62828] py-2 font-semibold text-white transition hover:bg-[#AD1F1F] active:scale-[0.97] active:shadow-inner"
            >
              {t("common.add")}
            </button>
          </div>
        </div>
      </article>

      <ProductOptionsSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        product={sheetProduct}
        onAddToCart={handleAddFromSheet}
      />
    </>
  );
}

export default ProductCard;

"use client";

import { memo, useMemo, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import type { ProductItem } from "../types";

interface ProductFlavorsDisplayProps {
  product: ProductItem;
}

const MAX_VISIBLE_FLAVORS = 3;

function RawProductFlavorsDisplay({ product }: ProductFlavorsDisplayProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const allFlavors = useMemo(() => {
    const flavors: string[] = [];

    if (product.comboFlavors) {
      Object.values(product.comboFlavors).forEach((groupFlavors) => {
        flavors.push(...groupFlavors);
      });
    } else if (product.flavors) {
      flavors.push(...product.flavors);
    } else if (product.contents) {
      flavors.push(...product.contents);
    }

    return flavors;
  }, [product.comboFlavors, product.flavors, product.contents]);

  if (allFlavors.length === 0) return null;

  const visibleFlavors = isExpanded
    ? allFlavors
    : allFlavors.slice(0, MAX_VISIBLE_FLAVORS);
  const hiddenCount = allFlavors.length - MAX_VISIBLE_FLAVORS;
  const showExpandButton = allFlavors.length > MAX_VISIBLE_FLAVORS;

  return (
    <div className="mb-3">
      <div
        className="flex flex-wrap gap-1.5 transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? "none" : "3rem",
          overflow: isExpanded ? "visible" : "hidden",
        }}
      >
        {visibleFlavors.map((flavor) => (
          <span
            key={flavor}
            className="inline-flex items-center rounded-full bg-[#F6EEE7] px-2 py-0.5 text-xs text-secondary"
          >
            {flavor}
          </span>
        ))}
      </div>

      {showExpandButton && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1.5 text-xs text-[#8C5A3A] hover:text-[#5B2C1D] transition-colors"
        >
          {isExpanded
            ? t("products.showLess")
            : t("products.showMore", { count: hiddenCount })}
        </button>
      )}
    </div>
  );
}

const ProductFlavorsDisplay = memo(RawProductFlavorsDisplay);
export default ProductFlavorsDisplay;

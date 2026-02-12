"use client";
import ProductCard from "./card";
import type { Category } from "./types";
import { useTranslations } from "@/hooks/useTranslations";
import {
  useIsSectionSelected,
  useSelectedSectionId,
} from "@/store/section.store";

interface ProductsSectionProps {
  category: Category;
}

function ProductsSection({ category }: ProductsSectionProps) {
  const t = useTranslations();

  const selectedSectionId = useSelectedSectionId();
  const isSelected = useIsSectionSelected(category.id);

  const shouldShow = !selectedSectionId || isSelected;

  if (!shouldShow) {
    return null;
  }

  return (
    <section
      id={category.id}
      className="px-4 flex flex-col gap-4 scroll-mt-28"
      aria-labelledby={`${category.id}-title`}
    >
      <h2
        id={`${category.id}-title`}
        className="font-bold text-secondary text-2xl"
      >
        {t(category.i18nKey)}
      </h2>

      {/* Mobile: scroll horizontal | Desktop: grid */}
      <div
        className="
    flex gap-4 overflow-x-auto pb-2
    sm:grid sm:overflow-visible
    sm:grid-cols-[repeat(auto-fill,250px)]
sm:justify-start
    
  "
      >
        {category.items.map((item) => (
          <div key={item.id} className="shrink-0 sm:shrink">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;

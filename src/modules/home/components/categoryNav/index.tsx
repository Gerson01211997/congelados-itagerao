"use client";

import { CATEGORIES } from "@/modules/home/constants";
import { useTranslations } from "@/hooks/useTranslations";
import { useSectionActions, useSelectedSectionId } from "@/store/section.store";

function CategoryNav() {
  const t = useTranslations();
  const selectedSectionId = useSelectedSectionId();
  const { selectSection, deselectSection } = useSectionActions();

  const handleClickCategory = (categoryId: string) => {
    selectSection(categoryId);

    const target = document.getElementById(categoryId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClickAll = () => {
    deselectSection();

    const firstCategory = CATEGORIES[0];
    if (firstCategory) {
      const target = document.getElementById(firstCategory.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
      <button
        type="button"
        onClick={handleClickAll}
        className={`snap-start px-4 py-2 rounded-xl text-sm font-bold bg-[#F6EEE7] text-secondary hover:bg-brand-secondary hover:text-white hover:cursor-pointer transition ${
          !selectedSectionId ? "bg-brand-secondary text-white" : ""
        }`}
      >
        Ver todos
      </button>

      {CATEGORIES.map((category) => {
        const isActive = selectedSectionId === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => handleClickCategory(category.id)}
            className={`snap-start px-4 py-2 rounded-xl text-sm font-bold bg-[#F6EEE7] text-secondary hover:bg-brand-secondary hover:text-white hover:cursor-pointer transition ${
              isActive ? "bg-brand-secondary text-white" : ""
            }`}
          >
            {t(category.i18nKey)}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryNav;

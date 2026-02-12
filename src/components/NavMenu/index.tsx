"use client";

import { className } from "../Header/styles";
import { NAV_LINKS } from "./constants";
import { useTranslations } from "@/hooks/useTranslations";
import type { NavMenuProps } from "./type";
import { useSectionActions, useSelectedSectionId } from "@/store/section.store";

function NavMenu({ isNav = true }: NavMenuProps) {
  const t = useTranslations();
  const selectedSectionId = useSelectedSectionId();
  const { selectSection } = useSectionActions();

  const navBaseClass = className.navLink;

  const pillBaseClass =
    "px-4 py-2 rounded-xl text-sm font-bold bg-[#F6EEE7] text-secondary hover:bg-brand-secondary hover:text-white hover:cursor-pointer transition";

  const navActiveClass =
    "text-primary! font-bold! underline underline-offset-4 decoration-2";

  const pillActiveClass = "bg-brand-secondary text-white";

  const handleClick = (categoryId: string) => {
    selectSection(categoryId);

    const target = document.getElementById(categoryId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return NAV_LINKS.map((link) => {
    const isActive = selectedSectionId === link.id;

    const baseClass = isNav ? navBaseClass : pillBaseClass;
    const activeClass = isActive
      ? isNav
        ? navActiveClass
        : pillActiveClass
      : "";

    return (
      <button
        key={link.id}
        type="button"
        onClick={() => handleClick(link.id)}
        className={`${baseClass} ${activeClass}`}
      >
        {t(link.translationKey)}
      </button>
    );
  });
}

export default NavMenu;

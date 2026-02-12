import { CATEGORIES } from "@/modules/home/constants";

export const NAV_LINKS = CATEGORIES.map((category) => ({
  id: category.id,
  translationKey: category.i18nKey,
}));

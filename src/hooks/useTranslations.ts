"use client";

import { useTranslation } from "@/contexts/TranslationContext";

export function useTranslations() {
  const { t } = useTranslation();
  return t;
}

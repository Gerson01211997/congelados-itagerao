"use client";

import { useTranslation as useTranslationContext } from "@/contexts/TranslationContext";
import { supportedLocales } from "@/lib/translations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslationContext();

  return (
    <div className="flex items-center gap-2">
      {supportedLocales.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          className={`px-3 py-1 text-sm font-medium rounded-xl transition-colors text-secondary border-white border-2 cursor-pointer ${
            locale === lang
              ? "bg-primary text-white"
              : "text-secondary  hover:border-primary hover:border-2"
          }`}
          aria-label={`Cambiar idioma a ${lang}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

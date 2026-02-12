import enTranslations from "@/locales/en.json";
import esTranslations from "@/locales/es.json";

export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";

export const supportedLocales: readonly Locale[] = ["es", "en"];

const translations: Record<Locale, unknown> = {
  es: esTranslations,
  en: enTranslations,
};

function getValueByPath(source: unknown, path: string[]): string | undefined {
  let current: unknown = source;

  for (const key of path) {
    if (typeof current === "object" && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export function getTranslation(
  key: string,
  locale: Locale = defaultLocale,
  params?: Record<string, string | number>,
): string {
  const path = key.split(".");

  let translation =
    getValueByPath(translations[locale], path) ??
    getValueByPath(translations[defaultLocale], path) ??
    key;

  if (params && typeof translation === "string") {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translation = translation.replace(
        new RegExp(`\\{${paramKey}\\}`, "g"),
        String(paramValue),
      );
    });
  }

  return translation;
}

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] ?? translations[defaultLocale];
}

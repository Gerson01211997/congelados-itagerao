import { describe, it, expect } from "vitest";
import {
  getTranslation,
  getTranslations,
  defaultLocale,
  supportedLocales,
  type Locale,
} from "@/lib/translations";

describe("getTranslation", () => {
  it("should return translation for valid key", () => {
    const result = getTranslation("navbar.myBusiness", "es");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should return key if translation not found", () => {
    const result = getTranslation("nonexistent.key", "es");
    expect(result).toBe("nonexistent.key");
  });

  it("should replace parameters in translation", () => {
    const result = getTranslation("test.key", "es", { name: "Test" });
    expect(result).toBeTruthy();
  });

  it("should use default locale when translation not found", () => {
    const result = getTranslation("navbar.myBusiness", "en");
    expect(result).toBeTruthy();
  });
});

describe("getTranslations", () => {
  it("should return translations object for locale", () => {
    const result = getTranslations("es");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("object");
  });

  it("should return default locale translations when locale not found", () => {
    const result = getTranslations("invalid" as Locale);
    expect(result).toBeTruthy();
  });
});

describe("translations constants", () => {
  it("should have default locale", () => {
    expect(defaultLocale).toBe("es");
  });

  it("should have supported locales", () => {
    expect(supportedLocales).toContain("es");
    expect(supportedLocales).toContain("en");
  });
});

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTranslations } from "@/hooks/useTranslations";
import { TranslationProvider } from "@/contexts/TranslationContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe("useTranslations", () => {
  it("should return translation function", () => {
    const { result } = renderHook(() => useTranslations(), { wrapper });
    expect(typeof result.current).toBe("function");
  });

  it("should translate keys correctly", () => {
    const { result } = renderHook(() => useTranslations(), { wrapper });
    const t = result.current;
    const translation = t("navbar.myBusiness");
    expect(translation).toBeTruthy();
    expect(typeof translation).toBe("string");
  });
});

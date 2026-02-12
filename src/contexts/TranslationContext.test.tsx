import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  TranslationProvider,
  useTranslation,
} from "@/contexts/TranslationContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe("TranslationContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should provide default locale", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("es");
  });

  it("should change locale", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    act(() => {
      result.current.setLocale("en");
    });

    expect(result.current.locale).toBe("en");
    expect(localStorage.getItem("locale")).toBe("en");
  });

  it("should translate keys", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    const translation = result.current.t("navbar.myBusiness");
    expect(translation).toBeTruthy();
    expect(typeof translation).toBe("string");
  });

  it("should load locale from localStorage", () => {
    localStorage.setItem("locale", "en");
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("en");
  });

  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useTranslation());
    }).toThrow("useTranslation must be used within a TranslationProvider");
  });
});

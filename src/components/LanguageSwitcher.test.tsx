import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TranslationProvider } from "@/contexts/TranslationContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render language buttons", () => {
    render(<LanguageSwitcher />, { wrapper });
    expect(screen.getByText("ES")).toBeTruthy();
    expect(screen.getByText("EN")).toBeTruthy();
  });

  it("should change language on button click", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />, { wrapper });
    const enButton = screen.getByText("EN");

    await user.click(enButton);

    expect(localStorage.getItem("locale")).toBe("en");
  });

  it("should highlight active language", () => {
    localStorage.setItem("locale", "en");
    render(<LanguageSwitcher />, { wrapper });
    const enButton = screen.getByText("EN");
    expect(enButton.className).toContain("bg-white/20");
  });
});

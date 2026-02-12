import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import AppProvider from "@/providers/AppProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe("AppProvider", () => {
  it("should render children", () => {
    const { container } = render(
      <AppProvider>
        <div>Test Content</div>
      </AppProvider>,
      { wrapper: TestWrapper },
    );

    expect(container.textContent).toContain("Test Content");
  });

  it("should render Header component", () => {
    const { container } = render(
      <AppProvider>
        <div>Test</div>
      </AppProvider>,
      { wrapper: TestWrapper },
    );

    expect(container.querySelector("nav")).toBeTruthy();
  });
});

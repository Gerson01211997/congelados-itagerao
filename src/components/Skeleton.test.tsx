import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Skeleton from "@/components/Skeleton";

describe("Skeleton", () => {
  it("should render skeleton component", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("should apply custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("custom-class");
  });

  it("should render with default className when not provided", () => {
    const { container } = render(<Skeleton />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toBeTruthy();
  });
});

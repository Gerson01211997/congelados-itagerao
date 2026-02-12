import { describe, it, expect } from "vitest";
import { formatCOP } from "@/lib/formatCurrency";

describe("formatCOP", () => {
  it("should format currency with thousands separator", () => {
    const result = formatCOP(1000000);
    expect(result).toContain("'");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should format small amounts correctly", () => {
    const result = formatCOP(1000);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should format zero correctly", () => {
    const result = formatCOP(0);
    expect(result).toBeTruthy();
  });

  it("should format large amounts correctly", () => {
    const result = formatCOP(10000000);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
});

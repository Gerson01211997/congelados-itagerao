import { describe, it, expect } from "vitest";
import { generateDateVariants } from "@/lib/generateDateVariants";

describe("generateDateVariants", () => {
  it("should generate multiple date format variants", () => {
    const date = "2024-01-15";
    const variants = generateDateVariants(date);
    expect(variants).toHaveLength(4);
    expect(Array.isArray(variants)).toBe(true);
  });

  it("should include yyyy-MM-dd format", () => {
    const date = "2024-01-15";
    const variants = generateDateVariants(date);
    expect(variants.some((v) => v.includes("2024-01-15"))).toBe(true);
  });

  it("should include dd/MM/yyyy format", () => {
    const date = "2024-01-15T00:00:00Z";
    const variants = generateDateVariants(date);
    const hasDateFormat = variants.some((v) => /^\d{2}\/\d{2}\/\d{4}/.test(v));
    expect(hasDateFormat).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { normalizeNumberString } from "@/lib/normalizeNumberString";

describe("normalizeNumberString", () => {
  it("should remove dollar signs", () => {
    expect(normalizeNumberString("$100")).toBe("100");
  });

  it("should remove dots", () => {
    expect(normalizeNumberString("1.000")).toBe("1000");
  });

  it("should remove commas", () => {
    expect(normalizeNumberString("1,000")).toBe("1000");
  });

  it("should remove apostrophes", () => {
    expect(normalizeNumberString("1'000")).toBe("1000");
  });

  it("should remove spaces", () => {
    expect(normalizeNumberString("1 000")).toBe("1000");
  });

  it("should remove all special characters", () => {
    expect(normalizeNumberString("$1'000.000,50")).toBe("100000050");
  });

  it("should handle empty string", () => {
    expect(normalizeNumberString("")).toBe("");
  });
});

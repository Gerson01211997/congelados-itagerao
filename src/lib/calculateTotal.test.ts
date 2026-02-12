import { describe, it, expect } from "vitest";
import { calculateTotal } from "@/lib/calculateTotal";

describe("calculateTotal", () => {
  it("should return 0 for empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("should calculate total for transactions with amounts", () => {
    const transactions = [{ amount: 100 }, { amount: 200 }, { amount: 300 }];
    expect(calculateTotal(transactions)).toBe(600);
  });

  it("should handle null and undefined amounts", () => {
    const transactions = [
      { amount: 100 },
      { amount: null },
      { amount: undefined },
      { amount: 200 },
    ];
    expect(calculateTotal(transactions)).toBe(300);
  });

  it("should handle transactions without amount property", () => {
    const transactions = [{}, { amount: 100 }, {}];
    expect(calculateTotal(transactions)).toBe(100);
  });
});

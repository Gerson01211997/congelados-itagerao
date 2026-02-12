import { describe, it, expect } from "vitest";
import { formatDateTime, formatTransactionDate } from "@/lib/formatDateTime";

describe("formatDateTime", () => {
  it("should format date time correctly", () => {
    const date = "2024-01-15T10:30:45Z";
    const result = formatDateTime(date);
    expect(result).toMatch(/\d+\/\d+\/\d+-\d+:\d+:\d+/);
  });

  it("should pad single digit values with zeros", () => {
    const date = "2024-01-05T05:05:05Z";
    const result = formatDateTime(date);
    expect(result).toContain("05");
  });
});

describe("formatTransactionDate", () => {
  it("should format today date correctly", () => {
    const result = formatTransactionDate("today");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should format null as today", () => {
    const result = formatTransactionDate(null);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should format month date correctly", () => {
    const result = formatTransactionDate("month");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
});

import type { PriceVariant } from "./types";

export function getFromPrice(prices: PriceVariant): number {
  const refrigerated = prices.refrigerated;

  if (typeof refrigerated === "number") {
    return refrigerated;
  }

  return Math.min(...Object.values(refrigerated));
}

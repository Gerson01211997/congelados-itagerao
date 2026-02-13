import type { PriceVariant, ProductItem } from "./types";
import { CATEGORIES } from "@/modules/home/constants";

export function getFromPrice(prices: PriceVariant): number {
  const refrigerated = prices.refrigerated;

  if (typeof refrigerated === "number") {
    return refrigerated;
  }

  return Math.min(...Object.values(refrigerated));
}

export function findProductById(productId: string): ProductItem | null {
  for (const category of CATEGORIES) {
    const product = category.items.find((item) => item.id === productId);

    // biome-ignore lint: ignoramos el uso de @ts-ignore en esta línea
    // @ts-ignore
    if (product) return product;
  }
  return null;
}

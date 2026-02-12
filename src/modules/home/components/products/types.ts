export interface PriceVariant {
  refrigerated: number | Record<string, number>;
  fried: number | Record<string, number>;
}

export interface ProductItem {
  id: string;
  nameKey: string;
  descriptionKey?: string;
  contents?: string[];
  flavors?: string[];
  sizes?: Record<string, number>;
  prices: PriceVariant;
}

export interface Category {
  id: string;
  i18nKey: string;
  items: ProductItem[];
}

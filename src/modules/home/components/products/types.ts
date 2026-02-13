export interface PriceVariant {
  refrigerated: number | Record<string, number>;
  fried: number | Record<string, number>;
}

export type ComboFlavors = {
  deditos?: string[];
  empanadas?: string[];
  ojos_de_buey?: string[];
};

export interface ProductItem {
  id: string;
  nameKey: string;
  descriptionKey?: string;
  contents?: string[];
  /** Sabores para productos simples */
  flavors?: string[];
  /** Sabores agrupados por tipo para combos */
  comboFlavors?: ComboFlavors;
  sizes?: Record<string, number>;
  /** Unidades por caja/paquete */
  unit?: number;
  prices: PriceVariant;
}

export interface Category {
  id: string;
  i18nKey: string;
  items: ProductItem[];
}

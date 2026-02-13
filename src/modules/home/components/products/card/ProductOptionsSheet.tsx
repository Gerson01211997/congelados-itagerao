import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import type { ProductItem } from "../types";
import type { CartItem, PriceType, SelectedFlavors } from "@/store/cart.store";

interface ProductOptionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem;
  isCombo: boolean;
  initialCartItem?: CartItem | null;
  onSubmit: (payload: {
    priceType: PriceType;
    quantity: number;
    unitPrice: number;
    selectedFlavors?: SelectedFlavors;
    comment?: string;
  }) => void;
}

const MAX_QUANTITY_PER_ITEM = 20;
const MIN_QUANTITY_PER_ITEM = 1;

function ProductOptionsSheet({
  isOpen,
  onClose,
  product,
  isCombo,
  initialCartItem,
  onSubmit,
}: ProductOptionsSheetProps) {
  const t = useTranslations();

  const [priceType, setPriceType] = useState<PriceType>("refrigerated");
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY_PER_ITEM);
  const [selectedFlavors, setSelectedFlavors] = useState<SelectedFlavors>({});
  const [comment, setComment] = useState<string>("");
  const [selectedMixedFlavors, setSelectedMixedFlavors] = useState<string[]>(
    [],
  );
  const [baseSelectedFlavors, setBaseSelectedFlavors] =
    useState<SelectedFlavors>({});
  const [_lastQuantity, _setLastQuantity] = useState<number>(quantity);

  const isMixedProduct = useMemo(() => {
    const name = product.nameKey.toLowerCase();
    const id = product.id.toLowerCase();
    const contents = product.contents?.join(" ").toLowerCase() ?? "";
    return (
      name.includes("mixto") ||
      id.includes("mixto") ||
      contents.includes("mixto")
    );
  }, [product.nameKey, product.id, product.contents]);

  const availableMixedFlavors = useMemo(() => {
    if (!isMixedProduct) return [];
    if (product.flavors) return product.flavors;
    if (product.contents) {
      const all: string[] = [];

      product.contents.forEach((entry) => {
        if (entry.flavors) {
          all.push(...entry.flavors);
        }
      });

      return [...new Set(all)];
    }

    return [];
  }, [isMixedProduct, product.flavors, product.contents]);

  const totalUnitsForMixed = useMemo(() => {
    if (!isMixedProduct) return 0;

    if (product.contents && product.contents.length > 0) {
      return product.contents.reduce((acc, curr) => acc + curr.quantity, 0);
    }

    return 0;
  }, [isMixedProduct, product.contents]);

  useEffect(() => {
    if (initialCartItem) {
      setPriceType(initialCartItem.priceType);
      setQuantity(initialCartItem.quantity);
      setSelectedFlavors(initialCartItem.selectedFlavors ?? {});
      setComment(initialCartItem.comment ?? "");
      if (isMixedProduct && initialCartItem.selectedFlavors) {
        const mixedFlavors: string[] = [];
        Object.values(initialCartItem.selectedFlavors).forEach((group) => {
          Object.keys(group).forEach((flavor) => {
            if (!mixedFlavors.includes(flavor)) {
              mixedFlavors.push(flavor);
            }
          });
        });
        setSelectedMixedFlavors(mixedFlavors);
      }
    } else {
      setPriceType("refrigerated");
      setQuantity(MIN_QUANTITY_PER_ITEM);
      setSelectedFlavors({});
      setComment("");
      setSelectedMixedFlavors([]);
    }
  }, [initialCartItem, isMixedProduct]);

  const totalUnitsByContent = useMemo(() => {
    const map: Record<string, number> = {};
    (product.contents ?? []).forEach((entry) => {
      map[entry.name] = (map[entry.name] ?? 0) + entry.quantity;
    });
    return map;
  }, [product.contents]);

  useEffect(() => {
    if (!isCombo) return;
    if (Object.keys(selectedFlavors).length > 0) return;

    const initial: SelectedFlavors = {};

    (product.contents ?? []).forEach((entry) => {
      if (entry.flavors && entry.flavors.length > 0) {
        const perFlavor = Math.floor(entry.quantity / entry.flavors.length);
        const remainder = entry.quantity % entry.flavors.length;

        initial[entry.name] = {};

        entry.flavors.forEach((flavor, index) => {
          initial[entry.name][flavor] = perFlavor + (index < remainder ? 1 : 0);
        });
      } else {
        initial[entry.name] = {
          __fixed: entry.quantity,
        };
      }
    });

    setSelectedFlavors(initial);
    setBaseSelectedFlavors(initial); // <-- Aquí guardamos la base
  }, [isCombo, product.contents, selectedFlavors]);

  useEffect(() => {
    if (!isCombo || !baseSelectedFlavors) return;

    const updated: SelectedFlavors = {};

    Object.entries(baseSelectedFlavors).forEach(([group, flavors]) => {
      updated[group] = {};
      Object.entries(flavors).forEach(([flavor, value]) => {
        updated[group][flavor] = value * quantity; // Multiplicación proporcional
      });
    });

    setSelectedFlavors(updated);
  }, [quantity, baseSelectedFlavors, isCombo]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const unitPrice = useMemo(() => {
    if (!product.prices) return 0;
    const base = product.prices[priceType];
    if (!base) return 0;
    if (typeof base === "number") return base;
    return Math.min(...Object.values(base));
  }, [product.prices, priceType]);

  const totalPrice = unitPrice * quantity;

  const totalUnitsPerCombo = useMemo(() => {
    if (!isCombo) return 0;

    return (
      Object.values(totalUnitsByContent).reduce(
        (acc, value) => acc + value,
        0,
      ) * quantity
    );
  }, [isCombo, totalUnitsByContent, quantity]);

  const totalDistributedUnits = useMemo(() => {
    if (!isCombo) return 0;

    let total = 0;

    for (const entry of product.contents ?? []) {
      const groupKey = entry.name;
      const groupMap = selectedFlavors[groupKey] ?? {};

      if (entry.flavors && entry.flavors.length > 0) {
        total += Object.values(groupMap).reduce((a, v) => a + v, 0);
      } else {
        total += groupMap.__fixed ?? 0;
      }
    }

    return total;
  }, [isCombo, product.contents, selectedFlavors]);

  const remainingUnits = totalUnitsPerCombo - totalDistributedUnits;

  const distributionProgress =
    totalUnitsPerCombo > 0
      ? (totalDistributedUnits / totalUnitsPerCombo) * 100
      : 0;

  const isFlavorDistributionValid = useMemo(() => {
    if (!isCombo) return true;

    for (const entry of product.contents ?? []) {
      const groupKey = entry.name;
      const groupMap = selectedFlavors[groupKey] ?? {};
      const target = entry.quantity * quantity;

      const sum =
        entry.flavors && entry.flavors.length > 0
          ? Object.values(groupMap).reduce((a, v) => a + v, 0)
          : (groupMap.__fixed ?? 0);

      if (sum !== target) {
        return false;
      }
    }

    return true;
  }, [isCombo, product.contents, selectedFlavors, quantity]);

  const distributeMixedFlavors = useMemo(() => {
    if (!isMixedProduct || selectedMixedFlavors.length === 0) return {};
    if (totalUnitsForMixed === 0) return {};

    const totalUnits = totalUnitsForMixed * quantity;
    const flavorsCount = selectedMixedFlavors.length;
    const basePerFlavor = Math.floor(totalUnits / flavorsCount);
    const remainder = totalUnits % flavorsCount;

    const distribution: SelectedFlavors = { default: {} };

    selectedMixedFlavors.forEach((flavor, index) => {
      const count = basePerFlavor + (index < remainder ? 1 : 0);
      if (distribution.default) {
        distribution.default[flavor] = count;
      }
    });

    return distribution;
  }, [isMixedProduct, selectedMixedFlavors, totalUnitsForMixed, quantity]);

  const isValid =
    (quantity >= MIN_QUANTITY_PER_ITEM &&
      (!isCombo || isFlavorDistributionValid) &&
      (!isMixedProduct || selectedMixedFlavors.length > 0)) ||
    totalDistributedUnits === totalUnitsPerCombo;

  const updateFlavor = (group: string, flavor: string, value: number) => {
    setSelectedFlavors((prev) => {
      const groupMap = { ...(prev[group] ?? {}) };
      if (value <= 0) {
        delete groupMap[flavor];
      } else {
        groupMap[flavor] = value;
      }
      return {
        ...prev,
        [group]: groupMap,
      };
    });
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const finalSelectedFlavors = isMixedProduct
      ? distributeMixedFlavors
      : Object.keys(selectedFlavors).length
        ? selectedFlavors
        : undefined;

    onSubmit({
      priceType,
      quantity,
      unitPrice,
      selectedFlavors: finalSelectedFlavors,
      comment: comment.trim() || undefined,
    });
  };

  const toggleMixedFlavor = (flavor: string) => {
    setSelectedMixedFlavors((prev) =>
      prev.includes(flavor)
        ? prev.filter((f) => f !== flavor)
        : [...prev, flavor],
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? "bg-black/50 backdrop-blur-sm opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          className={`w-full max-w-md max-h-[80vh] rounded-t-2xl bg-white transform transition-transform duration-300 ease-out pointer-events-auto flex flex-col ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="shrink-0 p-4 pb-2">
            <div className="mb-3 flex items-center justify-center">
              <span className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            <h4 className="text-lg font-bold text-[#5B2C1D] mb-1">
              {t(product.nameKey)}
            </h4>

            {/* Variante */}
            <p className="text-sm text-[#8C5A3A] mb-2">
              {t("modal.selectVariant")}
            </p>
            <div className="flex gap-2 mb-4">
              {(["refrigerated", "fried"] as PriceType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPriceType(type)}
                  className={`flex-1 rounded-full border px-3 py-1 text-sm ${
                    priceType === type
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-gray-300 bg-white text-secondary"
                  }`}
                >
                  {t(`variants.${type}`)}
                </button>
              ))}
            </div>

            {/* Cantidad */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-[#5B2C1D]">
                {t("modal.quantityLabel")}
              </span>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F6EEE7] px-2 py-1 text-xs font-medium text-secondary">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(MIN_QUANTITY_PER_ITEM, prev - 1),
                    )
                  }
                  className="h-7 w-7 rounded-full bg-[#E5D3C3] text-base leading-7 disabled:opacity-50"
                  disabled={quantity <= MIN_QUANTITY_PER_ITEM}
                  aria-label={t("modal.decreaseQuantity")}
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm font-semibold text-secondary">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(MAX_QUANTITY_PER_ITEM, prev + 1),
                    )
                  }
                  className="h-7 w-7 rounded-full bg-[#E5D3C3] text-base leading-7 disabled:opacity-50"
                  disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                  aria-label={t("modal.increaseQuantity")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* Selector de sabores para productos mixto */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
            {isMixedProduct && availableMixedFlavors.length > 0 && (
              <div className="mb-4 rounded-xl bg-[#F9F3EC] p-3">
                <p className="text-sm font-semibold text-[#5B2C1D] mb-2">
                  {t("modal.selectMixedFlavors")}
                </p>
                <p className="text-xs text-[#8C5A3A] mb-3">
                  {t("modal.mixedFlavorsInfo")}
                </p>
                <div className="space-y-2">
                  {availableMixedFlavors.map((flavor) => {
                    const isSelected = selectedMixedFlavors.includes(flavor);
                    const distribution =
                      distributeMixedFlavors.default?.[flavor] ?? 0;
                    return (
                      <label
                        key={flavor}
                        className="flex items-center gap-2 cursor-pointer rounded-lg bg-white px-3 py-2 hover:bg-[#F6EEE7] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleMixedFlavor(flavor)}
                          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="flex-1 text-sm text-[#5B2C1D]">
                          {flavor}
                        </span>
                        {isSelected && distribution > 0 && (
                          <span className="text-xs text-[#8C5A3A] font-semibold">
                            ({distribution})
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sabores combos */}
            {isCombo && !isMixedProduct && (
              <div className="mb-4 space-y-4">
                <p className="text-sm font-semibold text-[#5B2C1D]">
                  {t("modal.flavorsTitle")}
                </p>

                {/* 🔥 Resumen global del combo */}
                <div className="rounded-xl bg-[#F4EDE6] p-4">
                  <div className="flex justify-between text-sm font-semibold text-[#5B2C1D] mb-1">
                    <span>Total del combo</span>
                    <span>{totalUnitsPerCombo} unidades</span>
                  </div>

                  <div className="flex justify-between text-xs text-[#8C5A3A] mb-2">
                    <span>Distribuidas: {totalDistributedUnits}</span>
                    <span>Restantes: {remainingUnits}</span>
                  </div>

                  <div className="h-2 w-full bg-[#E5D3C3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-yellow-500 to-green-600 transition-all"
                      style={{
                        width: `${Math.min(distributionProgress, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* 🔥 Grupos */}
                <div className="max-h-[35vh] pr-1 space-y-3">
                  {(product.contents ?? [])
                    .filter((entry) => entry.quantity > 0)
                    .map((entry) => {
                      const groupKey = entry.name;
                      const flavors = entry.flavors ?? [];
                      const hasFlavors = flavors.length > 0;
                      const groupLabel = t(`products.flavors.${groupKey}`);
                      const groupMap = selectedFlavors[groupKey] ?? {};
                      const sum = Object.values(groupMap).reduce(
                        (a, v) => a + v,
                        0,
                      );
                      console.log({ groupMap, sum }, selectedFlavors[groupKey]);
                      const valid =
                        totalDistributedUnits === totalUnitsPerCombo;
                      return (
                        <div
                          key={groupKey}
                          className="rounded-xl bg-[#F9F3EC] p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-[#5B2C1D]">
                              {groupLabel}
                            </span>
                            <span className="text-[11px] text-[#8C5A3A]">
                              {sum}
                            </span>
                          </div>

                          {hasFlavors ? (
                            <div className="grid grid-cols-2 gap-2">
                              {flavors.map((flavor) => {
                                const value = groupMap[flavor] ?? 0;
                                return (
                                  <div
                                    key={flavor}
                                    className="flex items-center justify-between rounded-lg bg-white px-2 py-1 text-[11px]"
                                  >
                                    <span className="truncate text-[#5B2C1D]">
                                      {flavor}
                                    </span>

                                    <div className="inline-flex items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateFlavor(
                                            groupKey,
                                            flavor,
                                            Math.max(0, value - 1),
                                          )
                                        }
                                        className="h-5 w-5 rounded-full bg-[#E5D3C3] text-[11px]"
                                      >
                                        -
                                      </button>

                                      <span className="w-5 text-center text-[#5B2C1D]">
                                        {value}
                                      </span>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateFlavor(
                                            groupKey,
                                            flavor,
                                            value + 1,
                                          )
                                        }
                                        className="h-5 w-5 rounded-full bg-[#E5D3C3] text-[11px]"
                                        disabled={isValid}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
                              <span className="text-[#5B2C1D]">Cantidad</span>

                              <div className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateFlavor(
                                      groupKey,
                                      "__fixed",
                                      Math.max(0, (groupMap.__fixed ?? 0) - 1),
                                    )
                                  }
                                  className="h-6 w-6 rounded-full bg-[#E5D3C3]"
                                >
                                  -
                                </button>

                                <span className="min-w-6 text-center text-[#5B2C1D]">
                                  {groupMap.__fixed ?? 0}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateFlavor(
                                      groupKey,
                                      "__fixed",
                                      (groupMap.__fixed ?? 0) + 1,
                                    )
                                  }
                                  className="h-6 w-6 rounded-full bg-[#E5D3C3]"
                                  disabled={isValid}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}

                          {valid && (
                            <p className="mt-1 text-[11px] text-red-600">
                              Haz llegado al límite máximo del combo (
                              {totalUnitsPerCombo} unidades)
                            </p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Comentario */}
          <div className="shrink-0 p-4 border-t bg-white">
            <label
              htmlFor="product-comment"
              className="block text-xs font-semibold text-[#5B2C1D] mb-1"
            >
              {t("modal.commentLabel")}
            </label>
            <textarea
              id="product-comment"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-2 py-1 text-xs text-secondary resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
              placeholder={t("modal.commentPlaceholder")}
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full rounded-2xl py-3 font-semibold text-white transition ${
                isValid
                  ? "bg-red-600 hover:bg-red-700 active:scale-[0.97]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {t("modal.addWithQuantityAndTotal", {
                quantity,
                total: totalPrice.toLocaleString("es-CO"),
              })}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductOptionsSheet;

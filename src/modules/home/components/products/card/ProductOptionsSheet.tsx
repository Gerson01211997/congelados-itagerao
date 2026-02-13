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
    const [selectedMixedFlavors, setSelectedMixedFlavors] = useState<string[]>([]);

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
        if (product.comboFlavors) {
            const all: string[] = [];
            Object.values(product.comboFlavors).forEach((flavors) => {
                all.push(...flavors);
            });
            return [...new Set(all)];
        }
        return [];
    }, [isMixedProduct, product.flavors, product.comboFlavors]);

    const totalUnitsForMixed = useMemo(() => {
        if (!isMixedProduct) return 0;
        
        if (product.contents && product.contents.length > 0) {
            const match = product.contents[0]?.match(/(\d+)/);
            if (match) return Number(match[1]);
        }
        
        if (product.unit) {
            return product.unit;
        }
        
        return 0;
    }, [isMixedProduct, product.contents, product.unit]);

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

    const totalUnitsByContent = useMemo(() => {
        const map: Record<string, number> = {};
        (product.contents ?? []).forEach((entry) => {
            const match = entry.match(/(\d+)\s+(.+)/);
            if (!match) return;
            const count = Number(match[1]);
            const label = match[2].toLowerCase();
            map[label] = (map[label] ?? 0) + count;
        });
        return map;
    }, [product.contents]);

    const isFlavorDistributionValid = useMemo(() => {
        if (!isCombo || !product.comboFlavors) return true;

        for (const [group] of Object.entries(product.comboFlavors)) {
            const target = totalUnitsByContent[group] ?? 0;
            const groupMap = selectedFlavors[group] ?? {};
            const sum = Object.values(groupMap).reduce((acc, v) => acc + v, 0);
            if (target > 0 && sum !== target * quantity) {
                return false;
            }
        }

        return true;
    }, [isCombo, product.comboFlavors, selectedFlavors, totalUnitsByContent, quantity]);

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
        quantity >= MIN_QUANTITY_PER_ITEM &&
        (!isCombo || isFlavorDistributionValid) &&
        (!isMixedProduct || selectedMixedFlavors.length > 0);

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
                className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen ? "bg-black/50 backdrop-blur-sm opacity-100" : "pointer-events-none opacity-0"
                    }`}
                aria-hidden={!isOpen}
                onClick={onClose}
            />

            <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
                <div
                    role="dialog"
                    aria-modal="true"
                    className={`w-full max-w-md rounded-t-2xl bg-white p-4 pb-6 transform transition-transform duration-300 ease-out pointer-events-auto ${isOpen ? "translate-y-0" : "translate-y-full"
                        }`}
                >
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
                                className={`flex-1 rounded-full border px-3 py-1 text-sm ${priceType === type
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
                                    setQuantity((prev) => Math.max(MIN_QUANTITY_PER_ITEM, prev - 1))
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
                                    setQuantity((prev) => Math.min(MAX_QUANTITY_PER_ITEM, prev + 1))
                                }
                                className="h-7 w-7 rounded-full bg-[#E5D3C3] text-base leading-7 disabled:opacity-50"
                                disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                                aria-label={t("modal.increaseQuantity")}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Selector de sabores para productos mixto */}
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
                                    const distribution = distributeMixedFlavors.default?.[flavor] ?? 0;
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
                    {isCombo && product.comboFlavors && !isMixedProduct && (
                        <div className="mb-4 space-y-3">
                            <p className="text-sm font-semibold text-[#5B2C1D]">
                                {t("modal.flavorsTitle")}
                            </p>
                            {Object.entries(product.comboFlavors).map(([groupKey, flavors]) => {
                                const groupLabel = t(`products.flavors.${groupKey}`);
                                const targetUnits = totalUnitsByContent[groupKey] ?? 0;
                                const groupMap = selectedFlavors[groupKey] ?? {};
                                const sum = Object.values(groupMap).reduce(
                                    (acc, v) => acc + v,
                                    0,
                                );
                                const required = targetUnits * quantity;
                                const valid = sum === required;

                                return (
                                    <div key={groupKey} className="rounded-xl bg-[#F9F3EC] p-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-semibold text-[#5B2C1D]">
                                                {groupLabel}
                                            </span>
                                            <span className="text-[11px] text-[#8C5A3A]">
                                                {t("modal.flavorsSummary", {
                                                    current: sum,
                                                    required,
                                                })}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {flavors.map((flavor) => {
                                                const value = groupMap[flavor] ?? 0;
                                                return (
                                                    <div
                                                        key={flavor}
                                                        className="flex items-center justify-between rounded-lg bg-white px-2 py-1 text-[11px]"
                                                    >
                                                        <span className="mr-2 text-[#5B2C1D] truncate">
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
                                                                className="h-5 w-5 rounded-full bg-[#E5D3C3] text-[11px] leading-5"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-5 text-center">{value}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateFlavor(groupKey, flavor, value + 1)
                                                                }
                                                                className="h-5 w-5 rounded-full bg-[#E5D3C3] text-[11px] leading-5"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {!valid && (
                                            <p className="mt-1 text-[11px] text-red-600">
                                                {t("modal.flavorsError")}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Comentario */}
                    <div className="mb-4">
                        <label htmlFor="product-comment" className="block text-xs font-semibold text-[#5B2C1D] mb-1">
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
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`w-full rounded-2xl py-3 font-semibold text-white transition ${isValid
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
        </>
    );
}

export default ProductOptionsSheet;

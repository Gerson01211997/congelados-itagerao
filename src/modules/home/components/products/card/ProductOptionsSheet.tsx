import { useEffect, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";

export interface ProductOption {
  id: "refrigerated" | "fried" | (string & {});
  labelKey: string;
  variant: "refrigerated" | "fried";
  price: number;
}

export interface SheetProduct {
  id: string;
  name: string;
  options: ProductOption[];
}

interface ProductOptionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: SheetProduct;
  onAddToCart: (option: ProductOption, quantity: number) => void;
}

const MAX_QUANTITY_PER_ITEM = 20;
const MIN_QUANTITY_PER_ITEM = 1;

function ProductOptionsSheet({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductOptionsSheetProps) {
  const t = useTranslations();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY_PER_ITEM);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setSelectedOptionId(null);
      setQuantity(MIN_QUANTITY_PER_ITEM);
    }
  }, [isOpen]);

  // Close on Escape
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

  const selectedOption =
    product.options.find((opt) => opt.id === selectedOptionId) ?? null;

  const handleAddClick = () => {
    if (!selectedOption) return;
    onAddToCart(selectedOption, quantity);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(MIN_QUANTITY_PER_ITEM, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(MAX_QUANTITY_PER_ITEM, prev + 1));
  };

  const totalPrice = selectedOption ? selectedOption.price * quantity : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? "bg-black/50 backdrop-blur-sm opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={onClose}
      />

      {/* Container */}
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-options-title"
          className={`w-full max-w-md rounded-t-2xl bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.2)] p-4 pb-6 transform transition-transform duration-300 ease-out pointer-events-auto ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Drag Indicator */}
          <div className="mb-3 flex items-center justify-center">
            <span className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>

          {/* Title */}
          <h4
            id="product-options-title"
            className="text-lg font-bold text-[#5B2C1D] mb-1"
          >
            {product.name}
          </h4>

          <p className="text-sm text-[#8C5A3A] mb-4">
            {t("modal.selectVariant")}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-5">
            {product.options.map((option) => {
              const isSelected = option.id === selectedOptionId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`w-full flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-red-600 bg-red-50"
                      : "border-gray-300 bg-white hover:border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
                        isSelected
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-gray-300 bg-white text-transparent"
                      }`}
                    >
                      ✓
                    </div>

                    <span className="text-sm font-medium text-[#5B2C1D]">
                      {t(option.labelKey)}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-[#8B1E1E]">
                    ${option.price.toLocaleString("es-CO")} COP
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quantity */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium text-[#5B2C1D]">
              {t("modal.quantityLabel")}
            </span>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#F6EEE7] px-2 py-1 text-xs font-medium text-secondary">
              <button
                type="button"
                onClick={handleDecrement}
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
                onClick={handleIncrement}
                className="h-7 w-7 rounded-full bg-[#E5D3C3] text-base leading-7 disabled:opacity-50"
                disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                aria-label={t("modal.increaseQuantity")}
              >
                +
              </button>
            </div>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddClick}
            disabled={!selectedOption}
            className={`w-full rounded-2xl py-3 font-semibold text-white transition ${
              selectedOption
                ? "bg-red-600 hover:bg-red-700 active:scale-[0.97]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedOption
              ? t("modal.addWithQuantityAndTotal", {
                  quantity,
                  total: totalPrice.toLocaleString("es-CO"),
                })
              : t("modal.selectOptionPlaceholder")}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductOptionsSheet;

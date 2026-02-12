"use client";

import CloseIcon from "@/components/icons/CloseIcon";
import { formatCOP } from "@/lib/formatCurrency";
import { className } from "@/modules/home/components/sidePanel/style";
import {
  useCartActions,
  useCartIsOpen,
  useCartItems,
  useCartTotals,
} from "@/store/cart.store";
import { memo, useMemo } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { buildWhatsAppMessage } from "@/lib/buildWhatsAppMessage";

function CartSidePanel() {
  const t = useTranslations();
  const isOpen = useCartIsOpen();
  const items = useCartItems();
  const { subtotal, total } = useCartTotals();
  const { closeCart, clearCart, removeItem, updateQuantity } = useCartActions();

  const handleOverlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target === event.currentTarget) {
      closeCart();
    }
  };

  const hasItems = items.length > 0;

  const whatsappUrl = useMemo(() => {
    if (!hasItems) return "#";
    const message = buildWhatsAppMessage(items, total, t);
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
    const baseUrl = "https://wa.me";
    const phonePath = phone ? `/${phone}` : "";
    return `${baseUrl}${phonePath}?text=${encodeURIComponent(message)}`;
  }, [hasItems, items, total, t]);

  return (
    <>
      <button
        type="button"
        onClick={handleOverlayClick}
        className={className.overlay(isOpen, true)}
        aria-label={t("cart.closeAria")}
      />

      <div
        className={className.panel(isOpen, true)}
        role="dialog"
        aria-modal={isOpen ? "true" : "false"}
        aria-labelledby="cart-panel-title"
      >
        <div className={className.closeButtonContainer}>
          <button
            type="button"
            onClick={closeCart}
            className={className.closeButton}
            aria-label={t("cart.closeAria")}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(100%-60px)] flex-col justify-between px-6 pb-6 pt-0">
          <div className="space-y-4 overflow-y-auto pb-4">
            <h2
              id="cart-panel-title"
              className="text-lg font-bold text-secondary"
            >
              {t("cart.title")}
            </h2>

            {!hasItems && (
              <p className="text-sm text-gray-500">{t("cart.empty")}</p>
            )}

            {hasItems && (
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li
                    key={`${item.id}-${item.variant}-${index}`}
                    className="flex items-start justify-between rounded-xl bg-[#F6EEE7] px-3 py-3"
                  >
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-secondary">
                          {item.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          {t("cart.remove")}
                        </button>
                      </div>

                      <p className="text-xs text-secondary">
                        <span className="font-semibold">
                          {t("cart.typeLabel")}
                          {": "}
                        </span>
                        {item.variantLabel}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-xs font-medium text-secondary">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.variant,
                                item.quantity - 1,
                              )
                            }
                            className="h-6 w-6 rounded-full bg-[#E5D3C3] text-center text-base leading-6"
                            aria-label={t("cart.decreaseQuantity")}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.variant,
                                item.quantity + 1,
                              )
                            }
                            className="h-6 w-6 rounded-full bg-[#E5D3C3] text-center text-base leading-6"
                            aria-label={t("cart.increaseQuantity")}
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-secondary">
                          {formatCOP(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-3 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary font-semibold">
                {t("cart.subtotal")}
              </span>
              <span className="text-secondary font-bold">
                {formatCOP(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-base">
              <span className="text-secondary font-bold">
                {t("cart.total")}
              </span>
              <span className="text-primary text-lg font-extrabold">
                {formatCOP(total)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearCart}
                className="w-1/3 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-secondary hover:bg-gray-100"
                disabled={!hasItems}
              >
                {t("cart.clear")}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-2/3 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1EBE5A] disabled:opacity-60"
                aria-disabled={!hasItems}
                onClick={(event) => {
                  if (!hasItems) {
                    event.preventDefault();
                  }
                }}
              >
                {t("cart.orderByWhatsApp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(CartSidePanel);

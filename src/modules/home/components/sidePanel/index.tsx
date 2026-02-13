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
import { memo, useMemo, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/buildWhatsAppMessage";
import ProductOptionsSheet from "../products/card/ProductOptionsSheet";
import { findProductById } from "../products/utils";

function CartSidePanel() {
  const t = useTranslations();
  const isOpen = useCartIsOpen();
  const items = useCartItems();
  const { subtotal, total } = useCartTotals();
  const { closeCart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity, updateCartItem } =
    useCartActions();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target === event.currentTarget) {
      closeCart();
    }
  };

  const hasItems = items.length > 0;

  const whatsappUrl = useMemo(() => {
    if (!hasItems) return "#";
    const message = buildWhatsAppMessage(items, total, t);
    return buildWhatsAppUrl(message);
  }, [hasItems, items, total, t]);

  const editingItem = useMemo(() => {
    if (editingItemId == null) return null;
    return items.find((item) => item.cartItemId === editingItemId) ?? null;
  }, [editingItemId, items]);

  const editingProduct = useMemo(() => {
    if (!editingItem) return null;
    return findProductById(editingItem.productId);
  }, [editingItem]);

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
                {items.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="flex items-start justify-between rounded-xl bg-[#F6EEE7] px-3 py-3"
                  >
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-secondary">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingItemId(item.cartItemId)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            {t("cart.edit")}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            {t("cart.remove")}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-secondary">
                        <span className="font-semibold">
                          {t("cart.typeLabel")}
                          {": "}
                        </span>
                        {t(`variants.${item.priceType}`)}
                      </p>

                      {item.selectedFlavors && (
                        <div className="mt-1 text-[11px] text-secondary space-y-1">
                          {Object.entries(item.selectedFlavors).map(
                            ([group, flavors]) => {
                              const groupLabel = group === "default" ? "" : t(`products.flavors.${group}`);
                              return (
                                <div key={group} className="flex flex-wrap gap-1">
                                  {groupLabel && (
                                    <span className="font-semibold">
                                      {groupLabel}
                                      {": "}
                                    </span>
                                  )}
                                  {Object.entries(flavors).map(([flavor, qty]) => (
                                    <span
                                      key={flavor}
                                      className="inline-flex items-center rounded-full bg-[#F6EEE7] px-2 py-0.5"
                                    >
                                      {flavor} ({qty})
                                    </span>
                                  ))}
                                </div>
                              );
                            },
                          )}
                        </div>
                      )}

                      {item.comment && (
                        <p className="mt-1 text-[11px] text-[#8C5A3A] italic">
                          {t("cart.commentLabel")}: "{item.comment}"
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-xs font-medium text-secondary">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.cartItemId)
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
                              increaseQuantity(item.cartItemId)
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

            <p className="text-xs text-gray-500 mt-2">
              {t("cart.deliveryNote")}
            </p>

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
      {editingProduct && editingItem && (
        <ProductOptionsSheet
          isOpen={editingItemId != null}
          onClose={() => setEditingItemId(null)}
          product={editingProduct}
          isCombo={!!editingProduct.comboFlavors}
          initialCartItem={editingItem}
          onSubmit={(payload) => {
            updateCartItem(editingItem.cartItemId, {
              quantity: payload.quantity,
              selectedFlavors: payload.selectedFlavors,
              comment: payload.comment,
            });
            setEditingItemId(null);
          }}
        />
      )}
    </>
  );
}

export default memo(CartSidePanel);

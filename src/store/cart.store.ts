"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type PriceType = "refrigerated" | "fried";

export interface SelectedFlavors {
  [group: string]: Record<string, number>;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  priceType: PriceType;
  quantity: number;
  unitPrice: number;
  selectedFlavors?: SelectedFlavors;
  comment?: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
  isOpen: boolean;

  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  updateCartItem: (cartItemId: string, changes: Partial<CartItem>) => void;
  removeFromCart: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0,
  );

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const total = subtotal;

  return { subtotal, total, itemCount };
};

const createCartItemId = (productId: string, priceType: PriceType) =>
  `${productId}__${priceType}__${typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`;

const createCartSlice = (
  set: (updater: (state: CartState) => CartState | Partial<CartState>) => void,
) =>
  ({
    items: [],
    subtotal: 0,
    total: 0,
    itemCount: 0,
    isOpen: false,

    addToCart: (input) =>
      set((state) => {
        const cartItemId = createCartItemId(input.productId, input.priceType);

        const nextItems: CartItem[] = [
          ...state.items,
          {
            ...input,
            cartItemId,
          },
        ];

        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),

    updateCartItem: (cartItemId, changes) =>
      set((state) => {
        const nextItems = state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, ...changes } : item,
        );

        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),

    removeFromCart: (cartItemId) =>
      set((state) => {
        const nextItems = state.items.filter(
          (item) => item.cartItemId !== cartItemId,
        );
        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),

    increaseQuantity: (cartItemId) =>
      set((state) => {
        const nextItems = state.items.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        const derived = calculateTotals(nextItems);

        return { ...state, items: nextItems, ...derived };
      }),

    decreaseQuantity: (cartItemId) =>
      set((state) => {
        const nextItems = state.items
          .map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0);

        const derived = calculateTotals(nextItems);

        return { ...state, items: nextItems, ...derived };
      }),

    clearCart: () =>
      set((state) => ({
        ...state,
        items: [],
        subtotal: 0,
        total: 0,
        itemCount: 0,
      })),

    openCart: () => set((state) => ({ ...state, isOpen: true })),
    closeCart: () => set((state) => ({ ...state, isOpen: false })),
    toggleCart: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
  }) satisfies CartState;

export const useCartStore = create<CartState>()(
  persist((set) => createCartSlice(set), {
    name: "cart-store",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      items: state.items,
      subtotal: state.subtotal,
      total: state.total,
      itemCount: state.itemCount,
    }),
  }),
);

// Selectores

export const useCartItems = () => useCartStore((state) => state.items);

export const useCartItemCount = () => useCartStore((state) => state.itemCount);

export const useCartIsOpen = () => useCartStore((state) => state.isOpen);

export const useProductQuantity = (productId: string) =>
  useCartStore((state) =>
    state.items
      .filter((item) => item.productId === productId)
      .reduce((acc, item) => acc + item.quantity, 0),
  );

export const useHasProductInCart = (productId: string) =>
  useCartStore((state) =>
    state.items.some((item) => item.productId === productId),
  );

export const useCartTotals = () =>
  useStoreWithEqualityFn(
    useCartStore,
    (state) => ({
      subtotal: state.subtotal,
      total: state.total,
    }),
    shallow,
  );

export const useCartActions = () =>
  useStoreWithEqualityFn(
    useCartStore,
    (state) => ({
      addToCart: state.addToCart,
      updateCartItem: state.updateCartItem,
      removeFromCart: state.removeFromCart,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
      clearCart: state.clearCart,
      openCart: state.openCart,
      closeCart: state.closeCart,
      toggleCart: state.toggleCart,
    }),
    shallow,
  );

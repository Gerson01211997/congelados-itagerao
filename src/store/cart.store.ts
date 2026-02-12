"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type CartItemId = string;

export type CartItemVariant = "fried" | "refrigerated";

export interface CartItem {
  id: CartItemId;
  name: string;
  variant: CartItemVariant;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface CartItemInput {
  id: CartItemId;
  name: string;
  variant: CartItemVariant;
  variantLabel: string;
  unitPrice: number;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
  isOpen: boolean;
  addItem: (item: CartItemInput) => void;
  removeItem: (itemId: CartItemId, variant: CartItemVariant) => void;
  updateQuantity: (
    itemId: CartItemId,
    variant: CartItemVariant,
    quantity: number,
  ) => void;
  incrementItem: (itemId: CartItemId) => void;
  decrementItem: (itemId: CartItemId) => void;
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

  // Punto único para aplicar impuestos, descuentos, etc.
  const total = subtotal;

  return { subtotal, total, itemCount };
};

const createCartSlice = (
  set: (updater: (state: CartState) => CartState | Partial<CartState>) => void,
) =>
  ({
    items: [],
    subtotal: 0,
    total: 0,
    itemCount: 0,
    isOpen: false,
    addItem: (input: CartItemInput) =>
      set((state) => {
        const quantityToAdd = input.quantity ?? 1;
        const existingIndex = state.items.findIndex(
          (item) => item.id === input.id && item.variant === input.variant,
        );

        let nextItems: CartItem[];

        if (existingIndex === -1) {
          nextItems = [
            ...state.items,
            {
              id: input.id,
              name: input.name,
              variant: input.variant,
              variantLabel: input.variantLabel,
              unitPrice: input.unitPrice,
              quantity: quantityToAdd,
            },
          ];
        } else {
          nextItems = state.items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item,
          );
        }

        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),
    removeItem: (itemId: CartItemId, variant: CartItemVariant) =>
      set((state) => {
        const nextItems = state.items.filter(
          (item) => !(item.id === itemId && item.variant === variant),
        );
        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),
    updateQuantity: (
      itemId: CartItemId,
      variant: CartItemVariant,
      quantity: number,
    ) =>
      set((state) => {
        const index = state.items.findIndex(
          (item) => item.id === itemId && item.variant === variant,
        );

        if (index === -1) {
          return state;
        }

        let nextItems: CartItem[];

        if (quantity <= 0) {
          nextItems = state.items.filter((_, idx) => idx !== index);
        } else {
          nextItems = state.items.map((item, idx) =>
            idx === index ? { ...item, quantity } : item,
          );
        }

        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),
    incrementItem: (itemId: CartItemId) =>
      set((state) => {
        const nextItems = state.items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
        );
        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
      }),
    decrementItem: (itemId: CartItemId) =>
      set((state) => {
        const nextItems = state.items
          .map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0);

        const derived = calculateTotals(nextItems);

        return {
          ...state,
          items: nextItems,
          ...derived,
        };
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
    // Evitamos persistir estado de UI como isOpen
    partialize: (state) => ({
      items: state.items,
      subtotal: state.subtotal,
      total: state.total,
      itemCount: state.itemCount,
    }),
  }),
);

// Selectores especializados para evitar re-renders innecesarios

export const useCartItems = () => useCartStore((state) => state.items);

export const useCartItemCount = () => useCartStore((state) => state.itemCount);

export const useCartIsOpen = () => useCartStore((state) => state.isOpen);

export const useCartItemQuantity = (itemId: CartItemId) =>
  useCartStore((state) => {
    const totalQuantity = state.items
      .filter((cartItem) => cartItem.id === itemId)
      .reduce((acc, item) => acc + item.quantity, 0);
    return totalQuantity;
  });

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
      addItem: state.addItem,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      incrementItem: state.incrementItem,
      decrementItem: state.decrementItem,
      clearCart: state.clearCart,
      openCart: state.openCart,
      closeCart: state.closeCart,
      toggleCart: state.toggleCart,
    }),
    shallow,
  );

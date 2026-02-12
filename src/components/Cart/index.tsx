"use client";

import CartIcon from "@/components/icons/CartIcon";
import { useCartActions, useCartItemCount } from "@/store/cart.store";

function Cart() {
  const count = useCartItemCount();
  const { toggleCart } = useCartActions();

  return (
    <button
      type="button"
      onClick={toggleCart}
      className="
        relative
        hover:cursor-pointer
        bg-foreground
        py-2
        px-4
        rounded-xl
        flex
        items-center
        justify-center
      "
      aria-label={`Carrito con ${count} productos`}
    >
      <CartIcon className="h-4 w-4 text-white" />

      {count > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            min-w-[18px]
            h-[18px]
            px-1
            flex
            items-center
            justify-center
            rounded-full
            bg-primary
            text-white
            text-xs
            font-bold
            leading-none
          "
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default Cart;

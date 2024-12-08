import React from "react";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/store/useCartStore";

export function CartButton({ onClick }) {
  const { getCartCount } = useCartStore();
  const itemCount = getCartCount();

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-gray-100 rounded-full"
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}

import React from "react";
import { X } from "lucide-react";
import useCartStore from "@/store/useCartStore";

export function CartItem({ item }) {
  const { updateCartItem, removeFromCart } = useCartStore();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItem(item._id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-sm text-gray-600">Size: {item.size}</p>
        <p className="text-sm text-gray-600">Color: {item.color}</p>

        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l"
          >
            -
          </button>
          <span className="w-12 h-8 flex items-center justify-center bg-gray-50">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r"
          >
            +
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">${item.price}</p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { X } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

export function CartDropdown({ onMouseEnter, onMouseLeave }) {
  const navigate = useNavigate();
  const { items, getCartTotal, updateCartItem, removeFromCart, fetchCart } =
    useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem(itemId, newQuantity);
    }
  };

  return (
    <div
      className="absolute right-0 mt-2 w-[400px] bg-white shadow-lg rounded-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-start gap-3 py-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">
                        Color: {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-md">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-l-md"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">$ {item.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>Subtotal ({items.length} items)</span>
                <span>$ {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout/info")}
              className="w-full mt-4 bg-green-800 text-white py-2 rounded-md hover:bg-green-700 font-medium"
            >
              Check Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

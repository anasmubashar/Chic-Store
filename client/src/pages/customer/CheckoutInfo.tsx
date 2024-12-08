"use client";

import { ChevronLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCartStore from "@/store/useCartStore";
import { useCheckout } from "@/store/CheckoutContext";

export default function CheckoutInfo() {
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [formData, setFormData] = useState(shippingAddress);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();

  const { items, fetchCart, updateCartItem, removeFromCart, getCartTotal } =
    useCartStore();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = "Free";

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleNavigation = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate form fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShippingAddress(formData);
    navigate("/checkout/payment");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being updated
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-semibold text-sage-dark">
              modimal.
            </a>
            <nav className="hidden md:block">
              <ol className="flex items-center space-x-4">
                <li className="text-sm text-gray-500">Cart</li>
                <li className="text-sm text-gray-500">/</li>
                <li className="text-sm font-medium text-sage-dark">Info</li>
                <li className="text-sm text-gray-500">/</li>
                <li className="text-sm text-gray-500">Shipping</li>
                <li className="text-sm text-gray-500">/</li>
                <li className="text-sm text-gray-500">Payment</li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <div className="space-y-8">
            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-medium text-sage-dark">
                Shipping Address
              </h2>
              <div className="mt-4 space-y-4">
                {["street", "city", "province", "zipCode", "phoneNumber"].map(
                  (field) => (
                    <div key={field}>
                      <Input
                        name={field}
                        placeholder={field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        className="rounded-none border-gray-300 px-4 py-3"
                        value={formData[field] || ""}
                        onChange={handleInputChange}
                      />
                      {errors[field] && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8">
              <Button
                variant="ghost"
                className="flex items-center text-sage-dark hover:bg-transparent hover:text-sage-dark/80"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Return to Cart
              </Button>
              <Button
                onClick={handleNavigation}
                className="bg-sage-dark px-6 py-3 hover:bg-sage-dark/90"
              >
                Continue to Shipping
              </Button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-8 lg:col-span-5 lg:mt-0">
          <div className="bg-cart-bg p-8">
            <h2 className="text-xl font-medium text-sage-dark">Your Cart</h2>
            <div className="mt-8 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <img
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="object-cover"
                    />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sage-light text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sage-dark">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Size: {item.size} | Color: {item.color}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-sage-dark">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-none border-gray-300"
                        onClick={() =>
                          updateCartItem(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-none border-gray-300"
                        onClick={() =>
                          updateCartItem(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal ({items.length})</span>
                <span className="font-medium text-sage-dark">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-sage-dark">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-sage-dark">{shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span className="text-gray-900">Total Orders:</span>
                <span className="text-sage-dark">
                  ${(subtotal + tax).toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                The total amount you pay includes all applicable customs duties
                & taxes. We guarantee no additional charges on delivery.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

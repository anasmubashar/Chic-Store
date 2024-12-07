"use client";

import { ChevronLeft, Search, X } from "lucide-react";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCartStore from "@/store/useCartStore";

export default function CheckoutInfo() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    newsletter: false,
    saveInfo: false,
  });

  const { items, fetchCart, updateCartItem, removeFromCart, getCartTotal } =
    useCartStore();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = "Free";

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

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
            {/* Contact Section */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-sage-dark">Contact</h2>
                <p className="text-sm text-gray-600">
                  Have an Account?{" "}
                  <a href="/login" className="text-sage-dark hover:underline">
                    Log In
                  </a>
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-none border-gray-300 px-4 py-3 focus:border-sage-dark focus:ring-sage-dark"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        newsletter: checked as boolean,
                      })
                    }
                    className="rounded border-gray-300 text-sage-dark focus:ring-sage-dark"
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-600">
                    Email Me With News And Offers
                  </Label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-medium text-sage-dark">
                Shipping Address
              </h2>
              <div className="mt-4 space-y-4">
                <Select>
                  <SelectTrigger className="w-full rounded-none border-gray-300 px-4 py-3">
                    <SelectValue placeholder="Country/Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="First Name"
                    className="rounded-none border-gray-300 px-4 py-3"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Last Name"
                    className="rounded-none border-gray-300 px-4 py-3"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>

                <Input
                  placeholder="Company (Optional)"
                  className="rounded-none border-gray-300 px-4 py-3"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />

                <div className="relative">
                  <Input
                    placeholder="Address"
                    className="rounded-none border-gray-300 px-4 py-3 pr-10"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>

                <Input
                  placeholder="Apartment, Suite, etc. (Optional)"
                  className="rounded-none border-gray-300 px-4 py-3"
                  value={formData.apartment}
                  onChange={(e) =>
                    setFormData({ ...formData, apartment: e.target.value })
                  }
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Postal Code"
                    className="rounded-none border-gray-300 px-4 py-3"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                  />
                  <Input
                    placeholder="City"
                    className="rounded-none border-gray-300 px-4 py-3"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="rounded-none border-gray-300 px-4 py-3"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="save-info"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, saveInfo: checked as boolean })
                    }
                    className="rounded border-gray-300 text-sage-dark focus:ring-sage-dark"
                  />
                  <Label htmlFor="save-info" className="text-sm text-gray-600">
                    Save This Information For Next Time
                  </Label>
                </div>
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
              <Button className="bg-sage-dark px-6 py-3 hover:bg-sage-dark/90">
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
                & taxes. We guarantee no additional charges on delivery
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

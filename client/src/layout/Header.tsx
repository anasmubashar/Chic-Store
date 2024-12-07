import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useCartStore from "@/store/useCartStore";
import { CartDropdown } from "@/components/Customer/Cart/CartDropdown";

const navigation = [
  { name: "Collection", href: "/products" },
  { name: "New In", href: "#" },
  { name: "Designers", href: "#" },
  { name: "Plus Size", href: "#" },
  { name: "Sustainability", href: "#" },
];

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartCount, fetchCart } = useCartStore();
  const itemCount = getCartCount();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 flex items-center justify-start">
            <a href="/" className="text-xl font-semibold text-gray-900">
              modimal.
            </a>
          </div>

          <div className="hidden md:flex items-center justify-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              {isCartOpen && (
                <CartDropdown
                  onMouseEnter={() => setIsCartOpen(true)}
                  onMouseLeave={() => setIsCartOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <button className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <Link to="/" className="text-xl font-semibold">
            medimel
          </Link>
        </div>
        <nav className="hidden lg:flex lg:gap-6">
          <Link to="/shop" className="text-sm font-medium">
            Shop All
          </Link>
          <Link to="/new" className="text-sm font-medium">
            New In
          </Link>
          <Link to="/collections" className="text-sm font-medium">
            Collections
          </Link>
          <Link to="/about" className="text-sm font-medium">
            About Us
          </Link>
          <Link to="/sustainability" className="text-sm font-medium">
            Sustainability
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden lg:block">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <Link to="/wishlist">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Link>
          <Link to="/cart">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

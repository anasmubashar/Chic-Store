import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Collection", href: "#" },
  { name: "New In", href: "#" },
  { name: "Designers", href: "#" },
  { name: "Plus Size", href: "#" },
  { name: "Sustainability", href: "#" },
];

export function Header() {
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
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

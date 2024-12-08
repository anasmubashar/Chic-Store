import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden">
      <Link to={`/products/${product._id}`}>
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button className="absolute right-4 top-4 rounded-full bg-white p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.style}
            </p>
            <p className="mt-2 font-semibold">
              Rs {product.price.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

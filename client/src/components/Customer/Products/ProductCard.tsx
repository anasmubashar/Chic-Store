import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="block overflow-hidden transition-transform duration-200 hover:-translate-y-1"
    >
      <article>
        <ProductImage src={product.images[0]} alt={product.name} />
        <ProductInfo
          name={product.name}
          category={product.category}
          price={product.price}
        />
      </article>
    </Link>
  );
}

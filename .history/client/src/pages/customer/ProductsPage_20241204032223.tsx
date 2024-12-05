import { ProductFilters } from "@/components/Customer/Products/ProductFilters";
import { ProductGrid } from "@/components/Customer/Products/ProductGrid";
import { getProducts } from "@/lib/api";
import { Header } from "@/layout/Header";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (filters: Record<string, string> = {}) => {
    setLoading(true);
    try {
      const data = await getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <ProductFilters onFilterChange={fetchProducts} />
          </aside>
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

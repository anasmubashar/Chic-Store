import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProduct } from "@/lib/api";
import { Product } from "@/types/product";
import { Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (id) {
      getProduct(id).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.category },
    { label: product.collection },
    { label: product.name },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex gap-4 justify-center">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square w-24 overflow-hidden rounded-lg ${
                  currentImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-xl font-semibold">
              {product.price.toLocaleString()}PKR
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizeVariants.map((variant) => (
                    <SelectItem
                      key={variant._id}
                      value={variant.size}
                      disabled={!variant.inStock}
                    >
                      {variant.size}
                      {!variant.inStock && " (Out of Stock)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg bg-muted p-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Style</h3>
                <p className="text-sm text-muted-foreground">{product.style}</p>
              </div>
              <div>
                <h3 className="font-medium">Fabric</h3>
                <p className="text-sm text-muted-foreground">
                  {product.fabric}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Collection</h3>
                <p className="text-sm text-muted-foreground">
                  {product.collection}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Category</h3>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

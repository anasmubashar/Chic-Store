import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Tailored Sweater",
    price: "$350",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=405",
    colors: ["#2B2B2B", "#6F6F6F", "#EFEFEF"],
  },
  {
    id: 2,
    name: "Floral Dress",
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=388",
    colors: ["#2B2B2B", "#6F6F6F", "#EFEFEF"],
  },
  {
    id: 3,
    name: "Basic Tank",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=870",
    colors: ["#2B2B2B", "#6F6F6F", "#EFEFEF"],
  },
];

export function BestSellers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light">Best Sellers</h2>
          <a href="#" className="text-sm text-gray-600">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group">
              <CardContent className="p-0 relative">
                <div className="relative aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.price}</p>
                  <div className="flex gap-2 mt-3">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Heart } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  colors: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Relaxed Dress",
    price: 89,
    image: "/placeholder.svg?height=400&width=300",
    colors: ["#D4A373", "#E5989B", "#B7B7A4"]
  },
  {
    id: 2,
    name: "Floral Dress",
    price: 79,
    image: "/placeholder.svg?height=400&width=300",
    colors: ["#A5A58D", "#6B705C", "#CB997E"]
  },
  {
    id: 3,
    name: "Linen Dress",
    price: 69,
    image: "/placeholder.svg?height=400&width=300",
    colors: ["#FFE8D6", "#DDBEA9", "#A5A58D"]
  }
]

export function BestSellers() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light">Best Sellers</h2>
          <a href="#" className="text-sm underline">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
                <button className="absolute right-4 top-4 rounded-full bg-white p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm">{product.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium">${product.price}</p>
                  <div className="flex gap-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="h-4 w-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


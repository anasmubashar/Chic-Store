import { AspectRatio } from "@/components/ui/aspect-ratio";

const collections = [
  {
    id: 1,
    name: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=387",
  },
  {
    id: 2,
    name: "Basics",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870",
  },
  {
    id: 3,
    name: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=383",
  },
  {
    id: 4,
    name: "Coats",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=387",
  },
];

export function Collection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light mb-8">Collection</h2>

        <div className="grid grid-cols-2 gap-4">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={index === 1 ? "row-span-2" : ""}
            >
              <AspectRatio ratio={index === 1 ? 9 / 16 : 4 / 3}>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-lg font-medium">
                    {collection.name}
                  </h3>
                </div>
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

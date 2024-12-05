import { AspectRatio } from "@/components/ui/aspect-ratio";

const collections = [
  {
    id: 1,
    name: "Accessories",
    image:
      "https://www.limelight.pk/cdn/shop/files/LB71701-FRE-034_5_-SelfPatternedClutch.jpg?v=1733208996",
  },
  {
    id: 2,
    name: "Winter",
    image:
      "https://www.limelight.pk/cdn/shop/files/I8524JK-FRE-OWH_4_-FurJacket.jpg?v=1728994245",
  },
  {
    id: 3,
    name: "Summer",
    image:
      "https://www.limelight.pk/cdn/shop/files/P9949ST-SML-489_4_-2PieceGripSuit-Embroidered_Pret.jpg?v=1725531577",
  },
  {
    id: 4,
    name: "Western",
    image:
      "https://www.limelight.pk/cdn/shop/files/A0974ST-SML-610_6_CrepeCo-OrdSet-Dyed_Pret.jpg?v=1732599747",
  },
];

export function Collection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light mb-8">Collection</h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={index === 1 ? "row-span-2" : ""}
            >
              <AspectRatio ratio={index === 1 ? 9 / 16 : 4 / 5}>
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

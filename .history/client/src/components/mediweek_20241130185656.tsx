const weeklyOutfits = [
  {
    day: "Monday",
    image: "/placeholder.svg?height=500&width=300",
  },
  {
    day: "Tuesday",
    image: "/placeholder.svg?height=500&width=300",
  },
  {
    day: "Wednesday",
    image: "/placeholder.svg?height=500&width=300",
  },
  {
    day: "Thursday",
    image: "/placeholder.svg?height=500&width=300",
  },
  {
    day: "Friday",
    image: "/placeholder.svg?height=500&width=300",
  },
];

export function Mediweek() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <h2 className="mb-8 text-2xl font-light">Mediweek</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {weeklyOutfits.map((outfit, index) => (
            <div key={index} className="min-w-[300px]">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={outfit.image}
                  alt={`${outfit.day} outfit`}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{outfit.day}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light">Follow Us @Medimel</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img
                alt={`Instagram post ${index}`}
                className="h-full w-full object-cover"
                src="/placeholder.svg?height=300&width=300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

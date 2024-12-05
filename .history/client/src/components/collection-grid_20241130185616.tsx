export function CollectionGrid() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="mb-8 text-2xl font-light">Collection</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg">
              <img
                alt="Collection image"
                className="h-full w-full object-cover"
                src="/placeholder.svg?height=600&width=400"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                alt="Collection image"
                className="h-full w-full object-cover"
                src="/placeholder.svg?height=400&width=400"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg">
              <img
                alt="Collection image"
                className="h-full w-full object-cover"
                src="/placeholder.svg?height=400&width=400"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                alt="Collection image"
                className="h-full w-full object-cover"
                src="/placeholder.svg?height=600&width=400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

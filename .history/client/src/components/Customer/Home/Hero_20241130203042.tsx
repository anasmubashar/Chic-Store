import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Elegance in Simplicity,
              <br />
              Earth's Harmony
            </h1>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

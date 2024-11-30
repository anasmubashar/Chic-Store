import { Button } from "@/components/ui/button";

export function Sustainability() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1586944179863-aaa2d445303c?q=80&w=1000"
            alt="Sustainability"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-lg">
              <h2 className="text-2xl font-light text-white mb-4">
                Stylish Sustainability Is Creating Harmonious Eco-Friendly
                Choices For A Greater Future
              </h2>
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm"
              >
                Sustainability
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

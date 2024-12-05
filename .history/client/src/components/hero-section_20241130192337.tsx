export function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <img
        alt="Hero image"
        className="h-full w-full object-scale-down"
        src="./hero.png"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="max-w-3xl text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          Elegance in Simplicity,
          <br />
          Earth's Harmony
        </h1>
      </div>
    </section>
  );
}

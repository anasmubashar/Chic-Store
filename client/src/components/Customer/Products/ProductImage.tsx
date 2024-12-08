import { Heart } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden bg-neutral-50">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <button
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition-opacity duration-200 hover:bg-neutral-50 group-hover:opacity-100"
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4 text-neutral-900" />
      </button>
    </div>
  );
}

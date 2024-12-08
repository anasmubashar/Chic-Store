import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  // Format price to Pakistani Rupees
  return price.toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
  });
}

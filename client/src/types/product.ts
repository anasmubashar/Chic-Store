export interface SizeVariant {
  size: string;
  inStock: boolean;
  stock: number;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  style: string;
  description: string;
  price: number;
  category: string;
  collection: string;
  fabric: string;
  images: string[];
  color: string;
  sizeVariants: SizeVariant[];
  featured: boolean;
  createdAt: string;
}

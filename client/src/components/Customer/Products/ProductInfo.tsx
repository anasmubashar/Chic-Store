interface ProductInfoProps {
  name: string;
  category: string;
  price: number;
}

export function ProductInfo({ name, category, price }: ProductInfoProps) {
  return (
    <div className="px-1 py-3">
      <h3 className="text-sm font-medium text-neutral-900">{name}</h3>
      <p className="mt-1 text-sm text-neutral-500">{category}</p>
      <p className="mt-1 text-sm font-medium text-neutral-900">
        ₹{price.toLocaleString()}
      </p>
    </div>
  );
}

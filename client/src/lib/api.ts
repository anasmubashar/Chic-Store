export async function getProducts(params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/products?${searchParams}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/products/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export async function getCart() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
}

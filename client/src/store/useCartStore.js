import { create } from "zustand";
import api from "@/lib/axios";

const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_URL}/api/cart`
      );
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToCart: async (productId, quantity, size) => {
    set({ isLoading: true });
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/items`,
        {
          productId,
          quantity,
          size,
        }
      );
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateCartItem: async (itemId, quantity) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/items/${itemId}`,
        {
          quantity,
        }
      );
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  removeFromCart: async (itemId) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/items/${itemId}`
      );
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },

  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export default useCartStore;

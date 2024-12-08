import axios from 'axios';
import { Order, OrderFilters, PaginatedOrders } from '@/types/order';

const BASE_URL = 'http://localhost:4006/api';

export const orderApi = {
  getOrders: async (
    page: number = 1,
    filters?: OrderFilters
  ): Promise<PaginatedOrders> => {
    const response = await axios.get(`${BASE_URL}/orders`, {
      params: {
        page,
        ...filters,
      },
    });
    return response.data;
  },

  updateOrder: async (id: string, data: Partial<Order>): Promise<Order> => {
    const response = await axios.put(`${BASE_URL}/orders/${id}`, data);
    return response.data;
  },

  deleteOrder: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/orders/${id}`);
  },
};
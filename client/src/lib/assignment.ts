import axios from 'axios';
import { Assignment, Order, Bus, Driver } from '../types/assignment';

const BASE_URL = 'http://localhost:4000/api/assign';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const assignmentApi = {
  autoAssign: async (orderId: string) => {
    const response = await api.post(`/auto-assign/${orderId}`);
    return response.data;
  },

  manualAssign: async (orderId: string, busId: string, driverId: string) => {
    const response = await api.post('/manual-assign', {
      orderId,
      busId,
      driverId,
    });
    return response.data;
  },

  updateAssignment: async (
    assignmentId: string,
    busId: string,
    driverId: string
  ) => {
    const response = await api.patch('/update-assignment', {
      assignmentId,
      busId,
      driverId,
    });
    return response.data;
  },

  getAssignments: async (filters?: {
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/assignments', { params: filters });
    return response.data as {
      data: Assignment[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
      };
    };
  },

  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data as Order[];
  },

  getBuses: async () => {
    const response = await api.get('/buses');
    return response.data as Bus[];
  },

  getDrivers: async () => {
    const response = await api.get('/drivers');
    return response.data as Driver[];
  },
};
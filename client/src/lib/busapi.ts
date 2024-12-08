import axios, { AxiosError } from 'axios';
import { Bus, BusResponse, CreateBusDto, UpdateBusDto } from '../types/bus';

const api = axios.create({
  baseURL: 'http://localhost:4006/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getBuses = async (page = 1, limit = 10): Promise<BusResponse> => {
  try {
    const response = await api.get<BusResponse>(`/buses?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
};

export const createBus = async (busData: CreateBusDto): Promise<{ success: boolean; data: Bus }> => {
  try {
    const response = await api.post('/buses', busData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
};

export const updateBus = async (id: string, busData: UpdateBusDto): Promise<{ success: boolean; data: Bus }> => {
  try {
    const response = await api.put(`/buses/${id}`, busData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
};

export const deleteBus = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.delete(`/buses/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
};
import axios from 'axios';
import { ProfileData } from '../types/profile';

const BASE_URL = 'http://localhost:4000/api';

export const profileApi = {
  getProfile: async () => {
    const response = await axios.get(`${BASE_URL}/profile`);
    return response.data;
  },

  createProfile: async (profileData: ProfileData) => {
    const response = await axios.post(`${BASE_URL}/profile`, profileData);
    return response.data;
  },

  updateProfile: async (id: string, profileData: ProfileData) => {
    const response = await axios.put(`${BASE_URL}/profile/${id}`, profileData);
    return response.data;
  },

  deleteProfile: async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/profile/${id}`);
    return response.data;
  },

  uploadProfilePicture: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    const response = await axios.post(`${BASE_URL}/profile/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};
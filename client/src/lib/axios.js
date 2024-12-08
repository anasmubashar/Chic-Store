import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true, // This is important for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

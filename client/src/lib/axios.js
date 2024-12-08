<<<<<<< HEAD
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your actual API URL
  timeout: 10000,
});

export default api;
=======
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // This is important for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
>>>>>>> a54eb951aeef361a660f7caea077a0209a593565

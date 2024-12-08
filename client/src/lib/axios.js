import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your actual API URL
  timeout: 10000,
});

export default api;
import axios from 'axios';

const simulationAPI = axios.create({
  baseURL: 'http://localhost:3002'
});

simulationAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default simulationAPI;
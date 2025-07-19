import axios from 'axios';

const managementAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

managementAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default managementAPI;
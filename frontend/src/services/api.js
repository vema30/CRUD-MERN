import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // proxy handles localhost:5000
});

// Automatically attach token if available
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;

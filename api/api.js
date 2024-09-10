import axios from 'axios';
import store from '../redux/store'; // Adjust the import path based on your project structure

const url = process.env.NEXT_PUBLIC_API_URL;
// const url = "http://34.126.68.84:5000/api/v1";
const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem('user');
    const token = user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

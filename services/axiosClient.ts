import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setupAxiosInterceptor = () => {
  axiosClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

setupAxiosInterceptor();

export default axiosClient;

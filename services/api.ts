import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setupAxiosInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accesstoken');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // api.interceptors.response.use(
  //   (response) => {
  //     return response.data;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   },
  // );
};
setupAxiosInterceptor();

export default api;

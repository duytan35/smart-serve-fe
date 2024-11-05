import axios from 'axios';
import store from '../redux/store'; // Adjust the import path based on your project structure

const url = process.env.NEXT_PUBLIC_API_URL;
// const url = "http://34.126.68.84:5000/api/v1";
const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem('accesstoken');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOiIwYWJiMDkzOS03Y2U3LTQxNTktYTc2YS1hYTVjYTFhNTFmNzAiLCJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiZXhwIjoxNzMwMTg1NDU0fQ._dDmtg8rJd9hKXG5Mhbr4gWcjOQnnmiHi2tY53jU_28';
    // const token = user?.accessToken;
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

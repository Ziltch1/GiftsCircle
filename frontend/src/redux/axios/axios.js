import axios from 'axios';
import { dispatch } from '../store';

const headers = {
  'Access-Control-Allow-Credentials': true,
  'content-type': 'Application/json',
};

axios.defaults.baseURL = 'http://localhost:4000/api/';

const axiosInstance = axios.create({
  headers,
  timeout: 60000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('accessToken');
    // dispatch(setToken(Token));
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  err => Promise.reject(err)
);


export default axiosInstance;
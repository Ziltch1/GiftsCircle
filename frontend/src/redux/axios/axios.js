import axios from 'axios';
import { setToken } from '../features/auth/authSlice';
import { dispatch } from '../store';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = 'http://localhost:4000/api';
//'http://localhost:4000/api
//https://gifts-circle.herokuapp.com/api
const axiosInstance = axios.create({
  headers,
  timeout: 60000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    dispatch(setToken(token));
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

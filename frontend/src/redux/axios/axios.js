import axios from 'axios';
import { setToken } from '../features/auth/authSlice';
import { dispatch } from '../store';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = 'https://giftcircle-ws.onrender.com/api';
//'http://localhost:4000/api
//https://giftcircle-ws.onrender.com/api
//user_id 56ebdd0a-e340-486a-a918-fb7452bdfe4a
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

import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = 'https://giftcircle-ws.onrender.com/api';
//' http://localhost:4000/api
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

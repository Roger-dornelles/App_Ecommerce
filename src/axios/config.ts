import axios from 'axios';
import {BASE_URL} from '@env';
console.log('axios ', BASE_URL);
const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
});

export default axiosClient;

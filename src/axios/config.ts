import axios from 'axios';
// import {BASE_URL} from '@env';

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.8:5000',
});

export default axiosClient;

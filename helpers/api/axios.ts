import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;

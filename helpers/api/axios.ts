import axios, { AxiosInstance } from 'axios';

const server = typeof window === 'undefined';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

if (!server) {
  instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
}

export default instance;

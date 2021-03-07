import axios, { AxiosInstance } from 'axios';

const server = typeof window === 'undefined';

const instance: AxiosInstance = axios.create({
	baseURL: 'https://lit-mesa-58105.herokuapp.com/api',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 60000
});

if (!server) {
	instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
}

export default instance;

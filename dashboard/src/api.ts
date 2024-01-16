import axios from 'axios';
import { goto } from '$app/navigation';
import { PUBLIC_API_URL } from '$env/static/public'

const apiClient = axios.create({
    baseURL: PUBLIC_API_URL,
})

apiClient.interceptors.request.use(function (config) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    // TODO something with request error
    return Promise.reject(error);
});

apiClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        goto('/auth/login');
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default apiClient;
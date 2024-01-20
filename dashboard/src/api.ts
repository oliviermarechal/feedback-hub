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

    if (error.response.status === 400) {
        return Promise.resolve(error.response);
    }

    return Promise.reject(error);
});


export default apiClient;
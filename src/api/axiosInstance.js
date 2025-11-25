import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/authStore';

import jsCookie from 'js-cookie';

// Create a centralized Axios instance
const api = axios.create({
    baseURL: '/api/v1', // Adjust if your API base URL is different
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed in the future
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Unwrap the response data if successful
        return response.data;
    },
    async (error) => {
        // Handle global errors (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Check if we are not already on the login page to avoid loops
            if (router.currentRoute.value.name !== 'Login') {
                const authStore = useAuthStore();

                // Show alert
                await Swal.fire({
                    icon: 'warning',
                    title: 'Sesión Expirada',
                    text: 'Su sesión ha expirado, vuelva a iniciar sesión',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0284c7', // sky-600
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });

                // Clear auth state
                authStore.user = null;
                authStore.isAuthenticated = false;

                // Clear cookies to pass router guard
                jsCookie.remove('userPublicInfo');
                jsCookie.remove('PLAY_SESSION');

                // Redirect to login
                router.push({ name: 'Login' });
            }
        }
        return Promise.reject(error);
    }
);

export default api;

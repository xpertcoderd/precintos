import api from '@/api/axiosInstance';

export const login = (credentials) => api.post('/auth/login', credentials);

export const logout = () => api.get('/auth/logout');

export const checkSession = () => api.get('/auth/checkSession');

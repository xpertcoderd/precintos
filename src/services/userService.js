import api from '@/api/axiosInstance';

export const getUsersAll = () => api.get('/users/all');
export const getUsersFiltered = (params) => api.get('/users/filtered', { params });
export const getUserById = (id) => api.get(`/users/read/${id}`);
export const createUser = (data) => api.post('/users/create', data);
export const updateUser = (id, data) => api.put(`/users/update/${id}`, data);
export const updateUserPassword = (id, data) => api.patch(`/users/updatePassword/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/delete/${id}`);

import api from '@/api/axiosInstance';

export const getRolesAll = () => api.get('/roles/all');
export const getRolesFiltered = (params) => api.get('/roles/filtered', { params });
export const getRoleById = (id) => api.get(`/roles/read/${id}`);
export const createRole = (data) => api.post('/roles/create', data);
export const updateRole = (id, data) => api.put(`/roles/update/${id}`, data);
export const deleteRole = (id) => api.delete(`/roles/delete/${id}`);

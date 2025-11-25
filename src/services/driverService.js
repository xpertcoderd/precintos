import api from '@/api/axiosInstance';

const multiPartConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

export const createDriver = (formData) => api.post('/drivers/create', formData, multiPartConfig);
export const updateDriver = (id, data) => api.put(`/drivers/update/${id}`, data);
export const deleteDriver = (id) => api.delete(`/drivers/delete/${id}`);
export const getDriversFiltered = (params) => api.get('/drivers/filtered', { params });
export const updateDriverPhoto = (formData) => api.post('/drivers/updatePhoto', formData, multiPartConfig);

import api from '@/api/axiosInstance';

const multiPartConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

export const createVehicle = (formData) => api.post('/vehicles/create', formData, multiPartConfig);
export const updateVehicle = (id, data) => api.put(`/vehicles/update/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicles/delete/${id}`);
export const getVehiclesFiltered = (params) => api.get('/vehicles/filtered', { params });
export const updateVehiclePhoto = (formData) => api.post('/vehicles/updatePhoto', formData, multiPartConfig);

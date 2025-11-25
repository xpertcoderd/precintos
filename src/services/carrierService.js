import api from '@/api/axiosInstance';

export const createCarrier = (data) => api.post('/carriers/create', data);
export const getCarrierById = (id) => api.get(`/carriers/read/${id}`);
export const getCarriersFiltered = (params) => api.get('/carriers/filtered', { params });
export const updateCarrier = (id, data) => api.put(`/carriers/update/${id}`, data);
export const deleteCarrier = (id) => api.delete(`/carriers/delete/${id}`);

import api from '@/api/axiosInstance';

export const getTariffsFiltered = (params) => api.get('/tariffs/filtered', { params });

export const createTariff = (data) => api.post('/tariffs/create', data);

export const getTariffRead = (id) => api.get(`/tariffs/read/${id}`);

export const updateTariff = (id, data) => api.put(`/tariffs/update/${id}`, data);

export const deleteTariff = (id) => api.delete(`/tariffs/delete/${id}`);

export const getTariffTypesFiltered = (params) => api.get('/tariffTypes/filtered', { params });

export const getTransferTypesFiltered = (params) => api.get('/transferTypes/filtered', { params });

export const calculateTariff = (trTypeId, startPlaceId, endPlaceId) => api.get(`/tariffs/calc/${trTypeId}/${startPlaceId}/${endPlaceId}`);
import api from '@/api/axiosInstance';

export const createCreditTariffProfile = (data) => api.post('/creditTariffProfiles/create', data);

export const getCreditTariffProfilesFilteredWithClients = (params) => api.get('/creditTariffProfiles/filteredWithClients', { params });

export const getCreditTariffProfilesFiltered = (params) => api.get('/creditTariffProfiles/filtered', { params });

export const getCreditTariffProfileRead = (id) => api.get(`/creditTariffProfiles/read/${id}`);

export const updateCreditTariffProfile = (id, data) => api.put(`/creditTariffProfiles/update/${id}`, data);

export const deleteCreditTariffProfile = (id) => api.delete(`/creditTariffProfiles/delete/${id}`);

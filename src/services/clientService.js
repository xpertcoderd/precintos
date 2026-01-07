import api from '@/api/axiosInstance';

export const getClientsFiltered = (params) => api.get('/clients/filtered', { params });
export const createClient = (data) => api.post('/clients/create', data);
export const updateClient = (id, data) => api.put(`/clients/update/${id}`, data);
export const getClientsAll = () => api.get('/clients/all');
export const getFinalClientsList = (id) => api.get(`/clients/filteredByServerClient/${id}`);
export const getClientById = (id) => api.get(`/clients/read/${id}`);
export const relateClients = (data) => api.post('/clients/doRelate', data);
export const detachClients = (data) => api.post('/clients/detach', data);

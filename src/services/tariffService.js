import api from '@/api/axiosInstance';

export const getTariffsListAll = () => api.get('/tariffs/all');
export const calculateTariff = (trTypeId, startPlaceId, endPlaceId) => api.get(`/tariffs/calc/${trTypeId}/${startPlaceId}/${endPlaceId}`);
export const createTariff = (data) => api.post('/tariffs/create', data);
export const deleteTariff = (id) => api.delete(`/tariffs/delete/${id}`);

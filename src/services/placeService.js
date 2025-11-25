import api from '@/api/axiosInstance';

export const getPlacesListAll = (id) => api.get(`/places/list/${id}`);
export const getStartPlacePoints = (id) => api.get(`/places/getStartPoints/${id}`);
export const getEndPlacePoints = (id) => api.get(`/places/getEndPoints/${id}`);

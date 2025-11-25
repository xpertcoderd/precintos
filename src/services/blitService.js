import api from '@/api/axiosInstance';

export const getTransferBlitsFiltered = (params) => api.get('/transferBlits/filtered', { params });
export const getTransferBlitsMapPoints = (params) => api.get('/transferBlits/mapPoints', { params });
export const getTransferBlit = (params) => api.get('/transferBlits/read', { params });

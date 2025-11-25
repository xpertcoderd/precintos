import api from '@/api/axiosInstance';

export const getDevicesFiltered = (params) => api.get('/devices/filtered', { params: { pageSize: 20000, ...params } });
export const getCounterCandado = () => api.get('/devices/allStats');
export const openDeviceSeal = (params, pin) => api.post('/devices/openSeal', { ...params, pin });

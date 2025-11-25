import api from '@/api/axiosInstance';

const multiPartConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

export const getTransferUnitsFiltered = (params) => api.get('/transferUnits/filtered', { params });
export const assignContainers = (data) => api.post('/transferUnits/create', data);
export const linkTransferUnits = (formData) => api.post('/transferUnits/linked', formData, multiPartConfig);
export const openTransferUnitSeal = (id, pin) => api.post('/transferUnits/openSeal', { id, pin });

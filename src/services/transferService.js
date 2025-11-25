import api from '@/api/axiosInstance';

export const getTransfersSummary = (params) => api.get('/transfers/filteredSummary', { params });

export const createTransfer = (data) => api.post('/transfers/create', data);

export const updateTransferState = (id, newStateId) => api.patch(`/transfers/updateState/${id}`, { newStateId });

export const getTransferTypes = () => api.get('/transferTypes/filtered');

export const checkTransferBL = (name) => api.get(`/transfers/check/${name}`);

export const getTransfersFilteredFull = (params) => api.get('/transfers/filteredFullTransfer', { params });

export const uploadTransferVoucher = (transferId, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('json', JSON.stringify({ transferId: transferId, voucherPhotoName: file.name }));

    return api.post('/transfers/uploadVoucher', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

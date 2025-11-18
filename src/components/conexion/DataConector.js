import axios from 'axios';
import jwtDecode from "jwt-decode";

// =================================================================
// == Helpers & Config
// =================================================================

const axiosConfig = {
    withCredentials: true
};

async function safeRequest(fn) {
    try {
        const response = await fn();
        return response.data?.success ? response.data : { success: false };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}

export function decodeJWT_firmed(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export function decode64Native(token) {
    try {
        const payloadBase64 = token.split(".")[1];
        const decodedJson = atob(payloadBase64);
        return JSON.parse(decodedJson);
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
}

export function decodeBase64Token(token) {
    try {
        const decodedJson = atob(token);
        return JSON.parse(decodedJson);
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
}

// =================================================================
// == Auth Endpoints
// =================================================================

export const auth = (params) => safeRequest(() => axios.post(`/api/v1/auth/login`, params, axiosConfig));
export const logOut = () => safeRequest(() => axios.get(`/api/v1/auth/logout`, axiosConfig));
export const check_Session = () => safeRequest(() => axios.get(`/api/v1/auth/checkSession`, axiosConfig));


// =================================================================
// == Transfer Endpoints
// =================================================================
export const transfers_filtered_summary = (params) => safeRequest(() => axios.get(`/api/v1/transfers/filteredSummary`, { ...axiosConfig, params }));
export const transfers_filteredFull = (params) => safeRequest(() => axios.get(`/api/v1/transfers/filteredFullTransfer`, { ...axiosConfig, params }));
export const transfers_Create = (params) => safeRequest(() => axios.post(`/api/v1/transfers/create`, params, axiosConfig));
export const transfersCheckBL = (name) => safeRequest(() => axios.get(`/api/v1/transfers/check/${name}`, axiosConfig));
export const transfer_Types = () => safeRequest(() => axios.get(`/api/v1/transferTypes/filtered`, axiosConfig));
export const transfers_uploadVoucher = (transferId, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('json', JSON.stringify({ transferId: transferId, voucherPhotoName: file.name }));

    return safeRequest(() => axios.post(`/api/v1/transfers/uploadVoucher`, formData, {
        ...axiosConfig,
        headers: { 'Content-Type': 'multipart/form-data' },
    }));
};
export const transfers_update_state = (transferId, state) => safeRequest(() => axios.patch(`/api/v1/transfers/updateState/${transferId}`, { newStateId: state }, axiosConfig));


// =================================================================
// == Transfer Unit Endpoints
// =================================================================

export const transferUnits_filtered = (params) => safeRequest(() => axios.get(`/api/v1/transferUnits/filtered`, { ...axiosConfig, params }));
export const assign_Containers = (params) => safeRequest(() => axios.post(`/api/v1/transferUnits/create`, params, axiosConfig));
export const linkTransferUnits = (formData) => safeRequest(() => axios.post(`/api/v1/transferUnits/linked`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}));
export const transferUnits_openSeal = (id, pin) => safeRequest(() => axios.post(`/api/v1/transferUnits/openSeal`, { id, pin }, axiosConfig));


// =================================================================
// == Transfer Blit (Tracking) Endpoints
// =================================================================

export const transferBlits_filtered = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/filtered`, { ...axiosConfig, params }));
export const transferBlits_mapPoints = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/mapPoints`, { ...axiosConfig, params }));
export const transferBlits = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/read`, { ...axiosConfig, params }));


// =================================================================
// == Device Endpoints
// =================================================================

export const devicesAll = (params) => safeRequest(() => axios.get(`/api/v1/devices/filtered`, {...axiosConfig, params: {pageSize: 20000, ...params}}));
export const counterCandado = () => safeRequest(() => axios.get(`/api/v1/devices/allStats`, axiosConfig));
export const openSeal = (params, pin) => safeRequest(() => axios.post(`/api/v1/devices/openSeal`, { ...params, pin }, axiosConfig));


// =================================================================
// == Client Endpoints
// =================================================================

export const clients_filtered = (params) => safeRequest(() => axios.get(`/api/v1/clients/filtered`, { ...axiosConfig, params }));
export const clients_create = (form) => safeRequest(() => axios.post(`/api/v1/clients/create`, form, axiosConfig));
export const clients_update = (id, form) => safeRequest(() => axios.put(`/api/v1/clients/update/${id}`, form, axiosConfig));
export const clientsList = () => safeRequest(() => axios.get(`/api/v1/clients/all`, axiosConfig));
export const finalClientsList = (id) => safeRequest(() => axios.get(`/api/v1/clients/list/${id}`, axiosConfig));


// =================================================================
// == User & Role Endpoints
// =================================================================

export const usersList = () => safeRequest(() => axios.get(`/api/v1/users/all`, axiosConfig));
export const create_User = (form) => safeRequest(() => axios.post(`/api/v1/users/create`, form, axiosConfig));
export const update_Users = (form, user_id) => safeRequest(() => axios.put(`/api/v1/users/update/${user_id}`, form, axiosConfig));
export const rolesList = () => safeRequest(() => axios.get(`/api/v1/roles/all`, axiosConfig));


// =================================================================
// == Tariff Endpoints
// =================================================================

export const tariffsListAll = () => safeRequest(() => axios.get(`/api/v1/tariffs/all`, axiosConfig));
export const tariffs_calculation = (trTypeId, startPlace, endPlace) => safeRequest(() => axios.get(`/api/v1/tariffs/calc/${trTypeId.id}/${startPlace.id}/${endPlace.id}`, axiosConfig));
export const tariffs_create = (params) => safeRequest(() => axios.post(`/api/v1/tariffs/create`, params, axiosConfig));
export const tariffsDelete = (id) => safeRequest(() => axios.delete(`/api/v1/tariffs/delete/${id}`, axiosConfig));


// =================================================================
// == Place Endpoints
// =================================================================

export const placesList_All = (id) => safeRequest(() => axios.get(`/api/v1/places/list/${id}`, axiosConfig));
export const startPlace_Points = (id) => safeRequest(() => axios.get(`/api/v1/places/getStartPoints/${id}`, axiosConfig));
export const endPlace_Points = (id) => safeRequest(() => axios.get(`/api/v1/places/getEndPoints/${id}`, axiosConfig));


// =================================================================
// == Carrier Endpoints
// =================================================================

export const carriers_create = (body) => safeRequest(() => axios.post(`/api/v1/carriers/create`, body, axiosConfig));
export const carriers_read = (id) => safeRequest(() => axios.get(`/api/v1/carriers/read/${id}`, axiosConfig));
export const carriers_filtered = (params) => safeRequest(() => axios.get(`/api/v1/carriers/filtered`, { ...axiosConfig, params }));
export const carriers_update = (id, body) => safeRequest(() => axios.put(`/api/v1/carriers/update/${id}`, body, axiosConfig));
export const carriers_delete = (id) => safeRequest(() => axios.delete(`/api/v1/carriers/delete/${id}`, axiosConfig));


// =================================================================
// == Vehicle Endpoints
// =================================================================

const multiPartConfig = { ...axiosConfig, headers: { 'Content-Type': 'multipart/form-data' } };
export const vehicles_create = (formData) => safeRequest(() => axios.post(`/api/v1/vehicles/create`, formData, multiPartConfig));
export const vehicles_update = (id, body) => safeRequest(() => axios.put(`/api/v1/vehicles/update/${id}`, body, axiosConfig));
export const vehicles_delete = (id) => safeRequest(() => axios.delete(`/api/v1/vehicles/delete/${id}`, axiosConfig));
export const vehicles_filtered = (params) => safeRequest(() => axios.get(`/api/v1/vehicles/filtered`, { ...axiosConfig, params }));
export const vehicles_updatePhoto = (formData) => safeRequest(() => axios.post(`/api/v1/vehicles/updatePhoto`, formData, multiPartConfig));


// =================================================================
// == Driver Endpoints
// =================================================================

export const drivers_create = (formData) => safeRequest(() => axios.post(`/api/v1/drivers/create`, formData, multiPartConfig));
export const drivers_update = (id, body) => safeRequest(() => axios.put(`/api/v1/drivers/update/${id}`, body, axiosConfig));
export const drivers_delete = (id) => safeRequest(() => axios.delete(`/api/v1/drivers/delete/${id}`, axiosConfig));
export const drivers_filtered = (params) => safeRequest(() => axios.get(`/api/v1/drivers/filtered`, { ...axiosConfig, params }));
export const drivers_updatePhoto = (formData) => safeRequest(() => axios.post(`/api/v1/drivers/updatePhoto`, formData, multiPartConfig));

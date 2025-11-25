import axios from 'axios';
import jwtDecode from "jwt-decode";

// =================================================================
// == Helpers & Config
// =================================================================

const axiosConfig = {
    withCredentials: true
};

// Centralized error logging
const logError = (context, error) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(`[DataConector] Error in ${context}:`, error);
    }
};

async function safeRequest(fn, context = 'request') {
    try {
        const response = await fn();
        return response.data?.success ? response.data : { success: false, message: response.data?.message || 'Unknown error' };
    } catch (error) {
        logError(context, error);
        return { success: false, error: error.message };
    }
}

export function decodeJWT_firmed(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        logError('decodeJWT_firmed', error);
        return null;
    }
}

export function decode64Native(token) {
    try {
        const payloadBase64 = token.split(".")[1];
        const decodedJson = atob(payloadBase64);
        return JSON.parse(decodedJson);
    } catch (e) {
        logError('decode64Native', e);
        return null;
    }
}

export function decodeBase64Token(token) {
    try {
        const decodedJson = atob(token);
        return JSON.parse(decodedJson);
    } catch (e) {
        logError('decodeBase64Token', e);
        return null;
    }
}

// =================================================================
// == Auth Endpoints
// =================================================================

export const auth = (params) => safeRequest(() => axios.post(`/api/v1/auth/login`, params, axiosConfig), 'auth');
export const logOut = () => safeRequest(() => axios.get(`/api/v1/auth/logout`, axiosConfig), 'logOut');
export const check_Session = () => safeRequest(() => axios.get(`/api/v1/auth/checkSession`, axiosConfig), 'check_Session');


// =================================================================
// == Transfer Endpoints
// =================================================================
export const transfers_filtered_summary = (params) => safeRequest(() => axios.get(`/api/v1/transfers/filteredSummary`, { ...axiosConfig, params }), 'transfers_filtered_summary');
export const transfers_filteredFull = (params) => safeRequest(() => axios.get(`/api/v1/transfers/filteredFullTransfer`, { ...axiosConfig, params }), 'transfers_filteredFull');
export const transfers_Create = (params) => safeRequest(() => axios.post(`/api/v1/transfers/create`, params, axiosConfig), 'transfers_Create');
export const transfersCheckBL = (name) => safeRequest(() => axios.get(`/api/v1/transfers/check/${name}`, axiosConfig), 'transfersCheckBL');
export const transfer_Types = () => safeRequest(() => axios.get(`/api/v1/transferTypes/filtered`, axiosConfig), 'transfer_Types');
export const transfers_uploadVoucher = (transferId, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('json', JSON.stringify({ transferId: transferId, voucherPhotoName: file.name }));

    return safeRequest(() => axios.post(`/api/v1/transfers/uploadVoucher`, formData, {
        ...axiosConfig,
        headers: { 'Content-Type': 'multipart/form-data' },
    }), 'transfers_uploadVoucher');
};
export const transfers_update_state = (transferId, state) => safeRequest(() => axios.patch(`/api/v1/transfers/updateState/${transferId}`, { newStateId: state }, axiosConfig), 'transfers_update_state');


// =================================================================
// == Transfer Unit Endpoints
// =================================================================

export const transferUnits_filtered = (params) => safeRequest(() => axios.get(`/api/v1/transferUnits/filtered`, { ...axiosConfig, params }), 'transferUnits_filtered');
export const assign_Containers = (params) => safeRequest(() => axios.post(`/api/v1/transferUnits/create`, params, axiosConfig), 'assign_Containers');
export const linkTransferUnits = (formData) => safeRequest(() => axios.post(`/api/v1/transferUnits/linked`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}), 'linkTransferUnits');
export const transferUnits_openSeal = (id, pin) => safeRequest(() => axios.post(`/api/v1/transferUnits/openSeal`, { id, pin }, axiosConfig), 'transferUnits_openSeal');


// =================================================================
// == Transfer Blit (Tracking) Endpoints
// =================================================================

export const transferBlits_filtered = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/filtered`, { ...axiosConfig, params }), 'transferBlits_filtered');
export const transferBlits_mapPoints = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/mapPoints`, { ...axiosConfig, params }), 'transferBlits_mapPoints');
export const transferBlits = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/read`, { ...axiosConfig, params }), 'transferBlits');


// =================================================================
// == Device Endpoints
// =================================================================

export const devicesAll = (params) => safeRequest(() => axios.get(`/api/v1/devices/filtered`, { ...axiosConfig, params: { pageSize: 20000, ...params } }), 'devicesAll');
export const counterCandado = () => safeRequest(() => axios.get(`/api/v1/devices/allStats`, axiosConfig), 'counterCandado');
export const openSeal = (params, pin) => safeRequest(() => axios.post(`/api/v1/devices/openSeal`, { ...params, pin }, axiosConfig), 'openSeal');


// =================================================================
// == Client Endpoints
// =================================================================

export const clients_filtered = (params) => safeRequest(() => axios.get(`/api/v1/clients/filtered`, { ...axiosConfig, params }), 'clients_filtered');
export const clients_create = (form) => safeRequest(() => axios.post(`/api/v1/clients/create`, form, axiosConfig), 'clients_create');
export const clients_update = (id, form) => safeRequest(() => axios.put(`/api/v1/clients/update/${id}`, form, axiosConfig), 'clients_update');
export const clientsList = () => safeRequest(() => axios.get(`/api/v1/clients/filtered`, { ...axiosConfig, params: { pageSize: 1000 } }), 'clientsList');
export const finalClientsList = (id) => safeRequest(() => axios.get(`/api/v1/clients/list/${id}`, axiosConfig), 'finalClientsList');
export const clients_read = (id) => safeRequest(() => axios.get(`/api/v1/clients/read/${id}`, axiosConfig), 'clients_read');
export const clients_doRelate = (data) => safeRequest(() => axios.post(`/api/v1/clients/doRelate`, data, axiosConfig), 'clients_doRelate');
export const clients_detach = (data) => safeRequest(() => axios.post(`/api/v1/clients/detach`, data, axiosConfig), 'clients_detach');


// =================================================================
// == User & Role Endpoints
// =================================================================

export const usersList = () => safeRequest(() => axios.get(`/api/v1/users/all`, axiosConfig), 'usersList');
export const users_filtered = (params) => safeRequest(() => axios.get(`/api/v1/users/filtered`, { ...axiosConfig, params }), 'users_filtered');
export const users_read = (id) => safeRequest(() => axios.get(`/api/v1/users/read/${id}`, axiosConfig), 'users_read');
export const create_User = (form) => safeRequest(() => axios.post(`/api/v1/users/create`, form, axiosConfig), 'create_User');
export const update_Users = (form, user_id) => safeRequest(() => axios.put(`/api/v1/users/update/${user_id}`, form, axiosConfig), 'update_Users');
export const users_updatePassword = (id, data) => safeRequest(() => axios.patch(`/api/v1/users/updatePassword/${id}`, data, axiosConfig), 'users_updatePassword');
export const users_delete = (id) => safeRequest(() => axios.delete(`/api/v1/users/delete/${id}`, axiosConfig), 'users_delete');

export const rolesList = () => safeRequest(() => axios.get(`/api/v1/roles/filtered`, { ...axiosConfig, params: { pageSize: 1000 } }), 'rolesList');
export const roles_filtered = (params) => safeRequest(() => axios.get(`/api/v1/roles/filtered`, { ...axiosConfig, params }), 'roles_filtered');
export const roles_read = (id) => safeRequest(() => axios.get(`/api/v1/roles/read/${id}`, axiosConfig), 'roles_read');
export const roles_create = (data) => safeRequest(() => axios.post(`/api/v1/roles/create`, data, axiosConfig), 'roles_create');
export const roles_update = (id, data) => safeRequest(() => axios.put(`/api/v1/roles/update/${id}`, data, axiosConfig), 'roles_update');
export const roles_delete = (id) => safeRequest(() => axios.delete(`/api/v1/roles/delete/${id}`, axiosConfig), 'roles_delete');


// =================================================================
// == Tariff Endpoints
// =================================================================

export const tariffsListAll = () => safeRequest(() => axios.get(`/api/v1/tariffs/all`, axiosConfig), 'tariffsListAll');
export const tariffs_calculation = (trTypeId, startPlace, endPlace) => safeRequest(() => axios.get(`/api/v1/tariffs/calc/${trTypeId.id}/${startPlace.id}/${endPlace.id}`, axiosConfig), 'tariffs_calculation');
export const tariffs_create = (params) => safeRequest(() => axios.post(`/api/v1/tariffs/create`, params, axiosConfig), 'tariffs_create');
export const tariffsDelete = (id) => safeRequest(() => axios.delete(`/api/v1/tariffs/delete/${id}`, axiosConfig), 'tariffsDelete');


// =================================================================
// == Place Endpoints
// =================================================================

export const placesList_All = (id) => safeRequest(() => axios.get(`/api/v1/places/list/${id}`, axiosConfig), 'placesList_All');
export const startPlace_Points = (id) => safeRequest(() => axios.get(`/api/v1/places/getStartPoints/${id}`, axiosConfig), 'startPlace_Points');
export const endPlace_Points = (id) => safeRequest(() => axios.get(`/api/v1/places/getEndPoints/${id}`, axiosConfig), 'endPlace_Points');


// =================================================================
// == Carrier Endpoints
// =================================================================

export const carriers_create = (body) => safeRequest(() => axios.post(`/api/v1/carriers/create`, body, axiosConfig), 'carriers_create');
export const carriers_read = (id) => safeRequest(() => axios.get(`/api/v1/carriers/read/${id}`, axiosConfig), 'carriers_read');
export const carriers_filtered = (params) => safeRequest(() => axios.get(`/api/v1/carriers/filtered`, { ...axiosConfig, params }), 'carriers_filtered');
export const carriers_update = (id, body) => safeRequest(() => axios.put(`/api/v1/carriers/update/${id}`, body, axiosConfig), 'carriers_update');
export const carriers_delete = (id) => safeRequest(() => axios.delete(`/api/v1/carriers/delete/${id}`, axiosConfig), 'carriers_delete');


// =================================================================
// == Vehicle Endpoints
// =================================================================

const multiPartConfig = { ...axiosConfig, headers: { 'Content-Type': 'multipart/form-data' } };
export const vehicles_create = (formData) => safeRequest(() => axios.post(`/api/v1/vehicles/create`, formData, multiPartConfig), 'vehicles_create');
export const vehicles_update = (id, body) => safeRequest(() => axios.put(`/api/v1/vehicles/update/${id}`, body, axiosConfig), 'vehicles_update');
export const vehicles_delete = (id) => safeRequest(() => axios.delete(`/api/v1/vehicles/delete/${id}`, axiosConfig), 'vehicles_delete');
export const vehicles_filtered = (params) => safeRequest(() => axios.get(`/api/v1/vehicles/filtered`, { ...axiosConfig, params }), 'vehicles_filtered');
export const vehicles_updatePhoto = (formData) => safeRequest(() => axios.post(`/api/v1/vehicles/updatePhoto`, formData, multiPartConfig), 'vehicles_updatePhoto');


// =================================================================
// == Driver Endpoints
// =================================================================

export const drivers_create = (formData) => safeRequest(() => axios.post(`/api/v1/drivers/create`, formData, multiPartConfig), 'drivers_create');
export const drivers_update = (id, body) => safeRequest(() => axios.put(`/api/v1/drivers/update/${id}`, body, axiosConfig), 'drivers_update');
export const drivers_delete = (id) => safeRequest(() => axios.delete(`/api/v1/drivers/delete/${id}`, axiosConfig), 'drivers_delete');
export const drivers_filtered = (params) => safeRequest(() => axios.get(`/api/v1/drivers/filtered`, { ...axiosConfig, params }), 'drivers_filtered');
export const drivers_updatePhoto = (formData) => safeRequest(() => axios.post(`/api/v1/drivers/updatePhoto`, formData, multiPartConfig), 'drivers_updatePhoto');

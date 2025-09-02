import axios from 'axios';
import jwtDecode from "jwt-decode";


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

// ... (keep all your existing functions like transfer_Types, tariffs_List, etc.)

export const transfer_Types = () => safeRequest(() => axios.get(`/api/v1/transferTypes/filtered`, axiosConfig));
export const tariffs_List = () => safeRequest(() => axios.get(`/api/v1/tariffs/all`, axiosConfig));

export async function tariffs_calculation(trTypeId, startPlace, endPlace) {
    try {
        const response = await axios.get(`/api/v1/tariffs/calc/${trTypeId.id}/${startPlace.id}/${endPlace.id}`, {
            withCredentials: true
        });

        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.warn("Unexpected response status:", response.status);
            return { success: false };
        }
    } catch (error) {
        console.error("Error fetching tariff calculation:", error);
        return { success: false };
    }
}


export async function transfers_Create(params) {
    try {
        const response = await axios.post(`/api/v1/transfers/create`, params, axiosConfig);
        return response.status === 201 && response.data.success ? response.data : { success: false };
    } catch (error) {
        console.error(error);
        return error.response?.data || { success: false };
    }
}

export async function assgin_Containers(params) {
    try {
        const response = await axios.post(`/api/v1/transferUnits/create`, params, axiosConfig);
        return response.status === 201 && response.data.success ? response.data : { success: false };
    } catch (error) {
        console.error(error);
        return error.response?.data || { success: false };
    }
}

export const transfers_listAll = () => safeRequest(() => axios.get(`/api/v1/transfers/filtered`, axiosConfig));
export const transfer_UnitsByTransferId = (id) => safeRequest(() => axios.get(`/api/v1/transferUnits/filtered?transferId=${id}`, axiosConfig));
export const transfers_list = (params) => safeRequest(() => axios.get(`/api/v1/transfers/filteredSummary`, { ...axiosConfig, params }));
export const check_Session = () => safeRequest(() => axios.get(`/api/v1/auth/checkSession`, axiosConfig));

export async function transfersCheckBL(name) {
    try {
        const response = await axios.get(`/api/v1/transfers/check/${name}`, axiosConfig);
        return response.data === 'Transfer exists' ? { success: true } : { success: false };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}
export const linkTransferUnits = (formData) => safeRequest(() => axios.post(`/api/v1/transferUnits/linked`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}));
export const auth = (params) => safeRequest(() => axios.post(`/api/v1/auth/login`, params, axiosConfig));
export const logOut = () => safeRequest(() => axios.get(`/api/v1/auth/logout`, axiosConfig));
export const devicesAll = () => safeRequest(() => axios.get(`/api/v1/devices/filtered`, axiosConfig));
export const placesList_All = (id) => safeRequest(() => axios.get(`/api/v1/places/list/${id}`, axiosConfig));
export const startPlace_Points = (id) => safeRequest(() => axios.get(`/api/v1/places/getStartPoints/${id}`, axiosConfig));
export const endPlace_Points = (id) => safeRequest(() => axios.get(`/api/v1/places/getEndPoints/${id}`, axiosConfig));
export const clientsList = () => safeRequest(() => axios.get(`/api/v1/clients/all`, axiosConfig));
export const tariffsListAll = () => safeRequest(() => axios.get(`/api/v1/tariffs/all`, axiosConfig));

export async function tariffsDelete(id) {
    try {
        const response = await axios.delete(`/api/v1/tariffs/delete/${id}`, axiosConfig);
        return response.status === 204 ? response.data : { success: false };
    } catch (error) {
        console.error(error);
        return error.response?.data || { success: false };
    }
}

export const finalClientsList = (id) => safeRequest(() => axios.get(`/api/v1/clients/list/${id}`, axiosConfig));
export const usersList = () => safeRequest(() => axios.get(`/api/v1/users/all`, axiosConfig));

export const update_Users = (form, user_id) => safeRequest(() => axios.put(`/api/v1/users/update/${user_id}`, form, axiosConfig));
export const rolesList = () => safeRequest(() => axios.get(`/api/v1/roles/all`, axiosConfig));
export const create_Client = (form) => safeRequest(() => axios.post(`/api/v1/clients/create`, form, axiosConfig));
export const tarrifs_create = (params) => safeRequest(() => axios.post(`/api/v1/tariffs/create`, params, axiosConfig));
export const update_Client = (form, id) => safeRequest(() => axios.put(`/api/v1/clients/update/${id}`, form, axiosConfig));
export const create_User = (form) => safeRequest(() => axios.post(`/api/v1/users/create`, form, axiosConfig));

export async function openSeal(params, pin) {
    try {
        params.pin = pin;
        const response = await axios.post(`/api/v1/devices/openSeal`, params, axiosConfig);
        return response.data.success ? { success: true } : { success: false };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}

export const counterCandado = () => safeRequest(() => axios.get(`/api/v1/devices/allStats`, axiosConfig));

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
export const vehicles_create = (formData) => safeRequest(() => axios.post(`/api/v1/vehicles/create`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}));
export const vehicles_update = (id, body) => safeRequest(() => axios.put(`/api/v1/vehicles/update/${id}`, body, axiosConfig));
export const vehicles_delete = (id) => safeRequest(() => axios.delete(`/api/v1/vehicles/delete/${id}`, axiosConfig));
export const vehicles_filtered = (params) => safeRequest(() => axios.get(`/api/v1/vehicles/filtered`, { ...axiosConfig, params }));
export const vehicles_updatePhoto = (formData) => safeRequest(() => axios.post(`/api/v1/vehicles/updatePhoto`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}));


// =================================================================
// == Driver Endpoints
// =================================================================
export const drivers_create = (formData) => safeRequest(() => axios.post(`/api/v1/drivers/create`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}));
export const drivers_update = (id, body) => safeRequest(() => axios.put(`/api/v1/drivers/update/${id}`, body, axiosConfig));
export const drivers_delete = (id) => safeRequest(() => axios.delete(`/api/v1/drivers/delete/${id}`, axiosConfig));
export const drivers_filtered = (params) => safeRequest(() => axios.get(`/api/v1/drivers/filtered`, { ...axiosConfig, params }));
export const drivers_updatePhoto = (formData) => safeRequest(() => axios.post(`/api/v1/drivers/updatePhoto`, formData, {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' }
}));

export const transferBlits = (params) => safeRequest(() => axios.get(`/api/v1/transferBlits/read`, { ...axiosConfig, params }));

import {
    carriers_create,
    carriers_filtered,
    carriers_update,
    carriers_delete,
    drivers_create,
    drivers_filtered,
    drivers_delete,
    vehicles_create,
    vehicles_filtered,
    vehicles_update,
    vehicles_delete, drivers_update
} from '../components/conexion/DataConector.js';

const handleResponse = (response) => {
    if (response && response.success) {
        return Array.isArray(response.data) ? response.data : [response.data];
    } else if (response && !response.success) {
        // If the API indicates failure, return an empty array to prevent crashes
        return [];
    } else {
        // Handle cases where the response is not in the expected format
        throw new Error('Invalid API response format.');
    }
};

/**
 * Prepares FormData for submission.
 * @param {object} data - The form data object, which may contain a 'photo' property.
 * @returns {FormData}
 */
export const prepareFormData = (data) => {
    const formData = new FormData();
    const photo = data.photo;

    // The 'photo' property should not be in the JSON part.
    delete data.photo;

    // Append the stringified JSON data.
    formData.append('json', JSON.stringify(data));

    // Append the photo file if it exists.
    if (photo instanceof File) {
        formData.append('photo', photo, photo.name);
    }

    return formData;
};


export const transportistaService = {
    // === Carrier Methods ===
    getCarriers: async (filters) => {
        const response = await carriers_filtered(filters);
        return response.data.carriers
    },
    createCarrier: async (data) => {
        const response = await carriers_create(data);
        return handleResponse(response);
    },
    updateCarrier: async (id, data) => {
        // Carrier updates don't involve files, so we send raw JSON data.
        const response = await carriers_update(id, data);
        return handleResponse(response);
    },
    deleteCarrier: async (id) => {
        const response = await carriers_delete(id);
        return handleResponse(response);
    },

    // === Driver Methods ===
    getDrivers: async (filters) => {
        const response = await drivers_filtered(filters);
        return response.data.drivers
    },
    createDriver: async (data) => {
        const formData = prepareFormData(data);
        const response = await drivers_create(formData);
        return handleResponse(response);
    },
    updateDriver: async (id, data) => {
        const response = await drivers_update(id, data);
        return handleResponse(response);
    },
    deleteDriver: async (id) => {
        const response = await drivers_delete(id);
        return handleResponse(response);
    },

    // === Vehicle Methods ===
    getVehicles: async (filters) => {
        const response = await vehicles_filtered(filters);
        return response.data.vehicles
    },
    createVehicle: async (data) => {
        const formData = prepareFormData(data);
        const response = await vehicles_create(formData);
        return handleResponse(response);
    },
    updateVehicle: async (id, data) => {
        const response = await vehicles_update(id, data);
        return handleResponse(response);
    },
    deleteVehicle: async (id) => {
        const response = await vehicles_delete(id);
        return handleResponse(response);
    }
};

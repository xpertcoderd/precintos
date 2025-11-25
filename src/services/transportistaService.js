import {
    createCarrier,
    getCarriersFiltered,
    updateCarrier,
    deleteCarrier
} from './carrierService';
import {
    createDriver,
    getDriversFiltered,
    deleteDriver,
    updateDriver
} from './driverService';
import {
    createVehicle,
    getVehiclesFiltered,
    updateVehicle,
    deleteVehicle
} from './vehicleService';

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
        const response = await getCarriersFiltered(filters);
        return response.data.carriers
    },
    createCarrier: async (data) => {
        const response = await createCarrier(data);
        return handleResponse(response);
    },
    updateCarrier: async (id, data) => {
        // Carrier updates don't involve files, so we send raw JSON data.
        const response = await updateCarrier(id, data);
        return handleResponse(response);
    },
    deleteCarrier: async (id) => {
        const response = await deleteCarrier(id);
        return handleResponse(response);
    },

    // === Driver Methods ===
    getDrivers: async (filters) => {
        const response = await getDriversFiltered(filters);
        return response.data.drivers
    },
    createDriver: async (data) => {
        const formData = prepareFormData(data);
        const response = await createDriver(formData);
        return handleResponse(response);
    },
    updateDriver: async (id, data) => {
        const response = await updateDriver(id, data);
        return handleResponse(response);
    },
    deleteDriver: async (id) => {
        const response = await deleteDriver(id);
        return handleResponse(response);
    },

    // === Vehicle Methods ===
    getVehicles: async (filters) => {
        const response = await getVehiclesFiltered(filters);
        return response.data.vehicles
    },
    createVehicle: async (data) => {
        const formData = prepareFormData(data);
        const response = await createVehicle(formData);
        return handleResponse(response);
    },
    updateVehicle: async (id, data) => {
        const response = await updateVehicle(id, data);
        return handleResponse(response);
    },
    deleteVehicle: async (id) => {
        const response = await deleteVehicle(id);
        return handleResponse(response);
    }
};

import { getTransferTypes } from "@/services/transferService";
import { getStartPlacePoints, getEndPlacePoints } from "@/services/placeService";
import { getFinalClientsList } from "@/services/clientService";
import { calculateTariff } from "@/services/tariffService";
import { decodeBase64Token } from "@/utils/authUtils";
import Cookies from 'js-cookie';

const PUBLIC_COOKIE = 'userPublicInfo'

export function getTokenPublicInfo() {
    const token = Cookies.get(PUBLIC_COOKIE);
    const user_session = decodeBase64Token(token);
    if (!user_session) {
        console.error('No Active Session')
        return;
    }
    return user_session;
}

export async function fetchInitialData() {
    const user_session = getTokenPublicInfo();
    const initialData = {
        transferTypes: [],
        startPlaces: [],
        endPlaces: [],
        finalClients: []
    };

    try {
        // API calls now return data directly (intercepted) or the full response?
        // My axios instance returns response.data.
        // The services return the promise of that.
        // So `await getTransferTypes()` returns the data directly.
        // I need to check the structure of the data returned by the API.
        // Old DataConector: response.data.success ? response.data : ...
        // New Service: api.get(...) -> interceptor returns response.data.
        // So if API returns { success: true, data: { transferTypes: [] } }, then I get that object.

        const [typesRes, startRes, endRes, clientsRes] = await Promise.all([
            getTransferTypes(),
            getStartPlacePoints(user_session.clientId),
            getEndPlacePoints(user_session.clientId),
            getFinalClientsList(user_session.clientId)
        ]);

        if (typesRes?.success) initialData.transferTypes = typesRes.data.transferTypes;
        if (startRes?.success) initialData.startPlaces = startRes.data.places;
        if (endRes?.success) initialData.endPlaces = endRes.data.places;
        if (clientsRes?.success) initialData.finalClients = clientsRes.data.clients;

    } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
    }

    return initialData;
}

export async function calculateTariffValue(trType, startPlace, endPlace) {
    // Extract IDs from objects if they are objects
    const trTypeId = typeof trType === 'object' ? trType.id : trType;
    const startPlaceId = typeof startPlace === 'object' ? startPlace.id : startPlace;
    const endPlaceId = typeof endPlace === 'object' ? endPlace.id : endPlace;

    if (!trTypeId || !startPlaceId || !endPlaceId) {
        console.warn("No pueden haber valores null");
        return 0;
    }

    try {
        const response = await calculateTariff(trTypeId, startPlaceId, endPlaceId);
        return response.success ? (response.data.tariff.price || 0) : 0;
    } catch (error) {
        console.error("Error al consultar la tarifa:", error);
        return 0;
    }
}





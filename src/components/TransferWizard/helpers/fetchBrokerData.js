import {
    decodeBase64Token,
    endPlace_Points,
    finalClientsList,
    startPlace_Points,
    transfer_Types,
    tariffs_calculation
} from "@/components/conexion/DataConector";
import Cookies from 'js-cookie';

const PUBLIC_COOKIE= 'userPublicInfo'
async function getTransferTypes() {
    try {
        const typeList = await transfer_Types();
        if (typeList.success) {
            return typeList.data.transferTypes;
        }
    } catch (error) {
        console.error("Error al hacer la petición de tipos de transferencia:", error);
    }
}

async function getStartPlaces(sc_Id) {
    try {
        const listPlaces = await startPlace_Points(sc_Id);
        if (listPlaces.success) {
            return listPlaces.data.places;
        }
    } catch (error) {
        console.error("Error al obtener puntos de inicio:", error);
    }
}

async function getEndPlaces(sc_Id) {
    try {
        const listPlaces = await endPlace_Points(sc_Id);
        if (listPlaces.success) {
            return listPlaces.data.places;
        }
    } catch (error) {
        console.error("Error al obtener puntos de destino:", error);
    }
}

async function getFinalClientsList(sc_id) {
    try {
        const clientList = await finalClientsList(sc_id);
        if (clientList.success) {
            return clientList.data.clients;
        }
    } catch (error) {
        console.error("Error al obtener clientes finales:", error);
    }
}

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
        const [transferTypes, startPlaces, endPlaces, finalClients] = await Promise.all([
            getTransferTypes(),
            getStartPlaces(user_session.clientId),
            getEndPlaces(user_session.clientId),
            getFinalClientsList(user_session.clientId)
        ]);

        if (transferTypes) initialData.transferTypes = transferTypes;
        if (startPlaces) initialData.startPlaces = startPlaces;
        if (endPlaces) initialData.endPlaces = endPlaces;
        if (finalClients) initialData.finalClients = finalClients;

    } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
    }

    return initialData;
}

export async function calculateTariff(trTypeId, startPlaceID, endPlaceId) {
    if (!trTypeId || !startPlaceID || !endPlaceId) {
        console.warn("No pueden haber valores null");
        return;
    }

    try {
        const response = await tariffs_calculation(trTypeId, startPlaceID, endPlaceId);
        return response.data.tariff.price || 0;
    } catch (error) {
        console.error("Error al consultar la tarifa:", error);
    }
}




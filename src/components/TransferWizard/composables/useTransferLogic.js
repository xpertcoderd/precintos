// composables/transferWizard/useTransferLogic.js
import { ref } from 'vue';
import { assign_Containers, transfers_Create } from "@/components/conexion/DataConector";
import Swal from "sweetalert2";
import { getTokenPublicInfo } from "@/components/TransferWizard/helpers/fetchBrokerData";

export function useTransferLogic(wizardData) {
    const orders = ref([]);
    const orderSummary = ref({
        bl: 0,
        containers: 0,
        amount: 0,
    });

    async function sms(texto) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        await Toast.fire({
            icon: "success",
            title: texto,
        });
    }

    function buildTransferParams(bl) {
        const {
            finalClient,
            type,
            startPlace,
            endPlace,
            address,
            city,
            note,
            unitPrice,
        } = wizardData.step1;
        const userSession = getTokenPublicInfo();

        return {
            userId: userSession.id,
            serverClientId: userSession.clientId,
            finalClientId: finalClient.id,
            unitPrice,
            transferTypeId: type.id,
            bl: bl.bl,
            startPlace: startPlace.id,
            endPlace: endPlace.id,
            address,
            city,
            note,
            timeTravelEst: '2025-01-17 16:00:00Z',
            cargoDescription: 'carga variada',
            booking:null
        };
    }

    function buildContainerPayload(containers, transferId) {
        return containers.map(container => ({
            transferId,
            container: container.container,
            currentState: 1,
        }));
    }

    async function createTransfersBl(params) {
        try {
            const response = await transfers_Create(params);
            console.log(response)
            return response.success ? response.data.transfer.id : (alert(response.message), false);
        } catch (error) {
            console.error("❌ Error en createTransfersBl:", error);
            return false;
        }
    }

    async function assignContainers(payload) {
        try {
            const response = await assign_Containers(payload);
            return response.success;
        } catch (error) {
            console.error("❌ Error en assginContainers:", error);
            return false;
        }
    }

    function updateOrderState(createdOrders) {
        orders.value.push(...createdOrders);

        orderSummary.value.bl = orders.value.length;
        orderSummary.value.containers = orders.value.reduce(
            (sum, o) => sum + (o.containers_count || 0),
            0
        );
        orderSummary.value.amount =
            orderSummary.value.containers * wizardData.step1.unitPrice;
    }

    async function processSingleBl(bl) {
        const createdOrders = [];
        const params = buildTransferParams(bl);

        const transferId = await createTransfersBl(params);
        if (!transferId) {
            sms(`❌ Error al crear BL ${bl.bl}`);
            return [];
        }

        sms(`✅ BL ${transferId} creado`);

        const containerPayload = buildContainerPayload(bl.containers, transferId);
        const assigned = await assignContainers(containerPayload);

        if (assigned) {
            sms(`✅ Contenedores asignados para BL ${bl.bl}`);
            createdOrders.push({
                id: transferId,
                bl: bl.bl,
                startPlace: params.startPlace,
                endPlace: params.endPlace,
                unitPrice: params.unitPrice,
                containers_count: bl.containers.length,
                amount: bl.containers.length * params.unitPrice,
            });
        } else {
            sms(`⚠️ No se pudieron asignar contenedores para BL ${bl.bl}`);
        }

        return createdOrders;
    }

    async function processOrder(data, onFinish) {
        const allCreatedOrders = [];
        for (const bl of data.bl_ContainerList) {
            const result = await processSingleBl(bl);
            allCreatedOrders.push(...result);
        }
        updateOrderState(allCreatedOrders);
        if (onFinish) onFinish();
    }

    return {
        orders,
        orderSummary,
        sms,
        processOrder,
    };
}

// composables/transferWizard/useTransferLogic.js
import { ref } from 'vue';
import { assignContainers } from "@/services/unitService";
import { createTransfer } from "@/services/transferService";
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
            timeTravelEst,
        } = wizardData.step1;
        const { description, booking } = wizardData.step2;
        const userSession = getTokenPublicInfo();

        return {
            userId: userSession.id,
            serverClientId: userSession.clientId,
            finalClientId: finalClient?.id,
            unitPrice,
            transferTypeId: type?.id,
            bl: bl.bl,
            startPlace: startPlace?.id,
            endPlace: endPlace?.id,
            address,
            city,
            note,
            timeTravelEst: timeTravelEst ? `${timeTravelEst} 00:00:00Z` : null,
            cargoDescription: description || 'Sin descripción',
            booking: booking || null,
        };
    }



    function updateOrderState(createdOrders) {
        orders.value.push(...createdOrders);

        orderSummary.value.bl = orders.value.length;
        // Total containers
        orderSummary.value.containers = orders.value.reduce(
            (sum, o) => sum + (o.containers_count || 0),
            0
        );

        // Summing up totals
        const totalGross = orders.value.reduce((sum, o) => sum + (o.grossAmount || 0), 0);
        const totalDiscount = orders.value.reduce((sum, o) => sum + (o.discountAmount || 0), 0);
        const totalNet = orders.value.reduce((sum, o) => sum + (o.netAmount || 0), 0);

        orderSummary.value.grossTotal = totalGross;
        orderSummary.value.discountTotal = totalDiscount;
        orderSummary.value.totalAmount = totalNet; // This will trigger the "Total a Pagar" in Step 5
    }

    async function processSingleBl(bl) {
        const createdOrders = [];
        let transferId;
        const transferData = buildTransferParams(bl);

        // Check if we are in Edit Mode (transferId exists)
        if (bl.transferId) {
            transferId = bl.transferId;
            // sms(`ℹ️ Agregando a Transferencia existente #${transferId}`); // Optional feedback
        } else {
            // Create new transfer
            const transferResponse = await createTransfer(transferData);

            if (transferResponse.success) {
                transferId = transferResponse.data.transfer.id;
                sms(`✅ BL ${transferId} creado`);
            } else {
                sms(`❌ Error al crear BL ${bl.bl}`);
                return [];
            }
        }

        // Proceed to assign containers (common for both modes)
        if (transferId) {
            // Transform containers to match API expected format: array of {transferId, container}
            const containerData = bl.containers.map(c => ({
                transferId: transferId,
                container: c.container
            }));

            const assignResponse = await assignContainers(containerData);

            if (assignResponse.success) {
                sms(`✅ Contenedores asignados para BL ${bl.bl}`);

                // Calculate costs using tariffData from Step 1
                const tariffData = wizardData.step1.tariffData || { price: transferData.unitPrice || 0, discount: 0, finalCost: transferData.unitPrice || 0 };
                const count = bl.containers.length;

                createdOrders.push({
                    id: transferId,
                    bl: bl.bl,
                    startPlace: transferData.startPlace,
                    endPlace: transferData.endPlace,
                    unitPrice: tariffData.price,
                    containers_count: count,
                    grossAmount: count * tariffData.price,
                    discountAmount: count * tariffData.discount,
                    netAmount: count * tariffData.finalCost,
                    amount: count * tariffData.finalCost // Keep 'amount' for backward compatibility if needed, but we rely on netAmount or grossAmount
                });
            } else {
                sms(`⚠️ No se pudieron asignar contenedores para BL ${bl.bl}`);
            }
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

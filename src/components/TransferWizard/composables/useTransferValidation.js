
// composables/transferWizard/useTransferValidation.js
import { checkTransferBL } from "@/services/transferService";

export function useTransferValidation(wizardData, errors, allData) {

    async function validateBLExistence(bl) {
        try {
            const response = await checkTransferBL(bl);
            // If we get a response, the BL exists (return true = exists)
            return response.success === true;
        } catch (error) {
            // If we get a 404, the BL doesn't exist, which is what we want (return false = doesn't exist)
            if (error.response && error.response.status === 404) {
                return false;
            }
            // For other errors, log and assume it doesn't exist to allow the user to proceed
            console.error('Error checking BL existence:', error);
            return false;
        }
    }

    function validateStep(currentStep) {
        if (currentStep === 1) {
            const data = wizardData.step1;
            const stepErrors = {};

            if (!data.finalClient) stepErrors.finalClient = 'Cliente Final es requerido';
            if (!data.type) stepErrors.type = 'Tipo de Traslado es requerido';
            if (!data.startPlace) stepErrors.startPlace = 'Origen es requerido';
            if (!data.endPlace) stepErrors.endPlace = 'Destino es requerido';
            if (!data.address) stepErrors.address = 'Dirección es requerida';
            if (!data.city) stepErrors.city = 'Ciudad es requerida';

            errors.step1 = stepErrors;

            const isValid = Object.keys(stepErrors).length === 0;
            if (isValid) {
                Object.assign(allData.value.headerData, {
                    finalClient: data.finalClient.name,
                    typeName: data.type.name,
                    startPlace: data.startPlace.label,
                    endPlace: data.endPlace.label,
                    address: data.address,
                    city: data.city,
                });
            }

            return isValid;
        }

        if (currentStep === 2) {
            const data = wizardData.step2;
            const stepErrors = {};
            if (!data.listBl || data.listBl.length === 0) {
                stepErrors.bl = 'Debe agregar al menos un BL.';
            }
            if (wizardData.step1.type?.name?.toLowerCase() === 'export' && (!data.booking || data.booking.trim() === '')) {
                stepErrors.booking = 'El campo Booking es requerido para traslados de importación.';
            }
            errors.step2 = stepErrors;
            return Object.keys(stepErrors).length === 0;
        }

        if (currentStep === 3) {
            const data = wizardData.step3;
            const stepErrors = {};

            if (!data.listBl_container || data.listBl_container.size === 0) {
                stepErrors.container = 'Debe asignar al menos un contenedor a un BL.';
            }

            errors.step3 = stepErrors;
            const isValid = Object.keys(stepErrors).length === 0;

            const unfilteredContainerList = [];
            allData.value.bl_ContainerList = []
            if (isValid) {
                data.listBl_container.forEach((container) => {
                    unfilteredContainerList.push({
                        bl: container.text1,
                        container: container.text2,
                    });
                });

                // Initialize totals
                allData.value.totalAmount = 0; // Net Total
                allData.value.grossTotal = 0;
                allData.value.discountTotal = 0;

                const tariffData = wizardData.step1.tariffData || {
                    price: wizardData.step1.unitPrice || 0,
                    discount: 0,
                    finalCost: wizardData.step1.unitPrice || 0
                };

                wizardData.step2.listBl.forEach((bl) => {
                    const filteredContainerList = unfilteredContainerList.filter(
                        (container) => container.bl === bl.text
                    );

                    const count = filteredContainerList.length;
                    const grossAmount = count * tariffData.price;
                    const discountAmount = count * tariffData.discount;
                    const netAmount = count * tariffData.finalCost;

                    allData.value.grossTotal += grossAmount;
                    allData.value.discountTotal += discountAmount;
                    allData.value.totalAmount += netAmount;

                    allData.value.bl_ContainerList.push({
                        bl: bl.text,
                        transferId: bl.transferId, // Pass transferId if exists (Edit Mode)
                        bl_count: count,
                        grossAmount,
                        discountAmount,
                        netAmount,
                        amount: netAmount, // Default amount for generic usage
                        containers: filteredContainerList,
                    });
                });
            }

            return isValid;
        }

        if (currentStep === 4) {
            const data = wizardData.step4;
            const stepErrors = {};

            if (!data.check) {
                stepErrors.check = 'Debe aceptar los términos y condiciones.';
            }

            errors.step4 = stepErrors;
            const isValid = Object.keys(stepErrors).length === 0;
            if (isValid) {
                allData.value.check = data.check;
            }

            return isValid;
        }

        if (currentStep === 5) {
            errors.step5 = {};
            return true;
        }

        return false;
    }

    return {
        validateStep,
        validateBLExistence,
    };
}

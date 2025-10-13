// composables/transferWizard/useTransferValidation.js
export function useTransferValidation(wizardData, errors, allData) {
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
            if (!data.listBl || data.listBl.size === 0) {
                stepErrors.bl = 'Debe agregar al menos un BL.';
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
                allData.value.totalAmount = 0;

                wizardData.step2.listBl.forEach((bl) => {
                    const filteredContainerList = unfilteredContainerList.filter(
                        (container) => container.bl === bl.text
                    );
                    const amount = filteredContainerList.length * wizardData.step1.unitPrice;
                    allData.value.totalAmount += amount;

                    allData.value.bl_ContainerList.push({
                        bl: bl.text,
                        bl_count: filteredContainerList.length,
                        amount,
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
    };
}

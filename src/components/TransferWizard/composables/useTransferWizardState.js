// composables/transferWizard/useTransferWizardState.js
import { ref, reactive, computed } from 'vue';

export function useTransferWizardState() {
    const step = ref(1);

    const wizardData = reactive({
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
    });

    const errors = reactive({
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
    });

    const stepIndicators = computed(() =>
        [1, 2, 3, 4, 5].map((n) => step.value >= n)
    );

    function setStep(newStep) {
        step.value = newStep + 1;
    }

    function resetWizard() {
        step.value = 1;
        Object.keys(wizardData).forEach((k) => (wizardData[k] = {}));
        Object.keys(errors).forEach((k) => (errors[k] = {}));
    }

    return {
        step,
        wizardData,
        errors,
        stepIndicators,
        setStep,
        resetWizard,
    };
}

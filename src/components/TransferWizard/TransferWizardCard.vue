<template>
  <div class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-10" >
    <div class="flex rounded-2xl shadow-2xl overflow-hidden bg-white max-w-6xl ">
      <!-- Left: Image and Steps -->

      <div class="relative w-[480px] h-[600px]">
        <div class=" absolute top-8 pb-4 left-auto w-full">
          <TransferWizardSteps @setStep="setStep" :count="stepIndicators" />
        </div>
        <img :src="addClientBg" class="max-w-xl h-full" />
      </div>
      <!-- Right: Form Card -->
      <div class="flex-1 flex flex-col bg-white h-[400px] ">
        <div class="flex items-center justify-between mb-6 p-6 pb-0">
          <div>
            <h2 class="text-sm font-semibold text-gray-800 mb-1 mt-auto">Creación de traslado</h2>
          </div>
          <img :src="auroraLogo" alt="Aurora Logo" class="h-12" />
        </div>
        <div class="flex-1 flex flex-col justify-center bg-gray-100 ">
          <TransferStep1Form v-if="step === 1" :incoming-data="initialData" v-model="wizardData.step1" :errors="errors.step1" @cerrar="close" @next="validateAndNext(1)" @searchMyTarifa="calculateTariff" />
          <TransferStep2Form v-if="step === 2" v-model="wizardData.step2" :errors="errors.step2" @cerrar="close" @next="validateAndNext(2)" />
          <TransferStep3Form v-if="step === 3" :incoming-data="wizardData.step2" v-model="wizardData.step3" :errors="errors.step3" @cerrar="close" @next="validateAndNext(3)" />
          <TransferStep4Form v-if="step === 4" v-model="wizardData.step4" :errors="errors.step4" @cerrar="close" @next="validateAndNext(4)" />
          <TransferStep5Form v-if="step === 5" v-model="wizardData.step5" :errors="errors.step5" @cerrar="close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import addClientBg from '@/assets/fondos/addClient.png'
import auroraLogo from '@/assets/logo/auroraLogob.png'
import {ref, computed, reactive, onMounted} from 'vue';
import TransferStep1Form from './TransferStep1Form.vue';
import TransferStep2Form from './TransferStep2Form.vue';
import TransferStep3Form from './TransferStep3Form.vue';
import TransferStep4Form from './TransferStep4Form.vue';
import TransferStep5Form from './TransferStep5Form.vue';
import TransferWizardSteps from './TransferWizardSteps.vue';
import {fetchInitialData} from "@/components/TransferWizard/helpers/fetchBrokerData";

const outGoingData = defineEmits([ 'close']);

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


const initialData = ref({
  transferTypes: [],
  startPlaces: [],
  endPlaces: [],
  finalClients: []
})

const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    initialData.value = await fetchInitialData()
  } catch (err) {
    error.value = 'Error cargando datos iniciales.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
const stepIndicators = computed(() => [1, 2, 3, 4, 5].map(n => step.value >= n));

function close() {
  step.value = 1;
  Object.keys(wizardData).forEach(k => wizardData[k] = {});
  Object.keys(errors).forEach(k => errors[k] = {});
  outGoingData('close')
}

function validateAndNext(currentStep) {
  step.value++
  return () => {
    const valid = validateStep(currentStep);
    if (valid && step.value < 5) step.value++;
  };
}

function setStep(newStep) {
  step.value = newStep + 1
}


function validateStep(currentStep) {
  // Step 1: Client and transfer details
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
    return Object.keys(stepErrors).length === 0;
  }
  // Step 2: BL list
  if (currentStep === 2) {
    const data = wizardData.step2;
    const stepErrors = {};
    if (!data.listBl || data.listBl.size === 0) {
      stepErrors.bl = 'Debe agregar al menos un BL.';
    }
    errors.step2 = stepErrors;
    return Object.keys(stepErrors).length === 0;
  }
  // Step 3: BL-Container assignments
  if (currentStep === 3) {
    const data = wizardData.step3;
    const stepErrors = {};
    if (!data.listBl_container || data.listBl_container.size === 0) {
      stepErrors.container = 'Debe asignar al menos un contenedor a un BL.';
    }
    errors.step3 = stepErrors;
    return Object.keys(stepErrors).length === 0;
  }
  // Step 4: Confirmation and terms
  if (currentStep === 4) {
    const data = wizardData.step4;
    const stepErrors = {};
    if (!data.check) {
      stepErrors.check = 'Debe aceptar los términos y condiciones.';
    }
    errors.step4 = stepErrors;
    return Object.keys(stepErrors).length === 0;
  }
  // Step 5: Final review (no required fields, but you can add checks if needed)
  errors.step5 = {};
  return true;
}

function calculateTariff() {
}
</script>

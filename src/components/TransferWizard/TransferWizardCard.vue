<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto p-4">
    <div class="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white flex-col">
      <!-- Header -->
      <div class="p-4 sm:p-6 pb-0 border-b border-gray-200">
        <div class="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Nuevo Traslado</h2>
            <p class="mt-1 text-sm text-gray-500">Siga los pasos para completar la transferencia.</p>
          </div>
          <img :src="auroraLogo" alt="Aurora Logo" class="h-10 sm:h-12" />
        </div>
        <div class="mt-4">
          <TransferWizardSteps @setStep="setStep" :count="stepIndicators" :current-step="step" />
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-4 sm:p-6 flex-1 overflow-y-auto">
        <TransferStep1Form v-if="step === 1" :incoming-data="initialData" v-model="wizardData.step1" :errors="errors.step1" @cerrar="close" @next="validateAndNext(1)" />
        <TransferStep2Form v-if="step === 2" v-model="wizardData.step2" :errors="errors.step2" :transfer-type="wizardData.step1.type" @cerrar="close" @next="validateAndNext(2)" />
        <TransferStep3Form v-if="step === 3" :incoming-data="wizardData.step2" v-model="wizardData.step3" :errors="errors.step3" @cerrar="close" @next="validateAndNext(3)" />
        <TransferStep4Form v-if="step === 4" :order-data="allData" v-model="wizardData.step4" :errors="errors.step4" @cerrar="close" @next="validateAndNext(4)" @update-table-data="handleUpdateStep4Data" />
        <TransferStep5Form v-if="step === 5" :all-data="allData" :step4-data="step4TableData" @cerrar="close" @next="closeAndFetch" />
      </div>
    </div>
  </div>
</template>

<script setup>
import auroraLogo from '@/assets/logo/auroraLogob.png'
import { ref, onMounted, defineEmits } from 'vue'
import TransferStep1Form from './TransferStep1Form.vue'
import TransferStep2Form from './TransferStep2Form.vue'
import TransferStep3Form from './TransferStep3Form.vue'
import TransferStep4Form from './TransferStep4Form.vue'
import TransferStep5Form from './TransferStep5Form.vue'
import TransferWizardSteps from './TransferWizardSteps.vue'
import { fetchInitialData } from "@/components/TransferWizard/helpers/fetchBrokerData"
import { useTransferWizardState } from "@/components/TransferWizard/composables/useTransferWizardState";
import { useTransferLogic } from "@/components/TransferWizard/composables/useTransferLogic";
import { useTransferValidation } from "@/components/TransferWizard/composables/useTransferValidation";

const outGoingData = defineEmits(['close', 'closeFetch', 'updateTransfersList'])

// 🔧 Wizard state
const {
  step,
  wizardData,
  errors,
  stepIndicators,
  setStep,
  resetWizard
} = useTransferWizardState()

const step4TableData = ref([]);

// 🔧 Result data
const allData = ref({
  headerData: {
    serverClient: "serverClient",
    finalClient: "finalClient",
    startPlace: "startPlace",
    endPlace: "endPlace",
    typeName: "typeName",
    unitPrice: 0,
    booking: null
  },
  bl_ContainerList: [],
  totalAmount: 0,
  check: false,
})

// 🔧 Logic and processing
const { processOrder } = useTransferLogic(wizardData)
const { validateStep } = useTransferValidation(wizardData, errors, allData)

// 🔧 Initial data
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

// 🔧 Navigation
function close() {
  resetWizard()
  outGoingData('close')
}

// 🔧 Navigation
function closeAndFetch() {
  resetWizard()
  outGoingData('closeFetch')
}

function handleUpdateStep4Data(data) {
  step4TableData.value = data;
}

async function validateAndNext(currentStep) {
  const valid = validateStep(currentStep)

  if (valid && currentStep === 4) {
    await processOrder(allData.value, () => {
      outGoingData('updateTransfersList')
    })
  }
  if (valid && step.value < 5) step.value++
}
</script>

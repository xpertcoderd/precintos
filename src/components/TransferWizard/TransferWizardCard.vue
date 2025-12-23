<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-auto p-4">
      <div class="flex w-full max-w-full sm:max-w-2xl lg:max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden bg-white flex-col">
        <!-- Header -->
        <div class="p-3 sm:p-4 pb-0 border-b border-gray-200 flex-shrink-0">
          <div class="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
            <div>
              <h2 class="text-xl font-bold text-gray-900">{{ editMode ? 'Agregar Contenedor' : 'Nuevo Traslado' }}</h2>
              <p class="mt-1 text-sm text-gray-500">{{ editMode ? 'Ingrese los nuevos contenedores para el traslado existente.' : 'Siga los pasos para completar la transferencia.' }}</p>
            </div>
            <img :src="auroraLogo" alt="Aurora Logo" class="h-10 sm:h-12" />
          </div>
          <div class="mt-3">
            <TransferWizardSteps @setStep="setStep" :count="stepIndicators" :current-step="step" />
          </div>
        </div>

        <!-- Form Content -->
        <div class="p-3 sm:p-4 flex-1 overflow-y-auto max-h-[calc(90vh-180px)]">
          <TransferStep1Form v-if="step === 1" :incoming-data="initialData" v-model="wizardData.step1" :errors="errors.step1" @cerrar="close" @next="validateAndNext(1)" />
          <TransferStep2Form v-if="step === 2" v-model="wizardData.step2" :errors="errors.step2" :transfer-type="wizardData.step1.type" @cerrar="close" @next="validateAndNext(2)" />
          <TransferStep3Form v-if="step === 3" :incoming-data="wizardData.step2" v-model="wizardData.step3" :errors="errors.step3" @cerrar="close" @next="validateAndNext(3)" />
          <TransferStep4Form v-if="step === 4" :order-data="allData" v-model="wizardData.step4" :errors="errors.step4" @cerrar="close" @next="validateAndNext(4)" @update-table-data="handleUpdateStep4Data" />
          <TransferStep5Form v-if="step === 5" :all-data="allData" :step4-data="allData.bl_ContainerList" @cerrar="close" @next="closeAndFetch" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import auroraLogo from '@/assets/logo/auroraLogob.png'
import { ref, onMounted } from 'vue'
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

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  },
  initialTransferData: {
    type: Object,
    default: null
  }
})

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
  grossTotal: 0,
  discountTotal: 0,
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

    if (props.editMode && props.initialTransferData) {
      initEditMode(props.initialTransferData)
    }
  } catch (err) {
    error.value = 'Error cargando datos iniciales.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

function initEditMode(transferData) {
  // Populate Step 1 Data (readonly/reference)
  // We need to map the incoming flat structure "transfer.serverClient.name" etc back to objects if strictly needed,
  // or just populate what's needed for the logic and display.
  // "headerData" is used in Confirmation (Step 4), so we populate that directly for display.

  allData.value.headerData = {
    serverClient: transferData.transfer.serverClient?.name,
    finalClient: transferData.transfer.finalClient?.name,
    startPlace: transferData.transfer.startPlace?.label,
    endPlace: transferData.transfer.endPlace?.label,
    typeName: transferData.transfer.transferType?.name || 'N/A', // Adjust based on actual data shape
    unitPrice: transferData.transfer.unitPrice,
    booking: transferData.transfer.booking,
    address: transferData.transfer.address, // if available
    city: transferData.transfer.city       // if available
  }

  // Populate wizardData.step1 for logic references (unitPrice, type)
  wizardData.step1 = {
    unitPrice: transferData.transfer.unitPrice,
    type: { name: transferData.transfer.transferType?.name || 'Import', id: transferData.transfer.transferTypeId },
    finalClient: transferData.transfer.finalClient,
    startPlace: transferData.transfer.startPlace,
    endPlace: transferData.transfer.endPlace,
    address: transferData.transfer.address,
    city: transferData.transfer.city,
    timeTravelEst: transferData.transfer.timeTravelEst,
    tariffData: {
      price: transferData.transfer.unitPrice,
      discount: 0, // Default to 0 as we don't have historical discount data
      finalCost: transferData.transfer.unitPrice
    }
  }

  // Populate Step 2 (BL)
  // In edit mode, we are adding to an existing BL or Transfer.
  // The user might want to select the BL from the existing transfer or it's implied.
  // If the transfer is linked to a BL, we should put it here.
  wizardData.step2 = {
    listBl: [{
        text: transferData.transfer.bl, // The BL string
        transferId: transferData.transfer.id // Key for our logic to know it exists
    }],
    booking: transferData.transfer.booking
  }

  // Jump to Step 3
  step.value = 3
}

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

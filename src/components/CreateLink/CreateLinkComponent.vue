<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue';
import {prepareFormData} from "@/services/transportistaService";
import {linkTransferUnits} from "@/components/conexion/DataConector";

// --- Component Props and Emits ---
const props = defineProps({
  show: Boolean,
  selectedContainer: { type: Object, default: () => null },
  devices: { type: Array, default: () => [] },
  clients: { type: Array, default: () => [] },
  carriers: { type: Array, default: () => [] },
  drivers: { type: Array, default: () => [] },
  vehicles: { type: Array, default: () => [] },
});
const emit = defineEmits(['close']);

// --- Component State ---
const step = ref(1);
const linkData = ref({});
const deviceSearchText = ref('');
const isDeviceDropdownOpen = ref(false);

// --- Logic ---
const initializeLinkData = (container) => {
  if (!container) return;
  linkData.value = {
    transferUnitId: container.transferUnitId,
    deviceId: null, // Fixed value as requested
    carrierId: null,
    driverId: null,
    vehicleId: null,
    photo: null,
    containerPhotoNames: [],
  };
  deviceSearchText.value = '';
};

const filteredDevices = computed(() => {
  if (!deviceSearchText.value) {
    return props.devices;
  }
  return props.devices.filter(device =>
    device.device.deviceid.toLowerCase().includes(deviceSearchText.value.toLowerCase())
  );
});

const selectDevice = (device) => {
  linkData.value.deviceId = device.device.id;
  deviceSearchText.value = device.device.deviceid;
  isDeviceDropdownOpen.value = false;
};

const handleBlur = () => {
  // Use a short delay to allow click events on the dropdown to register
  setTimeout(() => {
    isDeviceDropdownOpen.value = false;
  }, 200);
};

// Watch for changes in the selected container and re-initialize the form
watch(() => props.selectedContainer, (newContainer) => {
  initializeLinkData(newContainer);
}, { immediate: true });

watch(() => linkData.value.photo, (newPhoto) => {
  if (newPhoto) {
    linkData.value.containerPhotoNames = [newPhoto.name];
  } else {
    linkData.value.containerPhotoNames = [];
  }
});

watch(deviceSearchText, (newValue) => {
    if (!newValue) {
        linkData.value.deviceId = null;
    }
});

const handleConfirm = async () => {
  const formData = prepareFormData(linkData.value);
  await linkTransferUnits(formData);
  emit('close');
};

// --- Local Icon Component Definitions ---
const UploadCloud = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>`};

</script>

<template>
  <transition name="fade">
    <div v-if="show" @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all flex flex-col md:flex-row max-h-[90vh]">

        <div class="w-full md:w-1/3 bg-slate-100 rounded-l-xl overflow-hidden">
            <video src="@/assets/video/candado.mp4" alt="Security Lock Animation" autoplay loop muted playsinline class="w-full h-full object-cover"></video>
        </div>

        <div class="w-full md:w-2/3 flex flex-col">
            <!-- Step 1: Form -->
            <div v-if="step === 1" class="flex-grow p-8 overflow-y-auto">
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Usted esta a punto de crear un <span class="text-sky-500">Enlace</span></h2>
                <p class="text-slate-500 mb-8">Seleccione las opciones para continuar.</p>

                <form class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="client" class="block mb-2 text-sm font-medium text-slate-700">Cliente</label>
                            <select id="client" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                              <option :value="null" disabled>Seleccionar...</option>
                              <option v-for="client in clients" :key="client.client.id" :value="client.client.id">{{ client.client.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="container" class="block mb-2 text-sm font-medium text-slate-700">Contenedor</label>
                            <input type="text" id="container" :value="selectedContainer?.container || ''" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-slate-100" disabled>
                        </div>
                    </div>
                    <div class="relative">
                        <label for="lock-search" class="block mb-2 text-sm font-medium text-slate-700">Seleccione el Candado</label>
                        <input
                          id="lock-search"
                          type="text"
                          v-model="deviceSearchText"
                          @focus="isDeviceDropdownOpen = true"
                          @blur="handleBlur"
                          placeholder="Buscar candado..."
                          class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                        />
                        <div v-if="isDeviceDropdownOpen" class="absolute z-20 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          <ul>
                            <li
                              v-for="device in filteredDevices"
                              :key="device.device.id"
                              @click="selectDevice(device)"
                              class="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                              {{ device.device.deviceid }}
                            </li>
                            <li v-if="filteredDevices.length === 0" class="px-4 py-2 text-sm text-slate-500">
                              No se encontraron candados.
                            </li>
                          </ul>
                        </div>
                    </div>
                    <div>
                        <label for="transporter" class="block mb-2 text-sm font-medium text-slate-700">Seleccione el Transportista</label>
                        <select v-model="linkData.carrierId" id="transporter" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                          <option :value="null" disabled>Seleccionar...</option>
                          <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">{{ carrier.name }}</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="driver" class="block mb-2 text-sm font-medium text-slate-700">Seleccione Chofer</label>
                            <select v-model="linkData.driverId" id="driver" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                              <option :value="null" disabled>Seleccionar...</option>
                              <option v-for="driver in drivers" :key="driver.id" :value="driver.id">{{ driver.firstName + ' ' + driver.lastName }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="vehicle" class="block mb-2 text-sm font-medium text-slate-700">Seleccione Vehiculo</label>
                            <select v-model="linkData.vehicleId" id="vehicle" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                              <option :value="null" disabled>Seleccionar...</option>
                              <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">{{ vehicle.brandModel + ' ' + vehicle.color + ' ' + vehicle.licPlate  }}</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Step 2: Upload -->
            <div v-if="step === 2" class="flex-grow p-8 overflow-y-auto">
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Usted esta a punto de crear un <span class="text-sky-500">Enlace</span></h2>
                <p class="text-slate-500 mb-8">Adjunte las fotos para finalizar el proceso.</p>

                <div>
                    <label class="block mb-2 text-sm font-medium text-slate-700">Adjuntar fotos</label>
                    <div class="mt-2 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-10 pb-10">
                        <div class="space-y-1 text-center">
                            <UploadCloud class="mx-auto h-12 w-12 text-slate-400" />
                            <div class="flex text-sm text-slate-600">
                                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500">
                                    <span>Sube un archivo</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="(e) => linkData.photo = e.target.files[0]">
                                </label>
                                <p class="pl-1">o arrástralo aquí</p>
                            </div>
                          <p v-if="linkData.photo" class="text-sm text-slate-600 pt-1">
                            Archivo: <span class="font-semibold">{{ linkData.photo.name }}</span>
                          </p>
                          <p v-else class="text-xs leading-5 text-slate-600">PNG, JPG, GIF hasta 10MB</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="flex-shrink-0 flex justify-end items-center p-4 bg-slate-50 rounded-br-xl border-t border-slate-200">
                <button @click="$emit('close')" class="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Cancelar</button>

                <button v-if="step === 2" @click="step = 1" class="ml-3 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Atrás</button>

                <button v-if="step === 1" @click="step = 2" class="ml-3 px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600">Siguiente</button>
                <button v-if="step === 2" @click="handleConfirm" class="ml-3 px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600">Confirmar</button>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

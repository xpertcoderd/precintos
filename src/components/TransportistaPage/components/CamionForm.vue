<script setup>
import { ref, defineExpose, defineProps } from 'vue';
import UploadCloudIcon from '../icons/UploadCloudIcon.vue';

// Define the prop to receive the list of carriers from the parent component
defineProps({
  carriers: {
    type: Array,
    default: () => []
  }
});

// Reactive state for the form data
const formData = ref({
  carrierId: null,
  alias: '',
  brandModel: '',
  year: null,
  color: '',
  licPlate: '',
  vin: '',
  insurancePolicy: '',
  insuranceExpiration: '',
  photo: null // This will hold the File object
});

// Handles the file input change event
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.photo = file;
  }
};

// Expose the form data to the parent component
defineExpose({ formData });
</script>

<template>
  <form class="space-y-6">
    <div>
      <label for="truck-transporter" class="block text-sm font-medium text-slate-700">Transportista</label>
      <select v-model="formData.carrierId" id="truck-transporter" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        <option :value="null" disabled>Seleccionar transportista...</option>
        <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">
          {{ carrier.name }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label for="truck-alias" class="block text-sm font-medium text-slate-700">Alias</label>
        <input v-model="formData.alias" type="text" id="truck-alias" placeholder="Ej: F-001" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-brand" class="block text-sm font-medium text-slate-700">Marca y Modelo</label>
        <input v-model="formData.brandModel" type="text" id="truck-brand" placeholder="Ej: Toyota Hino" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-year" class="block text-sm font-medium text-slate-700">Año</label>
        <input v-model="formData.year" type="number" id="truck-year" placeholder="Ej: 2024" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-color" class="block text-sm font-medium text-slate-700">Color</label>
        <input v-model="formData.color" type="text" id="truck-color" placeholder="Ej: Blanco" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-plate" class="block text-sm font-medium text-slate-700">Placa</label>
        <input v-model="formData.licPlate" type="text" id="truck-plate" placeholder="Número de placa" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-vin" class="block text-sm font-medium text-slate-700">VIN (Chasis)</label>
        <input v-model="formData.vin" type="text" id="truck-vin" placeholder="Número de chasis" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-insurance" class="block text-sm font-medium text-slate-700">Póliza de Seguro</label>
        <input v-model="formData.insurancePolicy" type="text" id="truck-insurance" placeholder="Número de póliza" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-insurance-exp" class="block text-sm font-medium text-slate-700">Vencimiento del Seguro</label>
        <input v-model="formData.insuranceExpiration" type="date" id="truck-insurance-exp" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700">Foto del Vehículo</label>
      <div class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
        <div class="space-y-1 text-center">
          <UploadCloudIcon class="mx-auto h-12 w-12 text-slate-400" />
          <div class="flex text-sm text-slate-600 justify-center">
            <label for="file-upload-truck" class="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500">
              <span>Sube un archivo</span>
              <input @change="handleFileUpload" id="file-upload-truck" name="file-upload" type="file" class="sr-only" accept="image/png, image/jpeg, image/gif">
            </label>
            <p class="pl-1">o arrástralo aquí</p>
          </div>
          <!-- Display selected file name or default text -->
          <p v-if="formData.photo" class="text-sm text-slate-600 pt-1">
            Archivo: <span class="font-semibold">{{ formData.photo.name }}</span>
          </p>
          <p v-else class="text-xs text-slate-500">PNG, JPG, GIF hasta 10MB</p>
        </div>
      </div>
    </div>
  </form>
</template>

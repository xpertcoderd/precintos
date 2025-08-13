<script setup>
import {ref, defineExpose, defineProps, watch} from 'vue';
import UploadCloudIcon from '../icons/UploadCloudIcon.vue';

const props = defineProps({
  carriers: {
    type: Array,
    default: () => []
  },
  initialData: {
    type: Object,
    default: null
  },
  errors: {
    type: Object,
    default: () => ({})
  }
});
const createEmptyForm = () => ({
  carrierId: null,
  alias: '',
  brandModel: '',
  year: null,
  color: '',
  licPlate: '',
  vin: '',
  insurancePolicy: '',
  insuranceExpiration: '',
  photo: null
});

const formData = ref(createEmptyForm());

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData };
  } else {
    formData.value = createEmptyForm();
  }
}, { immediate: true, deep: true });

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.photo = file;
  }
};

defineExpose({ formData });
</script>

<template>
  <form class="space-y-4">
    <div>
      <label for="truck-transporter" class="block text-sm/6 font-medium text-slate-700">Transportista</label>
      <div class="mt-2">
        <select v-model="formData.carrierId" id="truck-transporter" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          <option :value="null" disabled>Seleccionar transportista...</option>
          <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">
            {{ carrier.name }}
          </option>
        </select>
      </div>
      <p v-if="errors.carrierId" class="mt-2 text-sm text-red-600">{{ errors.carrierId }}</p>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
      <div>
        <label for="truck-alias" class="block text-sm/6 font-medium text-slate-700">Alias</label>
        <div class="mt-2">
          <input v-model="formData.alias" type="text" id="truck-alias" placeholder="Ej: F-001" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.alias" class="mt-2 text-sm text-red-600">{{ errors.alias }}</p>
      </div>
      <div>
        <label for="truck-brand" class="block text-sm/6 font-medium text-slate-700">Marca y Modelo</label>
        <div class="mt-2">
          <input v-model="formData.brandModel" type="text" id="truck-brand" placeholder="Ej: Toyota Hino" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.brandModel" class="mt-2 text-sm text-red-600">{{ errors.brandModel }}</p>
      </div>
      <div>
        <label for="truck-year" class="block text-sm/6 font-medium text-slate-700">Año</label>
        <div class="mt-2">
          <input v-model="formData.year" type="number" id="truck-year" placeholder="Ej: 2024" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.year" class="mt-2 text-sm text-red-600">{{ errors.year }}</p>
      </div>
      <div>
        <label for="truck-color" class="block text-sm/6 font-medium text-slate-700">Color</label>
        <div class="mt-2">
          <input v-model="formData.color" type="text" id="truck-color" placeholder="Ej: Blanco" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.color" class="mt-2 text-sm text-red-600">{{ errors.color }}</p>
      </div>
      <div>
        <label for="truck-plate" class="block text-sm/6 font-medium text-slate-700">Placa</label>
        <div class="mt-2">
          <input v-model="formData.licPlate" type="text" id="truck-plate" placeholder="Número de placa" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.licPlate" class="mt-2 text-sm text-red-600">{{ errors.licPlate }}</p>
      </div>
      <div>
        <label for="truck-vin" class="block text-sm/6 font-medium text-slate-700">VIN (Chasis)</label>
        <div class="mt-2">
          <input v-model="formData.vin" type="text" id="truck-vin" placeholder="Número de chasis" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.vin" class="mt-2 text-sm text-red-600">{{ errors.vin }}</p>
      </div>
      <div>
        <label for="truck-insurance" class="block text-sm/6 font-medium text-slate-700">Póliza de Seguro</label>
        <div class="mt-2">
          <input v-model="formData.insurancePolicy" type="text" id="truck-insurance" placeholder="Número de póliza" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.insurancePolicy" class="mt-2 text-sm text-red-600">{{ errors.insurancePolicy }}</p>
      </div>
      <div>
        <label for="truck-insurance-exp" class="block text-sm/6 font-medium text-slate-700">Vencimiento del Seguro</label>
        <div class="mt-2">
          <input v-model="formData.insuranceExpiration" type="date" id="truck-insurance-exp" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
        </div>
        <p v-if="errors.insuranceExpiration" class="mt-2 text-sm text-red-600">{{ errors.insuranceExpiration }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm/6 font-medium text-slate-700">Foto del Vehículo</label>
      <div class="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
        <div class="text-center">
          <UploadCloudIcon class="mx-auto h-12 w-12 text-slate-300" />
          <div class="mt-4 flex text-sm leading-6 text-slate-600">
            <label for="file-upload-truck" class="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500">
              <span>Sube un archivo</span>
              <input @change="handleFileUpload" id="file-upload-truck" name="file-upload" type="file" class="sr-only" accept="image/png, image/jpeg, image/gif">
            </label>
            <p class="pl-1">o arrástralo aquí</p>
          </div>
          <p v-if="formData.photo" class="text-sm text-slate-600 pt-1">
            Archivo: <span class="font-semibold">{{ formData.photo.name }}</span>
          </p>
          <p v-else class="text-xs leading-5 text-slate-600">PNG, JPG, GIF hasta 10MB</p>
        </div>
      </div>
      <p v-if="errors.photo" class="mt-2 text-sm text-red-600">{{ errors.photo }}</p>
    </div>
  </form>
</template>

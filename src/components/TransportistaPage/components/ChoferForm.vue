<script setup>
import {ref, defineExpose, defineProps, watch} from 'vue';
import UploadCloudIcon from "@/components/TransportistaPage/icons/UploadCloudIcon.vue";

const props = defineProps({
  carriers: { /* ... */ },
  initialData: {
    type: Object,
    default: null
  }
});
const createEmptyForm = () => ({
  carrierId: null,
  firstName: '',
  lastName: '',
  birthdate: '',
  phone: '',
  idcardLicense: '',
  licenseCat: null,
  licenseExpiration: '',
  photo: null // This will hold the File object
});

const formData = ref(createEmptyForm());

watch(() => props.initialData, (newData) => {
  if (newData) {
    // We are editing, so populate the form
    formData.value = { ...newData };
  } else {
    // We are creating, so reset to an empty form
    formData.value = createEmptyForm();
  }
}, { immediate: true, deep: true });

// Handles the file input change event
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.photo = file;
  }
};

defineExpose({ formData });
</script>

<template>
  <form class="space-y-6">
    <div>
      <label for="driver-transporter" class="block text-sm font-medium text-slate-700">Transportista</label>
      <select v-model="formData.carrierId" id="driver-transporter" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        <option :value="null" disabled>Seleccionar transportista...</option>
        <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">
          {{ carrier.name }}
        </option>
      </select>
    </div>
    <div>
      <h4 class="text-md font-semibold text-slate-700 mb-4">Datos del Chofer</h4>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="driver-name" class="block text-sm font-medium text-slate-700">Nombres</label>
          <input v-model="formData.firstName" type="text" id="driver-name" placeholder="Ej: Juan" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="driver-surname" class="block text-sm font-medium text-slate-700">Apellidos</label>
          <input v-model="formData.lastName" type="text" id="driver-surname" placeholder="Ej: Pérez" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="driver-dob" class="block text-sm font-medium text-slate-700">Fecha de nacimiento</label>
          <input v-model="formData.birthdate" type="date" id="driver-dob" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="driver-phone" class="block text-sm font-medium text-slate-700">Teléfono</label>
          <input v-model="formData.phone" type="tel" id="driver-phone" placeholder="Ej: (809) 555-1234" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
      </div>
    </div>
    <div>
      <h4 class="text-md font-semibold text-slate-700 mb-4">Datos de Licencia</h4>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="license-num" class="block text-sm font-medium text-slate-700">Licencia</label>
          <input v-model="formData.idcardLicense" type="text" id="license-num" placeholder="Número de licencia" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="license-cat" class="block text-sm font-medium text-slate-700">Categoría</label>
          <select v-model="formData.licenseCat" id="license-cat" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
            <option :value="null">Seleccionar...</option>
            <option :value="1">Categoría 1</option>
            <option :value="2">Categoría 2</option>
            <option :value="3">Categoría 3</option>
            <option :value="4">Categoría 4</option>
            <!-- Options would be populated dynamically -->
          </select>
        </div>
        <div class="sm:col-span-2">
          <label for="license-exp" class="block text-sm font-medium text-slate-700">Fecha de Exp.</label>
          <input v-model="formData.licenseExpiration" type="date" id="license-exp" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-slate-700">Foto del Chofer</label>
      <div class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
        <div class="space-y-1 text-center">
          <UploadCloudIcon class="mx-auto h-12 w-12 text-slate-400" />
          <div class="flex text-sm text-slate-600 justify-center">
            <label for="file-upload-driver" class="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500">
              <span>Sube un archivo</span>
              <input @change="handleFileUpload" id="file-upload-driver" name="file-upload" type="file" class="sr-only" accept="image/png, image/jpeg, image/gif">
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

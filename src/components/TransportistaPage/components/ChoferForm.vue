<script setup>
import { ref, watch } from 'vue';
import UploadCloudIcon from "@/components/TransportistaPage/icons/UploadCloudIcon.vue";

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
  firstName: '',
  lastName: '',
  birthdate: '',
  phone: '',
  idcardLicense: '',
  licenseCat: null,
  licenseExpiration: '',
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
      <label for="driver-transporter" class="block text-sm/6 font-medium text-slate-700">Transportista</label>
      <div class="mt-2">
        <select v-model="formData.carrierId" id="driver-transporter" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          <option :value="null" disabled>Seleccionar transportista...</option>
          <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">
            {{ carrier.name }}
          </option>
        </select>
      </div>
      <p v-if="errors.carrierId" class="mt-2 text-sm text-red-600">{{ errors.carrierId }}</p>
    </div>
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Datos del Chofer</h2>
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label for="driver-name" class="block text-sm/6 font-medium text-slate-700">Nombres</label>
          <div class="mt-2">
            <input v-model="formData.firstName" type="text" id="driver-name" placeholder="Ej: Juan" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
          <p v-if="errors.firstName" class="mt-2 text-sm text-red-600">{{ errors.firstName }}</p>
        </div>
        <div>
          <label for="driver-surname" class="block text-sm/6 font-medium text-slate-700">Apellidos</label>
          <div class="mt-2">
            <input v-model="formData.lastName" type="text" id="driver-surname" placeholder="Ej: Pérez" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
          <p v-if="errors.lastName" class="mt-2 text-sm text-red-600">{{ errors.lastName }}</p>
        </div>
        <div>
          <label for="driver-dob" class="block text-sm/6 font-medium text-slate-700">Fecha de nacimiento</label>
          <div class="mt-2">
            <input v-model="formData.birthdate" type="date" id="driver-dob" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
          <p v-if="errors.birthdate" class="mt-2 text-sm text-red-600">{{ errors.birthdate }}</p>
        </div>
        <div>
          <label for="driver-phone" class="block text-sm/6 font-medium text-slate-700">Teléfono</label>
          <div class="mt-2">
            <input v-model="formData.phone" type="tel" id="driver-phone" placeholder="Ej: (809) 555-1234" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
          <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Datos de Licencia</h2>
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label for="license-num" class="block text-sm/6 font-medium text-slate-700">Licencia</label>
          <div class="mt-2">
            <input v-model="formData.idcardLicense" type="text" id="license-num" placeholder="Número de licencia" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
          <p v-if="errors.idcardLicense" class="mt-2 text-sm text-red-600">{{ errors.idcardLicense }}</p>
        </div>
        <div>
          <label for="license-cat" class="block text-sm/6 font-medium text-slate-700">Categoría</label>
          <div class="mt-2">
            <select v-model="formData.licenseCat" id="license-cat" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
              <option :value="null">Seleccionar...</option>
              <option :value="1">Categoría 1</option>
              <option :value="2">Categoría 2</option>
              <option :value="3">Categoría 3</option>
              <option :value="4">Categoría 4</option>
            </select>
          </div>
          <p v-if="errors.licenseCat" class="mt-2 text-sm text-red-600">{{ errors.licenseCat }}</p>
        </div>
        <div class="sm:col-span-2">
          <label for="license-exp" class="block text-sm/6 font-medium text-slate-700">Fecha de Exp.</label>
          <div class="mt-2">
            <input v-model="formData.licenseExpiration" type="date" id="license-exp" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
          <p v-if="errors.licenseExpiration" class="mt-2 text-sm text-red-600">{{ errors.licenseExpiration }}</p>
        </div>
      </div>
    </div>
    <div>
      <label class="block text-sm/6 font-medium text-slate-700">Foto del Chofer</label>
      <div class="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
        <div class="text-center">
          <UploadCloudIcon class="mx-auto h-12 w-12 text-slate-300" />
          <div class="mt-4 flex text-sm leading-6 text-slate-600">
            <label for="file-upload-driver" class="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500">
              <span>Sube un archivo</span>
              <input @change="handleFileUpload" id="file-upload-driver" name="file-upload" type="file" class="sr-only" accept="image/png, image/jpeg, image/gif">
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

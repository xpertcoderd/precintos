<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Subir Comprobante de Pago</h3>
      <div>
        <div v-if="!previewUrl" class="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-slate-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="mt-4 flex text-sm leading-6 text-slate-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500">
                <span>Sube un archivo</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange" accept="image/*">
              </label>
              <p class="pl-1">o arrástralo aquí</p>
            </div>
            <p class="text-xs leading-5 text-slate-600">PNG, JPG, GIF hasta 10MB</p>
          </div>
        </div>
        <div v-else class="mt-2">
          <img :src="previewUrl" alt="Vista previa del comprobante" class="w-full h-auto rounded-lg shadow-md">
          <button @click="removeFile" class="mt-2 text-sm text-red-600 hover:text-red-800">Quitar archivo</button>
        </div>
      </div>
      <div class="mt-6 flex justify-end gap-4">
        <button @click="$emit('close')" type="button" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">Cancelar</button>
        <button @click="handleSubmit" :disabled="!selectedFile" class="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-gray-300">Subir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// eslint-disable-next-line no-unused-vars
 defineProps({ visible: Boolean });
const emit = defineEmits(['close', 'submit']);

const selectedFile = ref(null);
const previewUrl = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const removeFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
};

const handleSubmit = () => {
  if (selectedFile.value) {
    emit('submit', selectedFile.value);
  }
};
</script>

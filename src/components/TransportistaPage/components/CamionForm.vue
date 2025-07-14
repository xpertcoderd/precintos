<script setup >
import UploadCloudIcon from '../icons/UploadCloudIcon.vue';
</script>

<template>
  <form class="space-y-6">
    <div>
      <label for="truck-transporter" class="block text-sm font-medium text-slate-700">Transportista</label>
      <select id="truck-transporter" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        <option>Seleccionar transportista...</option>
        <!-- Options would be populated dynamically -->
      </select>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label for="truck-brand" class="block text-sm font-medium text-slate-700">Marca</label>
        <input type="text" id="truck-brand" placeholder="Ej: Kenworth" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-model" class="block text-sm font-medium text-slate-700">Modelo</label>
        <input type="text" id="truck-model" placeholder="Ej: T680" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-year" class="block text-sm font-medium text-slate-700">Año</label>
        <input type="number" id="truck-year" placeholder="Ej: 2024" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-color" class="block text-sm font-medium text-slate-700">Color</label>
        <input type="text" id="truck-color" placeholder="Ej: Blanco" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-chassis" class="block text-sm font-medium text-slate-700">Chasis</label>
        <input type="text" id="truck-chassis" placeholder="Número de chasis" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
      <div>
        <label for="truck-plate" class="block text-sm font-medium text-slate-700">Placa</label>
        <input type="text" id="truck-plate" placeholder="Número de placa" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-slate-700">Foto del Vehículo</label>
      <div class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
        <div class="space-y-1 text-center">
          <UploadCloudIcon class="mx-auto h-12 w-12 text-slate-400" />
          <div class="flex text-sm text-slate-600">
            <label for="file-upload-truck" class="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500">
              <span>Sube un archivo</span>
              <input id="file-upload-truck" name="file-upload" type="file" class="sr-only">
            </label>
            <p class="pl-1">o arrástralo aquí</p>
          </div>
          <p class="text-xs text-slate-500">PNG, JPG, GIF hasta 10MB</p>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Add any specific styles for this form here */
</style>

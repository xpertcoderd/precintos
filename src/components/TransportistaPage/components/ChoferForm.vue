<script setup>
import UploadCloudIcon from "@/components/TransportistaPage/icons/UploadCloudIcon.vue";
</script>

<template>
  <form class="space-y-6">
    <div>
      <label for="driver-transporter" class="block text-sm font-medium text-slate-700">Transportista</label>
      <select id="driver-transporter" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        <option>Seleccionar transportista...</option>
        <!-- Options would be populated dynamically -->
      </select>
    </div>
    <div>
      <h4 class="text-md font-semibold text-slate-700 mb-4">Datos del Chofer</h4>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="driver-name" class="block text-sm font-medium text-slate-700">Nombres</label>
          <input type="text" id="driver-name" placeholder="Ej: Juan" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="driver-surname" class="block text-sm font-medium text-slate-700">Apellidos</label>
          <input type="text" id="driver-surname" placeholder="Ej: Pérez" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="driver-dob" class="block text-sm font-medium text-slate-700">Fecha de nacimiento</label>
          <input type="date" id="driver-dob" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="driver-phone" class="block text-sm font-medium text-slate-700">Teléfono</label>
          <input type="tel" id="driver-phone" placeholder="Ej: (809) 555-1234" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
      </div>
    </div>
    <div>
      <h4 class="text-md font-semibold text-slate-700 mb-4">Datos de Licencia</h4>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="license-num" class="block text-sm font-medium text-slate-700">Licencia</label>
          <input type="text" id="license-num" placeholder="Número de licencia" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="license-cat" class="block text-sm font-medium text-slate-700">Categoría</label>
          <select id="license-cat" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
            <option>Seleccionar...</option>
            <!-- Options would be populated dynamically -->
          </select>
        </div>
        <div class="sm:col-span-2">
          <label for="license-exp" class="block text-sm font-medium text-slate-700">Fecha de Exp.</label>
          <input type="date" id="license-exp" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-slate-700">Foto del Chofer</label>
      <div class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
        <div class="space-y-1 text-center">
          <UploadCloudIcon class="mx-auto h-12 w-12 text-slate-400" />
          <div class="flex text-sm text-slate-600">
            <label for="file-upload-driver" class="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500">
              <span>Sube un archivo</span>
              <input id="file-upload-driver" name="file-upload" type="file" class="sr-only">
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

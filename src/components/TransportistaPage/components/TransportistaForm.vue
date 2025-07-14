<script setup>
// In the future, you can import services here to fetch or save data.
// import { ref } from 'vue';
// const formData = ref({});
</script>

<template>
  <form class="space-y-6">
    <div>
      <h4 class="text-md font-semibold text-slate-700 mb-4">Datos de la Compañía</h4>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="trans-name" class="block text-sm font-medium text-slate-700">Nombre</label>
          <input type="text" id="trans-name" placeholder="Ej: Transportes Veloz S.A." class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="trans-rnc" class="block text-sm font-medium text-slate-700">RNC / Cédula</label>
          <input type="text" id="trans-rnc" placeholder="000-0000000-0" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div class="sm:col-span-2">
          <label for="trans-address" class="block text-sm font-medium text-slate-700">Dirección</label>
          <input type="text" id="trans-address" placeholder="Calle, Número, Ciudad" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="trans-phone" class="block text-sm font-medium text-slate-700">Teléfono</label>
          <input type="tel" id="trans-phone" placeholder="Ej: (809) 555-5678" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div>
          <label for="trans-email" class="block text-sm font-medium text-slate-700">Correo</label>
          <input type="email" id="trans-email" placeholder="info@ejemplo.com" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
        <div class="sm:col-span-2">
          <label for="trans-web" class="block text-sm font-medium text-slate-700">Página Web (Opcional)</label>
          <input type="url" id="trans-web" placeholder="https://www.ejemplo.com" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
        </div>
      </div>
    </div>
    <div>
      <h4 class="text-md font-semibold text-slate-700 mb-4">Datos del Representante</h4>
      <label for="rep-name" class="block text-sm font-medium text-slate-700">Nombre completo</label>
      <input type="text" id="rep-name" placeholder="Ej: Ana García" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
    </div>
  </form>
</template>

<style scoped>
/* Add any specific styles for this form here */
</style>

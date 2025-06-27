<template>
<div class="w-auto h-auto bg-white shadow-lg rounded-xl overflow-auto">
<!-- Top Blue Header -->
<div class="justify-start bg-sky-400 text-white px-4 py-1 grid grid-cols-4 gap-1 text-sm">
  <div>
    <p class="font-bold mb-0 text-sm">Broker</p>
    <p class="text-gray-100">{{ incomingData.headerData.serverClient }}</p>
  </div>
  <div>
    <p class="font-bold mb-0 text-sm">Cliente Final</p>
    <p class="text-gray-100">{{ incomingData.headerData.finalClient }}</p>
  </div>
  <div>
    <p class="font-bold mb-0 text-sm">Tipo de Carga</p>
    <p class="text-gray-100">{{ incomingData.headerData.typeName }}</p>
  </div>
  <div>
    <p class="font-bold mb-0 text-sm">Costo por Contenedor</p>
    <p class="text-gray-100">{{ `RD$${(incomingData.headerData.unitPrice).toLocaleString('es-419')}` }}</p>
  </div>
  <div class="col-span-2">
    <p class="font-bold mb-0 text-sm">Origen</p>
    <p class="text-gray-100">{{ incomingData.headerData.startPlace }}</p>
  </div>
  <div class="col-span-2">
    <p class="font-bold mb-0 text-sm">Destino</p>
    <p class="text-gray-100">{{ incomingData.headerData.endPlace }}</p>
  </div>
</div>

<!-- Table Header -->
<div class="bg-tableHeader text-[#6B7280] text-left font-bold mb-0 text-sm px-4 py-1 grid grid-cols-3 border-b border-gray-200">
  <div>No. BL</div>
  <div>Contenedores</div>
  <div>Total</div>
</div>

<!-- Table Rows -->
<div class="bg-tableBg px-1 py-1 space-y-2" style="min-height: 220px;">
  <div
      v-for="(row, index) in incomingData.bl_ContainerList"
      :key="index"
      class=" text-sm bg-white rounded-md shadow-sm grid grid-cols-3 items-center px-6 py-2 text-left text-gray-900"
  >
    <div>{{ row.bl }}</div>
    <div>{{ row.bl_count }}</div>
    <div> {{ `RD$${row.amount.toLocaleString('es-419')}` }}</div>
  </div>
</div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
const incomingData = defineProps(['headerData', 'bl_ContainerList']);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

.font-inter {
  font-family: 'Inter', sans-serif;
}

.bg-tableHeader {
  background-color: #F9FAFB;
}

.bg-tableBg {
  background-color: #F7F8FA;
}
</style>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6">
    <!-- Summary Section -->
    <div class="bg-sky-50 rounded-lg p-4 border border-sky-200">
      <h3 class="text-lg font-bold text-sky-800 mb-4">Resumen de Transferencia</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div>
          <p class="font-semibold text-slate-600">Broker</p>
          <p class="text-slate-800">{{ incomingData.headerData.serverClient }}</p>
        </div>
        <div>
          <p class="font-semibold text-slate-600">Cliente Final</p>
          <p class="text-slate-800">{{ incomingData.headerData.finalClient }}</p>
        </div>
        <div>
          <p class="font-semibold text-slate-600">Tipo de Carga</p>
          <p class="text-slate-800">{{ incomingData.headerData.typeName }}</p>
        </div>
        <div>
          <p class="font-semibold text-slate-600">Costo por Contenedor</p>
          <p class="text-slate-800">{{ `RD$${(incomingData.headerData.unitPrice).toLocaleString('es-419')}` }}</p>
        </div>
        <div class="md:col-span-2">
          <p class="font-semibold text-slate-600">Origen</p>
          <p class="text-slate-800">{{ incomingData.headerData.startPlace }}</p>
        </div>
        <div class="md:col-span-2">
          <p class="font-semibold text-slate-600">Destino</p>
          <p class="text-slate-800">{{ incomingData.headerData.endPlace }}</p>
        </div>
      </div>
    </div>

    <!-- Table of BLs and Containers -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No. BL</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contenedores</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Bruto</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Descuento</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Neto</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
        <tr v-if="!incomingData.bl_ContainerList || incomingData.bl_ContainerList.length === 0">
          <td colspan="5" class="px-6 py-12 text-center text-slate-500">
            No hay datos para mostrar.
          </td>
        </tr>
        <tr v-for="(row, index) in incomingData.bl_ContainerList" :key="index" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ row.bl }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ row.bl_count }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ `RD$${(row.grossAmount || 0).toLocaleString('es-419')}` }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ `RD$${(row.discountAmount || 0).toLocaleString('es-419')}` }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ `RD$${(row.netAmount || 0).toLocaleString('es-419')}` }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const incomingData = defineProps(['headerData', 'bl_ContainerList']);
</script>

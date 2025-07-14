<script setup>
import { defineProps } from 'vue';
import MoreHorizontalIcon from '../icons/MoreHorizontalIcon.vue';

defineProps({
  // The array of data to display in the table (e.g., drivers, trucks)
  data: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No.</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Transportista</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Datos de Licencia</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha de Exp.</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Configuracion</th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
      <tr v-if="data.length === 0">
        <td colspan="6" class="px-6 py-12 text-center text-slate-500">
          No hay datos para mostrar.
        </td>
      </tr>
      <tr v-for="item in data" :key="item.id" class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.id }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{{ item.transporter }}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span v-if="item.licenseStatus === 'valid'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Vigente</span>
          <span v-else-if="item.licenseStatus === 'expired'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Vencida</span>
          <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">N/A</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span v-if="item.status === 'available'" class="text-sm text-slate-900">{{ item.expDate }}</span>
          <span v-else class="text-sm text-slate-500">{{ item.expDate }}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button class="text-slate-400 hover:text-sky-600 p-1 rounded-full">
            <MoreHorizontalIcon class="w-5 h-5" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

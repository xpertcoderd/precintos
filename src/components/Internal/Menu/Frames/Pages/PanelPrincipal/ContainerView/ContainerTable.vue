<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th v-for="header in headers" :key="header" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
        <tr v-if="containers.length === 0">
          <td :colspan="headers.length" class="px-6 py-12 text-center text-slate-500">
            No hay contenedores para mostrar.
          </td>
        </tr>
        <tr v-for="item in containers" :key="item.id" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{{ item.container }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
            {{ item.transfer?.bl || 'N/A' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ formatDate(item.transfer?.startDate) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ formatDate(item.transfer?.endDate) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
             <div class="flex items-center gap-2">
               <span class="truncate max-w-[100px]" :title="item.transfer?.startPlace?.label">{{ item.transfer?.startPlace?.label || 'N/A' }}</span>
               <span class="text-slate-400">→</span>
               <span class="truncate max-w-[100px]" :title="item.transfer?.endPlace?.label">{{ item.transfer?.endPlace?.label || 'N/A' }}</span>
             </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span 
              class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="getContainerStatusColor(item.statusId)"
            >
              {{ getStatusText(item.statusId) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            <button class="text-slate-400 hover:text-slate-600">
              <EllipsisVerticalIcon class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import { getContainerStatusText, getContainerStatusColor } from '../utils/statusUtils';

defineProps({
  containers: {
    type: Array,
    required: true,
  },
});

const headers = [
  'Contenedor',
  'BL',
  'Fecha Inicio',
  'Fecha Fin',
  'Ruta',
  'Estado',
  'Acciones'
];

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
};

const getStatusText = (statusId) => {
  return getContainerStatusText(statusId);
};
</script>

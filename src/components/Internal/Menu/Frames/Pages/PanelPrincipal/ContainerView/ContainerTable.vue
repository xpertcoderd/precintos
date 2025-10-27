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
          <td :colspan="headers.length + 1" class="px-6 py-12 text-center text-slate-500">
            No hay contenedores para mostrar.
          </td>
        </tr>
        <tr v-for="item in containers" :key="item.id" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.container }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ item.deviceId || 'sin asignar' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ getStatusText(item.statusId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ item.currentLinked ? 'Sí' : 'No' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ item.linkedTime ? formatDate(item.linkedTime) : 'sin asignar' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ item.unlinkedTime ? formatDate(item.unlinkedTime) : 'sin asignar' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ item.departureTime ? formatDate(item.departureTime) : 'sin asignar' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ getArrivalTimeInfo(item).text }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ item.lastBlitTime ? formatDate(item.lastBlitTime) : 'sin asignar' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getContainerStatusText } from '../utils/statusUtils';

defineProps({
  containers: {
    type: Array,
    required: true,
  },
});

const headers = [
  'Contenedor',
  'Device ID',
  'Estado',
  'Vinculado',
  'Hora Vinculación',
  'Hora Desvinculación',
  'Hora Salida',
  'Hora Llegada',
  'Última Actividad'
];

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
};

const getArrivalTimeInfo = (item) => {
  if (!item.departureTime) {
    return { text: 'sin asignar', class: 'text-slate-500' };
  }
  if (!item.arrivalTime) {
    return { text: 'Sin Confirmar', class: 'text-slate-500' };
  }
  return { text: formatDate(item.arrivalTime), class: 'text-slate-500' };
};

const getStatusText = (statusId) => {
  return getContainerStatusText(statusId);
};

</script>

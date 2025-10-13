<template>
  <div class="bg-white shadow-lg rounded-lg p-3 mb-2 border border-slate-200">
    <!-- Top Section: Title, Status, and Time Circle -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1 pr-3">
        <h3 class="text-lg font-bold text-slate-800 mb-1">Contenedor #{{ container.containerName }}</h3>
        <span :class="['px-2 py-0.5 rounded-full text-xs font-medium', statusBadgeColorClass]">
          {{ statusText }}
        </span>
        <!-- Departure and Arrival Times -->
        <div class="mt-2 grid grid-cols-2 gap-x-3 text-slate-600">
            <div>
                <p class="font-semibold text-xs">Salida:</p>
                <p class="text-sm font-medium">{{ formatDateTime(container.departureTime) }}</p>
            </div>
            <div>
                <p class="font-semibold text-xs">Llegada:</p>
                <p class="text-sm font-medium">{{ formatDateTime(container.arrivalTime) }}</p>
            </div>
        </div>
      </div>

      <div :class="[statusBackgroundColorClass, 'w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-lg']">
        <span class="text-2xl font-bold tracking-tight">{{ formattedTime.value }}</span>
        <span v-if="formattedTime.unit" class="text-xs font-medium -mt-1">{{ formattedTime.unit }}</span>
      </div>
    </div>

    <!-- Bottom Section: Progress Bar with Distance -->
    <div class="relative pt-1">
      <div class="flex justify-between items-center text-xs text-slate-600 mb-1">
        <span>Progreso del Viaje</span>
        <span class="font-semibold">{{ (container.distanceRemain / 1000).toFixed(2) }} km restantes</span>
      </div>
      <div class="overflow-hidden h-4 text-xs flex rounded bg-slate-200 relative">
        <div :style="{ width: container.completed + '%' }" :class="[statusBackgroundColorClass, 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center items-center transition-all duration-500']">
          <span class="absolute text-white font-semibold text-xs">{{ container.completed.toFixed(0) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getContainerStatusText, getContainerStatusColor } from '../utils/statusUtils';

const props = defineProps({
  container: {
    type: Object,
    required: true,
  },
});

const statusText = computed(() => getContainerStatusText(props.container.statusId));

const statusBadgeColorClass = computed(() => getContainerStatusColor(props.container.statusId));

const statusBackgroundColorClass = computed(() => {
  const statusId = props.container.statusId;
  const colorMap = {
    1: 'bg-orange-500',
    2: 'bg-green-500',
    3: 'bg-green-500',
    4: 'bg-blue-500',
    5: 'bg-cyan-500',
    6: 'bg-slate-500',
    7: 'bg-slate-500',
    8: 'bg-red-500'
  };
  return colorMap[statusId] || 'bg-gray-500';
});

const formattedTime = computed(() => {
    const seconds = props.container.timeRemain;
    if (seconds === null || seconds === undefined) return { value: '---', unit: '' };
    if (seconds < 0) return { value: '!', unit: 'Retraso' };

    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    return { value: `${paddedHours}:${paddedMinutes}`, unit: 'hrs:min' };
});

const formatDateTime = (dateString) => {
  if (!dateString) return 'Sin Confirmar';
  const date = new Date(dateString);
  // Using a more compact format to save space
  return date.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
};

</script>

<template>
  <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
    <h1 class="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Dashboard</h1>
    <div class="flex flex-wrap items-center gap-2">
      <div class="flex items-center gap-2">
        <button
          v-for="period in periods"
          :key="period.hours"
          @click="setTimeWindow(period.hours)"
          :class="[
            'px-4 py-2 text-sm font-medium border rounded-lg',
            timeWindow === period.hours
              ? 'bg-sky-500 text-white border-sky-500'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
          ]"
        >
          {{ period.label }}
        </button>
      </div>
      <div class="flex items-center gap-2 p-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg">
        <CalendarIcon class="w-5 h-5 text-slate-500" />
        <span>{{ formattedDateRange }}</span>
        <button @click="clearCustomDate" class="ml-2 text-slate-400 hover:text-slate-600">
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import XIcon from './icons/XIcon.vue';

const props = defineProps({
  timeWindow: {
    type: Number,
    default: 720
  }
});

const emit = defineEmits(['update:timeWindow']);

const periods = [
  { label: 'Hoy', hours: 24 },
  { label: 'Ayer', hours: 48 },
  { label: 'Semana', hours: 168 },
  { label: 'Mes', hours: 720 },
];

const setTimeWindow = (hours) => {
  emit('update:timeWindow', hours);
  // TODO: Add logic to handle custom date range selection
};

const formattedDateRange = computed(() => {
  if (!props.timeWindow) return 'Select a date';

  const now = new Date();
  const start = new Date(now.getTime() - props.timeWindow * 60 * 60 * 1000);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  return `${formatDate(start)} - ${formatDate(now)}`;
});

const clearCustomDate = () => {
  setTimeWindow(720); // Reset to default
};
</script>

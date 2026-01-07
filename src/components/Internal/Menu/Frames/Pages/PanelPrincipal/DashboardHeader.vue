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
            'px-4 py-2 text-sm font-medium border rounded-lg transition-colors',
            timeWindow === period.hours && !selectedDate
              ? 'bg-sky-500 text-white border-sky-500'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
          ]"
        >
          {{ period.label }}
        </button>
      </div>
      
      <div class="relative">
        <VueDatePicker
          v-model="selectedDate"
          :enable-time-picker="false"
          auto-apply
          :clearable="false"
          @update:model-value="handleDateChange"
          input-class-name="!border-slate-200 !text-slate-700 !text-sm !rounded-lg !py-2 !pl-10 !pr-8 !shadow-none hover:!bg-slate-50"
        >
          <template #trigger>
             <div class="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors" :class="{ '!border-sky-500 !text-sky-700 !bg-sky-50': selectedDate }">
                <CalendarIcon class="w-5 h-5" :class="selectedDate ? 'text-sky-500' : 'text-slate-500'" />
                <span>{{ formattedDateRange }}</span>
                <XIcon 
                  v-if="selectedDate" 
                  @click.stop="clearCustomDate" 
                  class="w-4 h-4 ml-2 text-slate-400 hover:text-red-500 transition-colors" 
                />
             </div>
          </template>
        </VueDatePicker>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CalendarIcon from './icons/CalendarIcon.vue';
import XIcon from './icons/XIcon.vue';

const props = defineProps({
  timeWindow: {
    type: Number,
    default: 720
  }
});

const emit = defineEmits(['update:timeWindow']);

const selectedDate = ref(null);

const periods = [
  { label: 'Hoy', hours: 24 },
  { label: 'Ayer', hours: 48 },
  { label: 'Semana', hours: 168 },
  { label: 'Mes', hours: 720 },
];

const setTimeWindow = (hours) => {
  selectedDate.value = null; // Clear custom date when preset is clicked
  emit('update:timeWindow', hours);
};

const handleDateChange = (date) => {
  if (!date) return;
  
  const now = new Date();
  const selected = new Date(date);
  
  // Calculate difference in milliseconds
  const diffMs = now - selected;
  
  // Convert to hours (ceil to ensure we cover the full range)
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  
  // Ensure at least 24 hours if selected is today/future (though future shouldn't be picked for history)
  const finalHours = Math.max(24, hours);
  
  emit('update:timeWindow', finalHours);
};

const formattedDateRange = computed(() => {
  if (selectedDate.value) {
    return selectedDate.value.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  if (!props.timeWindow) return 'Seleccionar fecha';

  const now = new Date();
  const start = new Date(now.getTime() - props.timeWindow * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // If it matches a preset, show the range, otherwise just show the range too
  return `${formatDate(start)} - ${formatDate(now)}`;
});

const clearCustomDate = () => {
  selectedDate.value = null;
  setTimeWindow(720); // Reset to default (Mes)
};
</script>

<style>
/* Override VueDatePicker styles if needed */
.dp__theme_light {
   --dp-primary-color: #0ea5e9; /* sky-500 */
}
</style>

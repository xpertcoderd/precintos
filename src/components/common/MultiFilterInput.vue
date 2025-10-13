<template>
  <div class="flex flex-col gap-3">
    <!-- Active Filters (Tags) -->
    <div v-if="modelValue.length > 0" class="flex flex-wrap items-center gap-2">
      <span v-for="(filter, index) in modelValue" :key="index" class="flex items-center gap-1.5 pl-3 pr-2 py-1 text-sm font-medium bg-sky-100 text-sky-800 rounded-full">
        <span class="font-semibold">{{ filter.label }}:</span>
        <span>{{ filter.value }}</span>
        <button @click="removeFilter(index)" class="p-0.5 rounded-full hover:bg-sky-200 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </span>
    </div>

    <!-- Input Area -->
    <div class="flex items-stretch gap-0 shadow-sm rounded-lg border border-slate-300 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all duration-200">
      <select v-model="currentKey" class="w-40 rounded-l-lg border-0 border-r border-slate-300 bg-slate-50 text-sm text-slate-700 focus:ring-0 focus:border-slate-300">
        <option v-for="option in filterOptions" :key="option.value" :value="option">{{ option.label }}</option>
      </select>
      <input
        v-model="currentValue"
        @keydown.enter.prevent="addFilter"
        type="text"
        placeholder="Añadir filtro..."
        class="flex-grow w-full text-sm border-0 rounded-r-lg focus:ring-0"
      />
      <button @click="addFilter" class="px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded-r-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 transition-colors">
        Agregar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { // Array of active filters
    type: Array,
    required: true,
  },
  filterOptions: { // Available filter keys
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const currentKey = ref(props.filterOptions[0]);
const currentValue = ref('');

function addFilter() {
  if (!currentValue.value.trim()) return;

  const newFilter = {
    key: currentKey.value.value, // e.g., 'deviceid'
    label: currentKey.value.label, // e.g., 'Deviceid'
    value: currentValue.value.trim(),
  };

  // Avoid adding duplicate filters
  if (!props.modelValue.some(f => f.key === newFilter.key && f.value === newFilter.value)) {
    const newFilters = [...props.modelValue, newFilter];
    emit('update:modelValue', newFilters);
  }

  currentValue.value = ''; // Clear input
}

function removeFilter(index) {
  const newFilters = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', newFilters);
}
</script>

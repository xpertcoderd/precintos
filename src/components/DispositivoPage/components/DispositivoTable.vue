<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th scope="col" class="relative px-6 sm:w-12 sm:px-8">
            <input
              type="checkbox"
              class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              :checked="areAllSelected"
              @change="toggleSelectAll"
            />
          </th>
          <th v-for="header in tableConfig.headers" :key="header" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
        <tr v-if="data.length === 0">
          <td :colspan="tableConfig.headers.length + 1" class="px-6 py-12 text-center text-slate-500">
            No hay datos para mostrar.
          </td>
        </tr>
        <tr v-for="item in data" :key="item.device.id" class="hover:bg-slate-50 transition-colors" :class="{ 'bg-sky-50': isSelected(item.device.id) }">
          <td class="relative px-6 sm:w-12 sm:px-8">
            <div class="absolute inset-y-0 left-0 w-0.5 bg-sky-600" v-if="isSelected(item.device.id)"></div>
            <input
              type="checkbox"
              class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              :value="item.device.id"
              v-model="selectedItems"
            />
          </td>
          <!-- Iterate through fields to render cells -->
          <td v-for="field in tableConfig.fields" :key="field" class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            <!-- Dispositivo Label (truncated) -->
            <template v-if="field === 'device.label'">
              <span :title="getFieldData(item, field)">
                {{ truncateText(getFieldData(item, field), 25) }}
              </span>
            </template>

            <!-- Battery Level with % -->
            <template v-else-if="field === 'deviceState.batteryLevel'">
              <span>{{ getFieldData(item, field) }}%</span>
            </template>

            <!-- Lock Status with Badge -->
            <template v-else-if="field === 'deviceState.lockState'">
              <span :class="getLockStatusClass(getFieldData(item, field))" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ getFieldData(item, field) }}
              </span>
            </template>

            <!-- Connection Status with Badge -->
            <template v-else-if="field === 'deviceState.connectionStatus'">
              <span :class="getConnectionStatusClass(getFieldData(item, field))" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ getFieldData(item, field) }}
              </span>
            </template>

            <!-- Default Text -->
            <template v-else>
              {{ getFieldData(item, field) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['selection-change']);

const selectedItems = ref([]);

const areAllSelected = computed(() =>
  props.data.length > 0 && selectedItems.value.length === props.data.length
);

const isSelected = (id) => selectedItems.value.includes(id);

function toggleSelectAll() {
  if (areAllSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = props.data.map(item => item.device.id);
  }
}

watch(selectedItems, (newSelection) => {
  emit('selection-change', newSelection);
});

const tableConfig = computed(() => ({
  headers: ['Dispositivo', 'Device ID', 'Grupo', 'Batería', 'Estado del Sello', 'Conexión'],
  fields: ['device.label', 'device.deviceid', 'group.title', 'deviceState.batteryLevel', 'deviceState.lockState', 'deviceState.connectionStatus'],
}));

function getFieldData(item, field) {
  // Safely access nested properties
  return field.split('.').reduce((o, i) => (o ? o[i] : null), item);
}

function truncateText(text, maxLength = 20) {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

function getLockStatusClass(status) {
  const statusClasses = {
    sealed: 'bg-green-100 text-green-800',
    unsealed_cant_close: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return statusClasses[status] || statusClasses.default;
}

function getConnectionStatusClass(status) {
  const statusClasses = {
    active: 'bg-green-100 text-green-800',
    offline: 'bg-gray-100 text-gray-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return statusClasses[status] || statusClasses.default;
}
</script>

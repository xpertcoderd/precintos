<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow-sm">
    <table class="min-w-full divide-y divide-slate-100">
      <thead class="bg-slate-50">
        <tr>
          <!-- SERIAL Column (Includes Checkbox) -->
          <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
            SERIAL
          </th>
          
          <!-- Remaining Headers -->
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            ETIQUETAS
          </th>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            BATERIA
          </th>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            GRUPO
          </th>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            ULTIMA ACTIVIDAD
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-100">
        <tr v-if="data.length === 0">
          <td colspan="5" class="px-6 py-12 text-center text-slate-500 text-sm">
            No hay datos para mostrar.
          </td>
        </tr>
        <tr v-for="item in data" :key="item.device.id" class="hover:bg-slate-50 transition-colors group">
          
          <!-- SERIAL COLUMN: Checkbox + Serial + Lock -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-4">
              <!-- Custom Radio-style Checkbox -->
              <div class="relative flex items-center">
                <input
                  type="checkbox"
                  class="peer h-4 w-4 rounded-full border-gray-300 text-sky-500 focus:ring-sky-500 cursor-pointer appearance-none border checked:bg-sky-500 checked:border-sky-500 transition-all"
                  :value="item.device.id"
                  v-model="selectedItems"
                />
                <div class="absolute inset-0 hidden peer-checked:flex items-center justify-center pointer-events-none">
                  <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>

              <!-- Serial Number -->
              <span class="text-sm font-medium text-slate-700 font-mono">
                {{ item.device.deviceid }}
              </span>

              <!-- Lock Icon -->
              <div class="flex-shrink-0 text-cyan-600">
                 <!-- Closed Lock -->
                <svg v-if="item.deviceState?.lockState === 'sealed'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                </svg>
                <!-- Open Lock -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-slate-400">
                  <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                </svg>
              </div>
            </div>
          </td>

          <!-- ETIQUETAS -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
             <span :title="item.device.label">
                {{ truncateText(item.device.label || '—', 40) }}
             </span>
          </td>

          <!-- BATERIA -->
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
            {{ item.deviceState?.batteryLevel ? item.deviceState.batteryLevel + '%' : '—' }}
          </td>

          <!-- GRUPO -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            {{ item.group?.title || 'Sin Grupo' }}
          </td>

          <!-- ULTIMA ACTIVIDAD -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
             <div class="flex items-center justify-between">
                <span>{{ item.deviceState?.lastUpdate || '—' }}</span>
                
                <!-- Menu Dots (Visual placeholder as per image) -->
                <button class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                  </svg>
                </button>
             </div>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['selection-change']);

// Single source of truth for selection
const selectedItems = ref([]);

watch(selectedItems, (newSelection) => {
  emit('selection-change', newSelection);
});

// Helper for labels
function truncateText(text, maxLength = 20) {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

</script>

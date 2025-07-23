<script setup>
import { computed, defineProps, defineEmits } from 'vue';
// Import the new icons
import PencilIcon from '../icons/PencilIcon.vue';
import TrashIcon from '../icons/TrashIcon.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  entity: {
    type: String,
    required: true,
  },
});

// Define the events the component can emit
defineEmits(['edit-item', 'delete-item']);

const tableConfig = computed(() => {
  switch (props.entity) {
    case 'carrier':
      return {
        headers: ['Name', 'Contact', 'RNC', 'Phone', 'Email'],
        fields: ['name', 'contact', 'rnc', 'phone', 'email'],
      };
    case 'driver':
      return {
        headers: ['First Name', 'Last Name', 'Phone', 'License', 'Expires'],
        fields: ['firstName', 'lastName', 'phone', 'idcardLicense', 'licenseExpiration'],
      };
    case 'vehicle':
      return {
        headers: ['Alias', 'Brand/Model', 'Year', 'Color', 'Plate'],
        fields: ['alias', 'brandModel', 'year', 'color', 'licPlate'],
      };
    default:
      return { headers: [], fields: [] };
  }
});

const getFieldData = (item, field) => {
  return field.split('.').reduce((o, i) => (o ? o[i] : null), item);
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
      <tr>
        <th v-for="header in tableConfig.headers" :key="header"
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
          {{ header }}
        </th>
        <th class="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
      <tr v-if="data.length === 0">
        <td :colspan="tableConfig.headers.length + 1" class="px-6 py-12 text-center text-slate-500">
          No hay datos para mostrar.
        </td>
      </tr>
      <tr v-for="item in data" :key="item.id" class="hover:bg-slate-50 transition-colors">
        <td v-for="field in tableConfig.fields" :key="field" class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
          {{ getFieldData(item, field) }}
        </td>
        <!-- Action Buttons Cell -->
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
          <div class="flex items-center justify-center gap-4">
            <!-- Edit Button -->
            <button @click="$emit('edit-item', item)" class="text-slate-400 hover:text-sky-600 p-1 rounded-full transition-colors" title="Editar">
              <PencilIcon class="w-5 h-5" />
            </button>
            <!-- Delete Button -->
            <button @click="$emit('delete-item', item)" class="text-slate-400 hover:text-red-600 p-1 rounded-full transition-colors" title="Eliminar">
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

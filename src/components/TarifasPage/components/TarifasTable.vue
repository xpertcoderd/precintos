<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th v-for="header in tableConfig.headers" :key="header" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
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
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
            <div class="flex items-center justify-center gap-4">
              <button @click="$emit('edit-item', item)" class="text-slate-400 hover:text-sky-600 p-1 rounded-full transition-colors" title="Editar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg>
              </button>
              <button @click="$emit('delete-item', item)" class="text-slate-400 hover:text-red-600 p-1 rounded-full transition-colors" title="Eliminar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  data: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit-item', 'delete-item'])

const tableConfig = computed(() => ({
  headers: ['Nombre', 'Tipo Transferencia', 'Tipo Tarifa', 'Precio'],
  fields: ['name', 'transferType.name', 'tariffType.name', 'price'],
}))

function getFieldData(item, field) {
  return field.split('.').reduce((o, i) => (o ? o[i] : null), item)
}
</script>

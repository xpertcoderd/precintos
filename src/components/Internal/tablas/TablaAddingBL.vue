<script setup>
import { defineProps, defineEmits } from 'vue';
import TrashIcon from "@/components/TransportistaPage/icons/TrashIcon.vue";

const props = defineProps(['blList', 'columnName']);
const emit = defineEmits(['removeBl']);

const handleRemove = (blText) => {
  emit('removeBl', blText);
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">NO</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{{ props.columnName }}</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
        <tr v-if="!props.blList || props.blList.length === 0">
          <td colspan="3" class="px-6 py-12 text-center text-slate-500">No hay datos para mostrar.</td>
        </tr>
        <tr v-for="(dato, index) in props.blList" :key="index" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ dato.text }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
            <div class="flex items-center justify-center">
              <button @click="handleRemove(dato.text)" class="text-slate-400 hover:text-red-600 p-1 rounded-full transition-colors" title="Eliminar">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

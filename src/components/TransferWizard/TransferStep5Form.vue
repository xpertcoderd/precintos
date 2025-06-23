<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col gap-6 bg-gray-50 rounded-xl p-6 shadow">
    <div class="flex flex-col gap-2">
      <div class="bg-white rounded-lg p-4 mb-2">
        <TablaDetailsOrden :ordenes="localModel.ordenes" class="w-full max-h-60 overflow-y-auto" />
        <div class="flex justify-between mt-4">
          <div class="text-center">
            <div class="text-xs font-bold text-gray-700">Total BL</div>
            <div class="text-base font-semibold text-gray-900">{{ localModel.totales?.bl }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs font-bold text-gray-700">Total Contenedores</div>
            <div class="text-base font-semibold text-gray-900">{{ localModel.totales?.containers }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs font-bold text-gray-700">Total</div>
            <div class="text-base font-semibold text-gray-900">{{ `RD$${localModel.totales?.amount}` }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <button @click="$emit('cerrar')" type="button" class="px-8 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">Subir Pago</button>
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Finalizar</button>
    </div>
  </form>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';
import TablaDetailsOrden from '@/components/Internal/tablas/TablaDetailsOrden.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['update:modelValue', 'cerrar', 'next']);

const localModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

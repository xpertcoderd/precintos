<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col gap-6 bg-gray-50 rounded-xl p-6 shadow">
    <div class="flex flex-col gap-2">
      <div class="bg-white rounded-lg p-4 mb-2">
        <TablaDetailsOrden :ordenes="incomingData.orders" class="w-full max-h-60 overflow-y-auto" />
        <div class="flex justify-between mt-4">
          <div class="text-center">
            <div class="text-xs font-bold text-gray-700">Total BL</div>
            <div class="text-base font-semibold text-gray-900">{{ incomingData.orderSummary?.bl }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs font-bold text-gray-700">Total Contenedores</div>
            <div class="text-base font-semibold text-gray-900">{{ incomingData.orderSummary?.containers }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs font-bold text-gray-700">Total</div>
            <div class="text-base font-semibold text-gray-900">{{ `RD$${incomingData.orderSummary?.amount}` }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Finalizar</button>
    </div>
  </form>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import TablaDetailsOrden from '@/components/Internal/tablas/TablaDetailsOrden.vue';

defineProps(['incomingData']);
defineEmits(['update:modelValue', 'cerrar', 'next']);
</script>

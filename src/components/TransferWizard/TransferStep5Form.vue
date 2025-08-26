<template>
  <div class="p-2">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold text-slate-800">Resumen del Traslado</h3>
      <p class="text-slate-500">Por favor, revise todos los detalles antes de finalizar.</p>
    </div>

    <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-6">
      <!-- Section 1: Key Details -->
      <div>
        <h4 class="text-lg font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-200">Detalles Principales</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          <div>
            <label class="block mb-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Cliente</label>
            <p class="text-base font-semibold text-slate-800">{{ summaryDetails.finalClient || 'N/A' }}</p>
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Tipo de Traslado</label>
            <p class="text-base font-semibold text-slate-800">{{ summaryDetails.typeName || 'N/A' }}</p>
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Origen</label>
            <p class="text-base font-semibold text-slate-800">{{ summaryDetails.startPlace || 'N/A' }}</p>
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Destino</label>
            <p class="text-base font-semibold text-slate-800">{{ summaryDetails.endPlace || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Section 2: Cost Breakdown -->
      <div>
        <h4 class="text-lg font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-200">Desglose de Costos</h4>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-slate-200">
            <li v-for="(item, index) in costBreakdown" :key="index" class="flex justify-between gap-4 py-3">
              <p class="text-sm text-slate-600">
                {{ item.containerCount }} Contenedores (BL: <span class="font-medium text-slate-800">#{{ item.bl_number }}</span>)
              </p>
              <p class="text-sm font-semibold text-slate-800">{{ formatCurrency(item.containerCount * summaryDetails.unitPrice) }}</p>
            </li>
             <li v-if="!costBreakdown.length" class="text-center py-4">
                <p class="text-sm text-slate-500">No hay desglose para mostrar.</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Section 3: Grand Total -->
      <div class="pt-6 border-t-2 border-dashed border-slate-300">
        <div class="flex justify-end items-center gap-4">
          <span class="text-lg font-medium text-slate-600">Total a Pagar:</span>
          <span class="text-3xl font-bold text-sky-600">{{ formatCurrency(grandTotal) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-8 flex justify-end gap-4">
      <button @click="$emit('cerrar')" type="button" class="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">
        Cancelar
      </button>
      <button @click="$emit('next')" type="button" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
        Finalizar Traslado
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  allData: {
    type: Object,
    required: true,
    default: () => ({
      headerData: {},
      bl_ContainerList: [],
      totalAmount: 0,
    })
  }
});

defineEmits(['cerrar', 'next']);

const summaryDetails = computed(() => props.allData.headerData || {});
const costBreakdown = computed(() => props.allData.bl_ContainerList || []);
const grandTotal = computed(() => props.allData.totalAmount || 0);

const formatCurrency = (value) => {
  if (typeof value !== 'number') {
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(0);
  }
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
  }).format(value);
};
</script>

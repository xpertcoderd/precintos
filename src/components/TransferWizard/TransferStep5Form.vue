<template>
  <div class="bg-gray-100/90 font-sans p-4 sm:p-8 flex items-center justify-center min-h-screen">

    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="p-6 sm:p-8 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Detalles de la Orden</h1>
          <p class="text-gray-500 mt-1">Revise los detalles antes de finalizar.</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <h2 class="text-2xl font-extrabold tracking-wider text-gray-800 text-right">
            AUROR<span class="text-cyan-500">A</span>
          </h2>
          <p class="text-sm text-gray-500 text-right -mt-1">TECHNOLOGIES</p>
        </div>
      </div>

      <div class="p-6 sm:p-8 space-y-4">
        <div
            v-for="order in orders"
            :key="order.id"
            class="bg-white border border-gray-200 rounded-xl p-5 transition-shadow hover:shadow-lg"
        >
          <div class="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-6 items-center">

            <div class="col-span-2 md:col-span-1">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">No. Solicitud</p>
              <p class="text-lg font-bold text-cyan-600">#{{ order.id }}</p>
            </div>

            <div class="col-span-2 md:col-span-1">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cant. BL</p>
              <p class="text-base font-medium text-gray-800 truncate" :title="order.blNumber">{{ order.blNumber }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ order.containers }} Contenedores</p>
            </div>

            <div class="col-span-2 md:col-span-2">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ruta</p>
              <div class="flex items-center space-x-2 text-gray-700">
                <span class="font-medium truncate">{{ order.origin }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-gray-400 flex-shrink-0">
                  <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium truncate">{{ order.destination }}</span>
              </div>
            </div>

            <div class="col-span-2 md:col-span-1 flex justify-between items-center">
              <div class="text-right flex-grow">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Costo</p>
                <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(order.containers * order.costPerContainer) }}</p>
              </div>
              <button class="ml-4 text-gray-400 hover:text-cyan-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                  <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.432.076-.85.22-1.23.424a.75.75 0 00-.5.857 2.25 2.25 0 014.012.283.75.75 0 00.5.857c.38.204.798.348 1.23.424v2.99c0 1.036-.84 1.875-1.875 1.875H6a.75.75 0 010-1.5h.375a.375.375 0 100-.75H6a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h1.5V3.375c0-.256.053-.502.152-.732.1-.23.24-.44.41-.62.17-.18.377-.33.61-.444.233-.113.488-.179.753-.179H16.5a.75.75 0 010 1.5h-1.875a.375.375 0 100 .75h1.875a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25h-1.5v1.125c0 1.036-.84 1.875-1.875 1.875h-3.75a.75.75 0 010-1.5h3.75a.375.375 0 100-.75h-3.75a2.25 2.25 0 01-2.25-2.25V15a.75.75 0 00-.75-.75H4.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5a.75.75 0 010 1.5H4.5A2.25 2.25 0 012.25 18v-3a2.25 2.25 0 012.25-2.25h1.5a.75.75 0 00.75-.75v-.01c.432-.076.85-.22 1.23-.424a.75.75 0 00.5-.857 2.25 2.25 0 014.012-.283.75.75 0 00.5-.857c.38-.204.798-.348 1.23-.424V3.375A2.25 2.25 0 0116.125 1.5h-8.25zM15 6.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V6.75z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 sm:p-8 bg-gray-50 border-t-2 border-dashed">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">

          <div class="text-center lg:text-left">
            <p class="text-base text-gray-500">Total BL</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalBL }}</p>
          </div>
          <div class="text-center lg:text-left">
            <p class="text-base text-gray-500">Total Contenedores</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalContainers }}</p>
          </div>

          <div class="col-span-2 text-right">
            <p class="text-lg font-medium text-gray-600">Total a Pagar</p>
            <p class="text-4xl sm:text-5xl font-extrabold text-gray-900">{{ formatCurrency(grandTotal) }}</p>
          </div>

        </div>

        <div class="mt-8">
          <button
              @click="finalizeOrder"
              class="w-full bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-lg hover:shadow-cyan-500/40"
          >
            Finalizar Orden
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed } from 'vue';
// import TablaDetailsOrden from '@/components/Internal/tablas/TablaDetailsOrden.vue';

defineProps(['incomingData']);
defineEmits(['update:modelValue', 'cerrar', 'next']);

const orders = ref([
  {
    id: 126,
    blNumber: '123456789101115184',
    containers: 5,
    costPerContainer: 2300,
    origin: 'Puerto Caucedo',
    destination: 'Marítima Dominicana (MARDOM)',
  },
  {
    id: 127,
    blNumber: '123456789101115184',
    containers: 5,
    costPerContainer: 2300,
    origin: 'Puerto Caucedo',
    destination: 'Marítima Dominicana (MARDOM)',
  },
  {
    id: 128,
    blNumber: '123456789101115184',
    containers: 5,
    costPerContainer: 2300,
    origin: 'Puerto Caucedo',
    destination: 'Marítima Dominicana (MARDOM)',
  },
]);

// --- Computed Properties for Totals ---
const totalBL = computed(() => orders.value.length);

const totalContainers = computed(() =>
    orders.value.reduce((sum, order) => sum + order.containers, 0)
);

const grandTotal = computed(() =>
    orders.value.reduce((sum, order) => sum + (order.containers * order.costPerContainer), 0)
);

// --- Methods ---
const formatCurrency = (value) => {
  // Using Intl.NumberFormat for proper currency formatting for Dominican Peso (DOP)
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
  }).format(value);
};

const finalizeOrder = () => {
  // Placeholder for the finalization logic
  console.log('Finalizing order with a total of:', formatCurrency(grandTotal.value));
  alert(`Orden finalizada! (Ver la consola para más detalles)\nTotal: ${formatCurrency(grandTotal.value)}`);
};
</script>

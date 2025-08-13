<template>
  <div class="bg-slate-100 p-4 min-h-full">
    <div v-if="!incomingData.transfers_list || incomingData.transfers_list.length === 0" class="flex items-center justify-center h-full">
      <p class="text-center text-slate-500 text-lg">No hay traslados para mostrar.</p>
    </div>

    <div v-else class="space-y-6">
      <!-- The Shipment Card -->
      <div v-for="dato in incomingData.transfers_list" :key="dato.id" class="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300">

        <!-- Top Section: B/L and ETA -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-6">
          <!-- Bill of Lading Section -->
          <div class="flex items-center gap-4">
              <div class="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <ShipIcon class="w-6 h-6"></ShipIcon>
              </div>
              <div>
                  <p class="text-sm font-medium text-slate-500">Bill of Lading</p>
                  <p class="text-xl font-bold text-slate-800 tracking-wider">{{ dato.bl || 'N/A' }}</p>
              </div>
          </div>

          <!-- ETA Section -->
          <div class="text-left md:text-right">
            <p class="text-sm font-medium text-slate-500">ETA</p>
            <p class="text-lg font-semibold text-slate-700">{{ formatDateTime(dato.timeTravelEst) }}</p>
          </div>
        </div>

        <!-- Bottom Section: Route and Status -->
        <div class="flex flex-col md:flex-row justify-between items-start gap-6">

          <!-- Route Section -->
          <div class="w-full">
            <h3 class="text-md font-semibold text-slate-600 mb-4">Ruta</h3>
            <div class="flex items-center w-full">
              <!-- Origin -->
              <div class="flex items-center gap-3 min-w-0">
                <div class="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-500"></div>
                <p class="text-slate-700 font-medium truncate" :title="dato.startPlace.label">
                  {{ dato.startPlace.label || 'Origen no especificado' }}
                </p>
              </div>

              <!-- Connecting Line -->
              <div class="flex-grow mx-4 h-px bg-slate-300 border-t border-dashed border-slate-400"></div>

              <!-- Destination -->
              <div class="flex items-center gap-3 min-w-0">
                <div class="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500"></div>
                <p class="text-slate-700 font-medium truncate" :title="dato.endPlace.label">
                  {{ dato.endPlace.label || 'Destino no especificado' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Status Icons Section -->
          <div class="flex-shrink-0 flex flex-row md:flex-col gap-2 pt-4 md:pt-0 md:border-l md:pl-6 border-slate-200">
              <div class="flex items-center gap-2 bg-slate-100 p-2 rounded-lg">
                  <BoxIcon class="w-5 h-5 text-indigo-500"></BoxIcon>
                  <span class="text-sm font-medium text-slate-600 hidden sm:inline">
                      {{ 0 }} Contenedores
                  </span>
              </div>
              <div @click="trackShipment(dato.id)" class="flex items-center gap-2 bg-slate-100 p-2 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors">
                  <MapPin class="w-5 h-5 text-rose-500"></MapPin>
                  <span class="text-sm font-medium text-slate-600 hidden sm:inline">Tracking</span>
              </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, h } from 'vue';

const incomingData = defineProps(['transfers_list']);
const outGoingData = defineEmits(['transfer_id']);

function trackShipment(id) {
  outGoingData('transfer_id', id);
}

function formatDateTime(dateTimeString) {
  if (!dateTimeString) return 'No especificada';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString('es-ES', options);
  } catch (e) {
    return 'Fecha inválida';
  }
}

// --- Icon Components ---
const MapPin = (props, { attrs }) => h('svg', { ...attrs, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
  h('path', { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
  h('circle', { cx: "12", cy: "10", r: "3" })
]);

const BoxIcon = (props, { attrs }) => h('svg', { ...attrs, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
  h('path', { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  h('polyline', { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  h('line', { x1: "12", y1: "22.08", x2: "12", y2: "12" })
]);

const ShipIcon = (props, { attrs }) => h('svg', { ...attrs, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
  h('path', { d: "M2 21h20" }),
  h('path', { d: "M6.5 21.5V17" }),
  h('path', { d: "M17.5 21.5V17" }),
  h('path', { d: "M22 17H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.34a1 1 0 0 1 .96.76L5 8h14l.7-3.24a1 1 0 0 1 .96-.76H22a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z" }),
  h('path', { d: "M12 17V5" }),
  h('path', { d: "M6 5l6-3 6 3" })
]);
</script>

<style scoped>
/* Tailwind CSS handles all styling. */
</style>

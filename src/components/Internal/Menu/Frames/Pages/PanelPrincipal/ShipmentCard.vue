<template>
  <div class="w-full bg-slate-50 rounded-lg transition-all duration-300 p-6 border border-slate-200">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-6">
      <div class="flex items-center gap-4">
        <div class="bg-blue-100 text-sky-600 p-3 rounded-lg">
          <ShipIcon class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Bill of Lading</p>
          <p class="text-xl font-bold text-slate-800 tracking-wider">{{ shipmentData.transfer.bl }}</p>
        </div>
      </div>
      <div class="text-left md:text-right">
        <p class="text-sm font-medium text-slate-500">ETA</p>
        <p class="text-lg font-semibold text-slate-700">{{ formattedEta }}</p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-start gap-6">
      <div class="w-full">
        <h3 class="text-md font-semibold text-slate-600 mb-4">Route</h3>
        <div class="flex items-center w-full">
          <div class="flex items-center gap-3 min-w-0">
            <div class="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-500"></div>
            <p class="text-slate-700 font-medium truncate" :title="shipmentData.transfer.startPlace">{{ shipmentData.transfer.startPlace.label }}</p>
          </div>
          <div class="flex-grow mx-4 h-px bg-slate-300 border-t border-dashed border-slate-400"></div>
          <div class="flex items-center gap-3 min-w-0">
            <div class="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500"></div>
            <p class="text-slate-700 font-medium truncate" :title="shipmentData.transfer.endPlace">{{ shipmentData.transfer.endPlace.label }}</p>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0 flex flex-row items-center gap-4 pt-2 md:pt-0">
        <div class="flex items-center gap-2 text-sm font-medium text-slate-600">
          <BoxIcon class="w-5 h-5 text-indigo-500" />
          <span>{{ shipmentData.countainerCount}} Containers</span>
        </div>
        <div @click="$emit('trackShipment')" class="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-blue-600">
          <MapPin class="w-5 h-5 text-rose-500" />
          <span>Tracking</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, defineEmits, defineProps } from 'vue';
  import ShipIcon from './icons/ShipIcon.vue';
  import BoxIcon from './icons/BoxIcon.vue';
  import MapPin from './icons/MapPin.vue';

  const props = defineProps({
    shipmentData: Object,
  });

  defineEmits(['trackShipment']);

  const formattedEta = computed(() => {
    if (!props.shipmentData.transfer.timeTravelEst) return 'N/A';

    const date = new Date(props.shipmentData.transfer.timeTravelEst);
    if (isNaN(date)) return 'Invalid Date';

    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} de ${month} de ${year}, ${hours}:${minutes}`;
  });
</script>

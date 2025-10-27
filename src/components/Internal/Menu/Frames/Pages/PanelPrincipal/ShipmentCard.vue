<template>
  <div class="w-full mb-2 bg-slate-50 rounded-lg transition-all duration-300 p-3 border border-slate-200">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <!-- Left Side: Main Info -->
      <div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
        <div class="flex items-center gap-2">
          <div class="bg-sky-100 text-sky-600 p-2 rounded-lg">
            <ShipIcon class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Bill of Lading</p>
            <p class="text-lg font-bold text-slate-800 tracking-wider">{{ shipmentData.transfer.bl }}</p>
          </div>
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Compañia</p>
          <p class="text-base font-semibold text-slate-700">{{ shipmentData.transfer.serverClient.name }}</p>
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Cliente Final</p>
          <p class="text-base font-semibold text-slate-700">{{ shipmentData.transfer.finalClient.name }}</p>
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">Total</p>
          <p class="text-base font-semibold text-slate-700">{{ formatCurrency(shipmentData.transfer.unitPrice * shipmentData.containerCount) }}</p>
        </div>
      </div>

      <!-- Right Side: ETA -->
      <div class="text-left md:text-right flex-shrink-0">
        <p class="text-xs font-medium text-slate-500">ETA</p>
        <p class="text-base font-semibold text-slate-700">{{ formattedEta }}</p>
      </div>
    </div>

    <!-- Route and Actions -->
    <div class="border-t border-slate-200 mt-3 pt-3 flex flex-col md:flex-row justify-between items-start gap-3">
      <div class="w-full">
        <h3 class="text-sm font-semibold text-slate-600 mb-2">Ruta</h3>
        <div class="flex items-center w-full">
          <div class="flex items-center gap-2 min-w-0">
            <div class="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white ring-1 ring-green-500"></div>
            <p class="text-slate-700 text-sm font-medium truncate" :title="shipmentData.transfer.startPlace.label">{{ shipmentData.transfer.startPlace.label }}</p>
          </div>
          <div class="flex-grow mx-2 h-px bg-slate-300 border-t border-dashed border-slate-400"></div>
          <div class="flex items-center gap-2 min-w-0">
            <div class="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-500"></div>
            <p class="text-slate-700 text-sm font-medium truncate" :title="shipmentData.transfer.endPlace.label">{{ shipmentData.transfer.endPlace.label }}</p>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0 flex flex-row items-center gap-3 pt-1 md:pt-0">
        <div @click="toggleContainers" class="flex items-center gap-1 text-xs font-medium text-slate-600 cursor-pointer hover:text-sky-600">
          <BoxIcon class="w-4 h-4 text-indigo-500" />
          <span>{{ shipmentData.containerCount }} Contenedores</span>
        </div>
        <div
          @click="isTrackingAvailable && $emit('trackShipment', filteredShipmentForTracking)"
          class="flex items-center gap-1 text-xs font-medium"
          :class="[
            isTrackingAvailable ? 'text-slate-600 cursor-pointer hover:text-sky-600' : 'text-slate-400 cursor-not-allowed'
          ]"
        >
          <MapPin class="w-4 h-4" :class="isTrackingAvailable ? 'text-rose-500' : 'text-slate-400'" />
          <span>Tracking</span>
        </div>
      </div>
    </div>

    <!-- Expandable Container Section -->
    <div v-if="showContainers" class="mt-4 pt-4 border-t border-dashed border-slate-300">
      <ContainerComponent :containers="transformedContainers" @create-link="(container) => $emit('create-link', container)"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from 'vue';
import ShipIcon from './icons/ShipIcon.vue';
import BoxIcon from './icons/BoxIcon.vue';
import MapPin from './icons/MapPin.vue';
import ContainerComponent from './ContainerView/ContainerComponent.vue';
import { getContainerStatusText, getContainerStatusColor } from './utils/statusUtils';

const props = defineProps({
  shipmentData: {
    type: Object,
    required: true,
  }
});

defineEmits(['trackShipment', 'create-link']);

const showContainers = ref(false);

const isTrackingAvailable = computed(() => {
  return props.shipmentData.transferUnits.some(unit => unit.statusId !== 1);
});

const filteredShipmentForTracking = computed(() => {
  if (!isTrackingAvailable.value) return null;
  const activeUnits = props.shipmentData.transferUnits.filter(unit => unit.statusId !== 1);
  return {
    ...props.shipmentData,
    transferUnits: activeUnits,
    containerCount: activeUnits.length,
  };
});

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

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const toggleContainers = () => {
    showContainers.value = !showContainers.value;
  };

  const transformedContainers = computed(() => {
      if (!props.shipmentData || !props.shipmentData.transferUnits) return [];
      return props.shipmentData.transferUnits.map(container => ({
        id: `${props.shipmentData.transfer.bl}-${container.id}`,
        transferUnitId: container.id,
        container: `Contenedor # ${container.container}`,
        origin: props.shipmentData.transfer.startPlace.label,
        destination: props.shipmentData.transfer.endPlace.label,
        status: getContainerStatusText(container.statusId),
        statusColorClass: getContainerStatusColor(container.statusId),
        progress: 0, // This can be enhanced if progress data is available
        startDate: new Date(props.shipmentData.transfer.timeRequest).toLocaleDateString(),
        endDate: new Date(props.shipmentData.transfer.timeTravelEst).toLocaleDateString(),
        isOverdue: new Date() > new Date(props.shipmentData.transfer.timeTravelEst),
      }));
  });

</script>

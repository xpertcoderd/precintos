<script setup>
import { ref, computed } from 'vue';

// --- Local Component Definitions ---
// In a real application, these would be imported from their own .vue files.

// Icon Components
const CalendarIcon = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>` };
const XIcon = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>` };
const ListIcon = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>` };
const SearchIcon = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>` };
const MapPin = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>` };
const BoxIcon = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>` };
const ShipIcon = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21h20"/><path d="M6.5 21.5V17"/><path d="M17.5 21.5V17"/><path d="M22 17H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.34a1 1 0 0 1 .96.76L5 8h14l.7-3.24a1 1 0 0 1 .96-.76H22a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z"/><path d="M12 17V5"/><path d="M6 5l6-3 6 3"/></svg>` };

// Summary Card Component
const SummaryCard = {
  props: ['title', 'value', 'chartColor'],
  // FIXED: Removed the unnecessary 'components' property that was likely causing a conflict.
  template: `
    <div class="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
      <div>
        <p class="text-sm text-slate-500">{{ title }}</p>
        <p class="text-2xl font-bold text-slate-800">{{ value }}</p>
      </div>
      <div class="w-20 h-10">
        <svg viewBox="0 0 80 40" :class="chartColor">
          <polyline fill="none" class="chart-line"
                    points="0,30 10,20 20,25 30,15 40,18 50,10 60,15 70,25 80,20"
          />
        </svg>
      </div>
    </div>
  `
};

// Shipment Card Component
const ShipmentCard = {
  props: ['shipmentData'],
  emits: ['trackShipment'],
  components: { ShipIcon, BoxIcon, MapPin },
  setup(props) {
    const containerText = computed(() => {
      const count = props.shipmentData.containerCount;
      return `${count} Container${count > 1 ? 's' : ''}`;
    });
    return { containerText };
  },
  template: `
    <div class="w-full bg-slate-50 rounded-lg transition-all duration-300 p-6 border border-slate-200">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-6">
        <div class="flex items-center gap-4">
          <div class="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <ShipIcon class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Bill of Lading</p>
            <p class="text-xl font-bold text-slate-800 tracking-wider">{{ shipmentData.billOfLading }}</p>
          </div>
        </div>
        <div class="text-left md:text-right">
          <p class="text-sm font-medium text-slate-500">ETA</p>
          <p class="text-lg font-semibold text-slate-700">{{ shipmentData.eta }}</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-start gap-6">
        <div class="w-full">
          <h3 class="text-md font-semibold text-slate-600 mb-4">Route</h3>
          <div class="flex items-center w-full">
            <div class="flex items-center gap-3 min-w-0">
              <div class="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-500"></div>
              <p class="text-slate-700 font-medium truncate" :title="shipmentData.origin">{{ shipmentData.origin }}</p>
            </div>
            <div class="flex-grow mx-4 h-px bg-slate-300 border-t border-dashed border-slate-400"></div>
            <div class="flex items-center gap-3 min-w-0">
              <div class="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500"></div>
              <p class="text-slate-700 font-medium truncate" :title="shipmentData.destination">{{ shipmentData.destination }}</p>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 flex flex-row items-center gap-4 pt-4 md:pt-0">
          <div v-if="shipmentData.containerCount > 0" class="flex items-center gap-2 text-sm font-medium text-slate-600">
            <BoxIcon class="w-5 h-5 text-indigo-500" />
            <span>{{ containerText }}</span>
          </div>
          <div v-if="shipmentData.hasTracking" @click="$emit('trackShipment')" class="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-blue-600">
            <MapPin class="w-5 h-5 text-rose-500" />
            <span>Tracking</span>
          </div>
        </div>
      </div>
    </div>
  `
};


// --- Main Dashboard Logic ---
const summaryCards = ref([
  { title: 'Pendiente', value: 5, chartColor: 'text-yellow-500' },
  { title: 'Aprobado', value: 23, chartColor: 'text-green-500' },
  { title: 'En Tránsito', value: 12, chartColor: 'text-blue-500' },
  { title: 'Retenido', value: 2, chartColor: 'text-red-500' },
  { title: 'Completado', value: 156, chartColor: 'text-slate-500' },
]);

const tabs = ref(['Contenedor', 'BL', 'ETA', 'Mapa']);
const activeTab = ref('Contenedor');

const shipmentData = ref({
  billOfLading: '12341234',
  eta: '17 de enero de 2025, 16:00',
  origin: 'Port of Shanghai',
  destination: 'Port of Long Beach',
  containerCount: 2,
  hasTracking: true,
});

const trackShipment = () => {
  console.log(`Tracking shipment: ${shipmentData.value.billOfLading}`);
};

const selectTab = (tab) => {
  activeTab.value = tab;
  console.log(`Tab selected: ${tab}`);
};

</script>

<template>
  <div class="p-4 md:p-8">
    <!-- Dashboard Header -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 class="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Dashboard</h1>
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-2">
          <button class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Hoy</button>
          <button class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Semanal</button>
          <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">Mensual</button>
        </div>
        <div class="flex items-center gap-2 p-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg">
          <CalendarIcon class="w-5 h-5 text-slate-500" />
          <span>07/04/2025, 00:00 - 07/11/2025, 12:10</span>
          <button class="ml-2 text-slate-400 hover:text-slate-600">
            <XIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <SummaryCard v-for="card in summaryCards" :key="card.title" :title="card.title" :value="card.value" :chart-color="card.chartColor" />
    </div>

    <!-- Main Content Area -->
    <main class="bg-white rounded-2xl shadow-lg p-6">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 mb-6">
        <div class="flex items-center gap-3">
          <ListIcon class="w-6 h-6 text-blue-600" />
          <h2 class="text-xl font-bold text-slate-800">Traslados</h2>
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <button class="w-full md:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Crear Traslado</button>
          <div class="relative w-full md:w-64">
            <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="flex items-center gap-2 mb-6">
        <button
            v-for="tab in tabs"
            :key="tab"
            @click="selectTab(tab)"
            :class="[
                        'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                        activeTab === tab
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Shipment Card -->
      <ShipmentCard :shipment-data="shipmentData" @track-shipment="trackShipment" />
    </main>
  </div>
</template>

<style>
/* These styles would typically be in a global CSS file or handled by a build process.
  They are included here for the component to be self-contained.
  In a real project, you would add Tailwind's base, components, and utilities directives.
*/
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}
.chart-line {
  stroke-width: 2;
}
</style>

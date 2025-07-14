<template>
  <div class="p-4 md:p-8">
    <DashboardHeader />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <SummaryCard v-for="card in summaryCards" :key="card.title" :title="card.title" :value="card.value" :chart-color="card.chartColor" />
    </div>

    <MainContent :shipment-data="shipments" @track-shipment="trackShipment" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardHeader from './PanelPrincipal/DashboardHeader.vue';
import SummaryCard from './PanelPrincipal/SummaryCard.vue';
import MainContent from './PanelPrincipal/MainContent.vue';
import { transfers_list} from '@/components/conexion/DataConector.js';

const summaryCards = ref([
  { title: 'Pendiente', value: 5, chartColor: 'stroke-yellow-500' },
  { title: 'Aprobado', value: 23, chartColor: 'stroke-green-500' },
  // Kept as blue per your request
  { title: 'En Tránsito', value: 12, chartColor: 'stroke-blue-500' },
  { title: 'Retenido', value: 2, chartColor: 'stroke-red-500' },
  { title: 'Completado', value: 156, chartColor: 'stroke-slate-500' },
]);

const shipments = ref([]);

const trackShipment = () => {
  console.log(`Tracking shipment: ${shipments.value[0].bl}`);
};

onMounted(async () => {
  try {
    const response = await transfers_list()
    shipments.value = response.data.transfers;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}
</style>

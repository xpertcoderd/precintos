<template>
  <div class="p-4 md:p-8">
    <DashboardHeader />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <SummaryCard v-for="card in summaryCards" :key="card.title" :title="card.title" :value="card.value" :chart-color="card.chartColor" />
    </div>

    <MainContent
        :shipment-data="shipments"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-shipments="totalShipments"
        :loading="loading"
        @track-shipment="trackShipment"
        @update-page="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardHeader from './PanelPrincipal/DashboardHeader.vue';
import SummaryCard from './PanelPrincipal/SummaryCard.vue';
import MainContent from './PanelPrincipal/MainContent.vue';
import { transfers_list} from '@/components/conexion/DataConector.js';

const summaryCards = [
  { title: 'Pendiente', value: 5, chartColor: 'stroke-yellow-500' },
  { title: 'Aprobado', value: 23, chartColor: 'stroke-green-500' },
  { title: 'En Tránsito', value: 12, chartColor: 'stroke-blue-500' },
  { title: 'Retenido', value: 2, chartColor: 'stroke-red-500' },
  { title: 'Completado', value: 156, chartColor: 'stroke-slate-500' },
];

const shipments = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalShipments = ref(0)
const pageSize = 5;
const loading = ref(false);

const trackShipment = () => {
  console.log(`Tracking shipment: ${shipments.value[0].bl}`);
};

const fetchShipments = async (page) => {
  loading.value = true;
  try {
    const response = await transfers_list({ page: page, pageSize: pageSize });
    shipments.value = response.data.transfers;
    totalPages.value = Math.ceil(response.data.total / pageSize);
    totalShipments.value = response.data.total;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (newPage) => {
  fetchShipments(newPage);
};

onMounted(async () => {
  await fetchShipments(1);
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}
</style>

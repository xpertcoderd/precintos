<template>
  <div class="p-4 md:p-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <SummaryCard v-for="card in summaryCards" :key="card.title" :title="card.title" :value="card.value" :chart-color="card.chartColor" />
    </div>
    <MainContent/>
  </div>
</template>

<script setup>
import SummaryCard from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/SummaryCard.vue';
import MainContent from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/MainContent.vue';

const summaryCards = [
  { title: 'Pendiente', value: 5, chartColor: 'stroke-yellow-500' },
  { title: 'Aprobado', value: 23, chartColor: 'stroke-green-500' },
  { title: 'En Tránsito', value: 12, chartColor: 'stroke-blue-500' },
  { title: 'Retenido', value: 2, chartColor: 'stroke-red-500' },
  { title: 'Completado', value: 156, chartColor: 'stroke-slate-500' },
];
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}
</style>

<template>
  <div class="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
    <div>
      <p class="text-sm text-slate-500">{{ title }}</p>
      <p class="text-2xl font-bold text-slate-800">{{ value }}</p>
    </div>
    <div class="w-20 h-10">
      <svg viewBox="0 0 80 40" :class="chartColor">
        <polyline fill="none" class="stroke-2"
                  points="0,30 10,20 20,25 30,15 40,18 50,10 60,15 70,25 80,20"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
  defineProps({
    title: String,
    value: Number,
    chartColor: String,
  });
</script>

<style scoped>
  .chart-line {
    stroke-width: 2;
  }
</style>

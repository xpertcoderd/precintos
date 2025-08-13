<template>
  <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
    <h1 class="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Dashboard</h1>
    <div class="flex flex-wrap items-center gap-2">
      <div class="flex items-center gap-2">
        <button class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Hoy</button>
        <button class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Semanal</button>
        <button class="px-4 py-2 text-sm font-medium text-white bg-sky-500 border border-sky-500 rounded-lg">Mensual</button>
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
</template>

<script setup>
  import CalendarIcon from './icons/CalendarIcon.vue';
  import XIcon from './icons/XIcon.vue';
</script>

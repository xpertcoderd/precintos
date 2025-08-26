<template>
  <div class="flex justify-between items-center">
    <p class="text-sm text-slate-500">
      Mostrando <span class="font-medium">{{ (currentPage - 1) * 10 + 1 }}</span> - <span class="font-medium">{{ Math.min(currentPage * 10, total) }}</span> de <span class="font-medium">{{ total }}</span> resultados
    </p>
    <div class="flex items-center gap-2">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="sr-only">Anterior</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        v-for="page in pages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-lg',
          page === currentPage
            ? 'bg-sky-500 text-white'
            : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
        ]"
      >
        {{ page }}
      </button>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="sr-only">Siguiente</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const pages = computed(() => {
  const range = [];
  for (let i = 1; i <= props.totalPages; i++) {
    range.push(i);
  }
  return range;
});

const changePage = (page) => {
  if (page > 0 && page <= props.totalPages) {
    emit('page-change', page);
  }
};
</script>

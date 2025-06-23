<template>
  <div class="flex justify-around w-full pt-6">
    <button
        v-for="(active, index) in count.count"
        :key="index"
        @click="emitIndex(index)"
        :disabled="!active"
        :class="[
    'flex items-center justify-center rounded-full w-12 h-12 font-bold text-lg transition cursor-pointer hover:bg-gray-100',
    active ? 'bg-sky-400 text-white shadow' : 'bg-gray-200 text-black',
    { 'opacity-50 cursor-not-allowed': index < count.count.findIndex((item) => item) }
  ]"
    >
  <span v-if="active">
    <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
      ></path>
    </svg>
  </span>
      <span v-else>{{ index + 1 }}</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['setStep']);
const  count  = defineProps(['count']);


const emitIndex = (index) => {
  emit('setStep', index)
}
</script>

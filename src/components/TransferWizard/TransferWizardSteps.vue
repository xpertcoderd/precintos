<template>
  <div class="flex justify-around w-full pt-6">
    <div v-for="(active, index) in count.count" :key="index" @click="emitIndex(index)" :class="[
      'flex items-center justify-center rounded-full w-12 h-12 font-bold text-lg transition cursor-pointer hover:bg-gray-100',
      active ? 'bg-sky-400 text-white shadow' : 'bg-gray-200 text-black',
    ]">
      <span>{{index + 1}}</span>
    </div>
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

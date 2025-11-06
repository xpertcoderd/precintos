<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg shadow-xl p-4 w-full max-w-2xl relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:bg-slate-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <img :src="imageUrl" alt="Comprobante de Pago" class="w-full h-auto max-h-[80vh] object-contain rounded-lg">
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  imageUrl: String,
});

defineEmits(['close']);
</script>

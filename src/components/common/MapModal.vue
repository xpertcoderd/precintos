<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-xl flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-slate-200">
          <h3 class="text-lg font-bold text-slate-800">Ubicación de Dispositivos</h3>
          <button @click="$emit('close')" class="p-2 rounded-full hover:bg-slate-100">
            <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="flex-grow">
          <MapComponent :markers="markers" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import MapComponent from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/MapComponent.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  locations: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['close']);

const markers = computed(() => {
  return props.locations.map(loc => ({
    lat: loc.lat,
    lng: loc.lng,
    name: loc.label, // Use the device label for the marker tooltip
  }));
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

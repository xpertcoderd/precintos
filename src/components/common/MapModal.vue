<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-xl flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-slate-200">
          <h3 class="text-lg font-bold text-slate-800">Ubicación de Dispositivos</h3>
          <button @click="$emit('close')" class="p-2 rounded-full hover:bg-slate-100">
            <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="flex-grow relative">
           <MapaPage ref="mapRef" :inputData="mapConfig" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import MapaPage from '@/components/MapaPage.vue';

const props = defineProps({
  visible: { type: Boolean, default: false },
  locations: { type: Array, default: () => [] },
});

defineEmits(['close']);

const mapRef = ref(null);
const mapConfig = ref({ zoom: 8, center: [18.7357, -70.1627] });

watch(() => [props.visible, props.locations], async ([newVisible, newLocations]) => {
  if (newVisible && newLocations && newLocations.length > 0) {
    await nextTick();
    if (mapRef.value) {
      const markers = newLocations.map(loc => ({
        label: loc.label,
        coordenadas: { lat: loc.lat, lng: loc.lng }
      }));
      mapRef.value.setMarkers(markers);
    }
  }
}, { deep: true });
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

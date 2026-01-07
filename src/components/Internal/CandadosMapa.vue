<template>

	<div class="contenedorDivisor">
		<MapaPage class="mapaPage" :inputData="valoresDefectoMapa" ref="mapaRef" />
	</div>



</template>

<script setup>

import MapaPage from '@/components/MapaPage.vue'
import { ref, watch, nextTick } from 'vue';

const mapaRef = ref(null);
const props = defineProps(['locksList']);

let valoresDefectoMapa = ref({
	center: [18.468025816718264, -69.93920818790205],
	zoom: 13,
	lat: 18.468025816718264,
	lng: -69.95920818790205
})

watch(() => props.locksList, async (newVal) => {
    if (!newVal) return;
    
    // Check if any item is selected
    const hasSelection = newVal.some(item => item.check);
    
    // If items are selected, show only those. Otherwise, show all.
    const itemsToShow = hasSelection ? newVal.filter(item => item.check) : newVal;
    
    const markers = itemsToShow.map(item => ({
        label: item.row.device.label,
        device_id: item.row.device.deviceid,
        coordenadas: { lat: item.row.deviceState.lat, lng: item.row.deviceState.lng }
    }));

    await nextTick();
    if (mapaRef.value) {
        mapaRef.value.setMarkers(markers);
    }
}, { immediate: true, deep: true });

</script>

<style scoped>
.contenedorDivisor {
	display: flex;
	height: 100%;
}



</style>

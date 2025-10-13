<template>
  <div>
    <div id="map" class="w-full h-96 bg-slate-200 rounded-lg"></div>
    <div v-if="trackingData.length > 0 && trackingData[0].route.length > 1" class="mt-4">
      <h3 class="text-lg font-semibold text-slate-800 mb-2">Detalles del Rastreo</h3>
      <div class="space-y-2">
        <div v-for="container in trackingData" :key="container.id" class="bg-white p-3 rounded-lg border border-slate-200">
          <p class="font-semibold text-slate-700">{{ container.name }}</p>
          <p class="text-sm text-slate-500">Mostrando {{ container.route.length }} puntos de ruta.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, nextTick } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import truckIconUrl from '@/assets/truck.svg';

// Fix for default marker icon issue with webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const props = defineProps({
  trackingData: {
    type: Array,
    default: () => []
  }
});

const map = ref(null);
const layerGroup = ref(null);
const isMapReady = ref(false);

const truckIcon = L.icon({
  iconUrl: truckIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const updateMap = (data) => {
  if (!map.value || !layerGroup.value) return;

  layerGroup.value.clearLayers();

  if (data.length === 0) return;

  const bounds = L.latLngBounds();

  data.forEach(item => {
    if (!item.route || item.route.length === 0) return;

    const routePoints = item.route.map(p => L.latLng(p.lat, p.lng));

    // Case 1: Display a single marker
    if (routePoints.length === 1) {
      const point = routePoints[0];
      L.marker(point).addTo(layerGroup.value).bindPopup(item.name);
      bounds.extend(point);
    }
    // Case 2: Display a full route
    else {
      const startPoint = routePoints[0];
      const currentPos = routePoints[routePoints.length - 1];

      L.marker(startPoint).addTo(layerGroup.value).bindPopup(`${item.name} - Origen`);
      L.marker(currentPos, { icon: truckIcon }).addTo(layerGroup.value).bindPopup(`${item.name} - Posición Actual`);
      L.polyline(routePoints, { color: 'blue' }).addTo(layerGroup.value);

      routePoints.forEach(point => bounds.extend(point));
    }
  });

  if (bounds.isValid()) {
    if (data.length === 1 && data[0].route.length === 1) {
      map.value.setView(bounds.getCenter(), 15); // Zoom in on single markers
    } else {
      map.value.flyToBounds(bounds, { padding: [50, 50] });
    }
  }
};

const renderMapIfReady = () => {
  if (isMapReady.value && props.trackingData) {
    nextTick(() => {
      updateMap(props.trackingData);
    });
  }
};

const initializeMap = () => {
  if (map.value) return;

  map.value = L.map('map').setView([18.7357, -70.1627], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);

  layerGroup.value = L.layerGroup().addTo(map.value);
  isMapReady.value = true;
  renderMapIfReady();
};

onMounted(() => {
  initializeMap();
});

watch(() => props.trackingData, () => {
  renderMapIfReady();
}, { deep: true });

</script>

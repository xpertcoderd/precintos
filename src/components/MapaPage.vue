<template>
  <div class="w-full h-full relative">
    <div id="device-map" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const props = defineProps(['inputData']);

const map = ref(null);
const googleMaps = ref(null);
const markers = ref([]);

const loader = new Loader({
  apiKey: "AIzaSyDjUVPzdrdX0OHK8OpbkqxOJ2I6kPgUx8w",
  version: "weekly",
  libraries: ["places"]
});

const pendingMarkers = ref(null);

const initMap = async () => {
  try {
    const google = await loader.load();
    googleMaps.value = google;
    
    const defaultCenter = props.inputData?.center 
      ? { lat: props.inputData.center[0], lng: props.inputData.center[1] }
      : { lat: 18.7357, lng: -70.1627 };

    map.value = new google.maps.Map(document.getElementById("device-map"), {
      center: defaultCenter,
      zoom: props.inputData?.zoom || 8,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    if (pendingMarkers.value) {
      setMarkers(pendingMarkers.value);
      pendingMarkers.value = null;
    }

  } catch (error) {
    console.error("Error loading Google Maps:", error);
  }
};

const clearMarkers = () => {
  markers.value.forEach(m => m.setMap(null));
  markers.value = [];
};

const setMarkers = (devices) => {
  if (!map.value || !googleMaps.value) {
    pendingMarkers.value = devices;
    return;
  }
  
  clearMarkers();
  
  const bounds = new googleMaps.value.maps.LatLngBounds();
  
  devices.forEach(device => {
    if (device.coordenadas && device.coordenadas.lat && device.coordenadas.lng) {
      const latLng = new googleMaps.value.maps.LatLng(device.coordenadas.lat, device.coordenadas.lng);
      
      const marker = new googleMaps.value.maps.Marker({
        position: latLng,
        map: map.value,
        title: device.label,
      });
      
      markers.value.push(marker);
      bounds.extend(latLng);
    }
  });
  
  if (markers.value.length > 0) {
    map.value.fitBounds(bounds);
  }
};

const setCenter = (device) => {
  if (!map.value) return;
  
  let lat, lng;
  
  if (device.lat && device.lng) {
    lat = device.lat;
    lng = device.lng;
  } else if (device.coordenadas && device.coordenadas.lat && device.coordenadas.lng) {
    lat = device.coordenadas.lat;
    lng = device.coordenadas.lng;
  }
  
  if (lat && lng) {
     map.value.setCenter({ lat, lng });
     map.value.setZoom(15);
  }
};

onMounted(() => {
  initMap();
});

defineExpose({
  setMarkers,
  setCenter
});
</script>

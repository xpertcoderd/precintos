<template>
  <div class="flex flex-col md:flex-row h-[600px] gap-4">
    <!-- Left Side: Unit List -->
    <div class="w-full md:w-1/3 flex flex-col bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
      <div class="p-4 border-b border-slate-200 bg-white">
        <h3 class="font-bold text-slate-800">Unidades Activas</h3>
        <p class="text-xs text-slate-500 mt-1">{{ units.length }} unidades en tránsito o entregadas</p>
      </div>
      
      <div class="flex-1 overflow-y-auto p-3 space-y-3">
        <div 
          v-for="unit in units" 
          :key="unit.id"
          @click="selectUnit(unit)"
          class="bg-white p-4 rounded-lg border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md relative overflow-hidden group"
          :class="[
            selectedUnit?.id === unit.id 
              ? 'border-sky-500 ring-1 ring-sky-500' 
              : 'border-slate-200 hover:border-sky-300'
          ]"
        >
          <div class="flex gap-3 relative z-10">
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contenedor</p>
                  <p class="font-bold text-slate-800 text-base">{{ unit.container.replace('Contenedor # ', '') }}</p>
                  
                  <div class="mt-1 flex flex-col gap-0.5">
                      <p class="text-xs text-slate-600"><span class="font-semibold">BL:</span> {{ unit.transfer?.bl || 'N/A' }}</p>
                      <p class="text-xs text-slate-600 truncate" :title="unit.transfer?.cargoDescription"><span class="font-semibold">Carga:</span> {{ unit.transfer?.cargoDescription || 'Sin descripción' }}</p>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                 <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Dispositivo</p>
                 <p class="text-sm text-slate-700 font-mono font-medium">{{ unit.deviceId || 'N/A' }}</p>
              </div>

              <div class="relative pl-3 border-l-2 border-slate-200 space-y-2">
                <div class="relative">
                  <div class="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white z-10"></div>
                  <p class="text-[10px] text-slate-500 font-bold uppercase">Origen</p>
                  <p class="text-xs text-slate-700 truncate font-medium" :title="unit.transfer?.startPlace?.label">
                    {{ unit.transfer?.startPlace?.label || 'N/A' }}
                  </p>
                </div>
                <div class="relative">
                  <div class="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-green-500 ring-2 ring-white z-10"></div>
                  <p class="text-[10px] text-slate-500 font-bold uppercase">Destino</p>
                  <p class="text-xs text-slate-700 truncate font-medium" :title="unit.transfer?.endPlace?.label">
                    {{ unit.transfer?.endPlace?.label || 'N/A' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Right Side Image -->
            <div class="w-24 flex flex-col items-end justify-between shrink-0">
               <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-2"
                :class="getContainerStatusColor(unit.statusId)"
              >
                {{ getContainerStatusText(unit.statusId) }}
              </span>
              <img :src="camionAzul" alt="Truck" class="w-full object-contain drop-shadow-md transform group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100 relative z-10">
            <div>
              <p class="text-[10px] text-slate-400 font-bold uppercase">Vinculación</p>
              <p class="text-xs text-slate-600 font-medium">{{ formatDate(unit.linkedTime) }}</p>
            </div>
            <div v-if="unit.unlinkedTime">
              <p class="text-[10px] text-slate-400 font-bold uppercase">Desvinculación</p>
              <p class="text-xs text-slate-600 font-medium">{{ formatDate(unit.unlinkedTime) }}</p>
            </div>
          </div>
        </div>

        <div v-if="units.length === 0" class="text-center py-10 text-slate-500 text-sm">
          No hay unidades activas para mostrar.
        </div>
      </div>
    </div>

    <!-- Right Side: Google Map -->
    <div class="w-full md:w-2/3 bg-slate-200 rounded-lg overflow-hidden relative border border-slate-200 shadow-inner">
      <div id="google-map" class="w-full h-full"></div>
      
      <div v-if="isLoadingRoute" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { getTransferBlitsMapPoints } from "@/services/blitService";
import { getContainerStatusText, getContainerStatusColor } from './utils/statusUtils';
import camionAzul from '@/assets/camionAzul.svg';

const props = defineProps({
  units: {
    type: Array,
    default: () => []
  }
});

const selectedUnit = ref(null);
const map = ref(null);
const googleMaps = ref(null);
const markers = ref([]);
const polyline = ref(null);
const isLoadingRoute = ref(false);

// Google Maps Loader
const loader = new Loader({
  apiKey: "AIzaSyDjUVPzdrdX0OHK8OpbkqxOJ2I6kPgUx8w",
  version: "weekly",
  libraries: ["places"]
});

const initMap = async () => {
  try {
    const google = await loader.load();
    googleMaps.value = google;
    
    map.value = new google.maps.Map(document.getElementById("google-map"), {
      center: { lat: 18.7357, lng: -70.1627 }, // DR Center
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    // If units exist, select the first one
    if (props.units.length > 0) {
      selectUnit(props.units[0]);
    }
  } catch (error) {
    console.error("Error loading Google Maps:", error);
  }
};

const clearMap = () => {
  markers.value.forEach(marker => marker.setMap(null));
  markers.value = [];
  if (polyline.value) {
    polyline.value.setMap(null);
    polyline.value = null;
  }
};

const fetchAndDrawRoute = async (unit) => {
  if (!unit || !map.value || !googleMaps.value) return;
  
  isLoadingRoute.value = true;
  clearMap();

  try {
    // Fetch route points
    const response = await getTransferBlitsMapPoints({ 
      trLnkIds: unit.id, 
      lastBlit: false 
    });

    if (response.success && response.data.transferUnitMapData.length > 0) {
      const routeData = response.data.transferUnitMapData[0];
      const points = routeData.points.map(p => ({ lat: p.lat, lng: p.lng }));

      if (points.length === 0) return;

      const bounds = new googleMaps.value.maps.LatLngBounds();
      const path = [];

      // Create markers and path
      points.forEach((point, index) => {
        const latLng = new googleMaps.value.maps.LatLng(point.lat, point.lng);
        path.push(latLng);
        bounds.extend(latLng);

        // Start Marker (Origin)
        if (index === 0) {
          const startMarker = new googleMaps.value.maps.Marker({
            position: latLng,
            map: map.value,
            title: "Origen: " + (unit.transfer?.startPlace?.label || ''),
            icon: {
              path: googleMaps.value.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: "#64748b", // Slate-500 (Gray)
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }
          });
          markers.value.push(startMarker);
        }

        // Current Position Marker
        if (index === points.length - 1) {
          const currentMarker = new googleMaps.value.maps.Marker({
            position: latLng,
            map: map.value,
            title: "Posición Actual",
            icon: {
              path: googleMaps.value.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#3b82f6", // Blue
              fillOpacity: 1,
              strokeWeight: 3,
              strokeColor: "#ffffff",
            }
          });
          markers.value.push(currentMarker);
        }
      });
      


      // Draw Polyline
      polyline.value = new googleMaps.value.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#3b82f6",
        strokeOpacity: 0.6,
        strokeWeight: 4,
      });
      polyline.value.setMap(map.value);

      // Fit bounds
      map.value.fitBounds(bounds);
    }
  } catch (error) {
    console.error("Error fetching route:", error);
  } finally {
    isLoadingRoute.value = false;
  }
};

const selectUnit = (unit) => {
  selectedUnit.value = unit;
  fetchAndDrawRoute(unit);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
};

onMounted(() => {
  initMap();
});

watch(() => props.units, (newUnits) => {
  if (!selectedUnit.value && newUnits.length > 0 && map.value) {
    selectUnit(newUnits[0]);
  }
}, { deep: true });

</script>

<style scoped>
/* Custom Scrollbar for the list */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9; 
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>

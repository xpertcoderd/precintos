<template>
  <main class="bg-white rounded-2xl shadow-lg p-6">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 mb-6">
      <div class="flex items-center gap-3">
        <ListIcon class="w-6 h-6 text-sky-600" />
        <h2 class="text-xl font-bold text-slate-800">Traslados</h2>
      </div>
      <div class="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
        <button @click="showWizard = true" class="w-full md:w-auto px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">Crear Traslado</button>
        <div class="relative w-full md:w-64">
          <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
      </div>
    </div>

    <!-- Tabs Section -->
    <div class="flex items-center gap-2 mb-6">
      <button
          v-for="tab in tabs"
          :key="tab"
          @click="selectTab(tab)"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
            activeTab === tab
                ? 'bg-sky-100 text-sky-700'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
          ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab === 'BL'" class="relative">
      <transition name="fade">
        <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      </transition>
      <transition name="fade">
        <div>
          <ShipmentCard
              v-for="shipment in shipmentData"
              :key="shipment.id"
              :shipment-data="shipment"
              @track-shipment="handleTrackShipment"
              @group-containers="handleGroupContainers"
          />
          <div v-if="!shipmentData || shipmentData.length === 0 && !loading" class="text-center py-10">
            <p class="text-slate-500">No hay traslados para mostrar.</p>
          </div>
          <div v-if="shipmentData && shipmentData.length > 0" class="mt-6">
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                :total="totalShipments"
                @page-change="handlePageChange"
            />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="activeTab === 'Contenedor'">
      <ContainerComponent
        v-if="activeContainers.length > 0"
        :containers="activeContainers"
        @create-link="handleCreateLink"
      />
      <div v-else class="text-center py-10">
        <p class="text-slate-500">Seleccione los contenedores de un BL para ver los detalles aquí.</p>
      </div>
    </div>

    <div v-if="activeTab === 'Mapa'">
      <MapComponent :tracking-data="containerTrackingData" />
      <div class="mt-6">
        <ContainerComponent
          v-if="filteredContainersForMap.length > 0"
          :containers="filteredContainersForMap"
          @create-link="handleCreateLink"
        />
      </div>
    </div>

    <div v-if="activeTab !== 'BL' && activeTab !== 'Contenedor' && activeTab !== 'Mapa'" class="text-center py-10">
      <p class="text-slate-500">Contenido para la pestaña '{{ activeTab }}' estará disponible próximamente.</p>
    </div>

    <!-- Modals -->
    <TransferWizardCard v-if="showWizard" @close="showWizard = false" />
    <CreateLinkComponent
      v-if="showCreateLinkModal"
      :show="showCreateLinkModal"
      @close="showCreateLinkModal = false"
      :selected-container="selectedContainerForLink"
      :clients="linkModalData.clients"
      :carriers="linkModalData.carriers"
      :drivers="linkModalData.drivers"
      :vehicles="linkModalData.vehicles"
      :devices="linkModalData.devices"
    />

  </main>
</template>

<script setup>
  import { ref, computed, defineProps, defineEmits, watch, onUnmounted } from 'vue';
  import ListIcon from './icons/ListIcon.vue';
  import SearchIcon from './icons/SearchIcon.vue';
  import ShipmentCard from './ShipmentCard.vue';
  import TransferWizardCard from '@/components/TransferWizard/TransferWizardCard.vue';
  import ContainerComponent from './ContainerView/ContainerComponent.vue';
  import CreateLinkComponent from '@/components/CreateLink/CreateLinkComponent.vue';
  import Pagination from './Pagination.vue';
  import MapComponent from './MapComponent.vue';
  import { transfer_UnitsByTransferId, transferBlits } from "@/components/conexion/DataConector";
  import { useCreateLinkData } from '@/components/TransferWizard/composables/useCreateLinkData.js';
  import { getContainerStatusText, getContainerStatusColor } from './utils/statusUtils.js';

  const tabs = ref(['Contenedor', 'BL', 'ETA', 'Mapa']);
  const activeTab = ref('BL');
  const showWizard = ref(false);
  const showCreateLinkModal = ref(false);
  const activeContainers = ref([]);
  const selectedContainerForLink = ref(null);
  const containerTrackingData = ref([]);
  const trackingTimer = ref(null);
  const lastTrackedShipment = ref(null);
  const untrackableContainerIds = ref(new Set());

  const containerCache = new Map();

  const { linkModalData, fetchCreateLinkData } = useCreateLinkData();

  const props = defineProps({
    shipmentData: Array,
    currentPage: Number,
    totalPages: Number,
    totalShipments: Number,
    loading: Boolean
  });

  const emit = defineEmits(['trackShipment', 'update-page']);

  const filteredContainersForMap = computed(() => {
    return activeContainers.value.filter(container => container.status !== 'Pendiente');
  });

  const selectTab = (tab) => {
    activeTab.value = tab;
  };

  const fetchContainerData = async (transferId) => {
    if (containerCache.has(transferId)) {
      return containerCache.get(transferId);
    }
    const response = await transfer_UnitsByTransferId(transferId);
    if (response.success) {
      containerCache.set(transferId, response.data.transferUnits);
      return response.data.transferUnits;
    }
    return [];
  };

  const transformContainerData = (container, shipment, completedProgress = 0) => {
    const { transfer } = shipment;
    const startDate = new Date(transfer.timeRequest).toLocaleDateString();
    const endDate = new Date(transfer.timeTravelEst).toLocaleDateString();

    return {
      id: `${transfer.bl}-${container.id}`,
      transferUnitId: container.id,
      container: `Contenedor # ${container.container}`,
      origin: transfer.startPlace.label,
      destination: transfer.endPlace.label,
      status: getContainerStatusText(container.statusId),
      statusColorClass: getContainerStatusColor(container.statusId),
      progress: completedProgress,
      startDate,
      endDate,
      isOverdue: new Date() > new Date(endDate),
    };
  };

  const handleGroupContainers = async (shipment) => {
    if (!shipment || !shipment.transfer) return;

    const containers = await fetchContainerData(shipment.transfer.id);
    if (containers.length === 0) return;
    await fetchCreateLinkData();
    const trackingDataPromises = containers.map(container =>
      transferBlits({ trLnkId: container.id, lastBlit: true })
    );

    const trackingResults = await Promise.all(trackingDataPromises);

    activeContainers.value = containers.map((container, index) => {
      const trackingResponse = trackingResults[index];
      const lastBlit = (trackingResponse.success && trackingResponse.data.transferBlits.length > 0)
        ? trackingResponse.data.transferBlits[0]
        : null;
      return transformContainerData(container, shipment, lastBlit ? lastBlit.completed : 0);
    });

    activeTab.value = 'Contenedor';
  };

  const handleCreateLink = async (container) => {
    selectedContainerForLink.value = container;
    await fetchCreateLinkData();
    showCreateLinkModal.value = true;
  };

  const handleTrackShipment = async (shipment) => {
    // If this is a new shipment, clear the blacklist.
    if (lastTrackedShipment.value?.transfer.id !== shipment.transfer.id) {
      untrackableContainerIds.value.clear();
    }
    lastTrackedShipment.value = shipment;

    const containers = await fetchContainerData(shipment.transfer.id);
    if (containers.length === 0) return;

    const allBlitsPromises = containers.map(async (container) => {
      // Skip API call if container is in the blacklist
      if (untrackableContainerIds.value.has(container.id)) {
        return null;
      }

      const response = await transferBlits({ trLnkId: container.id });

      // If the request fails or returns no data, add to blacklist and return null.
      if (!response.success || response.data.transferBlits.length === 0) {
        untrackableContainerIds.value.add(container.id);
        return null;
      }

      const blits = response.data.transferBlits;
      const lastBlit = blits[blits.length - 1];
      return {
        id: container.id,
        name: `Contenedor # ${container.container}`,
        route: blits.map(blit => ({ lat: blit.lat, lng: blit.lng })),
        completed: lastBlit ? lastBlit.completed : 0,
      };
    });

    const allBlitsResults = (await Promise.all(allBlitsPromises)).filter(Boolean);

    activeContainers.value = containers.map((container) => {
      const blitData = allBlitsResults.find(data => data.id === container.id);
      return transformContainerData(container, shipment, blitData ? blitData.completed : 0);
    });

    containerTrackingData.value = allBlitsResults.map(data => ({
        id: data.id,
        name: data.name,
        route: data.route
    }));

    if (containerTrackingData.value.length > 0) {
      activeTab.value = 'Mapa';
    }
  };

  const startTrackingTimer = () => {
    if (trackingTimer.value) clearInterval(trackingTimer.value);

    trackingTimer.value = setInterval(() => {
      if (lastTrackedShipment.value) {
        // Find the fresh version of the shipment from the current props
        const currentShipment = props.shipmentData.find(
          s => s.transfer.id === lastTrackedShipment.value.transfer.id
        );

        if (currentShipment) {
          handleTrackShipment(currentShipment);
        } else {
          stopTrackingTimer();
        }
      }
    }, 15000);
  };

  const stopTrackingTimer = () => {
    if (trackingTimer.value) {
      clearInterval(trackingTimer.value);
      trackingTimer.value = null;
    }
  };

  watch(activeTab, (newTab) => {
    if (newTab === 'Mapa' && lastTrackedShipment.value) {
      startTrackingTimer();
    } else {
      stopTrackingTimer();
    }
  });

  onUnmounted(() => {
    stopTrackingTimer();
  });

  const handlePageChange = (newPage) => {
    emit('update-page', newPage);
  };

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

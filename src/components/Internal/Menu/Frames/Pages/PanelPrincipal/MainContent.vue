<template>
  <main class="bg-white rounded-2xl shadow-lg p-6">
    <DashboardHeader :timeWindow="timeWindowHours" @update:timeWindow="timeWindowHours = $event" />
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 mb-6">
      <div class="flex items-center gap-3">
        <ListIcon class="w-6 h-6 text-sky-600" />
        <h2 class="text-xl font-bold text-slate-800">Traslados</h2>
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
      <div>
        <ShipmentCard
            v-for="shipment in shipmentData"
            :key="shipment.transfer.id"
            :shipment-data="shipment"
            @track-shipment="handleTrackShipment"
            @group-containers="handleGroupContainers"
            @create-link="handleCreateLink"
            @open-seal="handleOpenSeal"
        />
        <div v-if="!shipmentData || shipmentData.length === 0 && !loading" class="text-center py-10">
          <p class="text-slate-500">No hay traslados para mostrar.</p>
        </div>
        <div v-if="shipmentData && shipmentData.length > 0" class="mt-6">
          <Pagination
              :current-page="currentPage"
              :total-pages="totalPages"
              :total="totalShipments"
              :page-size="10"
              @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'Contenedor'">
      <!-- Global Table View -->
      <div v-if="isGlobalContainerView">
        <div class="mb-6">
          <MultiFilterInput v-model="containerActiveFilters" :filter-options="filterOptions" />
        </div>
        <div class="relative">
            <transition name="fade">
                <div v-if="isLoadingContainers" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
                </div>
            </transition>
            <ContainerTable :containers="allContainers" />
        </div>
        <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-slate-700">
                <span>Mostrar</span>
                <select v-model="containerPageSize" class="shadow-sm rounded-lg border border-slate-300 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                </select>
                <span>resultados</span>
            </div>
            <Pagination
                v-if="containerTotalPages > 1"
                :current-page="containerCurrentPage"
                :total-pages="containerTotalPages"
                :total="containerTotalItems"
                :page-size="containerPageSize"
                @page-change="containerCurrentPage = $event"
            />
        </div>
      </div>
      <!-- Shipment-Specific Card View -->
      <div v-else>
        <ContainerComponent
          v-if="activeContainers.length > 0"
          :containers="activeContainers"
          @create-link="handleCreateLink"
          @open-seal="handleOpenSeal"
        />
        <div v-else class="text-center py-10">
          <p class="text-slate-500">No hay contenedores para mostrar para este traslado.</p>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'ETA'" class="relative">
        <transition name="fade">
            <div v-if="isLoadingEta" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
            </div>
        </transition>
        <div v-if="!isLoadingEta">
            <div v-if="etaContainers && etaContainers.length > 0">
                <ETACard
                    v-for="container in etaContainers"
                    :key="container.id"
                    :container="container"
                />
            </div>
            <div v-else class="text-center py-10">
                <p class="text-slate-500">No hay datos de ETA para mostrar.</p>
            </div>
        </div>
    </div>

    <div v-if="activeTab === 'Mapa'">
      <MapComponent :tracking-data="containerTrackingData" />
      <div class="mt-6">
        <ContainerComponent
          v-if="filteredContainersForMap.length > 0"
          :containers="filteredContainersForMap"
        />
      </div>
    </div>

    <!-- Modals -->
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
    <OpenSealModal
      v-if="showOpenSealModal"
      :show="showOpenSealModal"
      :container="selectedContainerForSeal"
      @close="showOpenSealModal = false"
      @confirm="confirmOpenSeal"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useMainContent } from './composables/useMainContent';
import { useUnits } from '@/composables/useUnits';
import DashboardHeader from './DashboardHeader.vue';
import ShipmentCard from './ShipmentCard.vue';
import ContainerTable from './ContainerView/ContainerTable.vue';
import ContainerComponent from './ContainerView/ContainerComponent.vue';
import ETACard from './ContainerView/ETACard.vue';
import MapComponent from './MapComponent.vue';
import CreateLinkComponent from '@/components/CreateLink/CreateLinkComponent.vue';
import OpenSealModal from '@/components/common/OpenSealModal.vue';
import Pagination from './Pagination.vue';
import MultiFilterInput from '@/components/common/MultiFilterInput.vue';
import ListIcon from './icons/ListIcon.vue';
import Swal from 'sweetalert2';

const timeWindowHours = ref(720);
const showCreateLinkModal = ref(false);
const showOpenSealModal = ref(false);
const selectedContainerForSeal = ref(null);
const selectedContainerForLink = ref(null);
const linkModalData = ref({ clients: [], carriers: [], drivers: [], vehicles: [], devices: [] });

const {
  tabs, activeTab, shipmentData, loading, currentPage, totalPages, totalShipments,
  activeContainers, isGlobalContainerView, containerTrackingData, filteredContainersForMap,
  allContainers, isLoadingContainers, containerCurrentPage, containerTotalPages, containerTotalItems, containerPageSize, containerActiveFilters, filterOptions,
  etaContainers, isLoadingEta,
  selectTab, handleGroupContainers, handleTrackShipment, handlePageChange,
  fetchAllContainers, fetchEtaData, fetchShipments
} = useMainContent(timeWindowHours);

const { useOpenTransferUnitSeal } = useUnits();
const { mutateAsync: openSeal } = useOpenTransferUnitSeal();

const handleCreateLink = (container) => {
  selectedContainerForLink.value = container;
  showCreateLinkModal.value = true;
};

const handleOpenSeal = (container) => {
  selectedContainerForSeal.value = container;
  showOpenSealModal.value = true;
};

const sendNotification = (message, type = 'success') => {
  Swal.fire({
    icon: type,
    title: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
};

const confirmOpenSeal = async ({ containerId, pin }) => {
  try {
    // Use selectedContainerForSeal.value.transferUnitId if available, or containerId passed from modal
    const idToUse = selectedContainerForSeal.value?.transferUnitId || containerId;
    const response = await openSeal({ id: idToUse, pin: pin });
    if (response.success) {
      sendNotification('Sello abierto con éxito', 'success');
      fetchShipments();
      fetchAllContainers();
      fetchEtaData();
    } else {
      sendNotification(response.message || 'Error al abrir el sello', 'error');
    }
  } catch (error) {
    sendNotification('Error al abrir el sello', 'error');
  }
  showOpenSealModal.value = false;
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

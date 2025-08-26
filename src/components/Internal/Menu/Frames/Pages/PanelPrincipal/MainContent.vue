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
              @track-shipment="trackShipment"
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

    <div v-if="activeTab !== 'BL' && activeTab !== 'Contenedor'" class="text-center py-10">
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
  import { ref, defineProps, defineEmits } from 'vue';
  import ListIcon from './icons/ListIcon.vue';
  import SearchIcon from './icons/SearchIcon.vue';
  import ShipmentCard from './ShipmentCard.vue';
  import TransferWizardCard from '@/components/TransferWizard/TransferWizardCard.vue';
  import ContainerComponent from './ContainerView/ContainerComponent.vue';
  import CreateLinkComponent from '@/components/CreateLink/CreateLinkComponent.vue';
  import Pagination from './Pagination.vue';
  import { devicesAll, transfer_UnitsByTransferId } from "@/components/conexion/DataConector";
  import { fetchInitialData } from "@/components/TransferWizard/helpers/fetchBrokerData";
  import { transportistaService } from '@/services/transportistaService';
  import { getContainerStatusText, getContainerStatusColor } from './utils/statusUtils.js';

  const tabs = ref(['Contenedor', 'BL', 'ETA', 'Mapa']);
  const activeTab = ref('BL');
  const showWizard = ref(false);
  const showCreateLinkModal = ref(false);
  const activeContainers = ref([]);
  const selectedContainerForLink = ref(null);
  const containerBLData = ref(null);
  const isLinkModalDataLoading = ref(false);

  defineProps({
    shipmentData: Array,
    currentPage: Number,
    totalPages: Number,
    totalShipments: Number,
    loading: Boolean
  });

  const emit = defineEmits(['trackShipment', 'update-page']);

  const linkModalData = ref({
    devices: [],
    clients: [],
    carriers: [],
    drivers: [],
    vehicles: [],
  });

  const trackShipment = () => emit('trackShipment');
  const selectTab = (tab) => { activeTab.value = tab; };

  const handleGroupContainers = async (shipment) => {
    if (!shipment || !shipment.transfer) return;
    containerBLData.value = shipment;
    const generatedContainers = [];
    const containers = (await transfer_UnitsByTransferId(containerBLData.value.transfer.id)).data.transferUnits;
    for (let i = 0; i < containerBLData.value.countainerCount; i++) {
      const startDate = new Date(containerBLData.value.transfer.timeRequest).toLocaleDateString();
      const endDate = new Date(containerBLData.value.transfer.timeTravelEst).toLocaleDateString();
      const currentContainer = containers[i];
      generatedContainers.push({
        id: `${containerBLData.value.transfer.bl}-${i + 1}`,
        transferUnitId: currentContainer.id,
        container: `Contenedor # ${currentContainer.container}`,
        origin: containerBLData.value.transfer.startPlace.label,
        destination: containerBLData.value.transfer.endPlace.label,
        status: getContainerStatusText(currentContainer.statusId),
        statusColorClass: getContainerStatusColor(currentContainer.statusId),
        progress: 0,
        startDate,
        endDate,
        isOverdue: new Date() > new Date(endDate),
      });
    }
    activeContainers.value = generatedContainers;
    activeTab.value = 'Contenedor';
  };

  const handleCreateLink = async (container) => {
    selectedContainerForLink.value = container;
    isLinkModalDataLoading.value = true;
    try {
      if (linkModalData.value.clients.length === 0) {
        const initialData = await fetchInitialData();
        linkModalData.value.clients = initialData.finalClients;
      }
      if (linkModalData.value.devices.length === 0) {
        const devices = await devicesAll();
        linkModalData.value.devices = devices.data.devices;
      }
      if (linkModalData.value.carriers.length === 0) {
        linkModalData.value.carriers = await transportistaService.getCarriers({});
      }
      if (linkModalData.value.drivers.length === 0) {
        linkModalData.value.drivers = await transportistaService.getDrivers({});
      }
      if (linkModalData.value.vehicles.length === 0) {
        linkModalData.value.vehicles = await transportistaService.getVehicles({});
      }
      showCreateLinkModal.value = true;
    } catch (error) {
      console.error("Error fetching data for link modal:", error);
    } finally {
      isLinkModalDataLoading.value = false;
    }
  };

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

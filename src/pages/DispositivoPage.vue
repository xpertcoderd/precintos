<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-full">
    <!-- Main Content Area -->
    <main class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <ServerIcon class="w-6 h-6 text-sky-600" />
          <h2 class="text-xl font-bold text-slate-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <button @click="openSeals" :disabled="selectedDevices.length !== 1" class="px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Abrir Candado
          </button>
          <button @click="viewOnMap" :disabled="selectedDevices.length === 0" class="px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Ver en mapa
          </button>
          <button @click="openCreateModal" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
            {{ createButtonText }}
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="mb-6">
        <MultiFilterInput v-model="activeFilters" :filter-options="filterOptions" />
      </div>

      <!-- Loading and Error States -->
      <div v-if="error" class="text-center text-red-500 py-4">{{ error }}</div>

      <!-- Table and Pagination with Loading Overlay -->
      <div class="relative">
        <transition name="fade">
          <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        </transition>

        <DispositivoTable
            :data="items"
            @selection-change="handleSelectionChange"
        />

        <div v-if="!isLoading && items.length === 0" class="text-center text-slate-500 py-12">
            No hay dispositivos para mostrar con los filtros actuales.
        </div>

        <!-- Footer with Pagination and Page Size -->
        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center gap-2 text-sm text-slate-500">
            <span>Mostrar</span>
            <select v-model="pageSize" class="rounded-md border-slate-300 text-sm focus:ring-sky-500 focus:border-sky-500">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            <span>resultados</span>
          </div>

          <Pagination
              v-if="totalPages > 1"
              :current-page="currentPage"
              :total-pages="totalPages"
              :total="totalItems"
              :page-size="pageSize"
              @page-change="handlePageChange"
          />
        </div>
      </div>
    </main>

    <!-- Modal for Create -->
    <EntityModal :visible="isModalVisible" :title="modalTitle" :save-text="saveButtonText" @close="closeModal" @save="handleSave">
      <DispositivoForm ref="dispositivoFormRef" :initial-data="editingItem" :errors="errors" />
    </EntityModal>

    <!-- PIN Modal for Opening Seals -->
    <PinModal :visible="showPinModal" @close="showPinModal = false" @confirm="handlePinConfirm" />

    <!-- Map Modal for Viewing Devices -->
    <MapModal :visible="showMapModal" :locations="mapLocations" @close="showMapModal = false" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDispositivoPage } from '@/components/DispositivoPage/composables/useDispositivoPage';
import { openSeal } from '@/components/conexion/DataConector.js';
import { useNotifications } from '@/composables/useNotifications';
import DispositivoTable from '@/components/DispositivoPage/components/DispositivoTable.vue';
import EntityModal from '@/components/DispositivoPage/components/EntityModal.vue';
import DispositivoForm from '@/components/DispositivoPage/components/DispositivoForm.vue';
import Pagination from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/Pagination.vue';
import ServerIcon from '@/components/Internal/Menu/icons/ServerIcon.vue';
import PinModal from '@/components/common/PinModal.vue';
import MapModal from '@/components/common/MapModal.vue';
import MultiFilterInput from '@/components/common/MultiFilterInput.vue';

const {
  items,
  editingItem,
  isModalVisible,
  isLoading,
  error,
  errors,
  pageTitle,
  createButtonText,
  modalTitle,
  saveButtonText,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  activeFilters,
  filterOptions,
  fetchItems,
  openCreateModal,
  closeModal,
  saveItem,
} = useDispositivoPage();

const { sendNotification } = useNotifications();
const dispositivoFormRef = ref(null);
const selectedDevices = ref([]);
const showPinModal = ref(false);
const showMapModal = ref(false);
const mapLocations = ref([]);

onMounted(() => {
  fetchItems(1);
});

function handlePageChange(newPage) {
  currentPage.value = newPage;
}

function handleSelectionChange(selection) {
  selectedDevices.value = selection;
}

function openSeals() {
  showPinModal.value = true;
}

async function handlePinConfirm(pin) {
  showPinModal.value = false;
  const deviceId = selectedDevices.value[0];
  if (!deviceId) return;

  const response = await openSeal({ deviceId }, pin);
  if (response.success) {
    sendNotification(`Sello del dispositivo ${deviceId} abierto con éxito.`, 'success');
  } else {
    sendNotification(`Error al abrir el sello del dispositivo ${deviceId}.`, 'error');
  }
}

function viewOnMap() {
  mapLocations.value = selectedDevices.value.map(deviceId => {
    const device = items.value.find(item => item.device.id === deviceId);
    if (device && device.deviceState) {
      return {
        lat: device.deviceState.lat,
        lng: device.deviceState.lng,
        label: device.device.label,
      };
    }
    return null;
  }).filter(Boolean);

  if (mapLocations.value.length > 0) {
    showMapModal.value = true;
  }
}

async function handleSave() {
  if (dispositivoFormRef.value) {
    await saveItem(dispositivoFormRef.value.formData);
  }
}
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

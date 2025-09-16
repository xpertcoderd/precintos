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
          <button @click="openSeals" :disabled="selectedDevices.length === 0" class="px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Abrir Candado
          </button>
          <button @click="viewOnMap" :disabled="selectedDevices.length === 0" class="px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Ver en mapa
          </button>
          <button @click="openCreateModal" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
            {{ createButtonText }}
          </button>
          <div class="relative w-64">
            <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
            <!-- Inlined SearchIcon -->
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
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
            No hay dispositivos para mostrar.
        </div>

        <Pagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :total="totalItems"
            @page-change="handlePageChange"
            class="mt-6"
        />
      </div>
    </main>

    <!-- Modal for Create -->
    <EntityModal :visible="isModalVisible" :title="modalTitle" :save-text="saveButtonText" @close="closeModal" @save="handleSave">
      <DispositivoForm ref="dispositivoFormRef" :initial-data="editingItem" :errors="errors" />
    </EntityModal>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDispositivoPage } from '@/components/DispositivoPage/composables/useDispositivoPage';
import DispositivoTable from '@/components/DispositivoPage/components/DispositivoTable.vue';
import EntityModal from '@/components/DispositivoPage/components/EntityModal.vue';
import DispositivoForm from '@/components/DispositivoPage/components/DispositivoForm.vue';
import Pagination from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/Pagination.vue';
import ServerIcon from '@/components/Internal/Menu/icons/ServerIcon.vue';

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
  fetchItems,
  openCreateModal,
  closeModal,
  saveItem,
} = useDispositivoPage();

const dispositivoFormRef = ref(null);
const selectedDevices = ref([]);

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
  console.log('Abrir candado para los dispositivos:', selectedDevices.value);
  // Placeholder for future implementation
}

function viewOnMap() {
  console.log('Ver en mapa los dispositivos:', selectedDevices.value);
  // Placeholder for future implementation
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

<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-full">
    <!-- Main Content Area -->
    <main class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <!-- Inlined UserGroupIcon -->
          <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <h2 class="text-xl font-bold text-slate-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <button @click="openWizard" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
            {{ createButtonText }}
          </button>
          <div class="relative w-64">
            <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
            <!-- Inlined SearchIcon -->
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Loading and Error States -->
      <div v-if="isLoading" class="text-center text-slate-500 py-4">Cargando...</div>
      <div v-else-if="error" class="text-center text-red-500 py-4">{{ error }}</div>

      <!-- The integrated table component -->
      <div v-else>
        <ClientesTable
            :data="items"
            @edit-item="openEditModal"
            @delete-item="openDeleteConfirmation"
        />
        <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-slate-500">
                <span>Mostrar</span>
                <select v-model="pageSize" class="rounded-md border-slate-300 text-sm focus:ring-sky-500 focus:border-sky-500">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
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

    <!-- Modals -->
    <EntityModal :visible="isModalVisible" :title="modalTitle" :save-text="saveButtonText" @close="closeModal" @save="handleSave">
      <ClienteForm ref="clienteFormRef" :initial-data="editingItem" :errors="errors" />
    </EntityModal>

    <!-- Client Wizard Overlay -->
    <transition name="fade">
      <div v-if="isWizardVisible" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeWizard"></div>

        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <ClientWizard @close="closeWizard" @refresh="handleWizardRefresh" class="relative transform rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl" />
        </div>
      </div>
    </transition>

    <ConfirmationModal :visible="isConfirmationVisible" @cancel="closeDeleteConfirmation" @confirm="confirmDelete" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClientesPage } from '@/components/ClientesPage/composables/useClientesPage'
import ClientesTable from '@/components/ClientesPage/components/ClientesTable.vue'
import EntityModal from '@/components/ClientesPage/components/EntityModal.vue'
import ConfirmationModal from '@/components/ClientesPage/components/ConfirmationModal.vue'
import ClienteForm from '@/components/ClientesPage/components/ClientesForm.vue'
import ClientWizard from '@/components/ClientesPage/components/ClientWizard.vue'
import Pagination from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/Pagination.vue';

const {
  items,
  editingItem,
  isModalVisible,
  isWizardVisible,
  isConfirmationVisible,
  isLoading,
  error,
  errors,
  pageTitle,
  createButtonText,
  modalTitle,
  saveButtonText,
  searchQuery,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  handlePageChange,
  openWizard,
  closeWizard,
  openEditModal,
  closeModal,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  saveItem,
  confirmDelete,
  handleSearch,
} = useClientesPage()

const clienteFormRef = ref(null)

async function handleSave() {
  if (clienteFormRef.value) {
    await saveItem(clienteFormRef.value.getData())
  }
}

function handleWizardRefresh() {
  // Query invalidation is handled in ClientWizard
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

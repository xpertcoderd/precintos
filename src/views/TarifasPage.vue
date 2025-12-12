<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-full">
    
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
       <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">
         <!-- Icon matching the design hint -->
         <svg class="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
         Configuración de Tarifas
       </h2>
       <div class="w-full md:w-auto relative">
         <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Search..." class="w-full md:w-64 pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white">
         <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
       </div>
    </div>

    <!-- Section 1: Creation Form (Inline) -->
    <section class="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-100">
      <h3 class="text-lg font-bold text-slate-800 mb-6">Creación de Tarifas</h3>
      
      <TarifaForm
        ref="tarifaFormRef"
        :existing-tariffs="items"
        :initial-data="editingItem"
        :origin-places="originPlaces"
        :destination-places="destinationPlaces"
        :transfer-types="transferTypes"
        :tariff-types="tariffTypes"
        :errors="errors"
      />

      <div class="flex justify-end mt-6">
        <button 
          @click="handleSave"
          :disabled="isLoading || (tarifaFormRef && tarifaFormRef.duplicateError)"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ saveButtonText }}
          </button>
        <button v-if="editingItem" @click="cancelEdit" class="ml-3 px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
            Cancelar
        </button>
      </div>
    </section>

    <!-- Section 2: List -->
    <section class="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <h3 class="text-lg font-bold text-slate-800 mb-6">Lista de Tarifas creadas</h3>

       <div v-if="isLoading && !items.length" class="text-center text-slate-500 py-4">Cargando...</div>
       <div v-else-if="error" class="text-center text-red-500 py-4">{{ error }}</div>
       
       <TarifasTable
          v-else
          :data="items"
          @edit-item="startEdit"
          @delete-item="openDeleteConfirmation"
       />
    </section>

    <!-- Modals (Only Delete needed now) -->
    <ConfirmationModal :visible="isConfirmationVisible" @cancel="closeDeleteConfirmation" @confirm="confirmDelete" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTarifasPage } from '@/components/TarifasPage/composables/useTarifasPage'
import TarifasTable from '@/components/TarifasPage/components/TarifasTable.vue'
import ConfirmationModal from '@/components/TarifasPage/components/ConfirmationModal.vue'
import TarifaForm from '@/components/TarifasPage/components/TarifaForm.vue'

const {
  items,
  originPlaces,
  destinationPlaces,
  transferTypes,
  tariffTypes,
  editingItem,
  // isModalVisible, // Not used for Create anymore
  isConfirmationVisible,
  isLoading,
  error,
  errors,
  // pageTitle,
  // createButtonText,
  // modalTitle,
  saveButtonText,
  searchQuery,
  // openCreateModal,
  // openEditModal, // Renamed logic
  // closeModal,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  saveItem,
  confirmDelete,
  handleSearch,
} = useTarifasPage()

const tarifaFormRef = ref(null)

// Proxy methods to match the new inline flow
const startEdit = (item) => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Set editing item (this should propagate to form via props)
    editingItem.value = { ...item }; 
}

const cancelEdit = () => {
    editingItem.value = null;
    errors.value = {};
    if (tarifaFormRef.value) {
        // Reset form manually if needed or rely on watcher
        tarifaFormRef.value.formData = { 
            name: '', price: 0, transferTypeId: null, tariffTypeId: null, 
            originId: null, destinationId: null, 
            distanceFreeKm: 0, distanceOffsetKm: 0, distanceOffsetCost: 0, 
            shortTripKm: 0 
        };
    }
}

async function handleSave() {
  if (tarifaFormRef.value) {
    await saveItem(tarifaFormRef.value.formData)
    // On success, reset (handled invide saveItem or here)
    if (!editingItem.value && !Object.keys(errors.value).length) {
       // Clear form if it was a create
        tarifaFormRef.value.formData = { 
            name: '', price: 0, transferTypeId: null, tariffTypeId: null, 
            originId: null, destinationId: null, 
            distanceFreeKm: 0, distanceOffsetKm: 0, distanceOffsetCost: 0, 
            shortTripKm: 0 
        };
    }
  }
}
</script>

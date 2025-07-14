<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-full">
    <!-- Tabs -->
    <div class="flex border-b border-slate-200 mb-6">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
              :class="[
                'px-4 py-3 text-sm font-medium -mb-px',
                activeTab === tab ? 'border-b-2 border-sky-500 text-sky-600' : 'text-slate-500 hover:text-slate-800'
              ]">
        {{ tab }}
      </button>
    </div>

    <!-- Main Content Area -->
    <main class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <TruckIcon class="w-6 h-6 text-sky-600" />
          <h2 class="text-xl font-bold text-slate-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <button @click="openCreateModal" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
            {{ createButtonText }}
          </button>
          <div class="relative w-64">
            <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      <!-- The integrated table component -->
      <TransportistaTable :data="drivers" />

    </main>

    <!-- The Modal Component -->
    <EntityModal :visible="isModalVisible" :title="modalTitle" :save-text="saveButtonText" @close="closeModal" @save="handleSave">
      <TransportistaForm v-if="activeEntity === 'Transportista'" />
      <ChoferForm v-if="activeEntity === 'Chofer'" />
      <CamionForm v-if="activeEntity === 'Camión'" />
    </EntityModal>
  </div>
</template>

<script setup>
// Import all the new, clean pieces
import {useTransportistaPage} from "@/components/TransportistaPage/composables/useTransportista";
import EntityModal from "@/components/TransportistaPage/components/EntityModal.vue";
import TransportistaForm from "@/components/TransportistaPage/components/TransportistaForm.vue";
import ChoferForm from "@/components/TransportistaPage/components/ChoferForm.vue";
import CamionForm from "@/components/TransportistaPage/components/CamionForm.vue";
import SearchIcon from "@/components/Internal/Menu/Frames/Pages/PanelPrincipal/icons/SearchIcon.vue";
import TruckIcon from "@/components/Internal/Menu/icons/TruckIcon.vue";
import TransportistaTable from "@/components/TransportistaPage/components/TransportistaTable.vue";


// Use the composable to get all state and logic
const {
  tabs,
  activeTab,
  drivers,
  isModalVisible,
  pageTitle,
  activeEntity,
  createButtonText,
  modalTitle,
  saveButtonText,
  openCreateModal,
  closeModal,
} = useTransportistaPage();

const handleSave = () => {
  console.log(`Saving ${activeEntity.value}...`);
  // Add save logic here
  closeModal();
};
</script>

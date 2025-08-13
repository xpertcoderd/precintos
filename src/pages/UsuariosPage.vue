<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-full">
    <!-- Main Content Area -->
    <main class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <!-- Inlined UsersIcon -->
          <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197"></path></svg>
          <h2 class="text-xl font-bold text-slate-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <button @click="openCreateModal" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
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
      <UsuariosTable
          v-else
          :data="items"
          @edit-item="openEditModal"
          @delete-item="openDeleteConfirmation"
      />
    </main>

    <!-- Modals -->
    <EntityModal :visible="isModalVisible" :title="modalTitle" :save-text="saveButtonText" @close="closeModal" @save="handleSave">
      <UsuarioForm ref="usuarioFormRef" :initial-data="editingItem" :roles="roles" :errors="errors" />
    </EntityModal>

    <ConfirmationModal :visible="isConfirmationVisible" @cancel="closeDeleteConfirmation" @confirm="confirmDelete" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsuariosPage } from '@/components/UsuariosPage/composables/useUsuariosPage'
import UsuariosTable from '@/components/UsuariosPage/components/UsuariosTable.vue'
import EntityModal from '@/components/UsuariosPage/components/EntityModal.vue'
import ConfirmationModal from '@/components/UsuariosPage/components/ConfirmationModal.vue'
import UsuarioForm from '@/components/UsuariosPage/components/UsuarioForm.vue'

const {
  items,
  roles,
  editingItem,
  isModalVisible,
  isConfirmationVisible,
  isLoading,
  error,
  errors,
  pageTitle,
  createButtonText,
  modalTitle,
  saveButtonText,
  searchQuery,
  openCreateModal,
  openEditModal,
  closeModal,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  saveItem,
  confirmDelete,
  handleSearch,
} = useUsuariosPage()

const usuarioFormRef = ref(null)

async function handleSave() {
  if (usuarioFormRef.value) {
    await saveItem(usuarioFormRef.value.formData)
  }
}
</script>

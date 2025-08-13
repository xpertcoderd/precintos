import { ref, computed } from 'vue';

// Mock data to simulate the original state
const mockDispositivos = [
  { id: 1, nombre: 'Dispositivo Alpha', serial: 'SN-ALPHA-001', imei: '123456789012345' },
  { id: 2, nombre: 'Dispositivo Beta', serial: 'SN-BETA-002', imei: '543210987654321' },
  { id: 3, nombre: 'Dispositivo Gamma', serial: 'SN-GAMMA-003', imei: '987654321012345' },
];

export function useDispositivoPage() {
  const items = ref([...mockDispositivos]);
  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  const pageTitle = 'Gestionar Dispositivos';
  const createButtonText = 'Crear Dispositivo';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Dispositivo' : 'Crear Nuevo Dispositivo'
  );
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  // This function can be used to reset the data or for future use.
  async function fetchItems() {
    isLoading.value = true;
    error.value = null;
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    items.value = [...mockDispositivos]; // Reset to mock data
    isLoading.value = false;
  }

  function openCreateModal() {
    editingItem.value = null;
    errors.value = {};
    isModalVisible.value = true;
  }

  function openEditModal(item) {
    editingItem.value = { ...item };
    errors.value = {};
    isModalVisible.value = true;
  }

  function closeModal() {
    isModalVisible.value = false;
    editingItem.value = null;
  }

  function openDeleteConfirmation(item) {
    itemToDelete.value = item;
    isConfirmationVisible.value = true;
  }

  function closeDeleteConfirmation() {
    isConfirmationVisible.value = false;
    itemToDelete.value = null;
  }

  async function saveItem(formData) {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    if (editingItem.value) {
      // Update existing item
      const index = items.value.findIndex(i => i.id === editingItem.value.id);
      if (index !== -1) {
        items.value[index] = { ...editingItem.value, ...formData };
      }
    } else {
      // Create new item
      const newItem = {
        id: Date.now(), // Simple unique ID
        ...formData,
      };
      items.value.push(newItem);
    }
    
    isLoading.value = false;
    closeModal();
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const index = items.value.findIndex(i => i.id === itemToDelete.value.id);
    if (index !== -1) {
      items.value.splice(index, 1);
    }

    isLoading.value = false;
    closeDeleteConfirmation();
  }

  return {
    items,
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
    fetchItems,
    openCreateModal,
    openEditModal,
    closeModal,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saveItem,
    confirmDelete,
  };
}

import { ref, computed } from 'vue';

// Mock data to simulate the original state
const mockClientes = [
  { id: 1, name: 'Industrias Acme', rnc: '101-12345-6', address: 'Av. Principal 123', phone: '809-555-1234' },
  { id: 2, name: 'Comercial Global', rnc: '101-65432-1', address: 'Calle Secundaria 456', phone: '809-555-5678' },
];

export function useClientesPage() {
  const items = ref([...mockClientes]);
  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  const pageTitle = 'Gestionar Clientes';
  const createButtonText = 'Crear Cliente';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Cliente' : 'Crear Nuevo Cliente'
  );
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  async function fetchItems() {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 200));
    items.value = [...mockClientes];
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
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingItem.value) {
      const index = items.value.findIndex(i => i.id === editingItem.value.id);
      if (index !== -1) {
        items.value[index] = { ...editingItem.value, ...formData };
      }
    } else {
      const newItem = { id: Date.now(), ...formData };
      items.value.push(newItem);
    }
    
    isLoading.value = false;
    closeModal();
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    
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

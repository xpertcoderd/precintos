import { ref, computed } from 'vue';

// --- Mock Data --- //
const mockTarifas = [
  {
    id: 1,
    name: 'Tarifa General',
    price: 1500,
    transferTypeId: 1,
    tariffTypeId: 1,
    originId: 1,
    destinationId: 2,
  },
  {
    id: 2,
    name: 'Tarifa Express',
    price: 2500,
    transferTypeId: 2,
    tariffTypeId: 1,
    originId: 1,
    destinationId: 3,
  },
];

const mockTransferTypes = [
  { id: 1, name: 'Normal' },
  { id: 2, name: 'Express' },
];

const mockTariffTypes = [
  { id: 1, name: 'Por Viaje', description: 'STANDARD' },
  { id: 2, name: 'Por Hora', description: 'HOURLY' },
  { id: 3, name: 'Por Distancia', description: 'BY_DISTANCE' },
  { id: 4, name: 'Viaje Corto Fijo', description: 'FIXED_SHORT' },
];

const mockPlaces = [
  { id: 1, name: 'Almacén Central' },
  { id: 2, name: 'Puerto Caucedo' },
  { id: 3, name: 'Zona Franca Las Américas' },
];
// --- End Mock Data --- //

export function useTarifasPage() {
  const items = ref([...mockTarifas]);
  const transferTypes = ref([...mockTransferTypes]);
  const tariffTypes = ref([...mockTariffTypes]);
  const places = ref([...mockPlaces]);

  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  const pageTitle = 'Gestionar Tarifas';
  const createButtonText = 'Crear Tarifa';
  const modalTitle = computed(() => (editingItem.value ? 'Editar Tarifa' : 'Crear Nueva Tarifa'));
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  async function fetchAllData() {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 200));
    items.value = [...mockTarifas];
    transferTypes.value = [...mockTransferTypes];
    tariffTypes.value = [...mockTariffTypes];
    places.value = [...mockPlaces];
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
    // Related data needed by the form
    transferTypes,
    tariffTypes, // This was the missing piece
    places,
    // Methods
    fetchAllData,
    openCreateModal,
    openEditModal,
    closeModal,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saveItem,
    confirmDelete,
  };
}

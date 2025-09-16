import { ref, computed } from 'vue';
import { useNotifications } from '@/composables/useNotifications';

// Mock data to simulate the original state
const mockSolicitudes = [
  {
    id: 1,
    cliente: 'Cliente Corp',
    origen: 'Almacén Principal',
    destino: 'Sucursal Centro',
    fecha: '2023-10-27',
    estado: 'Pendiente',
  },
  {
    id: 2,
    cliente: 'Negocios S.A.',
    origen: 'Puerto Seco',
    destino: 'Zona Franca',
    fecha: '2023-10-26',
    estado: 'Completada',
  },
];

export function useSolicitudesPage() {
  const { sendNotification } = useNotifications();
  const items = ref([...mockSolicitudes]);
  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  const pageTitle = 'Gestionar Solicitudes';
  const createButtonText = 'Crear Solicitud';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Solicitud' : 'Crear Nueva Solicitud'
  );
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  async function fetchItems() {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 200));
    items.value = [...mockSolicitudes];
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
        sendNotification('Solicitud actualizada con éxito', 'success');
      }
    } else {
      const newItem = { id: Date.now(), ...formData, estado: 'Pendiente' };
      items.value.push(newItem);
      sendNotification('Solicitud creada con éxito', 'success');
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
      sendNotification('Solicitud eliminada con éxito', 'success');
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

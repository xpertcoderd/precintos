import { ref, watch } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { devicesAll } from '@/components/conexion/DataConector.js';

export function useDispositivoPage() {
  const { sendNotification } = useNotifications();
  const items = ref([]);
  const isModalVisible = ref(false);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  // Pagination state
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);
  const pageSize = ref(20); // Default page size

  const pageTitle = 'Gestionar Dispositivos';
  const createButtonText = 'Crear Dispositivo';
  const modalTitle = 'Crear Nuevo Dispositivo';
  const saveButtonText = 'Crear';

  async function fetchItems(page = 1) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await devicesAll({ page: page, pageSize: pageSize.value });
      if (response && response.success) {
        items.value = response.data.devices;
        totalItems.value = response.data.total;
        totalPages.value = Math.ceil(response.data.total / response.data.pageSize);
        currentPage.value = response.data.page;
      } else {
        const errorMessage = 'Error al cargar los dispositivos.';
        error.value = errorMessage;
        sendNotification(errorMessage, 'error');
        items.value = [];
      }
    } catch (err) {
      const errorMessage = `Error al cargar los dispositivos: ${err.message}`;
      error.value = errorMessage;
      sendNotification(errorMessage, 'error');
      items.value = [];
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  function openCreateModal() {
    errors.value = {};
    isModalVisible.value = true;
  }

  function closeModal() {
    isModalVisible.value = false;
  }

  async function saveItem() {
    // TODO: Implement the actual API call for creating a device
    sendNotification('Funcionalidad de creación no implementada con API real.', 'warning');
    // Example of what it might look like:
    // const response = await createDevice(formData);
    // if (response.success) {
    //   sendNotification('Dispositivo creado con éxito', 'success');
    //   await fetchItems(currentPage.value); // Refresh the list
    //   closeModal();
    // } else {
    //   sendNotification('Error al crear el dispositivo', 'error');
    // }
    closeModal();
  }

  // Watch for page changes and fetch data
  watch(currentPage, (newPage) => {
    fetchItems(newPage);
  });

  return {
    items,
    isModalVisible,
    isLoading,
    error,
    errors,
    pageTitle,
    createButtonText,
    modalTitle,
    saveButtonText,
    // Pagination
    currentPage,
    totalPages,
    totalItems,
    fetchItems,
    // Methods
    openCreateModal,
    closeModal,
    saveItem,
  };
}

import { ref, watch } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { devicesAll } from '@/components/conexion/DataConector.js';

// Maps backend parameter names to user-friendly labels
const filterOptions = [
  { label: 'Device ID', value: 'deviceid' },
  { label: 'ID', value: 'ids' },
  { label: 'Source ID', value: 'sourceId' },
  { label: 'Group ID', value: 'groupId' },
  { label: 'Model', value: 'model' },
  { label: 'Phone', value: 'phone' },
  { label: 'Tail Number', value: 'tailDeviceid' }, // Corrected from tailNumber
];

export function useDispositivoPage() {
  const { sendNotification } = useNotifications();
  const items = ref([]);
  const isModalVisible = ref(false);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  // --- State for Pagination, Filtering, and Search ---
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);
  const pageSize = ref(10);
  const activeFilters = ref([]); // This will hold our array of filter tags
  const debounceTimer = ref(null);

  const pageTitle = 'Gestionar Dispositivos';
  const createButtonText = 'Crear Dispositivo';
  const modalTitle = 'Crear Nuevo Dispositivo';
  const saveButtonText = 'Crear';

  async function fetchItems(page = 1) {
    isLoading.value = true;
    error.value = null;

    // Build params from the activeFilters array
    const searchParams = activeFilters.value.reduce((params, filter) => {
      params[filter.key] = filter.value;
      return params;
    }, {});

    const params = {
      page: page,
      pageSize: pageSize.value,
      ...searchParams,
    };

    try {
      const response = await devicesAll(params);
      if (response && response.success) {
        items.value = response.data.devices;
        totalItems.value = response.data.total;
        totalPages.value = Math.ceil(response.data.total / response.data.pageSize);
        currentPage.value = response.data.page;
      } else {
        items.value = [];
        totalItems.value = 0;
        totalPages.value = 1;
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
    sendNotification('Funcionalidad de creación no implementada con API real.', 'warning');
    closeModal();
  }

  // --- Watchers for reactivity ---
  watch([currentPage, pageSize], ([newPage], [oldPage]) => {
    if (newPage !== oldPage) fetchItems(newPage);
    else fetchItems(1);
  });

  watch(activeFilters, () => {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
      fetchItems(1);
    }, 500);
  }, { deep: true }); // Use deep watch for the array of objects

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
    pageSize,
    // Filtering
    activeFilters,
    filterOptions,
    fetchItems,
    // Methods
    openCreateModal,
    closeModal,
    saveItem,
  };
}

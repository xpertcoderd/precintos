import { ref, watch, computed } from 'vue';
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
  const pageSize = ref(10);

  // Client-side filtering state
  const searchQuery = ref('');
  const selectedGroup = ref('All');

  const pageTitle = 'Gestionar Dispositivos';
  const createButtonText = 'Crear Dispositivo';
  const modalTitle = 'Crear Nuevo Dispositivo';
  const saveButtonText = 'Crear';

  // Compute unique groups for the filter dropdown
  const uniqueGroups = computed(() => {
    const groups = new Set(items.value.map(item => item.group.title));
    return ['All', ...Array.from(groups)];
  });

  // Computed property to filter items based on search and group selection
  const filteredItems = computed(() => {
    let filtered = items.value;

    // Filter by selected group
    if (selectedGroup.value && selectedGroup.value !== 'All') {
      filtered = filtered.filter(item => item.group.title === selectedGroup.value);
    }

    // Filter by search query
    if (searchQuery.value) {
      const lowerCaseQuery = searchQuery.value.toLowerCase();
      filtered = filtered.filter(item => {
        return (
          item.device.label.toLowerCase().includes(lowerCaseQuery) ||
          item.device.deviceid.toLowerCase().includes(lowerCaseQuery) ||
          item.group.title.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }

    return filtered;
  });

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
    sendNotification('Funcionalidad de creación no implementada con API real.', 'warning');
    closeModal();
  }

  watch(currentPage, (newPage) => {
    fetchItems(newPage);
  });

  watch(pageSize, () => {
    fetchItems(1);
  });

  return {
    items,
    filteredItems, // Expose filtered items
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
    searchQuery,
    selectedGroup,
    uniqueGroups,
    fetchItems,
    // Methods
    openCreateModal,
    closeModal,
    saveItem,
  };
}

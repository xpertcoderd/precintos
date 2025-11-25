import { ref, watch, reactive } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { getDevicesFiltered } from '@/services/deviceService';

const filterOptions = [
  { label: 'Device ID', value: 'ids' },
  { label: 'Source ID', value: 'sourceId' },
  { label: 'Group ID', value: 'groupId' },
  { label: 'Model', value: 'model' },
  { label: 'Phone', value: 'phone' },
  { label: 'Tail Number', value: 'tailDeviceid' },
];

export function useDispositivoPage() {
  const { sendNotification } = useNotifications();
  const items = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // --- State for Pagination, Filtering, and Search ---
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);
  const pageSize = ref(10);

  const filters = reactive({});
  filterOptions.forEach(opt => filters[opt.value] = ref('').value);

  const debounceTimer = ref(null);

  const pageTitle = 'Gestionar Dispositivos';

  async function fetchItems(page = 1) {
    isLoading.value = true;
    error.value = null;

    const params = {
      page: page,
      pageSize: pageSize.value,
    };

    // Add individual filter values to params if they exist
    for (const key in filters) {
      if (filters[key]) {
        params[key] = filters[key];
      }
    }

    try {
      const response = await getDevicesFiltered(params);
      // response is already the data object from axios interceptor
      if (response && response.success && response.data) {
        items.value = response.data.devices || [];
        totalItems.value = response.data.total || 0;
        totalPages.value = Math.ceil((response.data.total || 0) / (response.data.pageSize || 1)) || 1;
        currentPage.value = response.data.page || 1;
      } else {
        items.value = [];
        totalItems.value = 0;
        totalPages.value = 1;
        currentPage.value = 1;
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

  function triggerFetchWithDebounce() {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
      fetchItems(1); // Reset to first page on new search
    }, 500);
  }

  // --- Watchers for reactivity ---
  watch([currentPage, pageSize], ([newPage]) => {
    fetchItems(newPage);
  });

  watch(filters, () => {
    triggerFetchWithDebounce();
  }, { deep: true });

  return {
    items,
    isLoading,
    error,
    pageTitle,
    // Pagination
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    // Individual Filters
    filters,
    filterOptions, // Still useful for displaying labels
    // Methods
    fetchItems,
    handlePageChange: (page) => currentPage.value = page,
  };
}

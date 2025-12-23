import { ref, computed, watch } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { useTransfers } from '@/composables/useTransfers';

export function useSolicitudesPage(timeWindowHours) {
  const { sendNotification } = useNotifications();

  // Pagination State
  const currentPage = ref(1);
  const pageSize = ref(10);

  // Query Params
  const params = computed(() => ({
    page: currentPage.value,
    pageSize: pageSize.value,
    timeWindowHours: timeWindowHours.value,
    sortBy: 'transferStateId',
    sortDir: 'asc',
  }));

  // Use Vue Query
  const { data: queryData, isLoading: isQueryLoading, isError, error: queryError, refetch } = useTransfers(params);

  // Local state for UI manipulation (mock support)
  const items = ref([]);
  const totalItems = ref(0);
  const totalPages = ref(1);

  // Sync Query Data to Local State
  watch(queryData, (newData) => {
    if (newData && newData.success && newData.data) {
      // Sort: Pending (1) first, then others. Within each group (and generally), sort by date descending.
      // Since API already sorts by status ASC (1, 2, 3...), we mainly need to ensure date sorting.
      // Although API handles status sort, we reinforce it here and apply date sort.

      const sortedTransfers = [...newData.data.transfers].sort((a, b) => {
        const stateA = a.transfer.transferStateId;
        const stateB = b.transfer.transferStateId;

        // Primary Sort: Pending (1) first
        // Note: The API 'asc' sort on transferStateId should already put 1s first.
        // We replicate this logic to be safe and handle mixed client-side state if needed.
        if (stateA === 1 && stateB !== 1) return -1;
        if (stateA !== 1 && stateB === 1) return 1;

        // Determine if we are comparing two Pending items or two Non-Pending items (or mixed non-pending)
        // Secondary Sort: Date Descending (Newest first)
        const dateA = new Date(a.transfer.timeRequest).getTime();
        const dateB = new Date(b.transfer.timeRequest).getTime();

        return dateB - dateA;
      });

      items.value = sortedTransfers;
      totalItems.value = newData.data.total;
      totalPages.value = Math.ceil(newData.data.total / newData.data.pageSize);
    }
  }, { immediate: true });

  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isActionLoading = ref(false); // For save/delete actions
  const errors = ref({});

  const isLoading = computed(() => isQueryLoading.value || isActionLoading.value);
  const error = computed(() => isError.value ? (queryError.value?.message || 'No se pudieron cargar las solicitudes.') : null);

  const pageTitle = 'Gestionar Solicitudes';
  const createButtonText = 'Crear Solicitud';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Solicitud' : 'Crear Nueva Solicitud'
  );
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  function handlePageChange(newPage) {
    currentPage.value = newPage;
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
    isActionLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingItem.value) {
      const index = items.value.findIndex(i => i.transfer.id === editingItem.value.transfer.id);
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...formData };
        sendNotification('Solicitud actualizada con éxito', 'success');
      }
    } else {
      const newItem = { transfer: { id: Date.now(), ...formData }, containerCount: 0 };
      items.value.push(newItem);
      sendNotification('Solicitud creada con éxito', 'success');
    }

    isActionLoading.value = false;
    closeModal();
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isActionLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = items.value.findIndex(i => i.transfer.id === itemToDelete.value.transfer.id);
    if (index !== -1) {
      items.value.splice(index, 1);
      sendNotification('Solicitud eliminada con éxito', 'success');
    }

    isActionLoading.value = false;
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
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    handlePageChange,
    openCreateModal,
    openEditModal,
    closeModal,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saveItem,
    confirmDelete,
    fetchItems: refetch,
  };
}

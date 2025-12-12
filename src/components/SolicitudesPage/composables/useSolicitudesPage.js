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
  }));

  // Use Vue Query
  const { data: queryData, isLoading: isQueryLoading, isError, error: queryError, refetch } = useTransfers(params);

  // Local state for UI manipulation (mock support)
  const items = ref([]);
  const totalItems = ref(0);
  const totalPages = ref(1);

  // Sync Query Data to Local State
  // Sync Query Data to Local State
  watch(queryData, (newData) => {
    if (newData && newData.success && newData.data) {
      items.value = [...newData.data.transfers]; // Create a copy for local mutation
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

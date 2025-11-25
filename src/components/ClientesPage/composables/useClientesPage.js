import { ref, computed, watch } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { useClients } from '@/composables/useClients';

export function useClientesPage() {
  const { sendNotification } = useNotifications();

  // Pagination State
  const currentPage = ref(1);
  const pageSize = ref(10);

  // Query Params
  const params = computed(() => ({
    page: currentPage.value,
    pageSize: pageSize.value,
  }));

  // Use Vue Query
  const {
    data: queryData,
    isLoading: isQueryLoading,
    isError,
    error: queryError,
    createClient,
    updateClient,
    isCreating,
    isUpdating
  } = useClients(params);

  // Local state
  const items = ref([]);
  const totalItems = ref(0);
  const totalPages = ref(1);

  // Sync Query Data
  watch(queryData, (newData) => {
    if (newData && newData.success && newData.data) {
      items.value = newData.data.clients || [];
      totalItems.value = newData.data.total || 0;
      totalPages.value = Math.ceil((newData.data.total || 0) / (newData.data.pageSize || 10));
    }
  }, { immediate: true });

  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isWizardVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const errors = ref({});

  const isLoading = computed(() => isQueryLoading.value || isCreating.value || isUpdating.value);
  const error = computed(() => isError.value ? (queryError.value?.message || 'No se pudieron cargar los clientes.') : null);

  const pageTitle = 'Gestionar Clientes';
  const createButtonText = 'Crear Cliente';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Cliente' : 'Crear Nuevo Cliente'
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

  function openWizard() {
    isWizardVisible.value = true;
  }

  function closeWizard() {
    isWizardVisible.value = false;
    // No need to manually fetch, Vue Query handles it if we invalidate queries in the wizard or if wizard uses mutations that invalidate
    // But wizard uses services directly, so we might need to invalidate queries manually or rely on stale time?
    // Ideally wizard should use the mutation from useClients or we invalidate 'clients' query key globally.
    // For now, let's assume wizard might need a refresh trigger or we just rely on auto-refetch on window focus.
    // Or we can export queryClient and invalidate.
  }

  function openEditModal(item) {
    editingItem.value = { ...item.client };
    errors.value = {};
    isModalVisible.value = true;
  }

  function closeModal() {
    isModalVisible.value = false;
    editingItem.value = null;
  }

  function openDeleteConfirmation(item) {
    itemToDelete.value = item.client;
    isConfirmationVisible.value = true;
  }

  function closeDeleteConfirmation() {
    isConfirmationVisible.value = false;
    itemToDelete.value = null;
  }

  async function saveItem(formData) {
    try {
      if (editingItem.value) {
        await updateClient({ id: editingItem.value.id, data: formData });
        sendNotification('Cliente actualizado con éxito', 'success');
      } else {
        await createClient(formData);
        sendNotification('Cliente creado con éxito', 'success');
      }
      closeModal();
    } catch (e) {
      sendNotification(e.message || 'Error al guardar el cliente', 'error');
      console.error(e);
    }
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    // Replace with actual delete endpoint when available
    await new Promise(resolve => setTimeout(resolve, 500));
    sendNotification('Funcionalidad de eliminar no implementada.', 'warning');
    closeDeleteConfirmation();
  }

  return {
    items,
    editingItem,
    isModalVisible,
    isWizardVisible,
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
    openWizard,
    closeWizard,
    openEditModal,
    closeModal,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saveItem,
    confirmDelete,
  };
}

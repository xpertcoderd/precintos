import { ref, computed, onMounted, watch } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { clients_filtered, clients_create, clients_update } from '@/components/conexion/DataConector';

export function useClientesPage() {
  const { sendNotification } = useNotifications();
  const items = ref([]);
  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});

  // Pagination State
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);
  const pageSize = ref(10);

  const pageTitle = 'Gestionar Clientes';
  const createButtonText = 'Crear Cliente';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Cliente' : 'Crear Nuevo Cliente'
  );
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  async function fetchItems(page = 1) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await clients_filtered({ page, pageSize: pageSize.value });
      if (response.success) {
        items.value = response.data.clients;
        totalItems.value = response.data.total;
        totalPages.value = Math.ceil(response.data.total / response.data.pageSize);
        currentPage.value = response.data.page;
      } else {
        throw new Error('Failed to fetch clients');
      }
    } catch (e) {
      error.value = 'No se pudieron cargar los clientes. Por favor, intente de nuevo.';
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  function handlePageChange(newPage) {
    currentPage.value = newPage;
  }

  function openCreateModal() {
    editingItem.value = null;
    errors.value = {};
    isModalVisible.value = true;
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
    isLoading.value = true;
    try {
      let response;
      if (editingItem.value) {
        response = await clients_update(editingItem.value.id, formData);
      } else {
        response = await clients_create(formData);
      }

      if (response.success) {
        sendNotification(`Cliente ${editingItem.value ? 'actualizado' : 'creado'} con éxito`, 'success');
        fetchItems(currentPage.value);
      } else {
        throw new Error(response.message || 'Error al guardar el cliente');
      }
    } catch (e) {
      sendNotification(e.message, 'error');
      console.error(e);
    } finally {
      isLoading.value = false;
      closeModal();
    }
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isLoading.value = true;
    // Replace with actual delete endpoint when available
    await new Promise(resolve => setTimeout(resolve, 500));
    sendNotification('Funcionalidad de eliminar no implementada.', 'warning');
    isLoading.value = false;
    closeDeleteConfirmation();
  }

  watch([currentPage, pageSize], () => {
    fetchItems(currentPage.value);
  });

  onMounted(() => fetchItems(1));

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
    fetchItems,
    handlePageChange,
    openCreateModal,
    openEditModal,
    closeModal,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saveItem,
    confirmDelete,
  };
}

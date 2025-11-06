import { ref, computed, onMounted, watch } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import {transfers_filtered_summary} from '@/components/conexion/DataConector';

export function useSolicitudesPage(timeWindowHours) {
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

  const pageTitle = 'Gestionar Solicitudes';
  const createButtonText = 'Crear Solicitud';
  const modalTitle = computed(() =>
    editingItem.value ? 'Editar Solicitud' : 'Crear Nueva Solicitud'
  );
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  async function fetchItems(page = 1) {
    isLoading.value = true;
    error.value = null;
    try {
      const params = {
        page,
        pageSize: pageSize.value,
        timeWindowHours: timeWindowHours.value,
      };
      const response = await transfers_filtered_summary(params);
      if (response.success) {
        items.value = response.data.transfers;
        totalItems.value = response.data.total;
        totalPages.value = Math.ceil(response.data.total / response.data.pageSize);
        currentPage.value = response.data.page;
      } else {
        throw new Error('Failed to fetch solicitations');
      }
    } catch (e) {
      error.value = 'No se pudieron cargar las solicitudes. Por favor, intente de nuevo.';
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

    isLoading.value = false;
    closeModal();
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = items.value.findIndex(i => i.transfer.id === itemToDelete.value.transfer.id);
    if (index !== -1) {
      items.value.splice(index, 1);
      sendNotification('Solicitud eliminada con éxito', 'success');
    }

    isLoading.value = false;
    closeDeleteConfirmation();
  }

  watch([currentPage, pageSize, timeWindowHours], () => {
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

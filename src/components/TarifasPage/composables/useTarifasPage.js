import { ref, computed, onMounted } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { useTariffs } from '@/composables/useTariffs';
import { getStartPlacePoints, getEndPlacePoints } from '@/services/placeService';
import { decodeBase64Token } from '@/utils/authUtils';
import Cookies from 'js-cookie';

export function useTarifasPage() {
  const { sendNotification } = useNotifications();

  // Destructure the hooks from the main composable
  const {
    useTariffsFiltered,
    useCreateTariff,
    useUpdateTariff,
    useDeleteTariff,
    useTariffTypesFiltered,
    useTransferTypesFiltered
  } = useTariffs();

  // State
  const searchQuery = ref('');
  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const error = ref(null); // Global error state if needed
  const errors = ref({}); // Form errors



  const originPlaces = ref([]);
  const destinationPlaces = ref([]);

  // Fetch Places logic
  const fetchPlaces = async () => {
    try {
      const token = Cookies.get('userPublicInfo');
      if (!token) return;
      const session = decodeBase64Token(token);
      if (!session?.clientId) return;

      const [startRes, endRes] = await Promise.all([
        getStartPlacePoints(session.clientId),
        getEndPlacePoints(session.clientId)
      ]);

      if (startRes?.data?.success) {
        // The service returns response, interceptor usually returns response.data
        // Check structure based on analysis: api.get returns promise which resolves to response
        // If interceptor is standard:
        originPlaces.value = startRes.data.data.places || [];
      } else if (startRes?.data?.places) {
        originPlaces.value = startRes.data.places; // Adjust based on standard
      }

      // Let's assume standard Axios response for now based on previous file usage pattern
      // Actually TransferWizard fetchBrokerData checks: if (startRes?.success) ...
      // Using that pattern:
      if (startRes?.data?.success) originPlaces.value = startRes.data.data.places;
      if (endRes?.data?.success) destinationPlaces.value = endRes.data.data.places;

      // Re-reading fetchBrokerData: 
      // if (startRes?.success) initialData.startPlaces = startRes.data.places;
      // This implies getStartPlacePoints returns the data directly (intercepted).
      // Let's stick closer to that:
      if (startRes?.success) originPlaces.value = startRes.data.places;
      if (endRes?.success) destinationPlaces.value = endRes.data.places;

    } catch (e) {
      console.error('Failed to fetch places', e);
    }
  };

  onMounted(() => {
    fetchPlaces();
  });

  // Filters for the query
  const filters = computed(() => ({
    name: searchQuery.value || undefined,
  }));

  // Queries
  const {
    data: tariffsData,
    isLoading: isTariffsLoading,
    refetch: refetchTariffs
  } = useTariffsFiltered(filters);

  const { data: tariffTypesData } = useTariffTypesFiltered();
  const { data: transferTypesData } = useTransferTypesFiltered();

  // Mutations
  const createMutation = useCreateTariff();
  const updateMutation = useUpdateTariff();
  const deleteMutation = useDeleteTariff();

  // Computed Data (Enriched for Table Display)
  const items = computed(() => {
    const responseData = tariffsData.value;
    const rawItems = Array.isArray(responseData)
      ? responseData
      : (responseData?.data?.tariffs && Array.isArray(responseData.data.tariffs))
        ? responseData.data.tariffs
        : (responseData?.data && Array.isArray(responseData.data))
          ? responseData.data
          : [];
    const tTypes = tariffTypes.value || [];
    const trTypes = transferTypes.value || [];
    const origins = originPlaces.value || [];
    const destinations = destinationPlaces.value || [];

    return rawItems.map(item => ({
      ...item,
      // Enrich with nested objects if missing, for the Table to display names
      tariffType: item.tariffType || tTypes.find(t => t.id === item.tariffTypeId) || { name: 'Desconocido' },
      transferType: item.transferType || trTypes.find(t => t.id === item.transferTypeId) || { name: 'Desconocido' },
      origin: item.origin || origins.find(p => p.id === item.startPlaceId) || { name: 'N/A' },
      destination: item.destination || destinations.find(p => p.id === item.endPlaceId) || { name: 'N/A' },
    }));
  });

  const isLoading = computed(() => isTariffsLoading.value || createMutation.isPending.value || updateMutation.isPending.value || deleteMutation.isPending.value);

  // Lookups for the form
  const tariffTypes = computed(() => {
    const data = tariffTypesData.value;
    if (Array.isArray(data)) return data;
    if (data?.data?.tariffTypes && Array.isArray(data.data.tariffTypes)) return data.data.tariffTypes;
    if (data?.data && Array.isArray(data.data)) return data.data; // Fallback
    return [];
  });

  const transferTypes = computed(() => {
    const data = transferTypesData.value;
    if (Array.isArray(data)) return data;
    if (data?.data?.transferTypes && Array.isArray(data.data.transferTypes)) return data.data.transferTypes;
    if (data?.data && Array.isArray(data.data)) return data.data; // Fallback
    return [];
  });

  const pageTitle = 'Gestionar Tarifas';
  const createButtonText = 'Crear Tarifa';
  const modalTitle = computed(() => (editingItem.value ? 'Editar Tarifa' : 'Crear Nueva Tarifa'));
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  // Actions
  function handleSearch() {
    // Debouncing could be added here if not using v-model.lazy or provided by the input
    // simple ref update triggers the query watcher
  }

  function fetchAllData() {
    refetchTariffs();
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
    errors.value = {};
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
    errors.value = {};
    try {
      if (editingItem.value) {
        await updateMutation.mutateAsync({ id: editingItem.value.id, data: formData });
        sendNotification('Tarifa actualizada con éxito', 'success');
      } else {
        await createMutation.mutateAsync(formData);
        sendNotification('Tarifa creada con éxito', 'success');
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save tariff", err);
      // Assuming backend returns validation errors in err.response.data.errors
      if (err.response?.data?.errors) {
        errors.value = err.response.data.errors;
      } else {
        sendNotification('Error al guardar la tarifa', 'error');
      }
    }
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    try {
      await deleteMutation.mutateAsync(itemToDelete.value.id);
      sendNotification('Tarifa eliminada con éxito', 'success');
      closeDeleteConfirmation();
    } catch (err) {
      console.error("Failed to delete tariff", err);
      sendNotification('Error al eliminar la tarifa', 'error');
    }
  }

  return {
    items,
    editingItem,
    // isModalVisible,
    isConfirmationVisible,
    isLoading,
    error,
    errors,
    pageTitle,
    createButtonText,
    modalTitle,
    saveButtonText,
    searchQuery,
    // Related data needed by the form
    transferTypes,
    tariffTypes,
    originPlaces,
    destinationPlaces,
    // Methods
    fetchAllData,
    openCreateModal,
    openEditModal,
    closeModal,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saveItem,
    confirmDelete,
    handleSearch,
  };
}

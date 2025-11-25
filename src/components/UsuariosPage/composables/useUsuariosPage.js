import { ref, computed, onMounted } from 'vue';
import {
  users_filtered,
  create_User,
  update_Users,
  users_delete,
  rolesList,
  clientsList
} from '@/components/conexion/DataConector';

export function useUsuariosPage() {
  const items = ref([]);
  const roles = ref([]);
  const clients = ref([]);
  const editingItem = ref(null);
  const isModalVisible = ref(false);
  const isConfirmationVisible = ref(false);
  const itemToDelete = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});
  const searchQuery = ref('');

  const pageTitle = 'Gestionar Usuarios';
  const createButtonText = 'Crear Usuario';
  const modalTitle = computed(() => (editingItem.value ? 'Editar Usuario' : 'Crear Nuevo Usuario'));
  const saveButtonText = computed(() => (editingItem.value ? 'Guardar Cambios' : 'Crear'));

  const filteredItems = computed(() => {
    // Client-side filtering if needed, but API might handle it. 
    // For now, we'll keep client-side filtering on the fetched list.
    if (!searchQuery.value) {
      return items.value;
    }
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return items.value.filter(item => {
      const fullName = `${item.user.firstName} ${item.user.lastName}`.toLowerCase();
      const username = item.user.username.toLowerCase();
      return fullName.includes(lowerCaseQuery) || username.includes(lowerCaseQuery);
    });
  });

  async function fetchRoles() {
    const response = await rolesList();
    if (response.success) {
      // Assuming filtered endpoint returns { data: { roles: [...] } }
      roles.value = response.data.roles || response.data;
    } else {
      console.error('Error fetching roles:', response.message);
    }
  }

  async function fetchItems() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await users_filtered({ pageSize: 1000 }); // Fetch all for now
      if (response.success) {
        // Correctly extract the users array from the response data
        items.value = response.data.users || [];
      } else {
        error.value = response.message || 'Error al cargar usuarios';
      }
    } catch (err) {
      error.value = 'Error de conexión';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  function openCreateModal() {
    editingItem.value = null;
    errors.value = {};
    isModalVisible.value = true;
  }

  function openEditModal(item) {
    editingItem.value = { ...item.user };
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
    errors.value = {};

    try {
      let response;
      if (editingItem.value) {
        response = await update_Users(formData, editingItem.value.id);
      } else {
        response = await create_User(formData);
      }

      if (response.success) {
        await fetchItems(); // Refresh list
        closeModal();
      } else {
        // Handle validation errors if API returns them in a specific format
        // For now, just show generic error or map if possible
        if (response.errors) {
          errors.value = response.errors;
        } else {
          error.value = response.message || 'Error al guardar';
        }
      }
    } catch (err) {
      console.error(err);
      error.value = 'Ocurrió un error inesperado';
    } finally {
      isLoading.value = false;
    }
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isLoading.value = true;

    try {
      const response = await users_delete(itemToDelete.value.user.id);
      if (response.success) {
        await fetchItems();
        closeDeleteConfirmation();
      } else {
        error.value = response.message || 'Error al eliminar';
      }
    } catch (err) {
      console.error(err);
      error.value = 'Error de conexión';
    } finally {
      isLoading.value = false;
    }
  }

  function handleSearch() {
    // If server-side search is needed, implement debounced API call here
    // For now, using computed filteredItems
  }

  async function fetchClients() {
    try {
      const response = await clientsList();
      if (response.success) {
        // Flatten the clients array if it contains nested objects
        const rawClients = response.data.clients || response.data;
        clients.value = Array.isArray(rawClients)
          ? rawClients.map(item => item.client || item)
          : [];
      } else {
        console.error('Error fetching clients:', response.message);
      }
    } catch (e) {
      console.error('Error fetching clients:', e);
    }
  }

  onMounted(() => {
    fetchRoles();
    fetchClients();
    fetchItems();
  });

  return {
    items,
    roles,
    clients,
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
    searchQuery,
    filteredItems,
    fetchItems,
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

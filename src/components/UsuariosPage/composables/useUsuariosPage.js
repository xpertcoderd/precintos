import { ref, computed } from 'vue';

// Mock data simulating the nested structure from the original state
const mockUsuarios = [
  { user: { id: 1, firstName: 'Juan', lastName: 'Perez', username: 'jperez', email: 'juan.perez@example.com', rolId: 1 }, createdAt: '2023-05-10' },
  { user: { id: 2, firstName: 'Ana', lastName: 'Gomez', username: 'agomez', email: 'ana.gomez@example.com', rolId: 2 }, createdAt: '2023-06-15' },
];

export function useUsuariosPage() {
  const items = ref([...mockUsuarios]);
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

  async function fetchItems() {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 200));
    items.value = [...mockUsuarios];
    isLoading.value = false;
  }

  function openCreateModal() {
    editingItem.value = null;
    errors.value = {};
    isModalVisible.value = true;
  }

  function openEditModal(item) {
    // The form works with the nested 'user' object
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
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingItem.value) {
      const index = items.value.findIndex(i => i.user.id === editingItem.value.id);
      if (index !== -1) {
        items.value[index].user = { ...items.value[index].user, ...formData };
      }
    } else {
      const newUser = {
        user: { id: Date.now(), ...formData },
        createdAt: new Date().toISOString().split('T')[0],
      };
      items.value.push(newUser);
    }
    
    isLoading.value = false;
    closeModal();
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = items.value.findIndex(i => i.user.id === itemToDelete.value.user.id);
    if (index !== -1) {
      items.value.splice(index, 1);
    }

    isLoading.value = false;
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
  };
}

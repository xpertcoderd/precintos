import { ref, computed, watch } from 'vue';
import { transportistaService } from '../../../services/transportistaService';
import { useNotifications } from '@/composables/useNotifications';

/**
 * A composable function to manage the state and logic for the Transportista page.
 */
export function useTransportistaPage() {
    const { sendNotification } = useNotifications();
    // --- Reactive State ---
    const tabs = ref(['Transportistas', 'Choferes', 'Vehículos']);
    const activeTab = ref('Transportistas');
    const items = ref([]); // Holds the list of items for the current tab
    const carriers = ref([]); // Holds the list of all carriers for dropdowns

    // UI State
    const isModalVisible = ref(false);
    const isLoading = ref(false);
    const error = ref(null);

    // CRUD State
    const editingItem = ref(null); // Holds the item being edited, null if creating
    const modalMode = computed(() => (editingItem.value ? 'edit' : 'create'));

    // --- Entity Configuration ---
    // Maps tab names to their corresponding service methods and properties.
    const entityMapping = {
        Transportistas: {
            name: 'carrier',
            singular: 'Transportista',
            fetch: transportistaService.getCarriers,
            create: transportistaService.createCarrier,
            update: transportistaService.updateCarrier, // Assumes this exists in your service
            delete: transportistaService.deleteCarrier, // Assumes this exists in your service
        },
        Choferes: {
            name: 'driver',
            singular: 'Chofer',
            fetch: transportistaService.getDrivers,
            create: transportistaService.createDriver,
            update: transportistaService.updateDriver, // Assumes this exists in your service
            delete: transportistaService.deleteDriver, // Assumes this exists in your service
        },
        Vehículos: {
            name: 'vehicle',
            singular: 'Vehículo',
            fetch: transportistaService.getVehicles,
            create: transportistaService.createVehicle,
            update: transportistaService.updateVehicle, // Assumes this exists in your service
            delete: transportistaService.deleteVehicle, // Assumes this exists in your service
        },
    };

    // --- Computed Properties ---
    const activeEntity = computed(() => entityMapping[activeTab.value]);
    const pageTitle = computed(() => `Lista de ${activeTab.value}`);
    const createButtonText = computed(() => `Crear ${activeEntity.value.singular}`);

    // Modal titles and button texts change based on whether we are creating or editing
    const modalTitle = computed(() => {
        const action = modalMode.value === 'create' ? 'Crear' : 'Editar';
        return `${action} ${activeEntity.value.singular}`;
    });

    const saveButtonText = computed(() => (modalMode.value === 'create' ? 'Guardar' : 'Actualizar'));

    // --- Data Fetching ---
    const fetchItems = async () => {
        if (!activeEntity.value) return;
        isLoading.value = true;
        error.value = null;
        try {
            // Fetch items for the active tab's table
            items.value = await activeEntity.value.fetch({});
            // Always fetch all carriers for the dropdowns in the forms
            carriers.value = await transportistaService.getCarriers({});
        } catch (err) {
            error.value = `Error al cargar ${activeTab.value}: ${err.message}`;
            sendNotification(error.value, 'error');
            console.error(err);
            items.value = []; // Clear items on error
        } finally {
            isLoading.value = false;
        }
    };

    // --- Modal and CRUD Methods ---
    const openCreateModal = () => {
        editingItem.value = null; // Ensure we are in 'create' mode
        isModalVisible.value = true;
    };

    const openEditModal = (item) => {
        editingItem.value = { ...item }; // Set the item to edit
        isModalVisible.value = true;
    };

    const closeModal = () => {
        isModalVisible.value = false;
        editingItem.value = null; // Reset editing state on close
    };

    const createItem = async (data) => {
        try {
            await activeEntity.value.create(data);
            await fetchItems(); // Refresh list
            closeModal();
            sendNotification(`${activeEntity.value.singular} creado con éxito`, 'success');
        } catch (err) {
            error.value = `Error al crear ${activeEntity.value.singular}: ${err.message}`;
            sendNotification(error.value, 'error');
            console.error(err);
        }
    };

    const updateItem = async (data) => {
        try {
            await activeEntity.value.update(data.id, data);
            await fetchItems(); // Refresh list
            closeModal();
            sendNotification(`${activeEntity.value.singular} actualizado con éxito`, 'success');
        } catch (err) {
            error.value = `Error al actualizar ${activeEntity.value.singular}: ${err.message}`;
            sendNotification(error.value, 'error');
            console.error(err);
        }
    };

    const deleteItem = async (id) => {
        try {
            await activeEntity.value.delete(id);
            await fetchItems(); // Refresh list
            sendNotification(`${activeEntity.value.singular} eliminado con éxito`, 'success');
        } catch (err) {
            error.value = `Error al eliminar ${activeEntity.value.singular}: ${err.message}`;
            sendNotification(error.value, 'error');
            console.error(err);
        }
    };

    // --- Watcher ---
    // Automatically fetch data when the active tab changes.
    watch(activeTab, fetchItems, { immediate: true });

    // --- Expose Public API ---
    return {
        // State
        tabs,
        activeTab,
        items,
        carriers,
        isLoading,
        error,
        isModalVisible,
        editingItem,

        // Computed
        pageTitle,
        createButtonText,
        modalTitle,
        saveButtonText,
        activeEntity,

        // Methods
        openCreateModal,
        openEditModal,
        closeModal,
        createItem,
        updateItem,
        deleteItem,
    };
}

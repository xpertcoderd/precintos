import { ref, computed } from 'vue';

// This composable manages the state and logic for the Transportista page.
export function useTransportistaPage() {
    // --- State ---
    const tabs = ref(['Transportistas', 'Choferes', 'Camiones']);
    const activeTab = ref('Choferes');
    const isModalVisible = ref(false);

    // In a real app, this would come from an API call
    const drivers = ref([
        { id: '01', transporter: 'Alba', licenseStatus: 'valid', expDate: 'Disponibles', status: 'available' },
        { id: '02', transporter: 'Juan', licenseStatus: 'valid', expDate: 'No Disponible', status: 'unavailable' },
        { id: '03', transporter: 'Marcos', licenseStatus: 'expired', expDate: 'No Disponible', status: 'unavailable' },
    ]);

    // --- Computed Properties (Derived State) ---
    const pageTitle = computed(() => `Lista de ${activeTab.value}`);

    const activeEntity = computed(() => {
        if (activeTab.value === 'Transportistas') return 'Transportista';
        if (activeTab.value === 'Choferes') return 'Chofer';
        return 'Camión';
    });

    const createButtonText = computed(() => `Crear ${activeEntity.value}`);
    const modalTitle = computed(() => `Agregar ${activeEntity.value}`);
    const saveButtonText = computed(() => `Guardar ${activeEntity.value}`);

    // --- Methods ---
    const openCreateModal = () => { isModalVisible.value = true; };
    const closeModal = () => { isModalVisible.value = false; };

    // --- Expose Public API ---
    // We return everything the component will need.
    return {
        tabs,
        activeTab,
        isModalVisible,
        drivers,
        pageTitle,
        activeEntity,
        createButtonText,
        modalTitle,
        saveButtonText,
        openCreateModal,
        closeModal,
    };
}

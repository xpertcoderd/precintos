import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import { getTransfersFilteredFull } from "@/services/transferService";
import { getTransferBlitsMapPoints } from "@/services/blitService";
import { useUnits } from "@/composables/useUnits"; // Import useUnits
import { useBlits } from "@/composables/useBlits"; // Import useBlits
import { useAuthStore } from "@/stores/authStore";
import { getContainerStatusText, getContainerStatusColor } from '../utils/statusUtils';

export function useMainContent(timeWindowHours) {
  // --- STATE ---
  const activeTab = ref('BL');

  // BL Tab & Core Data State
  const shipmentData = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalShipments = ref(0);

  // Container Grouping State
  const activeContainers = ref([]);
  const lastTrackedShipment = ref(null);
  const containerTrackingData = ref([]);

  // Global Container Tab State
  const isGlobalContainerView = ref(true);
  const containerCurrentPage = ref(1);
  const containerPageSize = ref(10);
  const containerActiveFilters = ref([]);

  // Vue Query for Containers
  const { useTransferUnitsFiltered } = useUnits();

  const containerParams = computed(() => {
    const searchParams = containerActiveFilters.value.reduce((params, filter) => {
      params[filter.key] = filter.value;
      return params;
    }, {});
    return {
      page: containerCurrentPage.value,
      pageSize: containerPageSize.value,
      timeWindowHours: timeWindowHours.value,
      ...searchParams
    };
  });

  const {
    data: containerData,
    isLoading: isLoadingContainers,
    // refetch: refetchContainers // Unused
  } = useTransferUnitsFiltered(containerParams, {
    enabled: computed(() => activeTab.value === 'Contenedor' || !isGlobalContainerView.value),
  });

  const allContainers = computed(() => {
    const data = containerData.value?.data || containerData.value;
    return data?.transferUnits || [];
  });
  const containerTotalItems = computed(() => {
    const data = containerData.value?.data || containerData.value;
    return data?.total || 0;
  });
  const containerTotalPages = computed(() => {
    const data = containerData.value?.data || containerData.value;
    return data ? Math.ceil(data.total / data.pageSize) : 1;
  });


  // Timers
  // trackingTimer and sessionTimer are declared later

  const filterOptions = [
    { label: 'Container ID', value: 'ids' },
    { label: 'Transfer ID', value: 'transferId' },
    { label: 'Status ID', value: 'statusIds' },
    { label: 'Device ID', value: 'deviceId' },
    { label: 'Carrier ID', value: 'carrierId' },
    { label: 'Vehicle ID', value: 'vehicleId' },
    { label: 'Driver ID', value: 'driverId' },
    { label: 'Min Linked Time (hrs)', value: 'minLinkedTime' },
    { label: 'Max Linked Time (hrs)', value: 'maxLinkedTime' },
  ];

  // --- COMPUTED ---
  const filteredContainersForMap = computed(() => {
    return activeContainers.value.filter(container => container.status !== 'Pendiente');
  });

  // --- METHODS ---

  const fetchShipments = async (page = 1) => {
    loading.value = true;
    const params = {
      page,
      pageSize: 10,
      timeWindowHours: timeWindowHours.value,
    };
    try {
      const response = await getTransfersFilteredFull(params);
      if (response.success) {
        const linkedTransfers = response.data.transfers.filter(t => t.transferUnits.some(u => u.currentLinked));
        shipmentData.value = linkedTransfers;
        totalShipments.value = linkedTransfers.length;
        totalPages.value = Math.ceil(linkedTransfers.length / 10);
        currentPage.value = page;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const handleGroupContainers = (shipment) => {
    if (!shipment || !shipment.transferUnits) return;
    isGlobalContainerView.value = false;
    activeContainers.value = shipment.transferUnits.map(c => ({
      id: `${shipment.transfer.bl}-${c.id}`,
      transferUnitId: c.id,
      container: `Contenedor # ${c.container}`,
      origin: shipment.transfer.startPlace.label,
      destination: shipment.transfer.endPlace.label,
      status: getContainerStatusText(c.statusId),
      statusColorClass: getContainerStatusColor(c.statusId),
    }));
    activeTab.value = 'Contenedor';
  };

  const handleTrackShipment = async (shipment) => {
    if (!shipment || !shipment.transferUnits) return;
    lastTrackedShipment.value = shipment;
    isGlobalContainerView.value = false;
    const containers = shipment.transferUnits;
    if (containers.length === 0) return;

    activeContainers.value = containers.map(c => ({
      id: `${shipment.transfer.bl}-${c.id}`,
      transferUnitId: c.id,
      container: `Contenedor # ${c.container}`,
      origin: shipment.transfer.startPlace.label,
      destination: shipment.transfer.endPlace.label,
      status: getContainerStatusText(c.statusId),
      statusColorClass: getContainerStatusColor(c.statusId),
    }));

    const trLnkIds = containers.map(c => c.id).join(',');
    try {
      const response = await getTransferBlitsMapPoints({ trLnkIds, lastBlit: false });
      containerTrackingData.value = response.success ? response.data.transferUnitMapData.map(item => ({
        id: item.transferLinked.id,
        name: `Contenedor # ${item.transferLinked.container}`,
        route: item.points.map(p => ({ lat: p.lat, lng: p.lng }))
      })) : [];

      if (containerTrackingData.value.length > 0) {
        activeTab.value = 'Mapa';
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Tab-specific Fetching ---


  // --- ETA Tab State (Refactored to Vue Query) ---
  const { useTransferBlitsFiltered } = useBlits();

  const etaParams = computed(() => ({
    lastBlit: true,
    timeWindowHours: timeWindowHours.value,
    pageSize: 10000
  }));

  const {
    data: etaData,
    isLoading: isLoadingEta,
  } = useTransferBlitsFiltered(etaParams, {
    enabled: computed(() => activeTab.value === 'ETA'),
    refetchInterval: 60000, // Poll every minute
    refetchOnWindowFocus: false,
  });

  const etaContainers = computed(() => {
    const data = etaData.value?.data || etaData.value;
    if (!data?.transferUnitBlits) return [];

    const mappedData = data.transferUnitBlits.map(item => {
      const blit = item.transferBlits?.[0] || {};
      return {
        id: item.transferLinked.id,
        containerName: item.transferLinked.container,
        statusId: item.transferLinked.statusId,
        distance: blit.distance || 0,
        distanceRemain: blit.distanceRemain || 0,
        timeRemain: blit.timeRemain,
        completed: blit.completed || 0,
        departureTime: item.transferLinked.departureTime,
        arrivalTime: item.transferLinked.arrivalTime,
      };
    });

    return mappedData.sort((a, b) => {
      const aIsEnTransito = a.statusId === 3;
      const bIsEnTransito = b.statusId === 3;
      if (aIsEnTransito && !bIsEnTransito) return -1;
      if (!aIsEnTransito && bIsEnTransito) return 1;
      return 0;
    });
  });

  // Timers (Tracking only, ETA handled by Vue Query)
  const trackingTimer = ref(null);
  const sessionTimer = ref(null);

  // ... (Filter Options)

  // --- COMPUTED ---
  // ...

  // --- METHODS ---
  // ...

  // ... (handleTrackShipment)

  // --- Tab-specific Fetching ---
  const fetchAllContainers = async (page = 1) => {
    if (page) containerCurrentPage.value = page;
  };

  // fetchEtaData removed - handled by Vue Query

  const selectTab = (tab) => {
    activeTab.value = tab;
  };

  // --- Timers Logic ---
  const stopTrackingTimer = () => {
    if (trackingTimer.value) clearInterval(trackingTimer.value);
    trackingTimer.value = null;
  };

  const startTrackingTimer = () => {
    stopTrackingTimer();
    handleTrackShipment(lastTrackedShipment.value);
    trackingTimer.value = setInterval(() => {
      if (!lastTrackedShipment.value) return stopTrackingTimer();
      const currentShipment = shipmentData.value.find(s => s.transfer.id === lastTrackedShipment.value.transfer.id);
      if (currentShipment) handleTrackShipment(currentShipment);
      else stopTrackingTimer();
    }, 15000);
  };

  // stopEtaTimer and startEtaTimer removed - handled by Vue Query

  const startSessionTimer = () => {
    sessionTimer.value = setInterval(async () => {
      try {
        await useAuthStore().checkAuth();
        if (!useAuthStore().isAuthenticated) {
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
      }
    }, 60000);
  };

  const stopSessionTimer = () => {
    if (sessionTimer.value) clearInterval(sessionTimer.value);
    sessionTimer.value = null;
  };

  // --- WATCHERS ---
  watch(activeTab, (newTab, oldTab) => {
    if (oldTab === 'Mapa') stopTrackingTimer();
    // ETA timer stop handled by Vue Query enabled

    if (newTab === 'Mapa' && lastTrackedShipment.value) {
      startTrackingTimer();
    } else if (newTab === 'ETA') {
      // ETA fetch handled by Vue Query enabled
    } else if (newTab === 'Contenedor') {
      isGlobalContainerView.value = true;
      // fetchAllContainers(1); // Vue Query handles this
    } else if (newTab === 'BL' && shipmentData.value.length === 0) {
      fetchShipments();
    }
  });

  watch(currentPage, (newPage) => fetchShipments(newPage));

  watch(timeWindowHours, () => {
    const activeFetch = {
      'BL': () => fetchShipments(1),
      'Contenedor': () => { }, // Vue Query handles this
      'ETA': () => { }, // Vue Query handles this
    }[activeTab.value];
    if (activeFetch) activeFetch();
  });

  // watch([containerCurrentPage, containerPageSize], () => fetchAllContainers(containerCurrentPage.value)); // Vue Query handles this
  // watch(containerActiveFilters, () => fetchAllContainers(1), { deep: true }); // Vue Query handles this

  onMounted(() => {
    fetchShipments();
    startSessionTimer();
  });

  onUnmounted(() => {
    stopTrackingTimer();
    stopSessionTimer();
  });

  return {
    tabs: ['BL', 'Contenedor', 'ETA', 'Mapa'],
    activeTab, shipmentData, loading, currentPage, totalPages, totalShipments,
    activeContainers, isGlobalContainerView, containerTrackingData, lastTrackedShipment, filteredContainersForMap,
    allContainers, isLoadingContainers, containerCurrentPage, containerTotalPages, containerTotalItems, containerPageSize, containerActiveFilters, filterOptions,
    etaContainers, isLoadingEta,
    selectTab, handleGroupContainers, handleTrackShipment, handlePageChange: (page) => { currentPage.value = page; },
    fetchAllContainers, fetchShipments
  };
}

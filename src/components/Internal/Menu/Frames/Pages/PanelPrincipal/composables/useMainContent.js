import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import { getTransfersFilteredFull } from "@/services/transferService";
import { getTransferBlitsMapPoints } from "@/services/blitService";
import { useBlits } from "@/composables/useBlits"; // Import useBlits
import { useAuthStore } from "@/stores/authStore";

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
  const containerCurrentPage = ref(1); // Kept for potential client-side pagination if needed, or remove if unused
  const containerPageSize = ref(10);


  // Derived Container Data
  const allContainers = computed(() => {
    if (!shipmentData.value) return [];
    return shipmentData.value.flatMap(shipment => {
      return shipment.transferUnits.map(unit => ({
        id: unit.id,
        container: unit.container,
        deviceId: unit.deviceId,
        statusId: unit.statusId,
        linkedTime: unit.linkedTime,
        unlinkedTime: unit.unlinkedTime,
        transfer: {
          startDate: shipment.transfer.timeRequest,
          endDate: shipment.transfer.timeTravelEst,
          startPlace: shipment.transfer.startPlace,
          endPlace: shipment.transfer.endPlace,
          finalClient: shipment.transfer.finalClient?.name || 'N/A',
          cargoDescription: shipment.transfer.description || 'Sin descripción',
          bl: shipment.transfer.bl
        },
        seal: unit.seal || unit.precinto || unit.deviceId || 'N/A'
      }));
    });
  });

  const isLoadingContainers = computed(() => loading.value);
  const containerTotalItems = computed(() => allContainers.value.length);
  const containerTotalPages = computed(() => 1); // Simplified since we show what's in BL tab

  // --- Map Tab Data Fetching ---
  // Removed independent fetching. Now derived from allContainers.

  const isLoadingMapUnits = computed(() => loading.value);

  const mapUnits = computed(() => {
    // Priority 1: If a shipment is being tracked, show its units
    if (lastTrackedShipment.value && activeContainers.value.length > 0) {
      return activeContainers.value.filter(u => u.linkedTime);
    }

    // Priority 2: Default view (all active units from BL tab)
    return allContainers.value.filter(u =>
      (u.statusId === 3 || u.statusId === 4) && // En Tránsito (3) or Entregado (4)
      u.linkedTime // Must have linked time
    );
  });


  // Timers
  // trackingTimer and sessionTimer are declared later



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
      id: c.id,
      container: c.container,
      deviceId: c.deviceId,
      statusId: c.statusId,
      transfer: {
        bl: shipment.transfer.bl,
        startDate: shipment.transfer.startDate,
        endDate: shipment.transfer.endDate,
        startPlace: shipment.transfer.startPlace,
        endPlace: shipment.transfer.endPlace
      }
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
      id: c.id,
      container: c.container,
      deviceId: c.deviceId,
      statusId: c.statusId,
      linkedTime: c.linkedTime,
      unlinkedTime: c.unlinkedTime,
      transfer: {
        bl: shipment.transfer.bl,
        startDate: shipment.transfer.startDate,
        endDate: shipment.transfer.endDate,
        startPlace: shipment.transfer.startPlace,
        endPlace: shipment.transfer.endPlace
      }
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
    retry: false
  });

  const etaContainers = computed(() => {
    const data = etaData.value?.data || etaData.value;
    if (!data?.transferUnitBlits) return [];

    // Filter ETA data to only include units present in allContainers (BL tab)
    const visibleUnitIds = new Set(allContainers.value.map(u => u.id));

    const mappedData = data.transferUnitBlits
      .filter(item => visibleUnitIds.has(item.transferLinked.id))
      .map(item => {
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
          seal: item.transferLinked.deviceId,
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
    if (tab === 'Mapa') {
      lastTrackedShipment.value = null; // Reset tracking filter when clicking tab directly
    }
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

  // watch([containerCurrentPage, containerPageSize], () => fetchAllContainers(containerCurrentPage.value)); // Removed
  // watch(containerActiveFilters, () => fetchAllContainers(1), { deep: true }); // Removed

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
    allContainers, isLoadingContainers, containerCurrentPage, containerTotalPages, containerTotalItems, containerPageSize,
    etaContainers, isLoadingEta,
    mapUnits, isLoadingMapUnits, // Export map data
    selectTab, handleGroupContainers, handleTrackShipment, handlePageChange: (page) => { currentPage.value = page; },
    fetchAllContainers, fetchShipments
  };
}

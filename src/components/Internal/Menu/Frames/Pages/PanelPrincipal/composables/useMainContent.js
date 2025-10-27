import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import { transfers_filteredFull, transferBlits_mapPoints, transferUnits_filtered, transferBlits_filtered } from "@/components/conexion/DataConector";
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
  const allContainers = ref([]);
  const isGlobalContainerView = ref(true);
  const isLoadingContainers = ref(false);
  const containerCurrentPage = ref(1);
  const containerTotalPages = ref(1);
  const containerTotalItems = ref(0);
  const containerPageSize = ref(10);
  const containerActiveFilters = ref([]);

  // ETA Tab State
  const etaContainers = ref([]);
  const isLoadingEta = ref(false);

  // Timers
  const trackingTimer = ref(null);
  const etaTimer = ref(null);

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
    const response = await transfers_filteredFull(params);
    if (response.success) {
      shipmentData.value = response.data.transfers;
      totalShipments.value = response.data.total;
      totalPages.value = Math.ceil(response.data.total / response.data.pageSize);
      currentPage.value = response.data.page;
    }
    loading.value = false;
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
    const response = await transferBlits_mapPoints({ trLnkIds, lastBlit: false });

    containerTrackingData.value = response.success ? response.data.transferUnitMapData.map(item => ({
      id: item.transferLinked.id,
      name: `Contenedor # ${item.transferLinked.container}`,
      route: item.points.map(p => ({ lat: p.lat, lng: p.lng }))
    })) : [];

    if (containerTrackingData.value.length > 0) {
      activeTab.value = 'Mapa';
    }
  };

  // --- Tab-specific Fetching ---
  const fetchAllContainers = async (page = 1) => {
    isLoadingContainers.value = true;
    const searchParams = containerActiveFilters.value.reduce((params, filter) => {
      params[filter.key] = filter.value;
      return params;
    }, {});
    const params = { page, pageSize: containerPageSize.value, timeWindowHours: timeWindowHours.value, ...searchParams };
    const response = await transferUnits_filtered(params);
    if (response.success) {
      allContainers.value = response.data.transferUnits;
      containerTotalItems.value = response.data.total;
      containerTotalPages.value = Math.ceil(response.data.total / response.data.pageSize);
      containerCurrentPage.value = response.data.page;
    }
    isLoadingContainers.value = false;
  };

  const fetchEtaData = async (showLoader = false) => {
    if (showLoader) isLoadingEta.value = true;
    const params = { lastBlit: true, timeWindowHours: timeWindowHours.value, pageSize: 10000 };
    const response = await transferBlits_filtered(params);
    if (response.success && response.data.transferUnitBlits) {
      const mappedData = response.data.transferUnitBlits.map(item => {
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

      mappedData.sort((a, b) => {
        const aIsEnTransito = a.statusId === 3;
        const bIsEnTransito = b.statusId === 3;
        if (aIsEnTransito && !bIsEnTransito) return -1;
        if (!aIsEnTransito && bIsEnTransito) return 1;
        return 0;
      });

      etaContainers.value = mappedData;
    }
    if (showLoader) isLoadingEta.value = false;
  };

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

  const stopEtaTimer = () => {
    if (etaTimer.value) clearInterval(etaTimer.value);
    etaTimer.value = null;
  };

  const startEtaTimer = () => {
    stopEtaTimer();
    fetchEtaData(true);
    etaTimer.value = setInterval(() => fetchEtaData(false), 20000);
  };

  // --- WATCHERS ---
  watch(activeTab, (newTab, oldTab) => {
    if (oldTab === 'Mapa') stopTrackingTimer();
    if (oldTab === 'ETA') stopEtaTimer();

    if (newTab === 'Mapa' && lastTrackedShipment.value) {
      startTrackingTimer();
    } else if (newTab === 'ETA') {
      startEtaTimer();
    } else if (newTab === 'Contenedor') {
      isGlobalContainerView.value = true;
      fetchAllContainers(1);
    } else if (newTab === 'BL' && shipmentData.value.length === 0) {
      fetchShipments();
    }
  });

  watch(currentPage, (newPage) => fetchShipments(newPage));

  watch(timeWindowHours, () => {
    const activeFetch = {
      'BL': () => fetchShipments(1),
      'Contenedor': () => fetchAllContainers(1),
      'ETA': () => fetchEtaData(true),
    }[activeTab.value];
    if (activeFetch) activeFetch();
  });

  watch([containerCurrentPage, containerPageSize], () => fetchAllContainers(containerCurrentPage.value));
  watch(containerActiveFilters, () => fetchAllContainers(1), { deep: true });

  onMounted(() => {
    fetchShipments();
  });

  onUnmounted(() => {
    stopTrackingTimer();
    stopEtaTimer();
  });

  return {
    tabs: ['BL', 'Contenedor', 'ETA', 'Mapa'],
    activeTab, shipmentData, loading, currentPage, totalPages, totalShipments,
    activeContainers, isGlobalContainerView, containerTrackingData, lastTrackedShipment, filteredContainersForMap,
    allContainers, isLoadingContainers, containerCurrentPage, containerTotalPages, containerTotalItems, containerPageSize, containerActiveFilters, filterOptions,
    etaContainers, isLoadingEta,
    selectTab, handleGroupContainers, handleTrackShipment, handlePageChange: (page) => { currentPage.value = page; },
  };
}

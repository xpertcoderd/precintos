import { ref } from 'vue';
import {devicesAll, transferUnits_filtered} from "@/components/conexion/DataConector";
import { transportistaService } from '@/services/transportistaService';
import {fetchInitialData} from "@/components/TransferWizard/helpers/fetchBrokerData";

const linkModalData = ref({
  devices: [],
  clients: [],
  carriers: [],
  drivers: [],
  vehicles: [],
  containers: []
});

const isDataLoaded = ref(false);

export function useCreateLinkData() {
  const isLinkModalDataLoading = ref(false);

  const fetchCreateLinkData = async (transferId) => {
    if (isDataLoaded.value) return;

    isLinkModalDataLoading.value = true;
    try {
      const [initialData, devices, carriers, drivers, vehicles, containers] = await Promise.all([
        fetchInitialData(),
        devicesAll(),
        transportistaService.getCarriers({}),
        transportistaService.getDrivers({}),
        transportistaService.getVehicles({}),
        transferUnits_filtered({transferId, statusIds: '1'})
      ]);

      linkModalData.value.clients = initialData.finalClients;
      linkModalData.value.devices = devices.data.devices;
      linkModalData.value.carriers = carriers;
      linkModalData.value.drivers = drivers;
      linkModalData.value.vehicles = vehicles;
      linkModalData.value.containers = containers.data.transferUnits

      isDataLoaded.value = true;
    } catch (error) {
      console.error("Error fetching data for link modal:", error);
    } finally {
      isLinkModalDataLoading.value = false;
    }
  };

  return {
    linkModalData,
    isLinkModalDataLoading,
    fetchCreateLinkData,
  };
}

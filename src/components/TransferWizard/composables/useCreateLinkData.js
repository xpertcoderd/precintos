import { ref } from 'vue';
import { getDevicesFiltered } from "@/services/deviceService";
import { transportistaService } from '@/services/transportistaService';
import { fetchInitialData } from "@/components/TransferWizard/helpers/fetchBrokerData";

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

  const fetchCreateLinkData = async () => {
    if (isDataLoaded.value) return;

    isLinkModalDataLoading.value = true;
    try {
      const [initialData, devices, carriers, drivers, vehicles] = await Promise.all([
        fetchInitialData(),
        getDevicesFiltered({ pageSize: 20000 }),
        transportistaService.getCarriers({}),
        transportistaService.getDrivers({}),
        transportistaService.getVehicles({}),
      ]);

      linkModalData.value.clients = initialData.finalClients;
      linkModalData.value.devices = devices.data.devices;
      linkModalData.value.carriers = carriers;
      linkModalData.value.drivers = drivers;
      linkModalData.value.vehicles = vehicles;

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

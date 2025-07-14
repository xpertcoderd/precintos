<template>
  <main class="bg-white rounded-2xl shadow-lg p-6">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 mb-6">
      <div class="flex items-center gap-3">
        <ListIcon class="w-6 h-6 text-sky-600" />
        <h2 class="text-xl font-bold text-slate-800">Traslados</h2>
      </div>
      <div class="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
        <button @click="showWizard = true" class="w-full md:w-auto px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">Crear Traslado</button>
        <div class="relative w-full md:w-64">
          <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
      </div>
    </div>

    <!-- Tabs Section -->
    <div class="flex items-center gap-2 mb-6">
      <button
          v-for="tab in tabs"
          :key="tab"
          @click="selectTab(tab)"
          :class="[
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                      activeTab === tab
                          ? 'bg-blue-100 text-sky-700'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Shipment Card -->
    <ShipmentCard v-for="shipment in shipmentData" :key="shipment.id" :shipment-data="shipment" @track-shipment="trackShipment" />

    <!-- Transfer Wizard Modal -->
    <TransferWizardCard v-if="showWizard" @close="showWizard = false" />
  </main>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import ListIcon from './icons/ListIcon.vue';
  import SearchIcon from './icons/SearchIcon.vue';
  import ShipmentCard from './ShipmentCard.vue';
  import TransferWizardCard from '@/components/TransferWizard/TransferWizardCard.vue';

  const tabs = ref(['Contenedor', 'BL', 'ETA', 'Mapa']);
  const activeTab = ref('Contenedor');
  const showWizard = ref(false);

  defineProps({
    shipmentData: Array,
  });

  const emit = defineEmits(['trackShipment']);

  const trackShipment = () => {
    emit('trackShipment');
  };

  const selectTab = (tab) => {
    activeTab.value = tab;
    console.log(`Tab selected: ${tab}`);
  };
</script>

<template>
  <div>
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th v-for="header in headers" :key="header" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            {{ header }}
          </th>
          <th class="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
        <tr v-if="data.length === 0">
          <td :colspan="headers.length + 1" class="px-6 py-12 text-center text-slate-500">
            No hay datos para mostrar.
          </td>
        </tr>
        <tr v-for="item in data" :key="item.transfer.id" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.serverClient.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.finalClient.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.bl }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ abbreviateLocation(item.transfer.startPlace.label) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ abbreviateLocation(item.transfer.endPlace.label) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ formatDate(item.transfer.timeRequest) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.countainerCount }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ formatCurrency(item.transfer.unitPrice) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ formatCurrency(item.transfer.unitPrice * item.countainerCount) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', getContainerStatusColor(item.transfer.transferStateId)]">
              {{ getTransferStatusText(item.transfer.transferStateId) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium relative">
            <button @click.stop="toggleMenu(item.transfer.id)" class="p-1 rounded-full text-slate-400 hover:text-sky-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z"/></svg>
            </button>
            <div v-if="openMenuId === item.transfer.id" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a v-if="item.transfer.voucherPhotoUrl" href="#" @click.prevent="$emit('view-voucher', item)" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Ver Comprobante</a>
                <a href="#" @click.prevent="$emit('upload-payment', item)" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Subir Pago</a>
                <a href="#" @click.prevent="$emit('approve', item)" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Aprobar</a>
                <a
                  href="#"
                  :class="[
                    'block px-4 py-2 text-sm',
                    item.transfer.transferStateId !== 1 ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 cursor-not-allowed'
                  ]"
                  @click.prevent="item.transfer.transferStateId !== 1 ? $emit('link-shipment', item) : null"
                  role="menuitem"
                >Enlazar</a>
                <a href="#" @click.prevent="$emit('add-container', item)" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Agregar Contenedor</a>
                <a href="#" @click.prevent="$emit('cancel', item)" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">Cancelar</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getContainerStatusColor } from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/utils/statusUtils';

defineProps({
  data: {
    type: Array,
    required: true,
  },
});

defineEmits(['upload-payment', 'approve', 'cancel', 'link-shipment', 'view-voucher', 'add-container']);

const openMenuId = ref(null);

const headers = [
  'No. Solicitud', 'Compañia', 'Cliente Final', 'Traslado', 'Origen', 'Destino', 'Fecha salida', 'Contenedores', 'Tarifa', 'Total', 'Estado'
];

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const getTransferStatusText = (statusId) => {
  const statusMap = {
    1: 'Pendiente',
    2: 'Confirmado',
    3: 'En Ruta',
    4: 'Completado',
    5: 'Cancelado',
  };
  return statusMap[statusId] || 'Desconocido';
};

const abbreviateLocation = (location) => {
  if (!location) return 'N/A';
  return location.replace(/Zona Franca/gi, 'ZF');
};

const toggleMenu = (id) => {
  const isAlreadyOpen = openMenuId.value === id;
  if (openMenuId.value !== null) {
    openMenuId.value = null;
  }
  if (!isAlreadyOpen) {
    openMenuId.value = id;
    setTimeout(() => {
      document.addEventListener('click', closeMenu, { once: true });
    }, 0);
  }
};

const closeMenu = () => {
  openMenuId.value = null;
};

</script>

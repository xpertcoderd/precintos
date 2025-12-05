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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.serverClient.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.finalClient.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.transfer.bl }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
             <div class="flex items-center gap-2">
               <span class="truncate max-w-[100px]" :title="item.transfer.startPlace.label">{{ abbreviateLocation(item.transfer.startPlace.label) }}</span>
               <span class="text-slate-400">→</span>
               <span class="truncate max-w-[100px]" :title="item.transfer.endPlace.label">{{ abbreviateLocation(item.transfer.endPlace.label) }}</span>
             </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ formatDate(item.transfer.timeRequest) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 relative group cursor-help">
            <span class="border-b border-dotted border-slate-400">{{ formatCurrency(item.transfer.unitPrice * item.countainerCount) }}</span>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              <div class="font-semibold mb-1">Detalle del Cálculo:</div>
              <div>{{ item.countainerCount }} Contenedores</div>
              <div>x {{ formatCurrency(item.transfer.unitPrice) }} (Tarifa)</div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm relative group cursor-help">
            <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', getTransferStatusColor(item.transfer.transferStateId)]">
              {{ getTransferStatusText(item.transfer.transferStateId) }}
            </span>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {{ getTransferStatusDescription(item.transfer.transferStateId) }}
            </div>
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

defineProps({
  data: {
    type: Array,
    required: true,
  },
});

defineEmits(['upload-payment', 'approve', 'cancel', 'link-shipment', 'view-voucher', 'add-container']);

const openMenuId = ref(null);

const headers = [
  'Compañia', 'Cliente Final', 'Traslado', 'Ruta', 'Fecha salida', 'Total', 'Estado'
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
    1: 'Pendiente Finanzas',
    2: 'Aprobado Finanzas',
    3: 'Aprobado Crédito',
    4: 'Cancelado',
    5: 'Rechazado Finanzas',
    6: 'Solicitud Expirada',
  };
  return statusMap[statusId] || 'Desconocido';
};

const getTransferStatusDescription = (statusId) => {
  const descriptionMap = {
    1: 'El traslado no ha sido aprobado para despacho aún.',
    2: 'El traslado ha sido aprobado para despacho.',
    3: 'El traslado ha sido aprobado para despacho por crédito.',
    4: 'El traslado ha sido cancelado por el usuario.',
    5: 'El traslado ha sido cancelado por el departamento de finanzas.',
    6: 'La solicitud expiró antes de recibir aprobación o rechazo por finanzas.',
  };
  return descriptionMap[statusId] || 'Estado desconocido';
};

const getTransferStatusColor = (statusId) => {
  // Green for approved (2, 3)
  if (statusId === 2 || statusId === 3) {
    return 'bg-green-100 text-green-800';
  }
  // Orange for pending (1)
  if (statusId === 1) {
    return 'bg-orange-100 text-orange-800';
  }
  // Red for canceled, rejected, expired (4, 5, 6)
  if (statusId === 4 || statusId === 5 || statusId === 6) {
    return 'bg-red-100 text-red-800';
  }
  return 'bg-slate-100 text-slate-800';
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

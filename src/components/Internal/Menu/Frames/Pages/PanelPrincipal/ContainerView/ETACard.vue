<template>
  <div class="bg-white shadow-lg rounded-lg p-3 mb-2 border border-slate-200 relative">
    <!-- Top Section: Title, Status, and Menu -->
    <div class="flex items-start justify-between mb-2">
      <div class="flex-1 pr-3">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="text-lg font-bold text-slate-800">Contenedor #{{ container.containerName }}</h3>
          <span :class="['px-2 py-0.5 rounded-full text-xs font-medium', statusBadgeColorClass]">
            {{ statusText }}
          </span>
        </div>
        
        <div class="text-sm text-slate-600 mb-2 flex items-center gap-2">
             <span class="font-semibold text-xs uppercase text-slate-400">Precinto:</span>
             <span class="font-mono font-medium" :class="container.seal && container.seal !== 'N/A' ? 'text-sky-600' : 'text-slate-400'">{{ container.seal || 'N/A' }}</span>
        </div>

        <!-- Departure and Arrival Times -->
        <div class="mt-2 grid grid-cols-2 gap-x-3 text-slate-600">
            <div>
                <p class="font-semibold text-xs uppercase text-slate-400">Salida</p>
                <p class="text-sm font-medium">{{ formatDateTime(container.departureTime) }}</p>
            </div>
            <div>
                <p class="font-semibold text-xs uppercase text-slate-400">Llegada Est.</p>
                <p class="text-sm font-medium">{{ formatDateTime(container.arrivalTime) }}</p>
            </div>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2">
           <!-- Menu Button -->
           <button @click.stop="toggleMenu(container.id, $event)" class="text-slate-400 hover:text-sky-600 transition-colors p-1">
              <MoreHorizontalIcon class="w-6 h-6" />
           </button>

           <div :class="[statusBackgroundColorClass, 'w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg mt-1']">
            <span class="text-xl font-bold tracking-tight">{{ formattedTime.value }}</span>
            <span v-if="formattedTime.unit" class="text-[10px] font-medium -mt-1">{{ formattedTime.unit }}</span>
          </div>
      </div>
    </div>

    <!-- Bottom Section: Progress Bar with Distance -->
    <div class="relative pt-2 border-t border-slate-100 mt-2">
      <div class="flex justify-between items-center text-xs text-slate-600 mb-1">
        <div class="flex gap-4">
             <div>
                <span class="text-slate-400">Recorrido: </span>
                <span class="font-semibold text-slate-700">{{ distanceTraveled }} km</span>
             </div>
             <div>
                <span class="text-slate-400">Restante: </span>
                <span class="font-semibold text-slate-700">{{ (container.distanceRemain / 1000).toFixed(2) }} km</span>
             </div>
        </div>
        <span class="font-bold text-sky-600">{{ container.completed.toFixed(0) }}% Com.</span>
      </div>
      <div class="overflow-hidden h-3 text-xs flex rounded-full bg-slate-200 relative">
        <div :style="{ width: container.completed + '%' }" :class="[statusBackgroundColorClass, 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center items-center transition-all duration-500']">
        </div>
      </div>
    </div>

    <!-- Dropdown Menu Teleport -->
     <Teleport to="body">
       <div v-if="openMenuId === container.id" 
            :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }"
            @click.stop 
            class="fixed w-48 bg-white rounded-md shadow-lg z-50 border border-slate-200 text-left">
          <a
            href="#"
            class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            @click.prevent="closeMenu(); $emit('create-link', container)"
          >Enlace</a>
          <a
            href="#"
            :class="[
              'block px-4 py-2 text-sm',
              container.statusId === 4 ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 cursor-not-allowed'
            ]"
            @click.prevent="container.statusId === 4 ? (closeMenu(), $emit('open-seal', container)) : null"
          >Abrir candado</a>
          <a href="#" @click.prevent="closeMenu" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Alertar Contacto</a>
          <a href="#" @click.prevent="closeMenu" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cancelar</a>
       </div>
     </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, onUnmounted, defineEmits, defineProps } from 'vue';
import { getContainerStatusText, getContainerStatusColor } from '../utils/statusUtils';
import MoreHorizontalIcon from '@/components/TransportistaPage/icons/MoreHorizontalIcon.vue';

const props = defineProps({
  container: {
    type: Object,
    required: true,
  },
});

defineEmits(['create-link', 'open-seal']);

// Menu Logic
const openMenuId = ref(null);
const menuPosition = ref({ top: 0, left: 0 });

const closeMenu = () => {
  openMenuId.value = null;
  document.removeEventListener('click', closeMenu);
  window.removeEventListener('scroll', closeMenu);
  window.removeEventListener('resize', closeMenu);
};

const toggleMenu = (id, event) => {
  const isAlreadyOpen = openMenuId.value === id;

  if (openMenuId.value !== null) {
    closeMenu();
  }

  if (!isAlreadyOpen) {
    const rect = event.currentTarget.getBoundingClientRect();
    menuPosition.value = {
      top: rect.bottom,
      left: rect.right - 192 // Align right
    };

    openMenuId.value = id;
    setTimeout(() => {
      document.addEventListener('click', closeMenu);
      window.addEventListener('scroll', closeMenu);
      window.addEventListener('resize', closeMenu);
    }, 0);
  }
};

onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
  window.removeEventListener('scroll', closeMenu);
  window.removeEventListener('resize', closeMenu);
});

// Status & Data Logic
const statusText = computed(() => getContainerStatusText(props.container.statusId));
const statusBadgeColorClass = computed(() => getContainerStatusColor(props.container.statusId));

const statusBackgroundColorClass = computed(() => {
  const statusId = props.container.statusId;
  const colorMap = {
    1: 'bg-orange-500',
    2: 'bg-green-500',
    3: 'bg-green-500',
    4: 'bg-blue-500',
    5: 'bg-cyan-500',
    6: 'bg-slate-500',
    7: 'bg-slate-500',
    8: 'bg-red-500'
  };
  return colorMap[statusId] || 'bg-gray-500';
});

const formattedTime = computed(() => {
    const seconds = props.container.timeRemain;
    if (seconds === null || seconds === undefined) return { value: '---', unit: '' };
    if (seconds < 0) return { value: '!', unit: 'Retraso' };

    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    return { value: `${paddedHours}:${paddedMinutes}`, unit: 'hrs:min' };
});

const distanceTraveled = computed(() => {
    if (props.container.distance && props.container.distanceRemain !== undefined) {
         const traveled = Math.max(0, props.container.distance - props.container.distanceRemain);
         return (traveled / 1000).toFixed(2);
    }
    // Fallback if total distance missing but we have % and remain
    if (props.container.completed && props.container.distanceRemain) {
         // remain = total * (1 - completed/100) => total = remain / (1 - completed/100)
         // traveled = total * (completed/100)
         // simplistic fallback:
         return '---'; 
    }
    return (props.container.distance ? (props.container.distance / 1000).toFixed(2) : '---');
});

const formatDateTime = (dateString) => {
  if (!dateString) return 'Sin Confirmar';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
};
</script>

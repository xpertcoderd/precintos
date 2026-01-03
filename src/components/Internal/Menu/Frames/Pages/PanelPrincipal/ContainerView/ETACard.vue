<template>
  <div class="bg-white shadow-sm rounded-lg p-3 mb-2 border border-slate-200 relative flex items-center gap-4 h-36 overflow-visible">
    
    <!-- Left Section: Origin & Progress & Destination/Info -->
    <div class="flex-1 min-w-0 flex flex-col justify-center gap-2 h-full py-1">
        
        <!-- Top Row: Origin (Left) --- Container/Seal Info (Right) -->
        <div class="flex justify-between items-end">
            <h3 class="font-bold text-slate-800 text-sm truncate pr-2" :title="container.transfer?.startPlace?.label">
                {{ container.transfer?.startPlace?.label || 'Origen Desconocido' }}
            </h3>
            <div class="text-sm text-slate-600 font-mono">
                <span class="font-bold text-slate-700 uppercase">Contenedor:</span> {{ container.containerName }} <span class="mx-1">|</span> 
                <span class="font-bold text-slate-700 uppercase">Precinto:</span> <span :class="container.seal ? 'text-sky-600 font-bold' : 'text-slate-400'">{{ container.seal || 'N/A' }}</span>
            </div>
        </div>

        <!-- Middle: Progress Bar -->
        <div class="relative h-4 w-full bg-slate-100 rounded-full flex items-center my-1">
            <!-- Green Bar -->
            <div :style="{ width: container.completed + '%' }" :class="['h-full rounded-l-full relative transition-all duration-500 min-w-[2%]', statusBackgroundColorClass]">
                <!-- Text Inside Bar (Left) -->
                 <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span class="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-sm">Recorrido: {{ distanceTraveled }}km</span>
                 </div>
            </div>

            <!-- Remaining Text (Right part of gray bar) -->
            <div class="absolute inset-y-0 right-14 flex items-center pointer-events-none z-10">
                 <span :class="['text-[10px] font-bold uppercase tracking-wider', container.completed > 90 ? 'text-white drop-shadow-sm' : 'text-slate-500']">
                    Restan: {{ (container.distanceRemain / 1000).toFixed(0) }}km
                 </span>
            </div>

            <!-- Percentage Badge -->
             <div 
               class="absolute h-6 flex items-center justify-center bg-blue-500 text-white text-xs font-bold px-2 rounded-md shadow-md z-20 -top-1"
               :style="{ left: `calc(${container.completed}% - 10px)` }" 
             >
                {{ container.completed.toFixed(0) }}%
             </div>
        </div>

        <!-- Bottom Row: Destination / Shipping Line (Right Aligned) -->
        <div class="flex justify-end">
            <p class="text-xs text-slate-500 font-bold uppercase tracking-wider truncate max-w-[400px]" :title="container.transfer?.endPlace?.label">
                {{ container.transfer?.endPlace?.label || 'Destino Desconocido' }} 
                <span v-if="container.booking" class="normal-case font-normal text-slate-500">({{ container.booking }})</span>
            </p>
        </div>
    </div>

    <!-- Separator -->
    <div class="w-px h-24 bg-slate-200 mx-1"></div>

    <!-- Right Section: Time & Menu -->
    <div class="flex items-center gap-5 shrink-0">
        
        <!-- Circular Timer -->
        <div class="relative w-24 h-24 flex flex-col items-center justify-center rounded-full border-4 border-slate-100 bg-white">
            <span class="text-4xl font-bold text-slate-800 leading-none -mt-1">{{ formattedTime.value.split(':')[0] }}</span> 
             <span class="text-xs font-bold text-slate-400 uppercase">{{ formattedTime.unit === 'hrs:min' ? 'HRS' : formattedTime.unit }}</span>
             
             <!-- Small Bubble for Minutes -->
             <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-sm">
                {{ formattedTime.value.split(':')[1] || '00' }}
             </div>
        </div>

        <!-- Times Text -->
        <div class="flex flex-col text-sm leading-tight text-slate-600 w-32">
            <div class="mb-2">
                <span class="font-bold text-slate-800 block uppercase text-xs mb-0.5">Salida</span>
                <span class="font-mono text-base font-medium">{{ formatDateTime(container.departureTime).split(',')[1] || '--:--' }}</span>
            </div>
            <div>
                 <span class="font-bold text-slate-800 block uppercase text-xs mb-0.5">Llegada</span>
                 <span class="font-mono text-base font-medium">{{ formatDateTime(container.arrivalTime).split(',')[1] || '--:--' }}</span>
            </div>
        </div>

        <!-- Menu Button -->
        <button @click.stop="toggleMenu(container.id, $event)" class="text-slate-400 hover:text-sky-600 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full">
            <MoreHorizontalIcon class="w-6 h-6" />
        </button>
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

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div v-for="container in containers" :key="container.id" class="bg-slate-50 hover:bg-slate-100 p-4 rounded-lg border border-slate-200 transition-colors space-y-4">
      <!-- Header Section -->
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-4">
          <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500">
          <div>
            <div class="font-semibold text-slate-800">{{ container.container }}</div>
            <div class="text-xs text-slate-500">{{ container.id }}</div>
          </div>
        </div>
        <div class="relative">
          <button @click.stop="toggleMenu(container.id)" class="text-slate-400 hover:text-sky-600">
            <MoreHorizontalIcon class="w-5 h-5" />
          </button>
          <!-- Dropdown Menu -->
          <div v-if="openMenuId === container.id" @click.stop class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              @click.prevent="$emit('create-link', container)"
            >Enlace</a>
            <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Alertar Contacto</a>
            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cancelar</a>
          </div>
        </div>
      </div>

      <!-- Route Section -->
      <div class="text-sm text-slate-600">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs font-medium text-slate-500">{{ container.origin }}</span>
          <span class="text-xs font-medium text-slate-500">{{ container.destination }}</span>
        </div>
        <div class="relative w-full bg-slate-200 rounded-full h-2.5">
          <div class="bg-sky-500 h-2.5 rounded-full" :style="{ width: container.progress + '%' }"></div>
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" :style="{ left: container.progress + '%' }">
            <TruckIcon class="w-5 h-5 text-white bg-sky-600 rounded-full p-0.5" />
          </div>
        </div>
        <div class="text-center text-xs font-semibold text-sky-600 mt-1">{{ container.progress }}% completado</div>
      </div>

      <!-- Details Section -->
      <div class="flex justify-between items-center text-sm">
        <div>
          <div class="text-xs text-slate-400 font-medium">FECHA INICIO</div>
          <div class="text-slate-600">{{ container.startDate }}</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 font-medium">FECHA FIN</div>
          <div :class="container.isOverdue ? 'text-red-500 font-bold' : 'text-slate-600'">{{ container.endDate }}</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 font-medium">ESTADO</div>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            container.statusColorClass
          ]">
            {{ container.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import MoreHorizontalIcon from '@/components/TransportistaPage/icons/MoreHorizontalIcon.vue';
import TruckIcon from '@/components/Internal/Menu/icons/TruckIcon.vue';

defineProps({
  containers: { type: Array, required: true },
});

defineEmits(['create-link']);

const openMenuId = ref(null);

const closeMenu = () => {
  openMenuId.value = null;
  document.removeEventListener('click', closeMenu);
};

const toggleMenu = (id) => {
  const isAlreadyOpen = openMenuId.value === id;

  if (openMenuId.value !== null) {
    closeMenu();
  }

  if (!isAlreadyOpen) {
    openMenuId.value = id;
    // Use setTimeout to ensure the current click event that opens the menu
    // does not immediately trigger the new document click listener.
    setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
  }
};
</script>

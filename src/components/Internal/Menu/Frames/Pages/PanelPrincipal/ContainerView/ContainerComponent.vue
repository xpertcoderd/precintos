<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            No.
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            Contenedor
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            Precinto
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            Fecha inicio
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            Fecha Fin
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            Ruta
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            Estado
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
        <tr v-for="(container, index) in containers" :key="container.id" class="hover:bg-slate-50 transition-colors">
          
          <!-- Index -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ String(index + 1).padStart(2, '0') }}
          </td>

          <!-- Contenedor -->
          <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
             {{ container.container.replace('Contenedor # ', '') }}
          </td>

          <!-- Precinto -->
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="container.deviceId !== 'N/A' ? 'text-sky-500' : 'text-slate-400'">
            {{ container.deviceId }}
          </td>

          <!-- Fecha Inicio -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
             {{ container.startDate }}
          </td>

          <!-- Fecha Fin -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
             {{ container.endDate }}
          </td>

          <!-- Ruta -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
             <div class="flex items-center gap-2">
                <span class="truncate max-w-[150px]" :title="container.origin">{{ container.origin }}</span>
                <span class="text-slate-400">→</span>
                <span class="truncate max-w-[150px]" :title="container.destination">{{ container.destination }}</span>
             </div>
          </td>

          <!-- Estado -->
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium" :class="container.statusColorClass">
               {{ container.status }}
            </span>
          </td>

          <!-- Actions -->
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
             <button @click.stop="toggleMenu(container.id, $event)" class="text-slate-400 hover:text-sky-600 transition-colors">
                <MoreHorizontalIcon class="w-5 h-5" />
             </button>
             
             <!-- Dropdown Menu -->
             <Teleport to="body">
               <div v-if="openMenuId === container.id" 
                    :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }"
                    @click.stop 
                    class="fixed w-48 bg-white rounded-md shadow-lg z-50 border border-slate-200">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 text-left"
                    @click.prevent="closeMenu(); $emit('create-link', container)"
                  >Enlace</a>
                  <a
                    href="#"
                    :class="[
                      'block px-4 py-2 text-sm text-left',
                      container.status === 'Entregado' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 cursor-not-allowed'
                    ]"
                    @click.prevent="container.status === 'Entregado' ? (closeMenu(), $emit('open-seal', container)) : null"
                  >Abrir candado</a>
                  <a href="#" @click.prevent="closeMenu" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 text-left">Alertar Contacto</a>
                  <a href="#" @click.prevent="closeMenu" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">Cancelar</a>
               </div>
             </Teleport>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onUnmounted } from 'vue';
import MoreHorizontalIcon from '@/components/TransportistaPage/icons/MoreHorizontalIcon.vue';

defineProps({
  containers: { type: Array, required: true },
});

defineEmits(['create-link', 'open-seal']);

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
      left: rect.right - 192 // 192px is w-48 (12rem), w-48 is ~192px
    };

    openMenuId.value = id;
    
    // Use setTimeout to ensure the current click event doesn't trigger closeMenu immediately
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
</script>

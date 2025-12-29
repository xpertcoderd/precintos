<template>
  <div class="overflow-x-auto">
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
        <tr v-for="item in data" :key="item.client.id" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.client.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.client.rnc }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.client.contact }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.client.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ item.client.phone }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-500">{{ item.usersByClient }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
             <button @click.stop="toggleMenu(item.client.id, $event)" class="p-1 rounded-full text-slate-400 hover:text-sky-600 transition-colors">
                <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" />
             </button>
             
             <!-- Teleported Menu -->
             <Teleport to="body">
               <div v-if="openMenuId === item.client.id" 
                    :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }"
                    @click.stop 
                    class="fixed w-48 bg-white rounded-md shadow-lg z-[9999] border border-slate-200 text-left py-1 ring-1 ring-black ring-opacity-5">
                  <button
                    class="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-sky-500 hover:text-white"
                    @click="closeMenu(); $emit('edit-item', item)"
                  >
                    <PencilIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    class="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-sky-500 hover:text-white"
                    @click="closeMenu(); $emit('open-credit-profile', { client: item.client, profileId: profilesMap[item.client.id] })"
                  >
                    <CreditCardIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                    {{ profilesMap[item.client.id] ? 'Ver' : 'Crear' }} perfil crediticio
                  </button>
                  <button
                    class="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                    @click="closeMenu(); $emit('delete-item', item)"
                  >
                    <TrashIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                    Eliminar
                  </button>
               </div>
             </Teleport>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon, CreditCardIcon } from '@heroicons/vue/24/outline'

defineProps({
  data: {
    type: Array,
    required: true,
  },
  profilesMap: {
    type: Object,
    default: () => ({}),
  }
});

defineEmits(['edit-item', 'delete-item', 'open-credit-profile']);

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
      left: rect.right - 192 // 192px is w-48 (12rem)
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

const headers = ['Nombre', 'RNC', 'Contacto', 'Email', 'Teléfono', 'Usuarios'];
</script>

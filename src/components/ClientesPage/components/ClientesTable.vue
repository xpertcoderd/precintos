<template>
  <div class="overflow-x-auto min-h-[400px]">
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
             <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" />
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-sky-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                          ]"
                           @click="$emit('edit-item', item)"
                        >
                          <PencilIcon
                            :active="active"
                            class="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Editar
                        </button>
                      </MenuItem>
                       <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-sky-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                          ]"
                           @click="$emit('open-credit-profile', { client: item.client, profileId: profilesMap[item.client.id] })"
                        >
                          <CreditCardIcon
                            :active="active"
                            class="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          {{ profilesMap[item.client.id] ? 'Ver' : 'Crear' }} perfil crediticio
                        </button>
                      </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-red-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                          ]"
                          @click="$emit('delete-item', item)"
                        >
                          <TrashIcon
                            :active="active"
                            class="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Eliminar
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
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

const headers = ['Nombre', 'RNC', 'Contacto', 'Email', 'Teléfono', 'Usuarios'];
</script>

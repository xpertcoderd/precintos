<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue';
import LayoutDashboard from './icons/LayoutDashboard.vue';
import FileText from './icons/FileText.vue';
import ServerIcon from './icons/ServerIcon.vue';
import BarChart2 from './icons/BarChart2.vue';
import DollarSign from './icons/DollarSign.vue';
import BuildingIcon from './icons/BuildingIcon.vue';
import UsersIcon from './icons/UsersIcon.vue';
import TruckIcon from './icons/TruckIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';
import InfoIcon from './icons/InfoIcon.vue';
import LogOut from './icons/LogOut.vue';
import UserCircle from './icons/UserCircle.vue';

const props = defineProps(
	['LegalName', 'logined']
)

const outGoingData = defineEmits(
	['vista', 'logout']
)

const menuSections = ref([
    {
        title: 'Menu Principal',
        items: [
            { name: 'Panel Principal', icon: LayoutDashboard, indice: 1 },
            { name: 'Solicitudes', icon: FileText, indice: 2 },
            { name: 'Dispositivos', icon: ServerIcon, indice: 3 },
            { name: 'Analitica', icon: BarChart2, indice: 4 },
            { name: 'Tarifa', icon: DollarSign, indice: 5 },
        ]
    },
    {
        title: 'Entidades',
        items: [
            { name: 'Clientes', icon: BuildingIcon, indice: 6 },
            { name: 'Usuarios', icon: UsersIcon, indice: 7 },
            { name: 'Transportistas', icon: TruckIcon, indice: 8 },
        ]
    },
    {
        title: 'Otras opciones',
        items: [
            { name: 'Configuracion', icon: SettingsIcon, indice: 9 },
            { name: 'Informacion', icon: InfoIcon, indice: 10 },
        ]
    }
]);

const activeItem = ref('Panel Principal');

const setActive = (item) => {
    activeItem.value = item.name;
    outGoingData('vista', item.indice);
};

const updateView = (indice) => {
  const item = menuSections.value.flatMap(section => section.items).find(item => item.indice === indice);
  if (item) {
    activeItem.value = item.name;
  }
};

defineExpose({ updateView });

</script>

<template>
    <aside class="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4 flex-shrink-0">
        <!-- Logo -->
        <div class="py-4 mb-4 text-center">
            <h1 class="text-2xl font-bold text-slate-800 tracking-widest">AURORA</h1>
        </div>

        <!-- User Profile Section -->
        <div class="flex items-center gap-3 p-3 mb-6 rounded-lg bg-slate-50 border border-slate-200">
            <UserCircle class="w-8 h-8 text-slate-500" />
            <span class="font-semibold text-slate-700">{{ props.LegalName }}</span>
        </div>

        <!-- Menu Navigation -->
        <nav class="flex flex-col gap-6 overflow-y-auto">
            <div v-for="section in menuSections" :key="section.title">
                <h3 class="px-3 mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    {{ section.title }}
                </h3>
                <ul class="flex flex-col gap-1">
                    <li v-for="item in section.items" :key="item.name">
                        <a
                            href="#"
                            @click.prevent="setActive(item)"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                            :class="[
                                activeItem === item.name
                                    ? 'bg-sky-100 text-sky-700 font-semibold'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                            ]"
                        >
                            <component :is="item.icon" class="w-5 h-5" />
                            <span>{{ item.name }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Logout Button -->
        <div class="mt-auto pt-6">
            <a href="#" @click.prevent="outGoingData('logout')" class="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 bg-slate-100 hover:bg-red-100 hover:text-red-700 transition-colors">
                <LogOut class="w-5 h-5" />
                <span class="font-medium">Cerrar Sesion</span>
            </a>
        </div>
    </aside>
</template>

<style scoped>
/* Add a custom scrollbar for the navigation if it overflows */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
  border: 3px solid transparent;
}
</style>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import auroraLogo from '@/assets/logo/auroraLogob.png';
import LayoutDashboard from './icons/LayoutDashboard.vue';
import FileText from './icons/FileText.vue';
import ServerIcon from './icons/ServerIcon.vue';
import DollarSign from './icons/DollarSign.vue';
import BuildingIcon from './icons/BuildingIcon.vue';
import UsersIcon from './icons/UsersIcon.vue';
import TruckIcon from './icons/TruckIcon.vue';
import LogOut from './icons/LogOut.vue';
import UserCircle from './icons/UserCircle.vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps(
	['LegalName', 'logined']
)

const outGoingData = defineEmits(
	['logout', 'close-sidebar']
)

const router = useRouter();

const menuSections = [
    {
        title: 'Menu Principal',
        items: [
            { name: 'Panel Principal', icon: LayoutDashboard, route: 'DashboardHome' },
            { name: 'Solicitudes', icon: FileText, route: 'Solicitudes' },
            { name: 'Dispositivos', icon: ServerIcon, route: 'Dispositivos' },
            // { name: 'Analitica', icon: BarChart2, route: 'Analitica' }, // Not implemented yet
            { name: 'Tarifa', icon: DollarSign, route: 'Tarifas' },
        ]
    },
    {
        title: 'Entidades',
        items: [
            { name: 'Clientes', icon: BuildingIcon, route: 'Clientes' },
            { name: 'Usuarios', icon: UsersIcon, route: 'Usuarios' },
            { name: 'Transportistas', icon: TruckIcon, route: 'Transportistas' },
        ]
    },
    {
        title: 'Otras opciones',
        items: [
            // { name: 'Configuracion', icon: SettingsIcon, route: 'Configuracion' }, // Not implemented yet
            // { name: 'Informacion', icon: InfoIcon, route: 'Informacion' }, // Not implemented yet
        ]
    }
];

const activeItem = ref('Panel Principal');

const setActive = (item) => {
    if (item.route) {
        activeItem.value = item.name;
        router.push({ name: item.route });
        outGoingData('close-sidebar');
    }
};

const updateView = (routeName) => {
  const item = menuSections.flatMap(section => section.items).find(item => item.route === routeName);
  if (item) {
    activeItem.value = item.name;
  }
};

defineExpose({ updateView });

import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(() => route.name, (newRouteName) => {
    updateView(newRouteName);
}, { immediate: true });


</script>

<template>
    <div class="h-full flex flex-col p-4">
        <!-- Logo & Close Button -->
        <div class="flex items-center justify-between py-4 mb-4">
            <img :src="auroraLogo" alt="Aurora Logo" class="h-12" />
            <button @click="outGoingData('close-sidebar')" class="lg:hidden text-slate-500 hover:text-slate-700">
                <XMarkIcon class="w-6 h-6" />
            </button>
        </div>

        <!-- User Profile Section -->
        <div class="flex items-center gap-3 p-3 mb-6 rounded-lg bg-slate-50 border border-slate-200">
            <UserCircle class="w-8 h-8 text-slate-500" />
            <span class="font-semibold text-slate-700">{{ props.LegalName }}</span>
        </div>

        <!-- Menu Navigation -->
        <nav class="flex flex-col gap-6 overflow-y-auto flex-1">
            <div v-for="section in menuSections" :key="section.title">
                <h3 class="px-3 mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase" v-if="section.items.length > 0">
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
    </div>
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

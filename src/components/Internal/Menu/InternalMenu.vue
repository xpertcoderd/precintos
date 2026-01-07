<script setup>
import { ref, computed } from 'vue';
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
import SettingsIcon from './icons/SettingsIcon.vue';
import InfoIcon from './icons/InfoIcon.vue';
import { 
    XMarkIcon, 
    DocumentMagnifyingGlassIcon, 
    ArchiveBoxIcon, 
    ChevronDownIcon 
} from '@heroicons/vue/24/outline';

const props = defineProps(
	['LegalName', 'logined']
)

const outGoingData = defineEmits(
	['logout', 'close-sidebar']
)

const router = useRouter();

// Helper to get initials
const userInitials = computed(() => {
    if (!props.LegalName) return 'AC'; // Default fallback
    const names = props.LegalName.split(' ');
    if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
});

const menuSections = [
    {
        title: 'Menu Principal', items: [
            { name: 'Panel Principal', icon: LayoutDashboard, route: 'DashboardHome' },
            { name: 'Solicitudes', icon: FileText, route: 'Solicitudes' },
            { name: 'Dispositivos', icon: ServerIcon, route: 'Dispositivos' },
            { name: 'Reportes', icon: DocumentMagnifyingGlassIcon, route: 'Reportes' },
            { name: 'Tarifas', icon: DollarSign, route: 'Tarifas' },
            { name: 'Recolectores', icon: ArchiveBoxIcon, route: 'Recolectores' },
        ]
    }, {
        title: 'Entidades', items: [
            { name: 'Usuarios', icon: UsersIcon, route: 'Usuarios' },
            { name: 'Clientes', icon: BuildingIcon, route: 'Clientes' },
            { name: 'Transportistas', icon: TruckIcon, route: 'Transportistas' },
        ]
    }, {
        title: 'Otras opciones', items: [
            { name: 'Configuracion', icon: SettingsIcon, route: 'Configuracion' },
            { name: 'Informacion', icon: InfoIcon, route: 'Informacion' },
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
            <img :src="auroraLogo" alt="Aurora Logo" class="h-10" />
            <button @click="outGoingData('close-sidebar')" class="lg:hidden text-slate-500 hover:text-slate-700">
                <XMarkIcon class="w-6 h-6" />
            </button>
        </div>

        <!-- User Profile Section -->
        <div class="flex items-center justify-between p-3 mb-6 rounded-lg border border-slate-200 bg-white">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center font-bold text-sm">
                    {{ userInitials }}
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-sm text-slate-800">{{ props.LegalName || 'Aurora Central' }}</span>
                    <span class="text-xs text-slate-500">Administrador</span>
                </div>
            </div>
            <ChevronDownIcon class="w-5 h-5 text-slate-400" />
        </div>

        <!-- Menu Navigation -->
        <nav class="flex flex-col gap-6 overflow-y-auto flex-1">
            <div v-for="section in menuSections" :key="section.title">
                <h3 class="px-3 mb-2 text-xs font-bold tracking-wider text-slate-900" v-if="section.items.length > 0">
                    {{ section.title }}
                </h3>
                <ul class="flex flex-col gap-1">
                    <li v-for="item in section.items" :key="item.name">
                        <a
                            href="#"
                            @click.prevent="setActive(item)"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group"
                            :class="[
                                activeItem === item.name
                                    ? 'bg-sky-50 text-sky-500 font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                            ]"
                        >
                            <component 
                                :is="item.icon" 
                                class="w-5 h-5"
                                :class="activeItem === item.name ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-600'" 
                            />
                            <span class="flex-1">{{ item.name }}</span>
                            <span v-if="item.badge" class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {{ item.badge }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Logout Button -->
        <div class="mt-auto pt-6">
            <a 
                href="#" 
                @click.prevent="outGoingData('logout')" 
                class="flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-white bg-sky-400 hover:bg-sky-500 transition-colors shadow-sm"
            >
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

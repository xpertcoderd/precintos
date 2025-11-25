<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <InternalMenu 
        :logined="logined" 
        :LegalName="transferList.client.name" 
        :isLoguer="true"
        @logout="logout" 
        @close-sidebar="sidebarOpen = false"
        ref="menuRef" 
      />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Mobile Header -->
      <header class="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <button @click="sidebarOpen = true" class="text-slate-500 focus:outline-none">
          <Bars3Icon class="h-6 w-6" />
        </button>
        <span class="font-semibold text-slate-700">Aurora Precintos</span>
        <div class="w-6"></div> <!-- Spacer for centering if needed -->
      </header>

      <!-- Main Scrollable Area -->
      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import InternalMenu from '@/components/Internal/Menu/InternalMenu.vue'

let logined = ref(true)
let sidebarOpen = ref(false)

let transferList = ref({
	client: {
		name: "Aurora Central "
	},
	fullTransfer: []
});

function logout() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    window.location.replace("/login");
}

</script>

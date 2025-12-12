<template>
  <div class="login-container flex items-center justify-center h-screen bg-cover bg-center relative">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#272b37] via-[#272b37]/90 to-transparent"></div>

    <div class="relative z-10 w-full max-w-md p-8">
      <div class="text-white text-2xl font-semibold text-center mb-8">Precintos</div>
      
      <form @submit.prevent="consultar" class="space-y-6">
        <div class="text-white text-4xl font-bold text-center mb-8">Bienvenidos</div>
        
        <!-- Error Alert -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <div v-if="claveIncorrecta" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 mb-6">
              <ExclamationTriangleIcon class="w-5 h-5 flex-shrink-0" />
              <span class="text-sm font-medium">Usuario o contraseña incorrectos</span>
          </div>
        </transition>

        <div class="relative">
          <input 
            v-model="datosUser.username" 
            class="w-full bg-[#545663] text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300"
            :class="claveIncorrecta ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-[#43bbd6] border-transparent'"
            placeholder="Usuario" 
            type="text" 
            required
          >
          <ExclamationCircleIcon v-if="claveIncorrecta" class="absolute right-3 top-3 h-6 w-6 text-red-500" />
        </div>

        <div class="relative">
          <input 
            @keyup.enter="consultar" 
            class="w-full bg-[#545663] text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300"
             :class="claveIncorrecta ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-[#43bbd6] border-transparent'"
            v-model="datosUser.passwd" 
            placeholder="Contrasena"
            type="password" 
            required
          >
          <ExclamationCircleIcon v-if="claveIncorrecta" class="absolute right-3 top-3 h-6 w-6 text-red-500" />
        </div>

        <button 
          type="submit" 
          class="w-full bg-[#43bbd6] hover:bg-[#3aa8c2] text-white font-bold py-3 px-4 rounded transition duration-300"
        >
          ENTRAR
        </button>

        <div class="text-white text-sm text-center mt-8 hidden md:block">
           © 2024 Copyright: Todos los derechos reservados Aurora.com.do
        </div>
      </form>
    </div>

    <img src='@/assets/auroraLogo.png' alt="Logo" class="absolute bottom-10 right-5 w-72 hidden md:block">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/services/authService';
import { useRouter } from 'vue-router';
import { ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid';

const datosUser = ref({ username: "", passwd: "" });
const claveIncorrecta = ref(false);
const router = useRouter();

async function consultar() {
  claveIncorrecta.value = false;
  try {
    const resAuth = await login(datosUser.value);
    if (resAuth.success) {
      console.log("Bienvenido");
      router.push({ name: 'DashboardHome' });
    } else {
      claveIncorrecta.value = true;
      console.log("Error de Respuesta", resAuth);
    }
  } catch (error) {
    claveIncorrecta.value = true;
    console.log("Error al Hacer La petición", error);
  }
}
</script>

<style scoped>
.login-container {
  background-image: url('@/assets/bg.jpg');
}
</style>

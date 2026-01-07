<template>
  <div class="flex flex-col md:flex-row h-full">
    <!-- Left Panel: Image -->
    <div class="w-full md:w-1/3 relative hidden md:block min-h-[600px]">
      <img 
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        alt="Logistics Background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
    </div>

    <!-- Right Panel: Form -->
    <div class="w-full md:w-2/3 p-8 flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div>
          <img src="@/assets/logo.png" alt="Aurora Logo" class="h-8 mb-4" v-if="false" />
          <h2 class="text-2xl font-bold text-slate-800">Aurora Technologies</h2>
          <h3 class="text-xl font-semibold text-slate-700 mt-4">{{ initialData ? 'Edición de usuario' : 'Creación de usuario' }}</h3>
          <p class="text-slate-500 text-sm mt-1">Complete la información para registrar un nuevo usuario en el sistema.</p>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto pr-2">
        <div class="space-y-4">
          <!-- Company Selection -->
          <div>
            <label for="clientId" class="block text-sm/6 font-medium text-slate-700 mb-1">Compañía</label>
            <select v-model="formData.clientId" id="clientId" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
              <option :value="null" disabled>Seleccionar Compañía</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
            </select>
            <p v-if="errors.clientId" class="text-xs text-red-500 mt-1">{{ errors.clientId }}</p>
          </div>

          <!-- User Data Section -->
          <div>
            <h4 class="text-sm font-medium text-slate-900 mb-3">Datos de usuario</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm/6 font-medium text-slate-700 mb-1">Nombre</label>
                <input v-model="formData.firstName" type="text" id="firstName" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Nombre">
                <p v-if="errors.firstName" class="text-xs text-red-500 mt-1">{{ errors.firstName }}</p>
              </div>
              <div>
                <label for="lastName" class="block text-sm/6 font-medium text-slate-700 mb-1">Apellidos</label>
                <input v-model="formData.lastName" type="text" id="lastName" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Apellidos">
                <p v-if="errors.lastName" class="text-xs text-red-500 mt-1">{{ errors.lastName }}</p>
              </div>
              <div>
                <label for="idcard" class="block text-sm/6 font-medium text-slate-700 mb-1">Cédula</label>
                <input v-model="formData.idcard" type="text" id="idcard" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Cédula">
                <p v-if="errors.idcard" class="text-xs text-red-500 mt-1">{{ errors.idcard }}</p>
              </div>
              <div>
                <label for="address" class="block text-sm/6 font-medium text-slate-700 mb-1">Dirección</label>
                <input v-model="formData.address" type="text" id="address" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Dirección">
              </div>
              <div>
                <label for="phone" class="block text-sm/6 font-medium text-slate-700 mb-1">Teléfono</label>
                <input v-model="formData.phone" type="text" id="phone" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Teléfono">
              </div>
              <div>
                <label for="email" class="block text-sm/6 font-medium text-slate-700 mb-1">Correo</label>
                <input v-model="formData.email" type="email" id="email" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Correo electrónico">
                <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
              </div>
            </div>
          </div>

          <!-- Account Config Section -->
          <div class="border-t border-slate-100 pt-4">
            <h4 class="text-sm font-medium text-slate-900 mb-3">Configuración de cuenta</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="username" class="block text-sm/6 font-medium text-slate-700 mb-1">Nombre de Usuario</label>
                <input v-model="formData.username" type="text" id="username" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Username">
                <p v-if="errors.username" class="text-xs text-red-500 mt-1">{{ errors.username }}</p>
              </div>
              <div>
                <label for="passwd" class="block text-sm/6 font-medium text-slate-700 mb-1">Contraseña</label>
                <input v-model="formData.passwd" type="password" id="passwd" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Contraseña">
                <p v-if="errors.passwd" class="text-xs text-red-500 mt-1">{{ errors.passwd }}</p>
              </div>
              <div>
                <label for="rolId" class="block text-sm/6 font-medium text-slate-700 mb-1">Rol de Usuario</label>
                <select v-model="formData.rolId" id="rolId" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
                  <option :value="null" disabled>Seleccionar Rol</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>
                <p v-if="errors.rolId" class="text-xs text-red-500 mt-1">{{ errors.rolId }}</p>
              </div>
              <div>
                <label for="pin" class="block text-sm/6 font-medium text-slate-700 mb-1">PIN</label>
                <input v-model="formData.pin" type="text" id="pin" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="PIN (4 dígitos)" maxlength="4">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="mt-8 flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
        <button @click="$emit('cancel')" class="px-6 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
          Cancelar
        </button>
        <button @click="$emit('save', formData)" class="px-6 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 shadow-lg shadow-sky-500/30 transition-all hover:scale-105">
          Finalizar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
  roles: {
    type: Array,
    default: () => [],
  },
  clients: {
    type: Array,
    default: () => [],
  },
});

 defineEmits(['cancel', 'save']);

const getCleanFormData = () => ({
  clientId: null,
  firstName: '',
  lastName: '',
  idcard: '',
  address: '',
  phone: '',
  email: '',
  username: '',
  passwd: '',
  rolId: null,
  pin: '',
});

const formData = ref(getCleanFormData());

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData, passwd: '' };
  } else {
    formData.value = getCleanFormData();
  }
}, { immediate: true, deep: true });

</script>


<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="firstName" class="block mb-2 text-sm font-medium text-slate-700">Nombre</label>
      <input v-model="formData.firstName" type="text" id="firstName" placeholder="Nombre" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
      <p v-if="errors.firstName" class="mt-2 text-sm text-red-600">{{ errors.firstName }}</p>
    </div>
    <div>
      <label for="lastName" class="block mb-2 text-sm font-medium text-slate-700">Apellido</label>
      <input v-model="formData.lastName" type="text" id="lastName" placeholder="Apellido" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
      <p v-if="errors.lastName" class="mt-2 text-sm text-red-600">{{ errors.lastName }}</p>
    </div>
    <div>
      <label for="username" class="block mb-2 text-sm font-medium text-slate-700">Usuario</label>
      <input v-model="formData.username" type="text" id="username" placeholder="Usuario" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
      <p v-if="errors.username" class="mt-2 text-sm text-red-600">{{ errors.username }}</p>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-slate-700">Email</label>
      <input v-model="formData.email" type="email" id="email" placeholder="Email" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
      <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
    </div>
    <div>
      <label for="passwd" class="block mb-2 text-sm font-medium text-slate-700">Contraseña</label>
      <input v-model="formData.passwd" type="password" id="passwd" placeholder="Dejar en blanco para no cambiar" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
      <p v-if="errors.passwd" class="mt-2 text-sm text-red-600">{{ errors.passwd }}</p>
    </div>
    <div>
      <label for="rolId" class="block mb-2 text-sm font-medium text-slate-700">Rol</label>
      <select v-model="formData.rolId" id="rolId" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
        <option :value="1">Admin</option>
        <option :value="2">User</option>
      </select>
      <p v-if="errors.rolId" class="mt-2 text-sm text-red-600">{{ errors.rolId }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineExpose } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const getCleanFormData = () => ({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  passwd: '', // Password should be empty by default for security
  rolId: 2, // Default to 'User'
});

const formData = ref(getCleanFormData());

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData, passwd: '' }; // Clear password for existing users
  } else {
    formData.value = getCleanFormData();
  }
}, { immediate: true, deep: true });

defineExpose({ formData });
</script>

<script setup>
import { ref, defineProps, watch, defineExpose } from 'vue';

const props = defineProps({
  carriers: { /* ... */ },
  initialData: {
    type: Object,
    default: null
  },
  // Add errors prop for validation feedback
  errors: {
    type: Object,
    default: () => ({})
  }
});

const createEmptyForm = () => ({
  name: '',
  contact: '',
  rnc: '',
  phone: '',
  email: '',
  address: '',
  web: ''
});

const formData = ref(createEmptyForm());

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData };
  } else {
    formData.value = createEmptyForm();
  }
}, { immediate: true, deep: true });

defineExpose({ formData });
</script>

<template>
  <form class="space-y-4"> <!-- Changed from space-y-10 to space-y-4 -->
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Datos de la Compañía</h2>
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label for="trans-name" class="block text-sm/6 font-medium text-slate-700">Nombre</label>
          <div class="mt-2">
            <input v-model="formData.name" type="text" id="trans-name" placeholder="Ej: Transportes Veloz S.A." class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p> <!-- Added error message -->
        </div>
        <div>
          <label for="trans-rnc" class="block text-sm/6 font-medium text-slate-700">RNC / Cédula</label>
          <div class="mt-2">
            <input v-model="formData.rnc" type="text" id="trans-rnc" placeholder="000-0000000-0" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.rnc" class="mt-2 text-sm text-red-600">{{ errors.rnc }}</p> <!-- Added error message -->
        </div>
        <div class="sm:col-span-2">
          <label for="trans-address" class="block text-sm/6 font-medium text-slate-700">Dirección</label>
          <div class="mt-2">
            <input v-model="formData.address" type="text" id="trans-address" placeholder="Calle, Número, Ciudad" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.address" class="mt-2 text-sm text-red-600">{{ errors.address }}</p> <!-- Added error message -->
        </div>
        <div>
          <label for="trans-phone" class="block text-sm/6 font-medium text-slate-700">Teléfono</label>
          <div class="mt-2">
            <input v-model="formData.phone" type="tel" id="trans-phone" placeholder="Ej: (809) 555-5678" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p> <!-- Added error message -->
        </div>
        <div>
          <label for="trans-email" class="block text-sm/6 font-medium text-slate-700">Correo</label>
          <div class="mt-2">
            <input v-model="formData.email" type="email" id="trans-email" placeholder="info@ejemplo.com" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p> <!-- Added error message -->
        </div>
        <div class="sm:col-span-2">
          <label for="trans-web" class="block text-sm/6 font-medium text-slate-700">Página Web (Opcional)</label>
          <div class="mt-2">
            <input v-model="formData.web" type="url" id="trans-web" placeholder="https://www.ejemplo.com" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.web" class="mt-2 text-sm text-red-600">{{ errors.web }}</p> <!-- Added error message -->
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Datos del Representante</h2>
      <div class="mt-6 grid grid-cols-1">
        <div>
          <label for="rep-name" class="block text-sm/6 font-medium text-slate-700">Nombre completo</label>
          <div class="mt-2">
            <input v-model="formData.contact" type="text" id="rep-name" placeholder="Ej: Ana García" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
          </div>
          <p v-if="errors.contact" class="mt-2 text-sm text-red-600">{{ errors.contact }}</p> <!-- Added error message -->
        </div>
      </div>
    </div>
  </form>
</template>

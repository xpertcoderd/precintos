<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-slate-700">Nombre</label>
      <input
        id="name"
        v-model="editableData.name"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Nombre"
        required
      />
      <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
    </div>
    <div>
      <label for="rnc" class="block mb-2 text-sm font-medium text-slate-700">RNC</label>
      <input
        id="rnc"
        v-model="editableData.rnc"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="RNC"
        required
      />
      <p v-if="errors.rnc" class="mt-2 text-sm text-red-600">{{ errors.rnc }}</p>
    </div>
    <div class="md:col-span-2">
      <label for="address" class="block mb-2 text-sm font-medium text-slate-700">Dirección</label>
      <input
        id="address"
        v-model="editableData.address"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Dirección"
        required
      />
      <p v-if="errors.address" class="mt-2 text-sm text-red-600">{{ errors.address }}</p>
    </div>
    <div>
      <label for="phone" class="block mb-2 text-sm font-medium text-slate-700">Teléfono</label>
      <input
        id="phone"
        v-model="editableData.phone"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Teléfono"
        required
      />
      <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ name: '', rnc: '', address: '', phone: '' }),
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const editableData = ref({ ...props.initialData });

watch(() => props.initialData, (newData) => {
  editableData.value = { ...newData };
}, { deep: true });

defineExpose({
  getData: () => editableData.value,
});
</script>

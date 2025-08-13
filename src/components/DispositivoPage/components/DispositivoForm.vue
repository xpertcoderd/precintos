<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="nombre" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">Nombre</label>
      <input
        id="nombre"
        v-model="editableData.nombre"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Nombre"
        required
      />
      <p v-if="errors.nombre" class="mt-2 text-sm text-red-600">{{ errors.nombre }}</p>
    </div>
    <div>
      <label for="imei" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">IMEI</label>
      <input
        id="imei"
        v-model="editableData.imei"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="IMEI"
        required
      />
      <p v-if="errors.imei" class="mt-2 text-sm text-red-600">{{ errors.imei }}</p>
    </div>
    <div>
      <label for="tipo" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">Tipo</label>
      <input
        id="tipo"
        v-model="editableData.tipo"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Tipo"
        required
      />
      <p v-if="errors.tipo" class="mt-2 text-sm text-red-600">{{ errors.tipo }}</p>
    </div>
    <div>
      <label for="estado" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">Estado</label>
      <input
        id="estado"
        v-model="editableData.estado"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Estado"
        required
      />
      <p v-if="errors.estado" class="mt-2 text-sm text-red-600">{{ errors.estado }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ nombre: '', imei: '', tipo: '', estado: '' }),
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

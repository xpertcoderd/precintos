<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="tipo" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">Tipo de Solicitud</label>
      <input
        id="tipo"
        v-model="formData.tipo"
        type="text"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Tipo de Solicitud"
      >
      <p v-if="errors.tipo" class="mt-2 text-sm text-red-600">{{ errors.tipo[0] }}</p>
    </div>
    <div>
      <label for="estado" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">Estado</label>
      <select
        id="estado"
        v-model="formData.estado"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Completada">Completada</option>
        <option value="Cancelada">Cancelada</option>
      </select>
      <p v-if="errors.estado" class="mt-2 text-sm text-red-600">{{ errors.estado[0] }}</p>
    </div>
    <div class="md:col-span-2">
      <label for="descripcion" class="block mb-2 text-sm font-medium text-slate-700 text-start pl-1">Descripción</label>
      <textarea
        id="descripcion"
        v-model="formData.descripcion"
        rows="4"
        class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
        placeholder="Descripción"
      />
      <p v-if="errors.descripcion" class="mt-2 text-sm text-red-600">{{ errors.descripcion[0] }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
})

const formData = ref({
  tipo: '',
  descripcion: '',
  estado: 'Pendiente',
})

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData }
    } else {
      formData.value = {
        tipo: '',
        descripcion: '',
        estado: 'Pendiente',
      }
    }
  },
  { immediate: true, deep: true }
)

defineExpose({ formData })
</script>

<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col gap-6 bg-gray-50 rounded-xl p-6 shadow min-h-full">
    <div class="flex flex-col gap-2">
      <span class="font-semibold text-gray-700 mb-2">Datos</span>
      <div class="flex gap-2 items-center mb-2">
        <select id="bl" class="bg-gray-100 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full" v-model="localModel.bl" required>
          <option :value="null" selected disabled>BL</option>
          <option v-for="(bl, index) in incomingData.listBl" :key="index" :value="bl.text">{{ bl.text}}</option>
        </select>
        <input v-model="localModel.container" class="bg-gray-100 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full" :class="{ 'ring-2 ring-red-400': errors.container }" maxlength="20" placeholder="Contenedor" type="text">
        <button type="button" @click="addBL_Container" class="flex items-center justify-center text-green-500 text-2xl focus:outline-none"><i class="bi bi-plus-square-fill"></i></button>
      </div>
      <p v-if="errors.container" class="text-xs text-red-500 mb-2">{{ errors.container }}</p>
      <TablaAddingBL_Container class="w-full max-h-64 overflow-y-auto" :columnName1="'BL'" :columnName2="'CONTENEDOR'" :blList="localModel.listBl_container" @removeBl="removeBL" />
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <button @click="$emit('cerrar')" type="button" class="px-8 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">Cancelar</button>
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Siguiente</button>
    </div>
  </form>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';
import TablaAddingBL_Container from '@/components/Internal/tablas/TablaAddingBL_Container.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
  incomingData: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['update:modelValue', 'cerrar', 'next']);

const localModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

function addBL_Container() {
  if (localModel.value.bl && localModel.value.container) {
    if (!localModel.value.listBl_container) localModel.value.listBl_container = new Map();
    localModel.value.listBl_container.set(`${localModel.value.bl}-${localModel.value.container}`, { text1: localModel.value.bl, text2: localModel.value.container, id: 1 });
    localModel.value.container = null;
  }
}

function removeBL(bl_Selected) {
  if (localModel.value.listBl_container) localModel.value.listBl_container.delete(bl_Selected);
}
</script>

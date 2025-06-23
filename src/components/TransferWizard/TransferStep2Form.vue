<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col gap-6 bg-gray-50 rounded-xl p-6 shadow min-h-full">
    <div class="flex flex-col gap-2 ">
      <span class="font-semibold text-gray-700 mb-2">BL</span>
      <div class="flex gap-2 items-center mb-2">
        <input v-model="localModel.bl" class="bg-gray-100 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full" :class="{ 'ring-2 ring-red-400': errors.bl }" maxlength="20" placeholder="BL" type="text">
        <button type="button" @click="addBL" class="flex items-center justify-center text-green-500 text-2xl focus:outline-none"><i class="bi bi-plus-square-fill"></i></button>
      </div>
      <p v-if="errors.bl" class="text-xs text-red-500 mb-2">{{ errors.bl }}</p>
      <TablaAddingBL class="w-full max-h-64 overflow-y-auto" :columnName="'BL'" :blList="localModel.listBl" @removeBl="removeBL" />
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <button @click="$emit('cerrar')" type="button" class="px-8 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">Cancelar</button>
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Siguiente</button>
    </div>
  </form>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import TablaAddingBL from '@/components/Internal/tablas/TablaAddingBL.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['update:modelValue', 'cerrar', 'next']);

const localModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

function addBL() {
  if (localModel.value.bl && localModel.value.bl !== '') {
    const actualBl = localModel.value.bl.toString().toUpperCase();
    if (actualBl) {
      if (!localModel.value.listBl) localModel.value.listBl = [];

        localModel.value.listBl.push( { text: actualBl, id: 1 });
        localModel.value.bl = null;

    }
  }
}

function removeBL(bl_Selected) {
  if (localModel.value.listBl) localModel.value.listBl.delete(bl_Selected);
}
</script>

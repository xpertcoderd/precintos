<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col gap-6 bg-gray-50 rounded-xl p-6 shadow">
    <div class="flex flex-col gap-2">
      <div class="bg-white rounded-lg p-4 mb-2">
        <TablaAddingConfirmation :headerData="localModel.headerData" :bl_ContainerList="localModel.bl_ContainerList" class="w-full max-h-64 overflow-y-auto" />
        <div class="flex justify-end text-xs mt-2">
          <strong>Total: </strong>
          <span class="ml-1">{{ `RD$${localModel.totalAmount?.toLocaleString('es-419')}` }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <input type="checkbox" id="check" v-model="localModel.check" class="accent-sky-400" />
        <label for="check">Acepto los términos y condiciones de esta aplicación</label>
      </div>
      <p v-if="errors.check" class="text-xs text-red-500">{{ errors.check }}</p>
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <button @click="$emit('cerrar')" type="button" class="px-8 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">Cancelar</button>
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Generar Orden</button>
    </div>
  </form>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';
import TablaAddingConfirmation from '@/components/Internal/tablas/TablaAddingConfirmation.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['update:modelValue', 'cerrar', 'next']);

const localModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

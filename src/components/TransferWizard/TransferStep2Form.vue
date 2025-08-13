<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import TablaAddingBL from '@/components/Internal/tablas/TablaAddingBL.vue';
import PlusIcon from "@/components/icons/PlusIcon.vue";

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
  if (localModel.value.bl && localModel.value.bl.trim() !== '') {
    const actualBl = localModel.value.bl.toString().toUpperCase();
    if (!localModel.value.listBl) {
      localModel.value.listBl = [];
    }
    if (!localModel.value.listBl.some(item => item.text === actualBl)) {
      localModel.value.listBl.push({ text: actualBl, id: Date.now() });
    }
    localModel.value.bl = '';
  }
}

function removeBL(bl_Selected) {
  if (localModel.value.listBl) {
    localModel.value.listBl = localModel.value.listBl.filter(bl => bl.text !== bl_Selected);
  }
}
</script>

<template>
  <form @submit.prevent="$emit('next')" class="space-y-10 p-4">
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Agregar BLs</h2>
      <div class="mt-6 flex items-start gap-x-3">
        <div class="flex-grow">
          <label for="bl-input" class="sr-only">Añadir BL</label>
          <input
              id="bl-input"
              v-model="localModel.bl"
              @keydown.enter.prevent="addBL"
              type="text"
              placeholder="Ingrese el número de BL"
              class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
              :class="{ 'outline-red-500': errors.bl }"
          />
          <p v-if="errors.bl" class="text-xs text-red-500 mt-1">{{ errors.bl }}</p>
        </div>
        <button @click="addBL" type="button" class="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 flex items-center gap-2">
          <PlusIcon class="w-5 h-5" />
          <span>Agregar</span>
        </button>
      </div>
    </div>

    <div class="-mx-4">
      <TablaAddingBL
          v-if="localModel.listBl && localModel.listBl.length > 0"
          :columnName="'BL'"
          :blList="localModel.listBl"
          @removeBl="removeBL"
      />
      <div v-else class="px-6 py-12 text-center text-slate-500 border-t border-slate-200">
        <p>No se han agregado BLs.</p>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-4 border-t border-gray-200 pt-6">
      <button @click="$emit('cerrar')" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancelar</button>
      <button type="submit" class="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">Siguiente</button>
    </div>
  </form>
</template>

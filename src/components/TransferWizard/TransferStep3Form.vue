<script setup>
import { computed } from 'vue';
import TablaAddingBL_Container from '@/components/Internal/tablas/TablaAddingBL_Container.vue';
import PlusIcon from "@/components/icons/PlusIcon.vue";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

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
const existingKeyError = {active: false, text: 'Este contenedor ya existe en la lista.'}
function addBL_Container() {
  const bl = localModel.value.bl;
  const container = localModel.value.container?.trim().toUpperCase();

  if (bl && container) {
    if (!localModel.value.listBl_container) {
      localModel.value.listBl_container = new Map();
    }
    const key = `${bl}-${container}`;
    const hasKey = localModel.value.listBl_container.has(key)
    existingKeyError.active = hasKey;
    if (!hasKey) {
      localModel.value.listBl_container.set(key, { text1: bl, text2: container, id: Date.now() });
    }
    localModel.value.container = '';
  }
}

function removeBL(bl_Selected) {
  if (localModel.value.listBl_container) {
    return localModel.value.listBl_container.delete(bl_Selected);
  }
}
</script>

<template>
  <form @submit.prevent="$emit('next')" class="space-y-6">
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Asignar Contenedores a BLs</h2>
      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
        <div class="sm:col-span-1">
          <label for="bl-select" class="block text-sm/6 font-medium text-slate-700">BL</label>
          <div class="mt-2 grid grid-cols-1">
            <select id="bl-select" v-model="localModel.bl" required class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
              <option :value="null" selected disabled>Seleccione un BL</option>
              <option v-for="(bl, index) in incomingData.listBl" :key="index" :value="bl.text">{{ bl.text }}</option>
            </select>
            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-400" aria-hidden="true" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="container-input" class="block text-sm/6 font-medium text-slate-700">Contenedor</label>
          <div class="mt-2 flex items-start gap-x-3">
            <div class="flex-grow">
              <input
                  id="container-input"
                  v-model="localModel.container"
                  @keydown.enter.prevent="addBL_Container"
                  type="text"
                  placeholder="Número de contenedor"
                  class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                  :class="{ 'outline-red-500': errors.container }"
              />
              <p v-if="errors.container" class="text-xs text-red-500 mt-1">{{ errors.container }}</p>
              <p v-if="existingKeyError.active" class="text-xs text-red-500 mt-1">{{ existingKeyError.text }}</p>
            </div>
            <button @click="addBL_Container" type="button" class="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 flex items-center gap-2">
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="-mx-4 sm:-mx-6">
      <TablaAddingBL_Container
          v-if="localModel.listBl_container && localModel.listBl_container.size > 0"
          :columnName1="'BL'"
          :columnName2="'CONTENEDOR'"
          :blList="localModel.listBl_container"
          @removeBl="removeBL"
      />
      <div v-else class="px-6 py-12 text-center text-slate-500 border-t border-slate-200">
        <p>No se han asignado contenedores.</p>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-end gap-x-4 border-t border-gray-200 pt-4">
      <button @click="$emit('cerrar')" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancelar</button>
      <button type="submit" class="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">Siguiente</button>
    </div>
  </form>
</template>

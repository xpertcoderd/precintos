<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue';
import TablaAddingBL from '@/components/Internal/tablas/TablaAddingBL.vue';
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { useTransferValidation } from "@/components/TransferWizard/composables/useTransferValidation";

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
  transferType: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue', 'cerrar', 'next']);

const localModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const blError = ref('');
const isValidatingBL = ref(false);
const { validateBLExistence } = useTransferValidation();

const isBookingEnabled = computed(() => {
  const typeName = props.transferType?.name?.toLowerCase();
  return typeName === 'import' || typeName === 'export';
});

const isBookingRequired = computed(() => {
  return props.transferType?.name?.toLowerCase() === 'export';
});

async function addBL() {
  blError.value = '';
  if (localModel.value.bl && localModel.value.bl.trim() !== '') {
    const actualBl = localModel.value.bl.toString().toUpperCase();

    isValidatingBL.value = true;
    try {
      const exists = await validateBLExistence(actualBl);
      if (exists) {
        blError.value = `El BL '${actualBl}' ya existe.`;
        return;
      }

      if (!localModel.value.listBl) {
        localModel.value.listBl = [];
      }
      if (!localModel.value.listBl.some(item => item.text === actualBl)) {
        localModel.value.listBl.push({ text: actualBl, id: Date.now() });
      }
      localModel.value.bl = '';
    } finally {
      isValidatingBL.value = false;
    }
  }
}

function removeBL(bl_Selected) {
  if (localModel.value.listBl) {
    localModel.value.listBl = localModel.value.listBl.filter(bl => bl.text !== bl_Selected);
  }
}
</script>

<template>
  <form @submit.prevent="$emit('next')" class="space-y-6">
    <div class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <div>
          <label for="booking-input" class="block text-sm/6 font-medium text-slate-700">
            Booking <span v-if="isBookingRequired" class="text-red-500">*</span>
          </label>
          <div class="mt-2">
            <input
              id="booking-input"
              v-model="localModel.booking"
              type="text"
              placeholder="Ingrese el número de booking"
              :disabled="!isBookingEnabled"
              class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
              :class="{ 'outline-red-500': errors.booking }"
            />
            <p v-if="errors.booking" class="text-xs text-red-500 mt-1">{{ errors.booking }}</p>
          </div>
        </div>

        <div>
          <label for="bl-input" class="block text-sm/6 font-medium text-slate-700">Agregar BLs</label>
          <div class="mt-2 flex items-start gap-x-3">
            <div class="flex-grow">
              <input
                  id="bl-input"
                  v-model="localModel.bl"
                  @keydown.enter.prevent="addBL"
                  type="text"
                  placeholder="Ingrese el número de BL"
                  class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                  :class="{ 'outline-red-500': errors.bl || blError }"
              />
              <p v-if="errors.bl" class="text-xs text-red-500 mt-1">{{ errors.bl }}</p>
              <p v-if="blError" class="text-xs text-red-500 mt-1">{{ blError }}</p>
            </div>
            <button @click="addBL" type="button" :disabled="isValidatingBL" class="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 flex items-center gap-2 h-full disabled:bg-gray-400 disabled:cursor-not-allowed">
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">{{ isValidatingBL ? 'Validando...' : 'Agregar' }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-full">
        <label for="description-input" class="block text-sm/6 font-medium text-slate-700">Descripción (Opcional)</label>
        <div class="mt-2">
          <textarea
            id="description-input"
            v-model="localModel.description"
            rows="3"
            placeholder="Descripción de la carga"
            class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="-mx-4 sm:-mx-6">
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

    <div class="mt-4 flex items-center justify-end gap-x-4 border-t border-gray-200 pt-4">
      <button @click="$emit('cerrar')" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancelar</button>
      <button type="submit" class="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">Siguiente</button>
    </div>
  </form>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import { calculateTariffValue as calculateTariff } from "@/components/TransferWizard/helpers/fetchBrokerData";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
  incomingData: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['update:modelValue', 'cerrar', 'next']);

const unitPrice = ref(props.modelValue.unitPrice || null);
const locationError = ref('');
const isCalculatingTariff = ref(false);

const localModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const isNextDisabled = computed(() => {
  return !!locationError.value;
});

watch(
    () => localModel.value.unitPrice,
    (newPrice) => {
      unitPrice.value = newPrice;
    }
);

watch(
    () => localModel.value.endPlace,
    (newPlace) => {
      if (newPlace) {
        localModel.value = {
          ...localModel.value,
          address: newPlace.address,
          city: newPlace.province,
        };
      }
    }
)

watch(
    () => [localModel.value.type, localModel.value.startPlace, localModel.value.endPlace],
    async ([type, start, end], [oldType, oldStart, oldEnd]) => {
      // Guard against infinite loops or redundant calls
      const isSame = 
          type?.id === oldType?.id && 
          start?.id === oldStart?.id && 
          end?.id === oldEnd?.id;

      if (isSame) return;
      if (start && end && start.id === end.id) {
        locationError.value = 'El origen y el destino no pueden ser el mismo.';
        unitPrice.value = 0;
        localModel.value.unitPrice = 0;
      } else {
        locationError.value = '';
        if (type && start && end) {
          isCalculatingTariff.value = true;
          try {
            const tariffData = await calculateTariff(type, start, end);
            
            unitPrice.value = tariffData.price; // Display Gross Price in the Input? Or Final?
            // User did not specify what to display in Step 1 input. 
            // Usually "Tarifa" implies the base rate. 
            // I will store the detailed breakdown in localModel.
            
            // Trigger the setter to ensure the parent updates correctly via v-model
            const newState = {
              ...localModel.value,
              unitPrice: tariffData.price,
              tariffData: tariffData
            };
            localModel.value = newState;
          } finally {
            isCalculatingTariff.value = false;
          }
        }
      }
    }
)
</script>

<template>
  <form @submit.prevent="$emit('next')" class="space-y-4">
    <div>
      <h2 class="text-base/7 font-semibold text-slate-900">Datos del Traslado</h2>
      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <label for="finalClient" class="block text-sm/6 font-medium text-slate-700">Cliente Final</label>
          <div class="mt-2 grid grid-cols-1">
            <select id="finalClient" v-model="localModel.finalClient"  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" :class="{ 'outline-red-500': errors.finalClient }">
              <option value="" selected disabled>Seleccione un cliente</option>
              <option v-for="(client, index) in incomingData.finalClients" :key="index" :value="client.client">{{ client.client.name }}</option>
            </select>
            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-400" aria-hidden="true" />
          </div>
          <p v-if="errors.finalClient" class="text-xs text-red-500 mt-1">{{ errors.finalClient }}</p>
        </div>
        <div>
          <label for="type" class="block text-sm/6 font-medium text-slate-700">Tipo de Traslado</label>
          <div class="mt-2 grid grid-cols-1">
            <select id="type" v-model="localModel.type" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" :class="{ 'outline-red-500': errors.type }">
              <option :value="null" selected disabled>Seleccione un tipo</option>
              <option v-for="(tipo, index) in incomingData.transferTypes" :key="index" :value="tipo">{{ tipo.name }}</option>
            </select>
            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-400" aria-hidden="true" />
          </div>
          <p v-if="errors.type" class="text-xs text-red-500 mt-1">{{ errors.type }}</p>
        </div>
        <div>
          <label for="startPlace" class="block text-sm/6 font-medium text-slate-700">Origen</label>
          <div class="mt-2 grid grid-cols-1">
            <select id="startPlace" v-model="localModel.startPlace" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" :class="{ 'outline-red-500': errors.startPlace || locationError }">
              <option :value="null" selected disabled>Seleccione un origen</option>
              <option v-for="(startPlace, index) in incomingData.startPlaces" :key="index" :value="startPlace">{{ startPlace.label }}</option>
            </select>
            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-400" aria-hidden="true" />
          </div>
          <p v-if="errors.startPlace" class="text-xs text-red-500 mt-1">{{ errors.startPlace }}</p>
        </div>
        <div>
          <label for="endPlace" class="block text-sm/6 font-medium text-slate-700">Destino</label>
          <div class="mt-2 grid grid-cols-1">
            <select id="endPlace" v-model="localModel.endPlace" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" :class="{ 'outline-red-500': errors.endPlace || locationError }">
              <option :value="null" selected disabled>Seleccione un destino</option>
              <option v-for="(endPlace, index) in incomingData.endPlaces" :key="index" :value="endPlace">{{ endPlace.label }}</option>
            </select>
            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-400" aria-hidden="true" />
          </div>
          <p v-if="errors.endPlace" class="text-xs text-red-500 mt-1">{{ errors.endPlace }}</p>
        </div>
        <div v-if="locationError" class="sm:col-span-2 text-center text-red-500 text-sm">
          {{ locationError }}
        </div>
        <div class="sm:col-span-2">
          <label for="address" class="block text-sm/6 font-medium text-slate-700">Dirección del Destino</label>
          <div class="mt-2">
            <input id="address" v-model="localModel.address" type="text"  placeholder="Calle, Número, Sector" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" :class="{ 'outline-red-500': errors.address }">
          </div>
          <p v-if="errors.address" class="text-xs text-red-500 mt-1">{{ errors.address }}</p>
        </div>
        <div class="sm:col-span-2">
          <label for="city" class="block text-sm/6 font-medium text-slate-700">Ciudad</label>
          <div class="mt-2">
            <input id="city" v-model="localModel.city" type="text"  placeholder="Ciudad de destino" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" :class="{ 'outline-red-500': errors.city }">
          </div>
          <p v-if="errors.city" class="text-xs text-red-500 mt-1">{{ errors.city }}</p>
        </div>
        <div>
          <label for="unitPrice" class="block text-sm/6 font-medium text-slate-700">Tarifa</label>
          <div class="mt-2">
            <input id="unitPrice" :value="isCalculatingTariff ? 'Calculando...' : unitPrice" type="text" placeholder="Tarifa" disabled class="block w-full rounded-md bg-slate-50 px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 sm:text-sm/6">
          </div>
        </div>
        <div>
          <label for="timeTravelEst" class="block text-sm/6 font-medium text-slate-700">Fecha Estimada</label>
          <div class="mt-2">
            <input id="timeTravelEst" v-model="localModel.timeTravelEst" type="date" :min="new Date().toISOString().split('T')[0]" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="note" class="block text-sm/6 font-medium text-slate-700">Comentario (Opcional)</label>
          <div class="mt-2">
            <textarea id="note" v-model="localModel.note" placeholder="Alguna nota o comentario sobre el traslado" rows="4" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-end gap-x-4 border-t border-gray-200 pt-4">
      <button @click="$emit('cerrar')" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancelar</button>
      <button type="submit" :disabled="isNextDisabled" class="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed">Siguiente</button>
    </div>
  </form>
</template>

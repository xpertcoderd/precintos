<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col gap-6 p-6 ">
    <div class="flex flex-col gap-2">
      <span class="text-gray-400 text-sm">Nombre del Broker</span>
      <span class="font-semibold text-sm text-gray-700">Datos de traslado</span>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <select id="finalClient"  class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" :class="{ 'ring-2 ring-red-400': errors.finalClient }" v-model="localModel.finalClient" required>
            <option value="" selected disabled >Cliente Final</option>
            <option v-for="(client, index) in incomingData.finalClients" :key="index" :value="client.client">{{ client.client.name }}</option>
          </select>
          <p v-if="errors.finalClient" class="text-xs text-red-500 mt-1">{{ errors.finalClient }}</p>
        </div>
        <div>
          <select id="type" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" :class="{ 'ring-2 ring-red-400': errors.type }" v-model="localModel.type">
            <option :value="null" selected disabled>Tipo de Traslado</option>
            <option v-for="(tipo, index) in incomingData.transferTypes" :key="index" :value="tipo">{{ tipo.name }}</option>
          </select>
          <p v-if="errors.type" class="text-xs text-red-500 mt-1">{{ errors.type }}</p>
        </div>
        <div>
          <select id="startPlace" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" :class="{ 'ring-2 ring-red-400': errors.startPlace }" v-model="localModel.startPlace">
            <option :value="null" selected disabled>Origen</option>
            <option v-for="(startPlace, index) in incomingData.startPlaces" :key="index" :value="startPlace">{{ startPlace.label }}</option>
          </select>
          <p v-if="errors.startPlace" class="text-xs text-red-500 mt-1">{{ errors.startPlace }}</p>
        </div>
        <div>
          <select id="endPlace" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" :class="{ 'ring-2 ring-red-400': errors.endPlace }" v-model="localModel.endPlace">
            <option :value="null" selected disabled>Destino</option>
            <option v-for="(endPlace, index) in incomingData.endPlaces" :key="index" :value="endPlace">{{ endPlace.label }}</option>
          </select>
          <p v-if="errors.endPlace" class="text-xs text-red-500 mt-1">{{ errors.endPlace }}</p>
        </div>
        <div class="col-span-2">
          <input v-model="localModel.address" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" maxlength="40" placeholder="Direccion del Destino" type="text" required>
          <p v-if="errors.address" class="text-xs text-red-500 mt-1">{{ errors.address }}</p>
        </div>
        <div class="col-span-2">
          <input v-model="localModel.city" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" maxlength="40" placeholder="Ciudad" type="text" required>
          <p v-if="errors.city" class="text-xs text-red-500 mt-1">{{ errors.city }}</p>
        </div>
        <div class="col-span-2 flex gap-4">
          <div class="flex-1">
            <input v-model="unitPrice" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none w-full" maxlength="40" placeholder="Tarifa" type="number" disabled >
          </div>
          <div class="flex-1">
            <input v-model="localModel.timeTravelEst" class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none w-full" type="date" :min="new Date().toISOString().split('T')[0]"  />
          </div>
        </div>
        <div class="col-span-2">
          <textarea class="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full h-12" placeholder="Comentario" style="min-height: 80px;" v-model="localModel.note" rows="4"></textarea>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <button @click="$emit('cerrar')" type="button" class="px-8 py- rounded-lg bg-gray-200 text-gray-500 font-semibold">Cancelar</button>
      <button @click="$emit('next')" type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Siguiente</button>
    </div>
  </form>
</template>

<script setup>
import {computed, defineEmits, defineProps, ref, watch} from 'vue';
import {calculateTariff} from "@/components/TransferWizard/helpers/fetchBrokerData";

const unitPrice = ref(null)

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
    async ([type, start, end]) => {
      if (type && start && end) {
        const price = await calculateTariff(type, start, end)
        unitPrice.value = price
        localModel.value.unitPrice = price
      }
    }
)
</script>

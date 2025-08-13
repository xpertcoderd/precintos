
<template>
  <form @submit.prevent>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="name" class="block mb-2 text-sm font-medium text-slate-700">Nombre de la Tarifa</label>
        <input v-model="formData.name" type="text" id="name" placeholder="Nombre de la Tarifa" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>
      <div>
        <label for="price" class="block mb-2 text-sm font-medium text-slate-700">Precio</label>
        <input v-model.number="formData.price" type="number" id="price" placeholder="0.00" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
        <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
      </div>
      <div>
        <label for="transferType" class="block mb-2 text-sm font-medium text-slate-700">Tipo de Transferencia</label>
        <select v-model="formData.transferTypeId" id="transferType" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
          <option disabled value="">Seleccione un tipo</option>
          <option v-for="type in transferTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div>
        <label for="tariffType" class="block mb-2 text-sm font-medium text-slate-700">Tipo de Tarifa</label>
        <select v-model="formData.tariffTypeId" id="tariffType" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
          <option disabled value="">Seleccione un tipo</option>
          <option v-for="type in tariffTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div>
        <label for="origin" class="block mb-2 text-sm font-medium text-slate-700">Origen</label>
        <select v-model="formData.originId" id="origin" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
          <option disabled value="">Seleccione un origen</option>
          <option v-for="place in places" :key="place.id" :value="place.id">{{ place.label }}</option>
        </select>
      </div>
      <div>
        <label for="destination" class="block mb-2 text-sm font-medium text-slate-700">Destino</label>
        <select v-model="formData.destinationId" id="destination" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
          <option disabled value="">Seleccione un destino</option>
          <option v-for="place in places" :key="place.id" :value="place.id">{{ place.label }}</option>
        </select>
      </div>
    </div>

    <!-- Additional Fields for specific tariff types -->
    <div v-if="isDistanceBased" class="mt-6 pt-6 border-t border-slate-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label for="distanceFreeKm" class="block mb-2 text-sm font-medium text-slate-700">KMs Libres</label>
                <input v-model.number="formData.distanceFreeKm" type="number" id="distanceFreeKm" placeholder="0" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
            </div>
            <div>
                <label for="distanceOffsetKm" class="block mb-2 text-sm font-medium text-slate-700">Offset KMs</label>
                <input v-model.number="formData.distanceOffsetKm" type="number" id="distanceOffsetKm" placeholder="0" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
            </div>
            <div>
                <label for="distanceOffsetCost" class="block mb-2 text-sm font-medium text-slate-700">Costo Offset</label>
                <input v-model.number="formData.distanceOffsetCost" type="number" id="distanceOffsetCost" placeholder="0.00" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
            </div>
        </div>
    </div>
     <div v-if="isShortTripBased" class="mt-6 pt-6 border-t border-slate-200">
        <div>
            <label for="shortTripKm" class="block mb-2 text-sm font-medium text-slate-700">KMs Viaje Corto</label>
            <input v-model.number="formData.shortTripKm" type="number" id="shortTripKm" placeholder="0" class="border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
        </div>
    </div>

  </form>
</template>

<script setup>
import { ref, watch, computed, defineProps, defineExpose } from 'vue';

const props = defineProps({
  initialData: { type: Object, default: () => null },
  errors: { type: Object, default: () => ({}) },
  transferTypes: { type: Array, required: true },
  tariffTypes: { type: Array, required: true },
  places: { type: Array, required: true },
});

const getCleanFormData = () => ({
  name: '',
  price: 0,
  transferTypeId: null,
  tariffTypeId: null,
  originId: null,
  destinationId: null,
  distanceFreeKm: 0,
  distanceOffsetKm: 0,
  distanceOffsetCost: 0,
  shortTripKm: 0,
});

const formData = ref(getCleanFormData());

const isDistanceBased = computed(() => {
    const selectedType = props.tariffTypes.find(t => t.id === formData.value.tariffTypeId);
    return selectedType?.description === 'BY_DISTANCE';
});

const isShortTripBased = computed(() => {
    const selectedType = props.tariffTypes.find(t => t.id === formData.value.tariffTypeId);
    return selectedType?.description === 'FIXED_SHORT';
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...getCleanFormData(), ...newData };
  } else {
    formData.value = getCleanFormData();
  }
}, { immediate: true, deep: true });

defineExpose({ formData });
</script>

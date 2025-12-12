<template>
  <form @submit.prevent>
    <!-- Duplicate Alert -->
    <div v-if="duplicateError" class="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <span class="font-medium">Atención!</span> {{ duplicateError }}
    </div>

    <!-- 5 Column Grid Configuration -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      
      <!-- Row 1, Col 1: Name -->
      <div class="col-span-1">
        <label for="name" class="block mb-2 text-xs font-bold text-slate-500 uppercase">Nombre de la Tarifa</label>
        <input v-model="formData.name" type="text" id="name" placeholder="Nombre de la Tarifa" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm" />
        <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
      </div>

      <!-- Row 1, Col 2: Load Type -->
      <div class="col-span-1">
        <label for="transferType" class="block mb-2 text-xs font-bold text-slate-500 uppercase">Tipo de Carga</label>
        <select v-model="formData.transferTypeId" id="transferType" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm">
          <option :value="null" disabled>Seleccione...</option>
          <option v-for="type in transferTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
        <p v-if="errors.transferTypeId" class="mt-1 text-xs text-red-600">{{ errors.transferTypeId }}</p>
      </div>

      <!-- Row 1, Col 3: Tariff Type -->
      <div class="col-span-1">
        <label for="tariffType" class="block mb-2 text-xs font-bold text-slate-500 uppercase">Tipo de Tarifa</label>
        <select v-model="formData.tariffTypeId" id="tariffType" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm">
          <option :value="null" disabled>Seleccione...</option>
          <option v-for="type in tariffTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
        <p v-if="errors.tariffTypeId" class="mt-1 text-xs text-red-600">{{ errors.tariffTypeId }}</p>
      </div>

      <!-- Row 1, Col 4: Price -->
      <div class="col-span-1">
        <label for="price" class="block mb-2 text-xs font-bold text-slate-500 uppercase">Precio RDS</label>
        <input v-model.number="formData.price" type="number" id="price" placeholder="2000" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm" />
        <p v-if="errors.price" class="mt-1 text-xs text-red-600">{{ errors.price }}</p>
      </div>

      <!-- Row 1, Col 5: Short Trip (Visible but disabled if not active) -->
      <div class="col-span-1">
        <label for="shortTripKm" class="block mb-2 text-xs font-bold text-slate-500 uppercase" :class="{'text-slate-300': !isShortTripBased}">Distancia &lt;=</label>
        <div class="relative">
             <input v-model.number="formData.shortTripKm" :disabled="!isShortTripBased" type="number" max="5" id="shortTripKm" placeholder="Km" 
               class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 pr-8 bg-white shadow-sm disabled:bg-slate-50 disabled:text-slate-400" />
             <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-xs" :class="isShortTripBased ? 'text-slate-400' : 'text-slate-200'">Km</span>
             </div>
        </div>
      </div>

      <!-- Row 2, Col 1: Origin (Visible but disabled if not active) -->
      <div class="col-span-1">
        <label for="startPlace" class="block mb-2 text-xs font-bold text-slate-500 uppercase" :class="{'text-slate-300': !isCustomGeo}">Origen</label>
        <select v-model="formData.startPlaceId" :disabled="!isCustomGeo" id="startPlace" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm disabled:bg-slate-50 disabled:text-slate-400">
            <option :value="null" disabled>Seleccionar Origen</option>
            <option v-for="place in originPlaces" :key="place.id" :value="place.id">{{ place.name || place.label }}</option>
        </select>
        <p v-if="localErrors.startPlaceId" class="mt-1 text-xs text-red-600">{{ localErrors.startPlaceId }}</p>
      </div>

      <!-- Row 2, Col 2: Destination (Visible but disabled if not active) -->
      <div class="col-span-1">
        <label for="endPlace" class="block mb-2 text-xs font-bold text-slate-500 uppercase" :class="{'text-slate-300': !isCustomGeo}">Destino</label>
        <select v-model="formData.endPlaceId" :disabled="!isCustomGeo" id="endPlace" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm disabled:bg-slate-50 disabled:text-slate-400">
             <option :value="null" disabled>Seleccionar Destino</option>
             <option v-for="place in destinationPlaces" :key="place.id" :value="place.id">{{ place.name || place.label }}</option>
        </select>
        <p v-if="localErrors.endPlaceId" class="mt-1 text-xs text-red-600">{{ localErrors.endPlaceId }}</p>
      </div>

      <!-- Row 2, Col 3: Free Km (Visible but disabled if not active) -->
      <div class="col-span-1">
        <label for="distanceFreeKm" class="block mb-2 text-xs font-bold text-slate-500 uppercase" :class="{'text-slate-300': !isDistanceBased}">Km Libre</label>
        <input v-model.number="formData.distanceFreeKm" :disabled="!isDistanceBased" type="number" id="distanceFreeKm" placeholder="2000" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm disabled:bg-slate-50 disabled:text-slate-400" />
      </div>

      <!-- Row 2, Col 4: Offset Km (Visible but disabled if not active) -->
      <div class="col-span-1">
        <label for="distanceOffsetKm" class="block mb-2 text-xs font-bold text-slate-500 uppercase" :class="{'text-slate-300': !isDistanceBased}">Km adicionales</label>
        <input v-model.number="formData.distanceOffsetKm" :disabled="!isDistanceBased" type="number" id="distanceOffsetKm" placeholder="2000" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm disabled:bg-slate-50 disabled:text-slate-400" />
      </div>

      <!-- Row 2, Col 5: Offset Cost (Visible but disabled if not active) -->
      <div class="col-span-1">
        <label for="distanceOffsetCost" class="block mb-2 text-xs font-bold text-slate-500 uppercase" :class="{'text-slate-300': !isDistanceBased}">Costo por adicional</label>
        <input v-model.number="formData.distanceOffsetCost" :disabled="!isDistanceBased" type="number" id="distanceOffsetCost" placeholder="2000" class="border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-white shadow-sm disabled:bg-slate-50 disabled:text-slate-400" />
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
  originPlaces: { type: Array, required: true },
  destinationPlaces: { type: Array, required: true },
  existingTariffs: { type: Array, default: () => [] },
});

const getCleanFormData = () => ({
  name: '',
  price: 0,
  transferTypeId: null,
  tariffTypeId: null,
  startPlaceId: null,
  endPlaceId: null,
  distanceFreeKm: null,
  distanceOffsetKm: null,
  distanceOffsetCost: null,
  shortTripKm: null,
});

const formData = ref(getCleanFormData());
const localErrors = ref({});

const getSelectedType = () => props.tariffTypes.find(t => t.id === formData.value.tariffTypeId);

const isShortTripBased = computed(() => getSelectedType()?.name === 'fixed_short' || formData.value.tariffTypeId === 3);
const isDistanceBased = computed(() => getSelectedType()?.name === 'by_distance' || formData.value.tariffTypeId === 4);
const isCustomGeo = computed(() => getSelectedType()?.name === 'custom_geo' || formData.value.tariffTypeId === 5);

// Validation & Auto-naming
const duplicateError = ref(null);

watch([() => formData.value.transferTypeId, () => formData.value.tariffTypeId, () => formData.value.startPlaceId, () => formData.value.endPlaceId], () => {
    // 1. Auto-generate Name (Existing logic)
    const trType = props.transferTypes.find(t => t.id === formData.value.transferTypeId);
    const tType = props.tariffTypes.find(t => t.id === formData.value.tariffTypeId);

    // 2. Uniqueness Check
    duplicateError.value = null;
    if (!formData.value.transferTypeId || !formData.value.tariffTypeId) return;

    const isEditing = !!formData.value.id; 

    const duplicate = props.existingTariffs.find(t => {
        if (isEditing && t.id === formData.value.id) return false; // Skip self

        // Same Transfer Type?
        if (t.transferTypeId !== formData.value.transferTypeId) return false;

        // Same Tariff Type?
        if (t.tariffTypeId !== formData.value.tariffTypeId) return false;

        // Custom Geo Rule (Type 5)
        if (formData.value.tariffTypeId === 5) {
            // Must match Origin AND Dest
            return t.startPlaceId === formData.value.startPlaceId && t.endPlaceId === formData.value.endPlaceId;
        }

        // Standard Rule (Types 1-4)
        return true;
    });

    if (duplicate) {
        if (formData.value.tariffTypeId === 5) {
            duplicateError.value = "Ya existe una tarifa de Ruta Personalizada para este Origen y Destino.";
        } else {
            duplicateError.value = `Ya existe una tarifa con esta combinación de Carga y Tipo de Tarifa (${trType?.name} - ${tType?.name}).`;
        }
    }
});

// Reset fields when Tariff Type changes to ensure backend receives null for disabled fields
watch(() => formData.value.tariffTypeId, (newType) => {
    // If not Short Trip (3), reset shortTripKm
    if (newType !== 3 && getSelectedType()?.name !== 'fixed_short') {
        formData.value.shortTripKm = null;
    }
    // If not Distance Based (4), reset distance fields
    if (newType !== 4 && getSelectedType()?.name !== 'by_distance') {
        formData.value.distanceFreeKm = null;
        formData.value.distanceOffsetKm = null;
        formData.value.distanceOffsetCost = null;
    }
    // If not Custom Geo (5), reset origin/dest (optional, but good practice if backend validates strictness)
    if (newType !== 5 && getSelectedType()?.name !== 'custom_geo') {
        formData.value.startPlaceId = null;
        formData.value.endPlaceId = null;
    }
});

// Auto-generate Name (Optimized separate watcher to avoid complexity above)
watch([() => formData.value.transferTypeId, () => formData.value.tariffTypeId], ([newTransferId, newTariffId]) => {
     const trType = props.transferTypes.find(t => t.id === newTransferId);
    const tType = props.tariffTypes.find(t => t.id === newTariffId);

    if (trType && tType) {
        let suffix = tType.name;
        if (suffix.startsWith('fixed_')) {
            suffix = suffix.replace('fixed_', '');
        }
        // Only set if we don't have a name yet? Or overwrite? 
        // User asked for editable default. Usually standard is overwrite on type change.
        formData.value.name = `${trType.name}_${suffix}`;
    }
});

// Validation watcher for Custom Geo (Existing) -> Merging logic
watch([() => formData.value.startPlaceId, () => formData.value.endPlaceId], ([newOrigin, newDest]) => {
    localErrors.value = {};
    if (isCustomGeo.value && newOrigin && newDest && newOrigin === newDest) {
        localErrors.value.endPlaceId = 'El destino no puede ser igual al origen.';
    }
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...getCleanFormData(), ...newData };
  } else {
    formData.value = getCleanFormData();
  }
}, { immediate: true, deep: true });

defineExpose({ formData, localErrors, duplicateError });
</script>

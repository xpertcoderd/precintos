<template>
  <form @submit.prevent="submit" class="flex flex-col h-full">
    <!-- Main Content -->
    <div class="flex-1 space-y-6">
      <div class="-mx-4 sm:-mx-6">
        <TablaAddingConfirmation :headerData="localModel.headerData" :bl_ContainerList="localModel.bl_ContainerList"/>
      </div>

      <div class="flex justify-end text-sm">
        <strong>Total: </strong>
        <span class="ml-1">{{ `RD$${(localModel.totalAmount || 0).toLocaleString('es-419')}` }}</span>
      </div>

      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs">
          <input type="checkbox" id="check" v-model="checkboxValue" class="accent-sky-400" />
          <label for="check" class="mb-0">Acepto los términos y condiciones de esta aplicación</label>
        </div>
        <p v-if="errors.check" class="text-xs text-red-500">{{ errors.check }}</p>
      </div>
    </div>

    <!-- Footer/Actions -->
    <div class="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-4 border-t border-gray-200 pt-4">
      <button @click="$emit('cerrar')" type="button" class="px-8 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">Cancelar</button>
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Generar Orden</button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import TablaAddingConfirmation from '@/components/Internal/tablas/TablaAddingConfirmation.vue';

const props = defineProps(['orderData', 'errors']);
const emit = defineEmits(['update:modelValue', 'cerrar', 'next', 'update-table-data']);

const localModel = computed(() => props.orderData);

// Separate ref for checkbox to ensure reactivity
const checkboxValue = ref(props.orderData?.check || false);

// Watch for changes in checkbox and emit to parent
watch(checkboxValue, (newValue) => {
  emit('update:modelValue', { check: newValue });
});

function submit() {
  emit('next');
}
</script>

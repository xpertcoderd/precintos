<template>
  <form @submit.prevent="$emit('next')" class="flex flex-col h-fit p-6 mt-0">
    <div class="flex flex-col gap-2 h-fit">
        <TablaAddingConfirmation :headerData="localModel.headerData" :bl_ContainerList="localModel.bl_ContainerList"/>
        <div class="flex justify-end text-sm mt-2">
          <strong>Total: </strong>
          <span class="ml-1">{{ `RD$${localModel.totalAmount?.toLocaleString('es-419')}` }}</span>
        </div>
      <div class="flex items-center gap-2 text-xs">
        <input type="checkbox" id="check" v-model="localModel.check" class="accent-sky-400" />
        <label for="check" class="mb-0">Acepto los términos y condiciones de esta aplicación</label>
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
import {ref, watch, defineEmits,defineProps, onMounted} from 'vue';
import TablaAddingConfirmation from '@/components/Internal/tablas/TablaAddingConfirmation.vue';

const props = defineProps(['orderData', 'errors']);
const emit = defineEmits(['update:modelValue', 'cerrar', 'next', 'update-table-data']);

const localModel = ref(
    {
      headerData: {
        serverClient: "serverClient",
        finalClient: "finalClient",
        startPlace: "startPlace",
        endPlace: "endPlace",
        typeName: "typeName",
        unitPrice: 0

      },
      bl_ContainerList: [
        {
          bl: "bl",
          bl_count: 0,
          amount: 0,
          check: false,
        }
      ],
      totalAmount: 0,
      check: false,
    });

onMounted(() => {
  localModel.value = props.orderData;
  emit('update-table-data', localModel.value.bl_ContainerList);
});

watch(localModel, (newVal) => {
  emit('update:modelValue', newVal);
  emit('update-table-data', newVal.bl_ContainerList);
}, { deep: true });
</script>

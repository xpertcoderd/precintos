<template>
  <form @submit.prevent="submit" class="flex flex-col h-full">
    <!-- Main Content -->
    <div class="flex-1 space-y-6">
      <div class="-mx-4 sm:-mx-6">
        <TablaAddingConfirmation :headerData="localModel.headerData" :bl_ContainerList="localModel.bl_ContainerList"/>
      </div>

      <div class="flex justify-end text-sm">
        <strong>Total: </strong>
        <span class="ml-1">{{ `RD$${localModel.totalAmount?.toLocaleString('es-419')}` }}</span>
      </div>

      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs">
          <input type="checkbox" id="check" v-model="localModel.check" class="accent-sky-400" />
          <label for="check" class="mb-0">Acepto los términos y condiciones de esta aplicación</label>
        </div>
        <p v-if="errors.check" class="text-xs text-red-500">{{ errors.check }}</p>
      </div>
    </div>

    <!-- Footer/Actions -->
    <div class="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-4 border-t border-gray-200 pt-6">
      <button @click="$emit('cerrar')" type="button" class="px-8 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">Cancelar</button>
      <button type="submit" class="px-8 py-2 rounded-lg bg-sky-400 text-white font-semibold shadow hover:bg-sky-500 transition">Generar Orden</button>
    </div>
  </form>
</template>

<script setup>
import {ref, watch, defineEmits,defineProps, onMounted} from 'vue';
import TablaAddingConfirmation from '@/components/Internal/tablas/TablaAddingConfirmation.vue';
import { useNotifications } from '@/composables/useNotifications';

const props = defineProps(['orderData', 'errors']);
const emit = defineEmits(['update:modelValue', 'cerrar', 'next', 'update-table-data']);

const { sendNotification } = useNotifications();

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

function submit() {
  sendNotification('Orden generada con éxito!', 'success');
  emit('next');
}
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-auto p-4">
      <div class="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Confirmar PIN</h3>
        <p class="text-sm text-slate-500 mb-6">Por favor, ingrese su PIN de seguridad para autorizar la apertura de los sellos seleccionados.</p>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="pin-input" class="sr-only">PIN</label>
            <input
              id="pin-input"
              v-model="pin"
              type="password"
              maxlength="4"
              placeholder="****"
              class="w-full text-center text-2xl tracking-[1em] bg-slate-100 border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              required
            />
            <p v-if="error" class="text-xs text-red-500 mt-2">{{ error }}</p>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <button @click="$emit('close')" type="button" class="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300">
              Confirmar y Abrir
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

 defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'confirm']);

const pin = ref('');
const error = ref('');

function handleSubmit() {
  if (pin.value.length !== 4 || !/\d{4}/.test(pin.value)) {
    error.value = 'El PIN debe ser de 4 dígitos numéricos.';
    return;
  }
  error.value = '';
  emit('confirm', pin.value);
  pin.value = ''; // Clear pin after submit
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

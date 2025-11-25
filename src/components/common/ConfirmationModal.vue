<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto transform transition-all">
        <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">{{ title }}</h3>
        <p class="text-sm text-gray-500 mb-6">{{ message }}</p>
        <div class="flex justify-end gap-4">
          <button
            @click="$emit('cancel')"
            type="button"
            class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            {{ cancelText }}
          </button>
          <button
            @click="$emit('confirm')"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
  title: {
    type: String,
    default: 'Confirmar Acción',
  },
  message: {
    type: String,
    default: '¿Estás seguro de que quieres realizar esta acción?',
  },
  confirmText: {
    type: String,
    default: 'Confirmar',
  },
  cancelText: {
    type: String,
    default: 'Cancelar',
  },
});

defineEmits(['confirm', 'cancel']);
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

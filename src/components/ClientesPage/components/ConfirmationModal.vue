<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="$emit('cancel')">
      <div @click.stop class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div class="p-6 text-center sm:text-left sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4">
            <h3 class="text-lg leading-6 font-semibold text-slate-900">{{ title }}</h3>
            <div class="mt-2">
              <p class="text-sm text-slate-500">{{ message }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-row-reverse gap-3 px-6 py-4 bg-slate-50 rounded-b-xl">
          <button @click="$emit('confirm')" type="button" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:w-auto sm:text-sm">
            Sí, eliminar
          </button>
          <button @click="$emit('cancel')" type="button" class="inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 sm:mt-0 sm:w-auto sm:text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, default: 'Confirmar Eliminación' },
  message: { type: String, default: '¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.' }
});

defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

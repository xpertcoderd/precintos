<template>
  <TransitionRoot as="template" :show="visible">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div v-if="visible" @click="$emit('close')" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" />
      </TransitionChild>

      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform rounded-xl bg-white shadow-2xl w-full max-w-2xl transition-all">
              <!-- Header -->
              <div class="flex justify-between items-center p-5 border-b border-slate-200">
                <DialogTitle as="h3" class="text-xl font-semibold text-slate-800">{{ title }}</DialogTitle>
                <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <!-- Body -->
              <div class="p-6 max-h-[70vh] overflow-y-auto">
                <slot></slot>
              </div>

              <!-- Footer -->
              <div class="flex justify-end items-center p-4 bg-slate-50 rounded-b-xl">
                <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Cancelar</button>
                <button @click="$emit('save')" class="ml-3 px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600">{{ saveText }}</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  saveText: {
    type: String,
    default: 'Guardar',
  },
})

defineEmits(['close', 'save'])
</script>

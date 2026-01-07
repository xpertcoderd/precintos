<template>
  <transition name="fade">
    <div v-if="visible" @click="$emit('close')" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        <div class="flex justify-between items-center p-5 border-b border-slate-200">
          <h3 class="text-xl font-semibold text-slate-800">{{ title }}</h3>
          <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <slot></slot>
        </div>
        <div class="flex justify-end items-center p-4 bg-slate-50 rounded-b-xl">
          <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Cancelar</button>
          <button @click="$emit('save')" class="ml-3 px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600">{{ saveText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import XIcon from '../icons/XIcon.vue';

defineProps({
  visible: Boolean,
  title: String,
  saveText: String,
});

defineEmits(['close', 'save']);
</script>

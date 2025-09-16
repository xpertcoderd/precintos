<template>
  <div class="w-full py-4 sm:py-6 md:py-8 px-4 sm:px-6">
    <div class="flex items-center w-full">
      <template v-for="(step, index) in steps" :key="step.label">
        <!-- Step Item -->
        <button
            @click="emitIndex(index)"
            :disabled="step.isInactive"
            class="flex flex-col items-center justify-center px-2 cursor-pointer disabled:cursor-not-allowed group"
        >
          <span
              :class="[
              'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0',
              step.isCompleted || step.isActive ? 'bg-blue-100' : 'bg-gray-100',
            ]"
          >
            <CheckIcon v-if="step.isCompleted" class="w-6 h-6 text-blue-600" />
            <span v-else :class="['text-lg font-bold', step.isActive ? 'text-blue-600' : 'text-gray-500']">
              {{ index + 1 }}
            </span>
          </span>
          <span :class="[step.isActive ? 'font-bold text-blue-600' : 'text-gray-500', 'hidden sm:block mt-2 text-xs sm:text-sm text-center']">
            {{ step.label }}
          </span>
        </button>

        <!-- Connector Line -->
        <div
            v-if="index < steps.length - 1"
            class="flex-auto border-t-4"
            :class="[step.isCompleted ? 'border-blue-100' : 'border-gray-100']"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';

const emit = defineEmits(['setStep']);
const props = defineProps({
  count: {
    type: Array,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  }
});

const stepLabels = ['Datos', 'BL', 'Contenedores', 'Confirmación', 'Resumen'];

const steps = computed(() => {
  return stepLabels.map((label, index) => {
    // Logic is now based on the currentStep prop (which is 1-based)
    const isActive = index === (props.currentStep - 1);
    const isCompleted = index < (props.currentStep - 1);

    // A step is inactive (not clickable) if it hasn't been unlocked and isn't the active one.
    const isInactive = !props.count[index] && !isActive;

    return {
      label,
      isActive,
      isCompleted,
      isInactive,
    };
  });
});

const emitIndex = (index) => {
  const step = steps.value[index];
  if (!step.isInactive) {
    emit('setStep', index);
  }
};
</script>

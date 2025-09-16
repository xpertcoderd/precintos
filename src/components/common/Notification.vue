<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="notification.visible" :class="containerClasses">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component :is="iconComponent" class="h-6 w-6" :class="iconClasses" aria-hidden="true" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-semibold text-gray-900">{{ notification.message }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon.vue';
import XCircleIcon from '@/components/icons/XCircleIcon.vue';

const { notification } = useNotifications();

const containerClasses = computed(() => [
  'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5',
  {
    'border-l-4 border-green-400': notification.type === 'success',
    'border-l-4 border-red-400': notification.type === 'error',
  },
]);

const iconComponent = computed(() => {
  if (notification.type === 'success') return CheckCircleIcon;
  if (notification.type === 'error') return XCircleIcon;
  return null;
});

const iconClasses = computed(() => ({
  'text-green-400': notification.type === 'success',
  'text-red-400': notification.type === 'error',
}));

</script>

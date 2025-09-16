<template>
  <div class="relative">
    <router-view />
    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50">
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Notification />
      </div>
    </div>
  </div>
</template>

<script setup>
import Notification from '@/components/common/Notification.vue';
</script>

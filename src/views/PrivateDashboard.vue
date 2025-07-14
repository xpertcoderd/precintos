<template>
  <!--
    This component now acts as a layout.
    The <router-view /> tag below is where child routes
    (like PanelPrincipal.vue) will be rendered.
  -->
  <InternalDasboard>
    <router-view />
  </InternalDasboard>
</template>

<script setup>
// Converted to <script setup> for simplicity and consistency with modern Vue.
import InternalDasboard from '@/components/Internal/InternalDasboard.vue';
</script>

<style scoped>
/* These styles can likely be removed if InternalDasboard provides a full-page layout. */
.windows_Page {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>

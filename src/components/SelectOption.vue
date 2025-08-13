<template>
  <div class="select-wrapper">
    <i class="bi bi-funnel"></i>

    <select @change="filtrarBy(timeSelected)" v-model="timeSelected" class="dateSelector">

      <option value=1>{{ incomingData.filtro.Label1 }} </option>
      <option value=2>{{ incomingData.filtro.Label2 }} </option>
      <option value=3>{{ incomingData.filtro.Label3 }} </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const incomingData = defineProps(['filtro']);

const outGoingData = defineEmits(['filtrarBy']);

const timeSelected = ref(1); // Valor por defecto


function filtrarBy(filtroSelected) {
  outGoingData('filtrarBy', filtroSelected)

}


</script>

<style scoped>
.select-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 8px 8px 8px 8px;
  cursor: pointer;
  font-weight: 700;
  color: #cacaca;
  padding: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}


.select-wrapper i {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 20px;
  pointer-events: none;
}

select {
  padding-left: 20px;
  padding-right: 5px;
  outline: none;
  color: #cacaca;
  border-radius: 8px 8px 8px 8px;
  border: none;
}
</style>
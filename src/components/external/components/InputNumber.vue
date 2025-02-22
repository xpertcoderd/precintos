<template>
  <div class="number-input">
    <div class="buttons">
      <button @click="changeValue(1)">▲</button>
      <button @click="changeValue(-1)">▼</button>
    </div>
    <input type="number" v-model="number" :min="min" :max="max">
  </div>
</template>

<script setup>
import { ref } from "vue";

const number = ref(0); // Valor inicial
const min = 0;  // Valor mínimo permitido
const max = 100; // Valor máximo permitido

const changeValue = (step) => {
  const newValue = number.value + step;
  if (newValue >= min && newValue <= max) {
    number.value = newValue;
  }
};
</script>

<style scoped>
.number-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
}
input {
  text-align: center;
  font-size: 18px;
  width: 80px;
  height: 30px;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
button {
  width: 30px;
  height: 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

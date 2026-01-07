<template>


  <div class="bolasContainer">

    <div v-for=" (dato, index) in incomingData.count" :key="index" :class="{ 'bolaSelected': dato }" class="bola">
      <span :class="{ 'bolaTextSelected': dato }" class="bolaText">{{ index + 1 }}</span>
    </div>

  </div>



</template>

<script setup>


const incomingData = defineProps(['count']);



</script>

<style scoped>
.bolasContainer {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding-top: 5%;
}


.bola {
  background: lightblue;
  width: 48px;

  margin: 15px;

  border-radius: 50px 50px 50px 50px;

  display: flex;
  justify-content: center;
  align-items: center;
}


.bolaText {
  color: black;
  margin: 12px;
  font-weight: 700;
}

.bolaSelected {
  background: #2ec0e2;

}


.bolaTextSelected {
  color: white;
}
</style>
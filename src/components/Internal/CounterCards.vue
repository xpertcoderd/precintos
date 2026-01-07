<template>

  <div class="row headerContainer">


    <div class="col-12 col-md-6 col-lg-2">


      <div class="targets">
        <div class="targetsLabel">{{ incomingData.counters.card1.label }}</div>
        <div class="targetsValue">{{ incomingData.counters.card1.value }}</div>
        <div class="bgChar">
          <img src="@/assets/cards/charVerde.png">
        </div>
      </div>


    </div>

    <div class="col-12 col-md-6 col-lg-2 ">

      <div class="targets">
        <div class="targetsLabel">{{ incomingData.counters.card2.label }}</div>
        <div class="targetsValue">{{ incomingData.counters.card2.value }}</div>
        <div class="bgChar">
          <img src="@/assets/cards/charAmarillo.png">
        </div>
      </div>


    </div>


    <div class="col-12 col-md-6 col-lg-2 ">

      <div class="targets">
        <div class="targetsLabel">{{ incomingData.counters.card3.label }}</div>
        <div class="targetsValue">{{ incomingData.counters.card3.value }}</div>
        <div class="bgChar">
          <img src="@/assets/cards/charAzul.png">
        </div>
      </div>


    </div>

    <div class="col-12 col-md-6 col-lg-2 ">


      <div class="targets">
        <div class="targetsLabel">{{ incomingData.counters.card4.label }}</div>
        <div class="targetsValue">{{ incomingData.counters.card4.value }}</div>
        <div class="bgChar">
          <img src="@/assets/cards/charAmarillo.png">
        </div>
      </div>


    </div>



    <div class="col-12 col-md-6 col-lg-2 ">
      <div class="targets">
        <div class="targetsLabel">{{ incomingData.counters.card5.label }}</div>
        <div class="targetsValue">{{ incomingData.counters.card5.value }}</div>

        <div class="bgChar">
          <img src="@/assets/cards/charAzul.png">
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>


const incomingData = defineProps(['counters']);

console.log(incomingData.counters)

</script>

<style scoped>
.headerContainer {
  display: flex;
  width: 100%;
  justify-content: space-around;
}


.bgChar {
  position: absolute;
  z-index: -1;
  bottom: 10px;
  right: 10px;

}

.bgChar img {
  max-width: 55%;
  float: right;
}

.targets {
  height: 100%;
  /*min-height: 60px;*/
  padding: 20px;
  border: solid 1px;
  border-color: #80808030;
  border-radius: 12px;
  background-color: white;
  min-width: 200px;
  position: relative;
  z-index: 1;



}

.targetsLabel {
  font-size: 12px;
  color: grey;
  font-weight: 700;
  margin-bottom: -5px;
  /*  box-sizing: border-box;*/
}

.targetsValue {
  font-size: 23px;
  color: black;
  margin: 0px;
  font-weight: 700;
  margin-bottom: -5px;
}
</style>
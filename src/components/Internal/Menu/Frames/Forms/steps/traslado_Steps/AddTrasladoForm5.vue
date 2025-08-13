<template>

  <form @submit.prevent="enviar" class="formulario">


    <div class="row cardContainer">

      <TablaDetailsOrden :ordenes="incomingData.ordenes" class="col-12 tablaList" />



      <div class="col-12 cardGeneral">

        <div class="text-center mainTitleTable">
          <div>Total BL</div>
          <div class="mainSubTitleTable">{{ incomingData.totales.bl }}</div>
        </div>

        <div class="text-center mainTitleTable">
          <div>Total Contenedores</div>
          <div class="mainSubTitleTable">{{ incomingData.totales.containers }}</div>
        </div>

        <div class="text-center mainTitleTable">
          <div>Total</div>
          <div class="mainSubTitleTable">{{ `RD$${incomingData.totales.amount}` }}</div>
        </div>


      </div>


      <div class="col-12" style="padding-bottom: 10px;">

        <button @click="cerrar" type="button" class="btn btn-secundary mybtn"
          style="  background: #d7d7e3;   margin-right: 15px;">Subir Pago</button>

        <button type="submit" class="btn btn-primary mybtn"> Finalizar </button>

      </div>


    </div>

  </form>

</template>

<script setup>

import TablaDetailsOrden from '@/components/Internal/tablas/TablaDetailsOrden.vue'

import { defineEmits, defineProps } from 'vue'; //defineProps 

const incomingData = defineProps(['ordenes', 'totales']);

const outGoingData = defineEmits(['cerrar'])


/*function cerrar(){

  outGoingData('cerrar')
}
*/




function enviar() {

  outGoingData('cerrar')

}


</script>

<style scoped>
.mainTitleTable {
  color: black;
  font-size: 12px;
  font-weight: 800;
}


.mainSubTitleTable {
  font-size: 15px;

}

.cardGeneral {
  padding-top: 10px;
  padding-bottom: 0px;
  border-top: solid 1px grey;
  display: flex;
  justify-content: space-between;
}

.tablaList {

  width: 100%;
  max-height: 240px;
  position: relative;
  /*  overflow: auto;*/
}

.formulario {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  background: #f5f6f8;
  padding-top: 20px;
  padding-right: 20px;
}

.checkLabel {
  margin-bottom: auto;
  margin-top: auto;
  display: flex;
}

.cardContainer {
  height: 100%;
}

.mybtn {
  background: #56bcda;
  font-weight: 600;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  border: none;
}


.subTexto {
  padding-left: 20px;
  margin-bottom: 5px;
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}
</style>
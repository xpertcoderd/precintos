<template>
  <div class="expandible">


    <table class="table">

      <thead class="d-none">
        <tr class="columnaName">

          <th class="titleTable">1</th>
          <th class="titleTable">2</th>
          <th class="titleTable">3</th>
          <th class="titleTable">4</th>
          <th class="titleTable">5</th>
          <th class="titleTable">6</th>
          <th class="titleTable">7</th>
        </tr>
      </thead>

      <tbody>


        <tr v-for="(dato, index) in incomingData.ordenes" :key="index">

          <td class="row targetaHeader">

            <div class="col-4" style="line-height: 1.2;">
              <div class="mainTitleTable">No. Solicitud</div>
              <div class="mainValueTable">{{ dato.id }}</div>
            </div>
            <div class="col-2" style="line-height: 1.2;">
              <div class="mainTitleTable">BL</div>
              <div class="mainValueTable">{{ dato.bl }}</div>
            </div>
            <div class="col-3" style="line-height: 1.2;">
              <div class="mainTitleTable">Cant. Contenedores</div>
              <div class="mainValueTable">{{ dato.containers_count }}</div>
            </div>
            <div class="col-3" style="line-height: 1.2; position: relative;">
              <span>
                <div class="mainTitleTable">Costo por Contenedor</div>
                <div class="mainValueTable">{{ `RD$${dato.unitPrice}` }}</div>
              </span>
              <i class="bi bi-printer" style="color: #2ec0e2; position:absolute;  top: 0px; right: -10px;"></i>
            </div>

            <div class="col-4 mt-2" style="line-height: 1.2;">
              <div class="mainTitleTable">Origen</div>
              <div class="mainValueTable">{{ dato.startPlace }}</div>
            </div>

            <div class="col mt-2" style="line-height: 1.2; display: flex; justify-content: space-between;">
              <div>
                <div class="mainTitleTable ">Destino</div>
                <div class="mainValueTable">{{ dato.endPlace }}</div>
              </div>
              <div>
                <div class="mainTitleTable ">Total</div>
                <div class="mainValueTable">{{ `RD$${dato.amount}` }}</div>
              </div>
            </div>
          </td>


        </tr>

      </tbody>

    </table>

  </div>

</template>

<script setup>

import { defineProps } from 'vue';

const incomingData = defineProps(['ordenes']);



</script>

<style scoped>
.expandible {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.targetaHeader {
  background-color: transparent;
  /* border-radius: 8px 8px 0px 0px;*/
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom: solid 1px grey;
}

.mainTitleTable {
  color: black;
  font-size: 10px;
  font-weight: 800;
}

.mainValueTable {
  color: black;
  font-size: 10px;
  font-weight: 400;
}


/*  scrollbar stiyles width */

::-webkit-scrollbar {
  width: 10px;
}

/* scrollbar stiyles Handle */
::-webkit-scrollbar-thumb {
  background-color: #66b9d9;
  border-radius: 10px;
}
</style>
<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row">


      <span class="subTexto" style="color: grey;">{{ incomingData.serverClientName }}</span>

      <span class="subTexto">Cliente</span>

      <div class="col-6">
        <div>

          <select id="clickme" class="inputsearchBar" :class="{ 'campoSelected': errors.finalClient }" style="width: 100%;"
            v-model="formData.finalClient.data" required>

            <option :value="null" selected disabled default>Cliente Final</option>

            <option v-for=" (client, index) in incomingData.final_Clients" :key="index" :value="client.client">{{
              client.client.name }}</option>



          </select>

        </div>


      </div>

      <div class="col-6">
        <div>

          <select @change="consultarTarifa" id="clickme" class="inputsearchBar" :class="{ 'campoSelected': errors.type }"
            style=" width: 100%;" v-model="formData.type">

            <option :value="null" selected disabled default>Tipo de Traslado</option>

            <option v-for=" (tipo, index) in incomingData.transferTypes" :key="index" :value="tipo">{{ tipo.name }}
            </option>

          </select>


        </div>

      </div>

      <div class="col-6">
        <div>

          <select @change="consultarTarifa" id="clickme" class="inputsearchBar"
            :class="{ 'campoSelected': errors.startPlace }" style=" width: 100%;" v-model="formData.startPlace.data">

            <option :value="null" selected disabled default>Origen</option>

            <option v-for=" (startPlace, index) in incomingData.startplaces_List" :key="index" :value="startPlace">{{
              startPlace.label }}</option>



          </select>


        </div>

      </div>

      <div class="col-6">
        <div>

          <select @change="consultarTarifa" id="clickme" class="inputsearchBar"
            :class="{ 'campoSelected': errors.endPlace }" style=" width: 100%; " v-model="formData.endPlace.data">

            <option :value="null" selected disabled default>Destino</option>

            <option v-for=" (endPlace, index) in incomingData.endplaces_List" :key="index" :value="endPlace">{{
              endPlace.label }}</option>

          </select>


        </div>

      </div>




      <div class="col-7">
        <div>

          <input v-model="formData.address" class="inputsearchBar" maxlength="40" placeholder="Direccion del Destino"
            type="text" required>
        </div>

      </div>

      <div class="col-5">
        <div>

          <input v-model="formData.city" class="inputsearchBar" style=" width: 100%;" maxlength="40"
            placeholder="Ciudad" type="text" required>
        </div>

      </div>

      <div class="col-7">
        <div>


          <span class="subTexto">Tarifa</span>

          <input v-bind:value="incomingData.unitPrice" class="inputsearchBar" maxlength="40" placeholder="Tarifa"
            type="number" readonly>
        </div>

      </div>

      <div class="col-5">
        <div>
          <span class="subTexto">Fecha de Salida</span>
          <input style=" width: 100%; " v-model="formData.timeTravelEst" class="inputsearchBar" type="datetime-local"
            value="2025-01-22" min="2024-01-01" max="2025-12-31" />

        </div>

      </div>


      <div class="col-12">
        <div>

          <textarea class="inputsearchBar" placeholder="comentario" style="min-height: 80px;" v-model="formData.note"
            rows="4" cols="50">
            </textarea>

        </div>




      </div>



      <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">


        <button @click="outGoingData('cerrar')" type="button" class="btn btn-secundary mybtn"
          style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

        <button type="submit" class="btn btn-primary mybtn"> Siguiente </button>

        <!--         <span  style="padding-left: 10px; font-size: 12px; color: red; font-weight: 600;" v-for=" (error, index) in errors" :key="index" >{{ error }}</span> -->

      </div>

    </div>

    <div>

    </div>

  </form>

</template>

<script setup>

import { ref, defineProps, defineEmits } from 'vue';

import { getCurrentDateTime } from '@/components/utils.js'

const incomingData = defineProps(['unitPrice', 'transferTypes', 'startplaces_List', 'endplaces_List', 'final_Clients', 'serverClientName']);

const outGoingData = defineEmits(['cerrar', 'next', 'searchMyTarifa'])

const formData = ref(
  {

    finalClient: {
      data: null
    },
    type: null,
    startPlace: {
      data: null
    },
    endPlace: {
      data: null
    },
    address: null,
    city: null,
    note: null,
    timeTravelEst: getCurrentDateTime(),

  })


const errors = ref({
  finalClient: false,
  type: false,
  startPlace: false,
  endPlace: false
})

function consultarTarifa() {

  outGoingData('searchMyTarifa', formData.value.type, formData.value.startPlace.data, formData.value.endPlace.data);

}


function restoreErrors() {
  errors.value.finalClient = false
  errors.value.type = false
  errors.value.startPlace = false
  errors.value.endPlace = false
}

function enviar() {
  restoreErrors()

  if (formData.value.finalClient.data === null) {

    errors.value.finalClient = true;

  }

  if (formData.value.type === null) {

    errors.value.type = true;

  }

  if (formData.value.startPlace.data === null) {
    errors.value.startPlace = true
  }

  if (formData.value.endPlace.data === null) {
    errors.value.endPlace = true
  }

  if (errors.value.finalClient || errors.value.type || errors.value.startPlace || errors.value.endPlace) {
    console.log("Hay errors")

  } else {
    outGoingData('next', formData.value);
  }

}


</script>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  background: #f5f6f8;
  padding-top: 10px;
  padding-right: 20px;
}

.inputsearchBar {

  min-width: 100%;
  padding: 9px;
  box-shadow: 0px 0px 5px 1px rgba(233, 236, 239, 0.8);
  margin-bottom: 8px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.campoSelected {
  border: solid 1px red;
}

option {
  color: grey;
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
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}
</style>
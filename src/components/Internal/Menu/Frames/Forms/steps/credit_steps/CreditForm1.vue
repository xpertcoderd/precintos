<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row">

      <span class="subTexto">Datos de la Compania</span>


      <div class="col-6">
        <div>
          <!--  :class="{ 'campoSelected': formData.vacio }" -->
          <input v-bind:value="incomingData.client.name" class="inputsearchBar" maxlength="20" placeholder="Nombre"
            type="text"><!-- required -->

        </div>

      </div>

      <div class="col-6">
        <div>
          <!--  :class="{ 'campoSelected': formData.vacio }" -->
          <input v-bind:value="incomingData.client.rnc" class="inputsearchBar" maxlength="20" placeholder="RNC"
            type="text"><!-- required -->

        </div>

      </div>

      <div class="col-12" style="display: flex;">
        <span class="subTexto">Credito</span>

        <span class="form-check form-switch" style="margin-left: 10px;">
          <input class="form-check-input" type="checkbox" id="toggleSwitch">
        </span>

      </div>



      <div class="col-4">
        <div style="width: 100%;">
          <span class="subTexto2">Coloque el monto</span>
          <!--  :class="{ 'campoSelected': formData.vacio }" -->
          <input v-model="formData.credit" class="inputsearchBar" style="width: 100%;" maxlength="20" placeholder=""
            type="text"><!-- required -->

        </div>

      </div>

      <div class="col-4">
        <div style="width: 100%;">
          <span class="subTexto2">Tiempo de credito</span>
          <!--  :class="{ 'campoSelected': formData.vacio }" -->
          <input v-model="formData.time" class="inputsearchBar" style="width: 100%;" maxlength="20" placeholder=""
            type="text"><!-- required -->

        </div>

      </div>

      <div class="col-4">
        <div style="width: 100%;">
          <span class="subTexto2">Fecha de corte</span>
          <!--  :class="{ 'campoSelected': formData.vacio }" -->
          <input v-model="formData.timeDate" class="inputsearchBar" style="width: 100%;" maxlength="20" placeholder=""
            type="text"><!-- required -->

        </div>

      </div>

      <div class="col-12" style="display: flex;">
        <span class="subTexto">Descuento</span>

        <span class="form-check form-switch" style="margin-left: 10px;">
          <input class="form-check-input" type="checkbox" id="toggleSwitch">
        </span>

      </div>

      <div class="col-4">
        <div style="width: 100%;">
          <span class="subTexto2">Descuento %</span>
          <!--  :class="{ 'campoSelected': formData.vacio }" -->
          <input v-model="formData.discount" class="inputsearchBar" style="width: 100%;" maxlength="20" placeholder=""
            type="text"><!-- required -->

        </div>

      </div>




    </div>



    <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">


      <button @click="cerrar" type="button" class="btn btn-secundary mybtn"
        style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

      <button type="submit" class="btn btn-primary mybtn"> Aceptar </button>

    </div>

  </form>

</template>

<script setup>

import { ref } from 'vue';


const incomingData = defineProps(['client']);
const outGoingData = defineEmits(['cerrar']) //'checkBL'



const formData = ref(
  {
    id: incomingData.client.id,
    name: incomingData.client.name,
    rnc: incomingData.client.rnc,
    credit: null,
    time: null,
    timeDate: null,
    discount: null

  })


function cerrar() {
  outGoingData('cerrar')
}


function enviar() {

  console.log(formData.value)

  outGoingData('next', formData.value);


}

defineExpose({})

</script>

<style scoped>
.tablaList {

  width: 100%;
  max-height: 270px;
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
  padding-bottom: 20px;
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
  margin-bottom: 5px;
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}

.subTexto2 {
  color: grey;
  margin-bottom: 5px;
  user-select: none;
  font-weight: 400;
  font-size: 14px;
}
</style>
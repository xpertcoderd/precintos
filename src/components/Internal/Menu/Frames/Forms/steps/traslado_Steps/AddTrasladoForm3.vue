<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row">

      <span class="subTexto">Datos</span>

      <div class="col-5">
        <div>
          <!-- :class="{'campoSelected':errors.finalClientId}" -->
          <select id="clickme" class="inputsearchBar" style="width: 100%;" v-model="formData.bl" required>

            <option :value="null" selected disabled default>BL</option>

            <option v-for=" (bl, index) in incomingData.bls" :key="index" :value="bl[1].text">{{ bl[1].text }}</option>

          </select>

        </div>


      </div>


      <div class="col-5">
        <div>
          <input v-model="formData.container" class="inputsearchBar" :class="{ 'campoSelected': formData.vacio }"
            maxlength="20" placeholder="Contenedor" type="text"><!-- required -->

        </div>




      </div>

      <div class="col-1">
        <div @click="addBL_Container"
          style=" height: 100%; margin-top: -4px; margin-left:-10px; display: flex; justify-content:center; align-items: center;">
          <i class="bi bi-plus-square-fill" style="color: #41c237; font-size: 35px; cursor: pointer;"></i>

        </div>
      </div>

      <TablaAddingBL_Container class="col-12 tablaList" :columnName1="'BL'" :columnName2="'CONTENEDOR'"
        :blList="listBl_container" @removeBl="removeBL" />




    </div>



    <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">


      <button @click="cerrar" type="button" class="btn btn-secundary mybtn"
        style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

      <button type="submit" class="btn btn-primary mybtn"> Siguiente </button>

    </div>

  </form>

</template>

<script setup>

import { ref, defineProps, defineEmits } from 'vue';


import TablaAddingBL_Container from '@/components/Internal/tablas/TablaAddingBL_Container.vue'


const incomingData = defineProps(['bls']);

const outGoingData = defineEmits(['cerrar', 'next'])


const listBl_container = ref(new Map())

/* Set
listBl.value.set('1234557Bfe222', {text: "1234557Bfe222", id:1});
listBl.value.set('1234557Bfe223',{text: "1234557Bfe223", id:2})
*/



const formData = ref(
  {
    bl: null,
    container: null,
    vacio: false
  })



function cerrar() {
  listBl_container.value.clear();

  outGoingData('cerrar')
}


function removeBL(bl_Selected) {
  console.log("voy a remover el BL", bl_Selected)

  listBl_container.value.delete(bl_Selected);
}

function addBL_Container() {

  if (formData.value.bl != null && formData.value.container != null) {
    formData.value.vacio = false

    listBl_container.value.set(`${formData.value.bl}-${formData.value.container}`, { text1: formData.value.bl, text2: formData.value.container, id: 1 });

    /*formData.value.bl=null*/
    formData.value.container = null

  } else {
    console.log("No puede haber valores nulos")
  }





}

function enviar() {

  if (listBl_container.value.size === 0) {

    formData.value.vacio = true
    console.log("El mapa está vacío");
  } else {
    outGoingData('next', listBl_container.value);
  }



}


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
  padding-left: 20px;
  margin-bottom: 5px;
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}
</style>
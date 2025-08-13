<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row">

      <span class="subTexto">BL</span>


      <div class="col-10">
        <div>
          <input v-model="formData.bl" class="inputsearchBar" :class="{ 'campoSelected': formData.vacio }" maxlength="20"
            placeholder="BL" type="text"><!-- required -->

        </div>




      </div>

      <div class="col-1">
        <div @click="addBL"
          style=" height: 100%; margin-top: -4px; margin-left:-10px; display: flex; justify-content:center; align-items: center;">
          <i class="bi bi-plus-square-fill" style="color: #41c237; font-size: 35px; cursor: pointer;"></i>

        </div>
      </div>

      <TablaAddingBL class="col-12 tablaList" :columnName="'BL'" :blList="listBl" @removeBl="removeBL" />




    </div>



    <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">


      <button @click="cerrar" type="button" class="btn btn-secundary mybtn"
        style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

      <button type="submit" class="btn btn-primary mybtn"> Siguiente </button>

    </div>

  </form>

</template>

<script setup>

import { ref, defineEmits, defineExpose } from 'vue';


import { transfersCheckBL } from '@/components/conexion/DataConector.js'

import TablaAddingBL from '@/components/Internal/tablas/TablaAddingBL.vue'

const outGoingData = defineEmits(['cerrar', 'next']) //'checkBL'

import Swal from 'sweetalert2'

const listBl = ref(new Map())

/* Set
listBl.value.set('1234557Bfe222', {text: "1234557Bfe222", id:1});
listBl.value.set('1234557Bfe223',{text: "1234557Bfe223", id:2})
*/



const formData = ref(
  {
    bl: null, //AC54365DF453
    vacio: false
  })


function cerrar() {
  listBl.value.clear();

  outGoingData('cerrar')
}


function sms(texto) {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: texto
  });

}


function removeBL(bl_Selected) {
  console.log("voy a remover el BL", bl_Selected)

  listBl.value.delete(bl_Selected);
}

function addBL() {


  //outGoingData('checkBL')

  if (formData.value.bl && formData.value.bl != '') {

    const actualBl = formData.value.bl.toString().toUpperCase() || null

    if (actualBl) {

      transfersCheckBL(actualBl).then(existe => {

        if (existe.success) {
          sms(actualBl + " Existe!")

        } else {

          formData.value.vacio = false
          listBl.value.set(actualBl, { text: actualBl, id: 1 });
          formData.value.bl = null


        }
      }).catch(error => {
        console.log(error)
        console.log("Error al Hacer La peticion")

      }).finally(() => {
        console.log("finally")
      })

    } else {
      console.log("invalido bl casting")
    }

  } else {
    console.log("No puede haber valores nulos")
  }

}

function enviar() {

  if (listBl.value.size === 0) {
    formData.value.vacio = true
    console.log("El mapa está vacío");
  } else {
    outGoingData('next', listBl.value);
  }

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
  padding-left: 20px;
  margin-bottom: 5px;
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}
</style>
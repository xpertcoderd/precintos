<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row cardContainer">


      <TablaAddingConfirmation :headerData="formData.headerData" :bl_ContainerList="formData.bl_ContainerList"
        class="col-12 tablaList" />

      <div
        style="width: 100%;  display: grid; justify-content: end; padding-right: 35px; font-size: 12px; margin-top: -15px;">
        <div>
          <strong>Total: </strong>
          <span>{{ `RD$${formData.totalAmount.toLocaleString('es-419')}` }}</span>
        </div>

      </div>





    </div>

    <div class="col-12" style="padding-top: 10px; font-size: 12px">

      <label for="check" class="checkLabel">
        <input type="checkbox" id="check" v-model="formData.check" class="checkIcon" />
        <span> Acepto los términos y condiciones de esta aplicación</span>
      </label>

    </div>


    <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">


      <button @click="cerrar" type="button" class="btn btn-secundary mybtn"
        style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

      <button type="submit" class="btn btn-primary mybtn"> Generar Orden </button>

    </div>

  </form>

</template>

<script setup>

import TablaAddingConfirmation from '@/components/Internal/tablas/TablaAddingConfirmation.vue'

import { ref, defineEmits, defineProps, onMounted } from 'vue';

const incomingData = defineProps(['allData']);
const outGoingData = defineEmits(['cerrar', 'next'])



const formData = ref(
  {
    headerData: {
      serverClient: "serverClient",
      finalClient: "finalClient",
      startPlace: "startPlace",
      endPlace: "endPlace",
      typeName: "name",
      unitPrice: 0,

    },
    bl_ContainerList: [
      {
        bl: "bl",
        bl_count: [],
        amount: 0
      }
    ],
    totalAmount: 0,
    check: false,
  })

onMounted(() => {
  formData.value = incomingData.allData

})

function cerrar() {

  outGoingData('cerrar')
}





function enviar() {

  if (formData.value.check) {
    outGoingData('next', formData.value);
  } else {
    console.log("accepte los terminos  y condiciones")
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

.checkLabel {
  margin-bottom: auto;
  margin-top: auto;
  display: flex;
}

.cardContainer {
  background: white;
  border-radius: 8px;
  margin-left: 8px;
  margin-right: 8px;
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
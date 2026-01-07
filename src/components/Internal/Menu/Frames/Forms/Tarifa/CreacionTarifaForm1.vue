<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row">


      <div class="col-3">

        <span class="subTexto">Nombre de la Tarifa</span>
        <div>

          <input class="inputsearchBar selectionable" v-model="formData.name" maxlength="20" placeholder="" type="text"
            required>

        </div>

      </div>

      <div class="col-3">

        <span class="subTexto">Tipo de Carga</span>
        <div>

          <select class="inputsearchBar selectionable" v-model="formData.transferType">

            <!--  <option :value="null" selected disabled default>Importacion</option> -->

            <option v-for=" (tipo, index) in incomingData.transferTypes" :key="index" :value="tipo">{{
              tipo.name }}</option>

          </select>


        </div>

      </div>

      <div class="col-2">

        <span class="subTexto">Tipo de Tarifa</span>
        <div>

          <select @change="validar" class="inputsearchBar selectionable" v-model="formData.tariffType">

            <!-- <option :value="null" selected disabled default>Metropolitana</option> -->

            <option v-for=" (tipo, index) in incomingData.tariffTypes" :key="index" :value="tipo">{{
              tipo.name }}</option>

          </select>


        </div>

      </div>

      <div class="col-2">

        <span class="subTexto">Precio RD$</span>
        <div>

          <input class="inputsearchBar selectionable" v-model="formData.price" maxlength="20" placeholder=""
            type="number"><!-- required -->

        </div>

      </div>

      <div class="col-2">

        <span class="subTexto">Viajes Cortos</span>
        <div>

          <input class="inputsearchBar selectionable" :disabled="!fields_enable.shortTripKm"
            v-model="formData.shortTripKm" maxlength="20" placeholder="" type="number"><!-- required -->

        </div>

      </div>
  
      <div class="col-3">

        <span class="subTexto">Origen</span>
        <div>
          <select class="inputsearchBar selectionable" :class="{'isEnable':fields_enable.origin, 'isDisable': !fields_enable.origin}"  :disabled="!fields_enable.origin" v-model="formData.origin">

            <!-- <option :value="null" selected disabled default>Seleccione Origen</option> -->

            <option v-for=" (place, index) in incomingData.places_List" :key="index" :value="place">{{
              place.label }}</option>

          </select>


        </div>
      </div>

      <div class="col-3">

        <span class="subTexto">Destino</span>
        <div>

          <select class="inputsearchBar selectionable" :class="{'isEnable':fields_enable.destination, 'isDisable': !fields_enable.destination}" :disabled="!fields_enable.destination" v-model="formData.destination">

            <!-- <option :value="null" selected disabled default>Seleccione Destino</option> -->

            <option v-for=" (place, index) in incomingData.places_List" :key="index" :value="place">{{
              place.label }}</option>

          </select>


        </div>

      </div>

      <div class="col-2">

        <span class="subTexto">Km Libre</span>
        <div>

          <input class="inputsearchBar selectionable" :disabled="!fields_enable.distanceFreeKm" v-model="formData.distanceFreeKm" maxlength="20" placeholder=""
            type="number"><!-- required -->

        </div>

      </div>

      <div class="col-2">

        <span class="subTexto">Km adicionales</span>
        <div>

          <input class="inputsearchBar selectionable" :disabled="!fields_enable.distanceOffsetKm" v-model="formData.distanceOffsetKm" maxlength="20" placeholder=""
            type="number"><!--  -->

        </div>

      </div>

      <div class="col-2">

        <span class="subTexto">Costo por adicionales</span>
        <div>

          <input class="inputsearchBar selectionable" :disabled="!fields_enable.distanceOffsetCost" v-model="formData.distanceOffsetCost" maxlength="20"
            placeholder="" type="number"><!-- required -->

        </div>

      </div>





      <!--       <div class="col-4">
        <div style="width: 100%;">
          <span class="subTexto2">Fecha de corte</span>
      
          <input v-model="formData.timeDate" class="inputsearchBar" style="width: 100%;" maxlength="20" placeholder=""
            type="text">

        </div>

      </div> -->


    </div>
    <hr style="color: grey;">



    <div class="col-12">

      <!-- 
      <button @click="cerrar" type="button" class="btn btn-secundary mybtn"
        style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button> -->

      <button type="submit" class="btn btn-primary mybtn"> Crear Nueva Tarifa </button>

    </div>

  </form>

</template>

<script setup>

import { ref } from 'vue';
 //defineProps defineEmits


const incomingData = defineProps(['transferTypes', 'tariffTypes', 'places_List']);
const outGoingData = defineEmits(['form'])

const tarifTypeValue = ref(1)

const fields_enable = ref({
  shortTripKm: true,
  origin: true,
  destination: true,
  distanceFreeKm: true,
  distanceOffsetKm: true,
  distanceOffsetCost:true

})

const formData = ref(
  {
    id: 0,
    name: "",
    transferType: { id: 0, name: 'N/A' },
    tariffType: { id: 0, name: 'N/A' },
    price: null,
    shortTripKm: null,
    origin: { id: 0, label: 'N/A' },
    destination: { id: 0, label: 'N/A' },
    distanceFreeKm: null,
    distanceOffsetKm: null,
    distanceOffsetCost: null


  })

function habilitarTodos() {
  fields_enable.value.shortTripKm = true
  fields_enable.value.origin = true
  fields_enable.value.destination = true
  fields_enable.value.distanceFreeKm = true
  fields_enable.value.distanceOffsetKm = true
  fields_enable.value.distanceOffsetCost = true

}



function validar() {

  console.log(formData.value.tariffType)

  tarifTypeValue.value=formData.value.tariffType.id

  console.log("voy a validar", tarifTypeValue.value)

  habilitarTodos();


  /*   formData.value.name
    formData.value.transferType
    formData.value.tariffType
    formData.value.price */

  if (tarifTypeValue.value < 3) {

    formData.value.shortTripKm = null
    fields_enable.value.shortTripKm = false

    formData.value.origin = null
    fields_enable.value.origin = false

    formData.value.destination = null
    fields_enable.value.destination = false

    formData.value.distanceFreeKm = null
    fields_enable.value.distanceFreeKm = false

    formData.value.distanceOffsetKm = null
    fields_enable.value.distanceOffsetKm = false

    formData.value.distanceOffsetCost = null
    fields_enable.value.distanceOffsetCost = false

  } else if (tarifTypeValue.value == 3) {

    //formData.value.shortTripKm=null

    formData.value.origin = null
    fields_enable.value.origin = false

    formData.value.destination = null
    fields_enable.value.destination = false

    formData.value.distanceFreeKm = null
    fields_enable.value.distanceFreeKm = false

    formData.value.distanceOffsetKm = null
    fields_enable.value.distanceOffsetKm = false

    formData.value.distanceOffsetCost = null
    fields_enable.value.distanceOffsetCost = false

  } else if (tarifTypeValue.value == 4) {

    formData.value.shortTripKm = null
    fields_enable.value.shortTripKm = false

    formData.value.origin = null
    fields_enable.value.origin = false

    formData.value.destination = null
    fields_enable.value.destination = false

    /* formData.value.distanceFreeKm=null
    formData.value.distanceOffsetKm=null
    formData.value.distanceOffsetCost=null
     */
  } else if (tarifTypeValue.value == 5) {

/*     formData.value.origin = null
    fields_enable.value.origin = false

    formData.value.destination = null
    fields_enable.value.destination = false */


    
    formData.value.shortTripKm=null
    fields_enable.value.shortTripKm = false

    formData.value.distanceFreeKm=null
    fields_enable.value.distanceFreeKm = false

    formData.value.distanceOffsetKm=null
    fields_enable.value.distanceOffsetKm = false

    formData.value.distanceOffsetCost=null
    fields_enable.value.distanceOffsetCost = false

    
  } else {

    formData.value.shortTripKm = null
    fields_enable.value.shortTripKm = false

    formData.value.distanceFreeKm = null
    fields_enable.value.distanceFreeKm = false


    formData.value.distanceOffsetKm = null
    fields_enable.value.distanceOffsetKm = false

    formData.value.distanceOffsetCost = null
    fields_enable.value.distanceOffsetCost = false
  }
}

function enviar() {

  validar()

  // console.log(formData.value)

  outGoingData('form', formData.value);


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
  height: auto;
  justify-content: space-between;

  background: #fcfcfc;
  border-radius: 10px;
  padding: 20px;
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
  float: right;
  color: white;
  border: none;
}


.subTexto {
  margin-bottom: 5px;
  user-select: none;
  font-weight: 600;
  font-size: 13px;
}

.subTexto2 {
  color: grey;
  margin-bottom: 5px;
  user-select: none;
  font-weight: 400;
  font-size: 14px;
}

.selectionable {
  width: 40px;
  /* Establece un ancho fijo */
  overflow: hidden;
  /* Evita que el contenido desborde */
  text-overflow: ellipsis;
  /* Agrega "..." si el texto es muy largo */
  white-space: nowrap;
  /* Mantiene el texto en una sola línea */
}

.isDisable{
  background-color:#f8f8f8;

}

.isEnable{
  background-color:white;
}
</style>
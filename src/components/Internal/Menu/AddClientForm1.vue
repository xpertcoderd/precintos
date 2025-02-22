<template>

  <form @submit.prevent="siguiente" class="formulario">


    <div class="row">


      <span class="subTexto" style=" padding-bottom: 5px;">Datos de la compania</span>

      <div class="col-6">
        <div>

          <input v-model="formData.name" class="inputsearchBar" maxlength="18" placeholder="Nombre"
            type="text"><!-- required -->

        </div>

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.rnc" class="inputsearchBar" maxlength="16" placeholder="RNC"
            type="text"><!-- required -->
        </div>

      </div>

      <span class="subTexto">Tipo de cliente</span>

      <div class="col-12">

        <div class="radioGroup">
          <input type="radio" id="contactChoice1" name="contact" value="final" v-model="formData.type"
            @change="handleRadioChange" />

          <label for="contactChoice1">Cliente Final</label>

          <input type="radio" id="contactChoice2" name="contact" value="server" v-model="formData.type"
            @change="handleRadioChange" style="margin-left: 5px;" />

          <label for="contactChoice2">Broker</label>
        </div>

      </div>


      <div class="col-6">
        <div>

          <input v-model="formData.address" class="inputsearchBar" maxlength="40" placeholder="Direccion"
            type="text"><!-- required -->
        </div>

      </div>

      <div class="col-6">
        <div>
          <input v-model="formData.phone" class="inputsearchBar" maxlength="10" placeholder="Telefono"
            type="tel"><!-- required -->
        </div>

      </div>

      <div class="col-6">
        <div>
          <input v-model="formData.email" class="inputsearchBar" maxlength="35" placeholder="Correo"
            type="email"><!-- required -->
        </div>

      </div>

      <div class="col-6">
        <div>
          <input v-model="formData.web" class="inputsearchBar" maxlength="40" placeholder="Pagina Web"
            type="text"><!-- required -->
        </div>

      </div>

      <span class="subTexto" style=" padding-bottom: 5px;">Informacion del Contacto</span>

      <div class="col-6">
        <div>

          <input v-model="formData.contact" class="inputsearchBar" maxlength="20" placeholder="Nombre Completo"
            type="text"><!-- required -->
        </div>

      </div>


      <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">

        <button @click="cancelar" type="button" class="btn btn-secundary mybtn"
          style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

        <button type="submit" class="btn btn-primary mybtn">
          {{ submitLabel }}
        </button>

      </div>

    </div>


  </form>

</template>

<script setup>

import { ref, defineEmits, defineExpose } from 'vue'; //defineProps

/*const incomingData = defineProps(['updatingClient']);*/
//incomingData.updatingClient defineProps


const outGoingData = defineEmits(['cerrar', 'next', 'done', 'secuence']) //'form', 

const formData = ref({
  type: "server",
  name: "",
  rnc: "",
  contact: "",
  email: "",
  phone: "",
  address: "",
  web: ""

})



const isUpdating = ref(false)

const submitLabel = ref("Terminar")

const isServer = ref(true)


function showSecuence(value) {

  if (value) {
    submitLabel.value = "Siguiente"
    isServer.value = true

  } else {
    submitLabel.value = "Terminar"
    isServer.value = false

  }

  outGoingData('secuence', value);
}




function limpiar() {

  formData.value = {
    type: "final",
    name: "",
    rnc: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    web: ""
  }

  isUpdating.value = false
  showSecuence(false)

}

function cargarForm(formulario) {

  isUpdating.value = true

  submitLabel.value = "Terminar"

  console.log("Voy a actualizar un cliente")
  formData.value = formulario
}

function siguiente() {

  if (isUpdating.value) {
    outGoingData('update', formData.value);

    limpiar();

  } else {

    if (isServer.value) {
      outGoingData('next', formData.value);

    } else {
      outGoingData('done', formData.value);

    }
    limpiar();
  }

}

function handleRadioChange() {

  if (isUpdating.value) {

    submitLabel.value = "Terminar"

  } else {

    if (formData.value.type == 'server') {
      showSecuence(true)

    } else {
      showSecuence(false)
    }

  }

}

handleRadioChange()

function cancelar() {
  isUpdating.value = false
  limpiar();
  outGoingData('cerrar')

}
defineExpose({ cargarForm })
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

.radioGroup {
  width: auto;
  color: grey;
  padding-left: 20px;

}

.radioGroup label {
  padding-left: 5px;
  padding-right: 5px;
  user-select: none;
}


.subTexto {
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}
</style>
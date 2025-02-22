<template>

  <form @submit.prevent="sendAll" class="formulario">


    <div class="row">

      <div class="col-6">
        <div>

          <input v-model="formData.contact" class="inputsearchBar" maxlength="20" placeholder="Compañia"
            type="text"><!-- required -->
        </div>

      </div>


      <span class="subTexto" style=" padding-bottom: 5px;">Asignar</span>

      <div class="col-12">
        <div style="width: 70%;">

          <input v-model="formData.name" class="inputsearchBar" maxlength="18" placeholder="Nombre"
            type="text"><!-- required -->

        </div>

      </div>




    </div>

    <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">

      <button @click="cancelar" type="button" class="btn btn-secundary mybtn"
        style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

      <button type="submit" class="btn btn-primary mybtn">
        Terminar

      </button>

    </div>


  </form>

</template>

<script setup>

import { ref, defineEmits, defineExpose } from 'vue'; //defineProps

/*const incomingData = defineProps(['updatingClient']);*/
//incomingData.updatingClient defineProps

const outGoingData = defineEmits(['cerrar', 'send']) //'form', 

const formData = ref({
  type: "final",
  name: "",
  rnc: "",
  contact: "",
  email: "",
  phone: "",
  address: "",
  web: ""

})


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

}

function cargarForm(formulario) {


  console.log("soy el destino final")
  formData.value = formulario
}

function sendAll() {
  outGoingData('send', formData.value);
  cancelar();



}

function cancelar() {

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
  justify-content: space-between;

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
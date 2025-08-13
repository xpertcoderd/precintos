<template>

  <form @submit.prevent="enviar" class="formulario">

    <div class="row">

      <div class="col-6">
        <div>

          <input v-model="formData.compania" class="inputsearchBar" maxlength="20" placeholder="Compania" type="text">

        </div>

      </div>



      <span class="subTexto">Datos de usuario</span>

      <div class="col-6">
        <div>

          <input v-model="formData.firstName" class="inputsearchBar" maxlength="20" placeholder="Nombre" type="text"
            required><!--  -->

        </div>

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.lastName" class="inputsearchBar" maxlength="20" placeholder="Apellido" type="text"
            required><!--  -->

        </div>

      </div>

      <div class="col-6">
        <div>
          <input v-model="formData.idcard" class="inputsearchBar" maxlength="20" placeholder="Cedula" type="text"
            required><!--  -->
        </div>

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.address" class="inputsearchBar" maxlength="40" placeholder="Direccion" type="text"
            required><!--  -->
        </div>

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.phone" class="inputsearchBar" maxlength="10" placeholder="Telefono" type="tel"
            required><!--  -->
        </div>

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.email" class="inputsearchBar" maxlength="40" placeholder="Correo" type="email"
            required><!--  -->
        </div>

      </div>

      <span class="subTexto" style=" padding-bottom: 5px;">Datos de la compania</span>

      <div class="col-6">
        <div>

          <input v-model="formData.username" class="inputsearchBar" maxlength="40" placeholder="Nombre de Usuario"
            type="text" required>
        </div><!--  -->

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.passwd" class="inputsearchBar" maxlength="20" placeholder="Contrasena" type="text"
            required><!--  -->

        </div>

      </div>

      <div class="col-6">
        <div>

          <select id="clickme" class="inputsearchBar" v-model="formData.rolId">

            <option :value="null" selected disabled default>Rol</option>

            <option v-for=" (rol, index) in incomingData.roles_List" :key="index" :value="rol.id">{{ rol.name }}
            </option>

          </select>


        </div>

      </div>

      <div class="col-6">
        <div>

          <input v-model="formData.pin" class="inputsearchBar" maxlength="20" placeholder="PIN" type="text"
            required><!--  -->
        </div>


      </div>

      <div class="col-12" style="padding-top: 10px; padding-bottom: 10px;">


        <button @click="outGoingData('cerrar')" type="button" class="btn btn-secundary mybtn"
          style="  background: #d7d7e3;   margin-right: 15px;">Cancelar</button>

        <button type="submit" class="btn btn-primary mybtn">

          <span v-if="incomingData.alone">Finalizar</span>



          <span v-if="!incomingData.last && !incomingData.alone">Terminar</span>
          <span v-if="incomingData.last && !incomingData.alone">Siguiente</span>

        </button>

        <span v-if="!incomingData.alone" @click="skip"
          style="cursor: pointer; float: right; padding-right: 20px;">omitir</span>



      </div>

    </div>

    <div>

    </div>

  </form>

</template>

<script setup>

import { ref, defineProps, defineEmits, defineExpose } from 'vue';

const outGoingData = defineEmits(['cerrar', 'form', 'next', 'skip', 'update'])



const incomingData = defineProps(['alone', 'last', 'roles_List']);

const isUpdating = ref(false)


const formData = ref({

  clientId: 1,
  rolId: null,
  firstName: "",
  lastName: "",
  idcard: "",
  email: "",
  phone: "",
  address: "",
  username: "",
  passwd: "",
  pin: ""
})


function restoreUpdating() {

  formData.value = {

    clientId: 1,
    rolId: null,
    firstName: "",
    lastName: "",
    idcard: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    passwd: "",
    pin: ""

  }

  isUpdating.value = false


}


function cargarForm(formulario) {

  isUpdating.value = true

  console.log("Voy a actualizar un Usuario")
  formData.value = formulario
}



function enviar() {
  if (incomingData.alone) {

    if (isUpdating.value) {
      outGoingData('update', formData.value);
    } else {
      outGoingData('form', formData.value);
    }


  } else {
    outGoingData('next', formData.value);
  }

}

function skip() {
  console.log("se va a omitir")
  outGoingData('skip');

}

defineExpose({ cargarForm, restoreUpdating })

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


.subTexto {
  user-select: none;
  font-weight: 600;
  font-size: 15px;
}
</style>
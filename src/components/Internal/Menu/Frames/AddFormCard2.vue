<template>
  <div class="popContainer">

    <div class="areaContent">


      <div class="targeta">

        <div v-show="forms.client" class="addClientIMG">

          <div v-if="incomingData.vista == 2 && secuence" class="bolasContainer">

            <div class="bola bolaSelected">
              <span class="bolaText bolaTextSelected">1</span>
            </div>

            <div class="bola ">
              <span class="bolaText ">2</span>
            </div>

            <div class="bola">
              <span class="bolaText">3</span>
            </div>

          </div>

        </div>

        <div v-show="forms.user" class="addUserIMG">

          <div v-if="incomingData.vista == 2 && secuence" class="bolasContainer">

            <div class="bola bolaSelected">
              <span class="bolaText  bolaTextSelected">1</span>
            </div>

            <div class="bola bolaSelected">
              <span class="bolaText bolaTextSelected">2</span>
            </div>

            <div class="bola">
              <span class="bolaText">3</span>
            </div>

          </div>

        </div>



        <div v-show="forms.asign" class="asignarClienteIMG">

          <div v-if="incomingData.vista == 2 && secuence" class="bolasContainer">

            <div class="bola bolaSelected">
              <span class="bolaText bolaTextSelected">1</span>
            </div>

            <div class="bola bolaSelected">
              <span class="bolaText bolaTextSelected">2</span>
            </div>

            <div class="bola bolaSelected">
              <span class="bolaText bolaTextSelected">3</span>
            </div>

          </div>

        </div>




        <div class="targetaLogin">


          <div style="padding: 20px; padding-left: 20px; position: relative;">
            <div v-if="forms.user" style="font-weight: 600; color: black; ">

              <div v-if="!updating.user">
                Creación de Traslado
              </div>

              <div v-if="updating.user">
                Actualizacion de Traslado
              </div>


            </div>

            <div v-if="forms.client" style="font-weight: 600; color: black; ">

              <div v-if="!updating.client">
                Creación de cliente
              </div>

              <div v-if="updating.client">
                Actualizacion de Cliente
              </div>

            </div>

            <div v-if="forms.asign" style="font-weight: 600; color: black; ">
              Asignacion de cliente

            </div>

            <div class="parrafo">
              Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn
              renpsn d Lorenpsn d Lorenpsn d Lorenpsn
            </div>

            <img style="position: absolute; background: transparent; width: 180px; top: 15px; right: 10px;"
              src="@/assets/logo/auroraLogob.png" alt="">


          </div>




          <div class="targetaOpen">

            <AddTrasladoForm @cerrar="close" />

          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, defineEmits, defineProps, defineExpose, onMounted } from 'vue';

import AddTrasladoForm from '@/components/Internal/Menu/AddTrasladoForm.vue'


//import {  create_User } from '@/components/conexion/DataConector.js'

import Swal from 'sweetalert2'


const outGoingData = defineEmits(
  ['cerrar', 'form', 'updateClientList', 'updateUserList']
)

const incomingData = defineProps(['vista']);

const forms = ref({
  client: true,
  user: false,
  asign: false
})

const updating = ref({
  client: false,
  user: false
})

const preClient = ref(null)
const preUser = ref(null)

const secuence = ref(true)

function setViewForms(vista_id) {
  switch (vista_id) {
    case 1:

      forms.value.user = true
      forms.value.client = false
      forms.value.asign = false
      break;

    case 2:
      forms.value.user = false
      forms.value.client = true
      forms.value.asign = false
      break;

    case 3:

      forms.value.user = false
      forms.value.client = false
      forms.value.asign = true
      break;

    default:
      console.log("***************  vista defect")
      forms.value.client = true
      forms.value.user = false
      forms.value.asign = false
      break;

  }

}

setViewForms(incomingData.vista)


function restore() {
  updating.value.client = false
  updating.value.user = false

  forms.value.client = true
  forms.value.user = false
  forms.value.asign = false

  showSecuence(true)

  preClient.value = null

  preUser.value = null

  sms("valores defeto")

}

function showSecuence(value) {
  secuence.value = value
}


onMounted(() => {


})

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




function close() {
  restore()
  outGoingData('cerrar')
}


defineExpose({ restore })

</script>

<style scoped>
.bolasContainer {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding-top: 5%;
}

.bola {
  background: lightblue;
  width: 48px;

  margin: 15px;

  border-radius: 50px 50px 50px 50px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.bolaText {
  color: black;
  margin: 12px;
  font-weight: 700;
}

.bolaSelected {
  background: #2ec0e2;

}

.bolaTextSelected {
  color: white;
}

.popContainer {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 20;
}

.areaContent {
  backdrop-filter: blur(3px);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}


.targeta {
  display: flex;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: -2px 0px 5px 2px rgba(52, 52, 52, 0.4);
}

/*.videoContainer {
  height: 100%;
  background-color: blue !important;
  border-radius: 10px 0px 0px 10px;
  background: blue;
}
*/

.asignarClienteIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/asignarCliente.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}

.addUserIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/addUser.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}

.addClientIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/addClient.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}





.fondoIMG {

  /* max-height: 470px;*/
  height: 100%;
  max-width: 400px;



  object-fit: cover;
  /* Ajusta la imagen para cubrir el contenedor */
  object-position: center;
  /* Centra la imagen dentro del contenedor */
}


.parrafo {
  user-select: none;
  font-size: 14px;
  /*padding: 2%;*/
  color: grey;

  max-width: 80%;

  word-wrap: break-word;
  /* Opcional: permite cortar palabras largas si no caben */
  text-align: justify;
  line-height: 1;
  overflow-wrap: break-word;
  margin: 0;
}

.targetaOpen {
  border-radius: 0px 0px 10px 0px;
  height: 100%;
  padding-left: 25px;
  background: #f5f6f7;

}

img {
  /*  width: 100%;*/
  border-radius: 10px 0px 0px 10px;
  background-color: blue
}






.targetaLogin {
  display: flex;
  flex-direction: column;
  /*  justify-content: space-between;
  min-width: 60%;*/
  width: 100%;
  max-width: 600px;
  position: relative;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 2px 0px 5px 2px rgba(52, 52, 52, 0.4);
  /*  padding: 40px;*/
}
</style>

<template>
  <div class="popContainer">

    <div class="areaContent">


      <div class="targeta">

        <div v-show="vistas.client.showing" class="addClientIMG">
          <SecuenciaPage v-if="vistas.secuence.showing" :level="1" />
        </div>


        <div v-show="vistas.user.showing" class="addUserIMG">
          <SecuenciaPage v-if="vistas.secuence.showing" :level="2" />
        </div>

        <div v-show="vistas.assing.showing" class="asignarClienteIMG">
          <SecuenciaPage v-if="vistas.secuence.showing" :level="3" />
        </div>


        <div class="targetaLogin">

          <TitleParrafHeader :actualForm="incomingData.page" :parrafo="parrafo" />



          <div class="targetaOpen">


            <AddClientForm1 v-if="incomingData.page == 'client'" :updatingClient="updating.client" @cerrar="close"
              @next="preSaveClient" @update="updateClient" @done="crearClient" @secuence="showSecuence"
              ref="vistas.client.clientRef" />

            <AddUsuarioForm v-if="incomingData.page == 'user'" :clientMenu="incomingData.page == 'client'"
              @cerrar="close" @next="preSaveUser" @skip="skipPreSaveUser" @form="crearUsuario"
              @secuence="showSecuence" />

            <AssgnClientForm2 v-if="incomingData.page == 'asign'" style="min-height: 400px;" @cerrar="close"
              @send="crearTodos" />

          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, defineEmits, defineProps, defineExpose, onMounted } from 'vue';

import AddUsuarioForm from '@/components/Internal/Menu/AddUsuarioForm.vue'
import AddClientForm1 from '@/components/Internal/Menu/AddClientForm1.vue'
import AssgnClientForm2 from '@/components/Internal/Menu/AssgnClientForm2.vue'

import SecuenciaPage from '@/components/Internal/Menu//Frames/SecuenciaPage.vue'
import TitleParrafHeader from '@/components/Internal/Menu//Frames/TitleParrafHeader.vue'

import { create_Client, update_Client, create_User } from '@/components/conexion/DataConector.js'

import Swal from 'sweetalert2'


const outGoingData = defineEmits(
  ['cerrar', 'form', 'updateClientList', 'updateUserList']
)


const incomingData = defineProps(['cliente']);

const vistas = ref({

  client: {
    showing: false,
    isUpdating: false,
    clientRef: null,
    parrafo: " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "
  },

  user: {
    showing: false,
    isUpdating: false,
    parrafo: " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "
  },

  assing: {
    showing: false,
    parrafo: " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "
  },

  secuence: {
    showing: false,

  },

  preSaving: {
    client_: null,
    user: null
  }

})

function vistasDefecto() {


  vistas.value.client.showing = false
  vistas.value.client.isUpdating = false

  vistas.value.user.showing = false
  vistas.value.user.isUpdating = false

  vistas.value.assing.showing = false

  vistas.value.secuence.showing = false

  vistas.value.preSaving.client_ = null
  vistas.value.preSaving.user = null


}

vistasDefecto();



function selectVistas(vista_selected, updating) {

  vistasDefecto();


  switch (vista_selected) {

    case 'client':

      vistas.value.client.showing = true
      vistas.value.client.isUpdating = updating
      break;

    case 'user':

      vistas.value.user.showing = true
      vistas.value.user.isUpdating = updating
      break;

    case 'assinging':

      vistas.value.assing.showing = true
      break;

    default:
      vistas.value.client.showing = true
      vistas.value.client.isUpdating = false
      break;
  }

}

selectVistas()




function loadFormulario(formulario) {

  selectVistas('client', false)
  vistas.value.client.clientRef.cargarForm(formulario)

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
  outGoingData('cerrar')
}


function updateClient(formulario) {

  console.log("se actualizara este cliente")

  update_Client(formulario, formulario.id).then(response => {

    if (response.message) {
      //alert()
      sms(response.message)


    } else {
      //console.log(response.data)
      sms("cliente Actualizado Correctamente")
      //alert("cliente Agregado Correctamente")
      close()
    }


  }).catch(error => {
    console.log(error)

  })
    .finally(() => {

      console.log("Actualiza ClientList")
      outGoingData('updateClientList')

    })


}



function preSaveClient(form1) {

  vistas.value.preSaving.client = form1

}

function preSaveUser(form2) {

  vistas.value.preSaving.user = form2

}


function skipPreSaveUser() {

  vistas.value.preSaving.user = null
}


function crearTodos(bind) {


  console.log("se creara el cliente", vistas.value.preSaving.client)

  create_Client(vistas.value.preSaving.client).then(response => {

    if (response.message) {
      //alert()
      sms(response.message)


    } else {
      //console.log(response.data)
      sms("cliente Agregado Correctamente")
      //alert("cliente Agregado Correctamente")
      //close()
    }


  }).catch(error => {
    console.log(error)

  })
    .finally(() => {

      if (vistas.value.preSaving.user) {

        console.log("se creara el usuario", vistas.value.preSaving.user)

        create_User(vistas.value.preSaving.user).then(response => {

          if (response.message) {
            //alert(response.message)
            sms(response.message)


          } else {
            //console.log(response.data)
            // alert("cliente Agregado Correctamente")
            sms("Usuario Agregado Correctamente")
            close()
          }


        }).catch(error => {
          console.log(error)

        })
          .finally(() => {

            console.log("Actualiza ClientList")
            outGoingData('updateClientList')


          })
      } else {
        console.log("No existe el formulario usuario")

        console.log("Actualiza ClientList")
        outGoingData('updateClientList')

      }

    })



  console.log("se bind todo", bind)



}

function crearClient(formulario) {

  console.log("se creara el cliente")

  create_Client(formulario).then(response => {

    if (response.message) {
      //alert()
      sms(response.message)


    } else {
      //console.log(response.data)
      sms("cliente Agregado Correctamente")
      //alert("cliente Agregado Correctamente")
      close()
    }


  }).catch(error => {
    console.log(error)

  })
    .finally(() => {

      console.log("Actualiza ClientList")
      outGoingData('updateClientList')

    })



}

function crearUsuario(formulario) {
  console.log("se creara el cliente")


  create_User(formulario).then(response => {

    if (response.message) {
      //alert(response.message)
      sms(response.message)


    } else {
      //console.log(response.data)
      // alert("cliente Agregado Correctamente")
      sms("cliente Agregado Correctamente")
      close()
    }


  }).catch(error => {
    console.log(error)

  })
    .finally(() => {

      console.log("Actualiza ClientList")
      outGoingData('updateUserList')

    })


}

defineExpose({ loadFormulario })

</script>

<style scoped>
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

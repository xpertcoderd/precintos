<template>
  <div class="popContainer">

    <div class="areaContent">


      <div class="targeta">


        <div v-show="step == 1" class="addClientIMG">
          <SecuenciaPage2 :count="[true, false, false]" v-if="secuence" />
        </div>


        <div v-show="step == 2" class="addUserIMG">
          <!--           <SecuenciaPage2 :level="2" ref="secuenceRef" /> -->

          <SecuenciaPage2 :count="[true, true, false]" />
        </div>

        <div v-show="step == 3" class="asignarClienteIMG">
          <SecuenciaPage2 :count="[true, true, true]" />
        </div>



        <div class="targetaLogin">
          <TitleParrafHeader :step="step" :updatingClient="updatingClient" :parrafo="parrafo" />


          <div class="targetaOpen">


            <Step1Client v-if="step == 1" @cerrar="close" @next="preSaveClient" @update="updateClientAction"
              ref="clientRef" />

            <Step2User :roles_List="roles_List" v-if="step == 2" :last="preforms.client.type == 'server'"
              @cerrar="close" @skip="next_No_User" @next="preSaveUser" />


            <Step3Bind v-if="step == 3" @cerrar="close" @send="crearTodos" style="min-height: 400px;" />




          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, onMounted, watch } from 'vue';
 //defineProps

import Step1Client from '@/components/Internal/Menu/Frames/Forms/steps/client_Steps/Step1Client.vue'
import Step2User from '@/components/Internal/Menu/Frames/Forms/steps/client_Steps/Step2User.vue'
import Step3Bind from '@/components/Internal/Menu/Frames/Forms/steps/client_Steps/Step3Bind.vue'

import SecuenciaPage2 from '@/components/Internal/Menu//Frames/SecuenciaPage2.vue'
import TitleParrafHeader from '@/components/Internal/Menu//Frames/TitleParrafHeader.vue'

import { useClients } from '@/composables/useClients'
import { useUsers } from '@/composables/useUsers'
import { useRoles } from '@/composables/useRoles'

import Swal from 'sweetalert2'

const { useCreateClient, useUpdateClient } = useClients();
const { mutateAsync: createClientMutation } = useCreateClient();
const { mutateAsync: updateClientMutation } = useUpdateClient();

const { useCreateUser } = useUsers();
const { mutateAsync: createUserMutation } = useCreateUser();

const { useRolesAll } = useRoles();
const { data: rolesData } = useRolesAll();

const outGoingData = defineEmits(
  ['cerrar', 'form', 'updateClientList']
)

const parrafo = " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "

const clientRef = ref(null)

const secuence = ref(true)

const step = ref(1)

const updatingClient = ref(false)

const preforms = ref({
  client: null,
  user: null
})

const roles_List = ref([])

watch(rolesData, (newData) => {
  if (newData && newData.success) {
    roles_List.value = newData.roles;
  }
}, { immediate: true });


function restore() {

  step.value = 1
  updatingClient.value = false
  secuence.value = true

  preforms.value.client = null
  preforms.value.user = null
}


function close() {

  if (step.value == 1) {
    clientRef.value.restoreStep1()
  }

  restore();
  outGoingData('cerrar')
}


function preSaveClient(form1) {

  preforms.value.client = form1

  if (preforms.value.client.type == 'server') {
    /* secuenceRef.value.changeSpecial(false)*/

  } else {
    /* secuenceRef.value.changeSpecial(true)*/
    sms("Llegaste al final ")
  }

  step.value = 2

}

function preSaveUser(form2) {

  preforms.value.user = form2

  if (preforms.value.client.type == 'server') {
    /* secuenceRef.value.changeSpecial(false)*/
    step.value = 3

  } else {
    /*secuenceRef.value.changeSpecial(true)*/
    sms("se crearan Client-Users")
    crearTodos(null)
  }



}


function next_No_User() {


  if (preforms.value.client.type == 'server') {

    /* secuenceRef.value.changeSpecial(false)*/
    step.value = 3

  } else {
    /* secuenceRef.value.changeSpecial(true)*/
    sms("se crearan Client Solamente")

    crearTodos(null)
  }

}

async function crearTodos(bind) {


  console.log("Clients >>>>", preforms.value.client)

  try {
    const response = await createClientMutation(preforms.value.client);
    if (response.message) {
      //alert()
      sms(response.message)
    } else {
      //console.log(response.data)
      sms("cliente Agregado Correctamente")
      //alert("cliente Agregado Correctamente")
      //close()
    }
  } catch (error) {
    console.log(error)
  } finally {
    if (preforms.value.user) {
      console.log("Users >>>>", preforms.value.user)
      try {
        const response = await createUserMutation(preforms.value.user);
        if (response.message) {
          //alert(response.message)
          sms(response.message)
        } else {
          //console.log(response.data)
          // alert("cliente Agregado Correctamente")
          sms("Usuario Agregado Correctamente")
          close()
        }
      } catch (error) {
        console.log(error)
      } finally {
        console.log("Actualiza ClientList")
        outGoingData('updateClientList')
      }
    } else {
      console.log("No existe el formulario usuario")
      console.log("Actualiza ClientList")
      outGoingData('updateClientList')
    }
  }


  console.log("se bind todo", bind)
  /*  
    setTimeout(()=>{
       close();
    },3000)*/



}



onMounted(() => {
  // consultarRoles() // Handled by Vue Query
})



/*Upadate Client*/

function rellenarFormulario(formulario) {

  updatingClient.value = true
  secuence.value = false

  clientRef.value.cargarForm(formulario)

}


async function updateClientAction(formulario) {

  console.log("se actualizara este cliente")

  try {
    const response = await updateClientMutation({ id: formulario.id, data: formulario });
    if (response.message) {
      //alert()
      sms(response.message)
    } else {
      //console.log(response.data)
      sms("cliente Actualizado Correctamente")
      //alert("cliente Agregado Correctamente")
      close()
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log("Actualiza ClientList")
    outGoingData('updateClientList')
  }

}

async function sms(texto) {

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
  await Toast.fire({
    icon: "success",
    title: texto
  });

}



defineExpose({ rellenarFormulario })

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

<template>
  <div class="popContainer">

    <div class="areaContent">


      <div class="targeta">


        <div class="addUserIMG">

        </div>


        <div class="targetaLogin">
          <TitleParrafHeader :step="2" :updatingUser="updatingUser" :parrafo="parrafo" />


          <div class="targetaOpen">

            <Step2User :roles_List="roles_List" :alone="true" @cerrar="close" @form="crearUser" @update="updateUserAction"
              ref="userRef" />


          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, defineEmits, defineExpose, onMounted, watch } from 'vue'; //defineProps

import TitleParrafHeader from '@/components/Internal/Menu//Frames/TitleParrafHeader.vue'
import Step2User from '@/components/Internal/Menu/Frames/Forms/steps/client_Steps/Step2User.vue'

import { useUsers } from '@/composables/useUsers'
import { useRoles } from '@/composables/useRoles'

import Swal from 'sweetalert2'

const { useCreateUser, useUpdateUser } = useUsers();
const { mutateAsync: createUserMutation } = useCreateUser();
const { mutateAsync: updateUserMutation } = useUpdateUser();

const { useRolesAll } = useRoles();
const { data: rolesData } = useRolesAll();

const outGoingData = defineEmits(
  ['cerrar', 'form', 'updateClientList']
)

const parrafo = " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "

const updatingUser = ref(false)

const userRef = ref(null)

const roles_List = ref([])

watch(rolesData, (newData) => {
  if (newData && newData.success) {
    roles_List.value = newData.roles;
  }
}, { immediate: true });


/*function restore(){

updatingUser.value=false
  
}
*/

function close() {

  if (updatingUser.value) {
    userRef.value.restoreUpdating()
    updatingUser.value = false
  }



  outGoingData('cerrar')
}



async function crearUser(preforms) {

  console.log("se creara el usaurio :", preforms)

  try {
    const response = await createUserMutation(preforms);
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

}

function rellenarFormulario(formulario) {

  updatingUser.value = true

  userRef.value.cargarForm(formulario)

}


async function updateUserAction(form) {
  //update_Users(form, user_id) necestio el id
  console.log("se actualizara este Usuario")
  console.log(form)

  try {
    const response = await updateUserMutation({ id: form.id, data: form });
    if (response.message) {
      //alert()
      sms(response.message)
    } else {
      //console.log(response.data)
      sms("Usuario Actualizado Correctamente")
      //alert("cliente Agregado Correctamente")
      close()
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log("Actualiza UserList")
    //outGoingData('updateClientList')
  }
}

async function consultarRoles() {
    // Handled by Vue Query
}



onMounted(() => {

  consultarRoles()


})



/*Upadate User*/
/*
function rellenarFormulario(formulario){

  updatingClient.value=true
  secuence.value=false

  clientRef.value.cargarForm(formulario)

}
*/

/*

function updateUser(formulario) {

    console.log("se actualizara este cliente")
    
    update_Client(formulario, formulario.id ).then(response => {

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

  
}*/

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
